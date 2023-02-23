<template>
    <div class="container-fluid">
      <div class="container">

        <h1>Pokemon con el menor peso</h1>
          <button @click="getPokemon">Buscar nombre</button>
          <p v-if="pokemonName">el nombre del pokemon es: {{ pokemonName }}</p>
          <p v-else>Cargando...</p>
            </div>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import { mapState, mapActions } from 'vuex';
  export default {
    name: 'contactoView',
    computed: {
    ...mapState(['pokemonName'])
  },
  methods: {
    ...mapActions(['getPokemon'])
  }
  }
  </script>