<template>
  <div>
    <div class="container-fluid lista-ordenada">
      <div class="container">
        <div class="row">
          <h2>Pokemons</h2>
          <ol>
            <li v-for="pokemon in listPokemons" :key="pokemon.name">{{ pokemon.name }}</li>
          </ol>
          <p v-if="listPokemons.length === 0">Cargando ...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
export default {
  name:'viewEvolutions',
  computed: {
    ...mapState(["listPokemons"])
  },
  methods: {
    ...mapActions(["fetchPokemons"]),
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