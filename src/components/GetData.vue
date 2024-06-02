<template>
  <div class="buttons">
    <div class="enviar-btn">
      <v-btn variant="outlined" @click="goToProductTable" id="generic-button">
        <v-icon color="auto" icon="mdi mdi-store-search" size="large"></v-icon>
        Buscar productos
      </v-btn>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      datita: ''
    };
  },
  methods: {
    async goToProductTable() {
      this.$router.push({ name: 'ProductPage'}); // Redirige al usuario a la ruta de la tabla de productos con los datos como parámetro
    }
  }
};
</script>

<style>
.enviar-btn {
  margin-top: 5%;
}

.mdi-store-search{
  padding-right: 5%;
}
</style>