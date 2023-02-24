<template>
  <div class="container-fluid lista-ordenada">
    <div class="container">
      <div class="row">
        <h1>Pokemones sin evolución</h1>
        <ol>
          <li v-for="pokemon in pokemonList" :key="pokemon.id">
            {{ pokemon.name.charAt(0).toUpperCase()+ pokemon.name.slice(1) }}
          </li>
          <p v-if="pokemonList.length === 0">Cargando ...</p>
        </ol>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      pokemonList: [],
    }
  },
  async mounted() {
    const pokemonIds = await this.getPokemonIds();
    const pokemonList = await this.getNoEvolutionPokemon(pokemonIds);
    this.pokemonList = pokemonList;
  },
  methods: {
    async getPokemonIds() {
      const allPokemonIds = [];
      const offSet=Number;
      async function fetchPokemon(offset) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
        const data = await response.json();
        data.results.forEach(pokemon => {
          // Agregamos el ID del pokemon al array
          const pokemonId = pokemon.url.split('/')[6];
          allPokemonIds.push(pokemonId);
        });

        // Si hay más resultados, hacemos otra llamada a la API con un nuevo offset
        if (data.next) {
          const nextOffset = offset + 20;
          return fetchPokemon(nextOffset);
        } else {
          // Si no hay más resultados, devolvemos el array completo de IDs de los pokemones
          return allPokemonIds;
        }
      }

      return fetchPokemon(0);
    },
    async getNoEvolutionPokemon(pokemonIds) {
      const noEvoPokemonList = [];
      for (const pokemonId of pokemonIds) {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonId}`);
          const data = await response.json();
          // Si el pokemon no tiene evolución, lo agregamos a la lista de pokemones sin evolución
          if (!data.chain.evolves_to.length) {
            const pokemon = { id: pokemonId, name: data.chain.species.name };
            noEvoPokemonList.push(pokemon);
          }
        } catch (error) {}
      }

      // Filtramos los pokemones sin evolución y los ordenamos alfabéticamente por nombre
      noEvoPokemonList.sort((a, b) => a.name.localeCompare(b.name));
      return noEvoPokemonList;
    },
  },
}
</script>
<style>
.lista-ordenada {
  max-height: 820px; /* Establece la altura máxima para el contenedor de la lista */
  overflow-y: scroll; /* Hace que aparezca una barra de desplazamiento vertical */
}
</style>
