import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemonName: null,
    pokemons: [],
    evolutions: []
  },
  mutations: {
    setPokemons(state, pokemons) {
      state.pokemons = pokemons
    },
    setEvolutions(state, evolutions) {
      state.evolutions = evolutions
    },
    setPokemonName(state, pokemonName) {
      state.pokemonName = pokemonName;
    },
  },
  actions: {
    async fetchPokemons({ commit }) {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1253')
      const pokemons = response.data.results.map(pokemon => ({
        id: pokemon.url.split('/')[6],
        name: pokemon.name
      }))
      commit('setPokemons', pokemons)
    },
    async fetchEvolutions({ commit, state }) {
      const evolutions = []
      for (const pokemon of state.pokemons) {
        const response = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${pokemon.id}/`)
        const chain = response.data.chain
        if (!chain.evolves_to.length) {
          evolutions.push(pokemon)
        }
      }
      commit('setEvolutions', evolutions)
    },
    async getPokemon({
      commit
    }) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100`);
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
    orderedPokemons(state) {
      return state.pokemons.sort((a, b) => a.weight - b.weight);
    }
  }
});