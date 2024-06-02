<template>
    <div>
        <v-btn variant="outlined" @click="goToAddProductss" id="generic-button">
            <div class="addGlasses">
                <v-icon color="auto" icon="mdi mdi-plus" size="large"></v-icon>
                <v-icon color="auto" icon="mdi mdi-glasses" size="large"></v-icon>
            </div>
            <div>
            Agregar productos
            </div>
        </v-btn>
    </div>
</template>

<script>
export default {
    methods: {
        async goToAddProductss() {
            this.$router.push({ name: 'AddProducts' }); // Redirige al usuario a la ruta de la tabla de productos con los datos como parámetro
        }
    }
};
</script>

<style>
.mdi-plus {
    margin-right: -20%; 
    margin-top:10%;
}

.mdi-glasses {
    margin-top:-20%;
}

.addGlasses {
    margin-left: -18%;
}

#generic-button {
  border-color: #ef5036;
  border-width: 3px;
}
</style>