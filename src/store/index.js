import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemonName: null,
    listPokemons: [],
    pokemonIds: [],
    noEvoPokemonList: [],
    promises: []
  },
  mutations: {
    setlistPokemons(state, listPokemons) {
      state.listPokemons = listPokemons
    },
    setPokemonIds(state, pokemonIds) {
      state.pokemonIds = pokemonIds;
    },
    setNoEvoPokemonList(state, noEvoPokemonList) {
      state.noEvoPokemonList = noEvoPokemonList;
    },
    setPokemonName(state, pokemonName) {
      state.pokemonName = pokemonName;
    },
  },
  actions: {
    async fetchPokemons({
      commit
    }) {
      let allPokemons = [];
      let nextUrl = "https://pokeapi.co/api/v2/pokemon?limit=400";

      // Loop hasta que no haya una URL de "next" en la respuesta
      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        const pokemons = data.results.map(pokemon => ({
          name: pokemon.name,
          id: pokemon.url.split('/')[6],
        }));
        allPokemons = [...allPokemons, ...pokemons];
        nextUrl = data.next;
      }

      commit("setlistPokemons", allPokemons);

      const pokemonIds = allPokemons.map(pokemon => pokemon.id);
      const noEvoPokemonList = await getNoEvolutionPokemon(pokemonIds);
      commit('setNoEvoPokemonList', noEvoPokemonList);
    },
    async getNoEvolutionPokemon({ commit }) {
      let allPokemons = [];
      let nextUrl = "https://pokeapi.co/api/v2/pokemon?limit=1000";
    
      // Loop hasta que no haya una URL de "next" en la respuesta
      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();
        const pokemons = data.results.map(pokemon => ({
          name: pokemon.name,
          id: pokemon.url.split('/')[6],
        }));
        allPokemons = [...allPokemons, ...pokemons];
        nextUrl = data.next;
      }
    
      const pokemonIds = allPokemons.map(pokemon => pokemon.id);
      const promises = pokemonIds.map(pokemonId => {
        return fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonId}`)
          .then(response => response.json())
          .then(data => {
            if (!data.chain.evolves_to.length) {
              return { id: pokemonId, name: data.chain.species.name };
            } else {
              return null;
            }
          })
          .catch(error => {
            return null;
          });
      });
    
      const results = await Promise.allSettled(promises);
      const noEvoPokemonList = results
        .filter(result => result.status === "fulfilled" && result.value != null)
        .map(result => result.value)
        .sort((a, b) => a.name.localeCompare(b.name));
    
      commit('setNoEvoPokemonList', noEvoPokemonList);
      },
    async getPokemon({
      commit
    }) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1000`);
      const data = await response.json();
      const pokemonList = data.results.filter(pokemon => !pokemon.hasOwnProperty('evolves_to'));
      const promises = pokemonList.map(async pokemon => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return {
          name: data.name,
          weight: data.weight
        };
      });
      const pokemonDataList = await Promise.all(promises);
      const pokemonWithLowestWeight = pokemonDataList.reduce((accumulator, currentValue) => {
        if (accumulator === null || currentValue.weight < accumulator.weight) {
          return currentValue;
        } else {
          return accumulator;
        }
      }, null);
      commit('setPokemonName', pokemonWithLowestWeight.name);
    },
  },
  getters: {

  }
});