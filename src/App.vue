<template>
  <div id="app">
    <v-toolbar :style="{ backgroundColor: '#1f2024' }">
      <v-img
      :src="require('@/assets/logo.png')"
      alt="Mi imagen"
      contain
      max-height="100%"
      max-width="170px"
      class="mr-2 home"
      @click="goToHome"
    ></v-img>
    </v-toolbar>
    <div id="master">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
        async goToHome() {
            this.$router.push({ name: 'Homepage' }); // Redirige al usuario a la ruta de la tabla de productos con los datos como parámetro
        }
    }
}
</script>

<style>
/* Resetear estilos */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Estilos de la aplicación */
#master {
  display: flex; /* Usa flexbox para alinear los elementos */
  flex-direction: column; /* Alinea los elementos en columna */
  align-items: center; /* Alinea los elementos a la izquierda */
  justify-content: flex-start; /* Centra verticalmente los elementos */
  height: 100vh; /* Hace que el contenedor ocupe toda la altura de la ventana */
  background-color: #1f2024; /* Fondo negro */
  color: #eae4d6; /* Texto blanco */
  padding-left: 20px; /* Añade un poco de espacio a la izquierda para la alineación */
  margin: 0% auto; /* Centra horizontalmente los elementos */
  margin-top: 0%;
  max-width: 70%; /* Limita el ancho máximo para evitar que los elementos se extiendan demasiado */
}

#app {
  background-color: #1f2024; /* Fondo negro */
}

.home {
  cursor: pointer;
}

/* Estilos para los elementos agregados */
</style>

