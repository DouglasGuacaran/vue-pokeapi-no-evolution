import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemonName: null
  },
  mutations: {
    setPokemonName(state, pokemonName) {
      state.pokemonName = pokemonName;
    },
  },
  actions: {
  
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