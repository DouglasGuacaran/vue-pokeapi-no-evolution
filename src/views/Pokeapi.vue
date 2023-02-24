<template>
  <div>
    <div class="container-fluid lista-ordenada">
      <div class="container">
        <div class="row">
          <h2>Pokemons</h2>
          <ol>
            <li v-for="pokemon in pokemons" :key="pokemon.id">{{ pokemon.name }}</li>
          </ol>
          <p v-if="pokemons.length === 0">Cargando ...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:'viewEvolutions',
  computed: {
    ...mapState({
      pokemons: state => state.pokemons
  })
  },
  mounted() {
    this.$store.dispatch('fetchPokemons')
  }
}
</script>
<style>
.lista-ordenada {
  max-height: 820px; /* Establece la altura máxima para el contenedor de la lista */
  overflow-y: scroll; /* Hace que aparezca una barra de desplazamiento vertical */
}
</style>