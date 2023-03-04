<template>
  <div class="container-fluid lista-ordenada">
    <div class="container">
      <div class="row">
        <h1>Pokemones sin evolución</h1>
        <ol>
          <li v-for="pokemon in noEvoPokemonList" :key="pokemon.id">
            {{ pokemon.name.charAt(0).toUpperCase()+ pokemon.name.slice(1) }}
          </li>
          <p v-if="noEvoPokemonList.length === 0">Cargando ...</p>
        </ol>
        </div>
      </div>
    </div>
</template>


<script>
import { mapState,mapActions } from 'vuex';
export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState(["noEvoPokemonList"]),
  },
  methods: {
    ...mapActions(['getNoEvolutionPokemon']),

  },
  mounted() {
    this.getNoEvolutionPokemon()
  }
}
</script>

<style>
  .lista-ordenada {
    max-height: 820px; /* Establece la altura máxima para el contenedor de la lista */
    overflow-y: scroll; /* Hace que aparezca una barra de desplazamiento vertical */
  }
</style>
