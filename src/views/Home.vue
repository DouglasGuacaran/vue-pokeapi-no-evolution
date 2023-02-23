<template>
  <div class="container-fluid">
    <div class="container">
      <h1>Home</h1>
      <p>
        Utilizando las herramientas, lenguajes y/o librerías que consideres
        prudente, construye una función que, utilizando la API
        <a href="https://pokeapi.co/docs/v2">pokeapi.co</a> (v2):
      </p>
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
      <p>Forma de entrega:</p>
      <ul>
        <li>
          Compartir un repositorio github con la respuesta al email andy@uc.cl
          (github user: andycsoto)
        </li>
        <li>Despliega la solución en internet de la forma que prefieras</li>
        <li>
          Recuerda documentar todo lo necesario para ejecutar tu código en un
          ambiente local
        </li>
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
