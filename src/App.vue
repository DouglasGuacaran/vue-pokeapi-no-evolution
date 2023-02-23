<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue"
export default {
  components:{
    Navbar
  }
}
</script>

<style>
#app{
  height: 100vh;
  background-image: url('./assets/img/FondoPokedex.jpg');
  background-size: cover; /* Para cubrir todo el contenedor */
  background-position: center; /* Para centrar la imagen */
  background-repeat: no-repeat; /* Para que no se repita la imagen */
  }
</style>
