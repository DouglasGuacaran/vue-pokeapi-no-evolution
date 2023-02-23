<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <router-link class="navbar-brand" aria-current="page" to="/">Home</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <router-link class="nav-link"  to="/lista_pokemones">Lista de Pokemones</router-link>
                    </li>
                    <li class="nav-item">
                    <router-link class="nav-link" to="/pokemon_menor">Pokemon Menor Peso</router-link>
                    </li>
                </ul>
                <span class="navbar-text">
                    Una pagina de Douglas Guacarán
                </span>
                </div>
            </div>
            </nav>
    </div>
</template>

<script>
export default {
    name: 'navbarView',
    data () {
        return {

        }
    }
}

</script>

<style></style>