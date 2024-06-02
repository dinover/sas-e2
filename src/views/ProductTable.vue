<template>
  <div class="scrollable-container">
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2" id="table-title">
        <v-icon icon="mdi mdi-store-search-outline" color="auto"></v-icon> &nbsp;
        Aqui esta el stock!

        <v-spacer></v-spacer>

        <v-text-field v-model="search" density="compact" label="Buscar" prepend-inner-icon="mdi-magnify"
          variant="solo-filled" flat hide-details single-line></v-text-field>

      </v-card-title>

      <v-divider></v-divider>
      <v-data-table :search="search" :items="products" :headers="headers">

        <template v-slot:[`item.foto`]="{ item }">
          <v-card class="my-2" elevation="2" rounded>
            <v-img :src=item.foto height="64" cover></v-img>
          </v-card>
        </template>


        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="50%">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-text-field clearable label="Descripcion" v-model="editedItem.descripcion"
                      variant="solo-filled"></v-text-field>
                    <v-file-input clearable label="Subir foto" v-model="editedItem.foto" class="picture-upload"
                      @change="cargarFoto" variant="solo-filled"></v-file-input>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancelar
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="editItemConfirm">
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5" style="align-self: center;">Estas a punto de borrar este producto</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancelar</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">Borrar</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>


        <template v-slot:[`item.actions`]="{ item }">
          <v-icon class="me-2" size="small" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="resetTable"> Recargar </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
  <div id="homeButton">
    <AddProductsRedirectionButton icon="mdi mdi-glasses" />
    <GoHomePage />
  </div>
</template>

<script>
import AddProductsRedirectionButton from '../components/AddProductsRedirectionButton.vue'
import GoHomePage from '../components/GoHomePage.vue'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: 'ProductPage',
  components: {
    AddProductsRedirectionButton,
    GoHomePage
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        { title: 'ID', value: 'id', align: 'center', width: '10%', filterable: false },
        { title: 'Descripcion', value: 'descripcion' },
        { title: 'Foto', value: 'foto', align: 'center', filterable: false },
        { title: 'Opciones', key: 'actions', sortable: false, align: 'center', width: '10%', filterable: false },
      ],
      search: '',
      products: [],
      editedIndex: -1,
      editedItem: {
        descripcion: '',
        foto: null,
      },
      defaultItem: {
        descripcion: '',
        foto: null,
      },
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Editar Producto'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  async created() {
    try {
      const response = await fetch('http://localhost:8081/api/v1/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      this.products = responseData.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },

  methods: {
    cargarFoto(event) {
      this.foto = event.target.files[0]; // Almacena la foto seleccionada por el usuario
      console.log(this.foto)
    },
    async resetTable() {
      location.reload();
    },
    editItem(item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    async editItemConfirm() {
      try {
        const formData = new FormData();
        formData.append('descripcion', this.editedItem.descripcion);
        formData.append('foto', this.editedItem.foto);
        console.log(formData)
        const response = await fetch(`http://localhost:8081/api/v1/productos/update/${this.editedItem.id}`, {
          method: 'PUT',
          body: formData,
        });
        if (!response.ok) {
          throw new Error('Failed to update item');
        }
        const updatedProduct = await response.json();
        if (this.editedIndex > -1) {
          Object.assign(this.products[this.editedIndex], updatedProduct);
        }
        this.close();
        this.resetTable();

      } catch (error) {
        console.error('Error updating item:', error);
        // Maneja el error del update aquí
      }
    },

    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      try {
        const response = await fetch(`http://localhost:8081/api/v1/productos/${this.editedItem.id}`, {
          method: 'PUT',
        });
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
        toast("Ya quitamos tu producto de la lista!", {
          "theme": "dark",
          "type": "success",
          "transition": "flip",
          "dangerouslyHTMLString": true
        })
        // Elimina el elemento de la lista de productos en el front-end
        this.products.splice(this.editedIndex, 1);
        this.closeDelete();
      } catch (error) {
        console.error('Error deleting item:', error);
        // Maneja el error de eliminación aquí
      }
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  }

};
</script>

<style scoped>
.scrollable-container {
  max-height: 70%;
  /* Set the maximum height for the scrollable container */
  overflow-y: auto;
  /* Enable vertical scrolling */
  width: 80%;
  transform: translateY(0%);
  animation: expandFromCenter 3s forwards;
}

@keyframes expandFromCenter {
  0% {
    height: 0;
  }

  100% {
    height: 100%;
  }
}

#item {
  margin-bottom: 5%;
  flex-direction: column;
  /* Alinea los elementos en columna */
}

#homeButton {
  display: flex;
  justify-content: space-between;
  justify-items: end;
  align-items: flex-end;
  width: 80%;
}

#table-title {
  background-color: #1f2024;
  color: #eae4d6;
}
</style>