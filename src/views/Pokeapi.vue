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
  </div>
</template>


<script>
export default {
  data() {
    return {
      pokemonList: [],
    }
  },
  mounted() {
    this.getPokemonIds()
      .then(pokemonIds => this.getNoEvolutionPokemon(pokemonIds))
      .then(pokemonList => this.pokemonList = pokemonList);
  },
  methods: {
    getPokemonIds() {
      const allPokemonIds = [];

      const fetchPokemon = (offset) => {
        return fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
          .then(response => response.json())
          .then(data => {
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
          });
      }

      return fetchPokemon(0);
    },
    getNoEvolutionPokemon(pokemonIds) {
      const promises = [];

      // Para cada ID de pokemon, hacemos una llamada a la API de evolución
      pokemonIds.forEach(pokemonId => {
        const promise = fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonId}`)
          .then(response => response.json())
          .then(data => {
            // Si el pokemon no tiene evolución, lo agregamos a la lista de pokemones sin evolución
            if (!data.chain.evolves_to.length) {
              return { id: pokemonId, name: data.chain.species.name };
            }
          })
          .catch(error => console.log(error));
          
        promises.push(promise);
      });

      // Esperamos a que todas las promesas se resuelvan
      return Promise.all(promises)
        .then(results => {
          // Filtramos los pokemones sin evolución y los ordenamos alfabéticamente por nombre
          const noEvoPokemonList = results.filter(pokemon => pokemon != null);
          noEvoPokemonList.sort((a, b) => a.name.localeCompare(b.name));
          return noEvoPokemonList;
        })
        .catch(error => console.log(error));
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