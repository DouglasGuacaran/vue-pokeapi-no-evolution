<template>
  <div class="container-fluid">
    <div class="container">
      <h1>Descripción de las Tareas a Visualizar</h1>
      <p>
        Utilizando las herramientas, lenguajes y/o librerías que consideres
        prudente, construye una función que, utilizando la API
        <a href="https://pokeapi.co/docs/v2">pokeapi.co</a> (v2):
      </p>
      <h2>Tarea 1</h2>
      <p>(Ver pestaña Lista de Pokemones sin Evolucionar)</p>
      <ul>
        <li>
          Obtenga el nombre (<code>name</code>) de todos los Pokemon existentes
          que no tengan evolución
        </li>
        <ul>
          <li>
            Considera la siguiente documentación:
            <ul>
              <li>
                <a href="https://pokeapi.co/docs/v2#evolution-chains"
                  >https://pokeapi.co/docs/v2#evolution-chains</a
                >
              </li>
            </ul>
          </li>
          <li>
            Ejemplos:
            <ul>
              <li>#3 Venusaur</li>
              <li>#799 Guzzlord</li>
            </ul>
          </li>
        </ul>
        <h2>Tarea 2</h2>
        <p>(Ver pestaña Pokemon Menor Peso)</p>
        <li>
          Obtenga el nombre del Pokemon sin evolución con el menor peso (weight)
        </li>
        <ul>
          <li>
            Considera la siguiente documentación:
            <ul>
              <li>
                <a href="https://pokeapi.co/docs/v2#pokemon"
                  >https://pokeapi.co/docs/v2#pokemon</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
};
</script>
