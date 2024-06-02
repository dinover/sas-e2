<template>
    <div class="enviar-btn">
        <v-btn variant="outlined" @click="goToHome" id="generic-button">
            <div>
                <v-icon color="auto" icon="mdi mdi-home-account" size="large"></v-icon>
            </div>
            <div class="crearNuevo">
            Inicio
            </div>
        </v-btn>
    </div>
</template>

<script>
export default {
    methods: {
        async goToHome() {
            this.$router.push({ name: 'Homepage' }); // Redirige al usuario a la ruta de la tabla de productos con los datos como parámetro
        }
    }
};
</script>

<style>
.enviar-btn {
  margin-top: 2%;
}
.mdi-home-account{
  padding-right: 45%;
}
</style>