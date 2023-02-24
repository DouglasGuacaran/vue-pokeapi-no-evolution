<template>
  <div class="container-fluid">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Pokemon con el menor peso</h1>
          <p class="fs-4" v-if="pokemonName">
            El nombre del Pokemon es:
            {{ pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1) }}
          </p>
          <p class="fs-4" v-else>Cargando...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState, mapActions } from "vuex";
export default {
  name: "contactoView",
  computed: {
    ...mapState(["pokemonName"]),
  },
  methods: {
    ...mapActions(["getPokemon"]),
  },
  created() {
    this.$store.dispatch("getPokemon");
  }
};
</script>
<style></style>
