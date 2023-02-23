<template>
  <div class="container-fluid">
    <div class="container">
      <div>
        <h1>Pokemons existentes sin evolución</h1>
          <ol>
            <li v-for="pokemon in orderedPokemons" :key="pokemon.name">
              {{ pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) }}
            </li>
          </ol>
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
