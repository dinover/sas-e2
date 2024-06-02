<template>
    <div id="item">
        <div class="addTitle animated-buttonAdd">Que nuevo producto ingresaremos?</div>
        <div class="input-container">
            <v-text-field class="animated-buttonAdd" clearable label="Descripcion" v-model="descripcion" variant="solo-filled"></v-text-field>

            <v-file-input clearable label="Subir foto" v-model="foto" class="picture-upload animated-buttonAdd" @change="cargarFoto"
                variant="solo-filled"></v-file-input>
        </div>
        <div class="agregar-btn animated-buttonAdd">
            <v-btn variant="outlined" @click="enviarDatos" id="agregar-btn">
                <v-icon color="white" icon="mdi mdi-plus-thick" size="large"></v-icon>
                Agregar</v-btn>
        </div>
        <div class="homeButton animated-buttonAdd">
            <GetData />
            <GoHomePage />
        </div>
    </div>
</template>

<script>
import GetData from '@/components/GetData.vue';
import GoHomePage from '@/components/GoHomePage.vue';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
    data() {
        return {
            descripcion: '',
            foto: null  // Agrega una propiedad para almacenar la foto
        };
    },
    name: 'AddProducts',
    components: {
        GetData,
        GoHomePage
    },
    methods: {
        cargarFoto(event) {
            this.foto = event.target.files[0]; // Almacena la foto seleccionada por el usuario
            console.log(this.foto)
        },

        enviarDatos() {
            // Aquí haces la solicitud HTTP POST con los datos recibidos
            const url = 'http://localhost:8081/api/v1/';
            const data = new FormData();
            data.append('descripcion', this.descripcion)
            data.append('foto', this.foto)
            console.log(data)
            fetch(url, {
                method: 'POST',
                body: data,
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Respuesta del servidor:', data);
                    this.clearFields();
                    toast("Perfecto, tu nuevo producto fue agregado", {
                        "theme": "dark",
                        "type": "success",
                        "transition": "flip",
                        "dangerouslyHTMLString": true
                    })
                })
                .catch(error => {
                    console.error('Hubo un problema con la solicitud HTTP:', error.message);
                })
        },
        clearFields() {
            this.descripcion = '';
            this.foto = null
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

/* Estilos para los elementos agregados */

#item {
    flex-direction: column;
    /* Alinea los elementos en columna */
    width: 80%;
    margin-top: 10%;
}

.animated-buttonAdd {
  opacity: 0;
  transform: translateX(-100%);
  animation: appearFromLeft 1.5s forwards;
}

@keyframes appearFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-18%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.animated-buttonAdd:nth-child(1) {
  animation-delay: 0s;
}
.animated-buttonAdd:nth-child(2) {
  animation-delay: 0.5s;
}
.animated-buttonAdd:nth-child(3) {
  animation-delay: 1s;
}
.animated-buttonAdd:nth-child(4) {
  animation-delay: 1.5s;
}
.animated-buttonAdd:nth-child(5) {
  animation-delay: 2s;
}

.input-container {
    margin-bottom: -20px;
    /* Espacio entre cada campo */
    display: flex;
    /* Utiliza flexbox */
    flex-direction: column;
    /* Alinea los elementos en columna */
}

.picture-upload>.v-input__prepend {
    display: none;
}

.mdi-plus-thick {
    padding-right: 5%;
}

.homeButton {
    display: flex;
    justify-content: space-between;
    justify-items: end;
    align-items: flex-end;
}

.agregar-btn {
    display: grid;
    margin-top: 5%;
}

#agregar-btn {
    border-color: #1abc9c;
    background-color: #1abc9c;
}

.addTitle {
    margin-bottom: 20px;
    font-family: sans-serif;
    font-size: 30px;
    letter-spacing: 4px;
}
</style>