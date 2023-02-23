<template>
  <div class="container-fluid lista-ordenada">
    <div class="container">
      <div class="row">
        <h1>Pokemons existentes sin evolución</h1>
        <div class="col-4">
            <ol>
              <li v-for="pokemon in orderedPokemons" :key="pokemon.name">
                {{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}
              </li>
            </ol>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name:'pokeApiView',
  data () {
    return {
    }
    
  },
  computed: {
    orderedPokemons() {
      return this.$store.getters.orderedPokemons;
    },
  },
  created() {
    this.$store.dispatch('fetchPokemons');
  },
  
}
</script>

<style>
.lista-ordenada {
  max-height: 820px; /* Establece la altura máxima para el contenedor de la lista */
  overflow-y: scroll; /* Hace que aparezca una barra de desplazamiento vertical */
}
</style>