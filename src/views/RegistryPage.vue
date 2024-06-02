<template>
  <div class="scrollable-container">
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        <v-icon icon="mdi mdi-store-search-outline"></v-icon> &nbsp;
        Registros

        <v-spacer></v-spacer>

        <v-text-field v-model="search" density="compact" label="Search" prepend-inner-icon="mdi-magnify"
          variant="solo-filled" flat hide-details single-line></v-text-field>

        <v-spacer></v-spacer>


      </v-card-title>

      <v-divider></v-divider>
      <v-data-table :search="search" :items="products" :headers="headers">

        <template v-slot:[`item.foto`]="{ item }">
          <v-card class="my-2" elevation="2" rounded>
            <v-img :src=item.foto height="64" cover></v-img>
          </v-card>
        </template>


        <template v-slot:top>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>

          // aca se maneja el aagregar clintes

          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5" style="align-self: center;">Ingresa los datos del cliente</v-card-title>
              <v-form v-model="form" @submit.prevent="onSubmit">
                <v-text-field v-model="name" :readonly="loading" :rules="[required]" class="mb-2" label="Nombre" clearable></v-text-field>
                <v-combobox v-model="identity" :readonly="loading" :rules="[required]" label="CI" clearable></v-combobox>
                <v-textarea label="Observacion" :readonly="loading" v-model="observations" variant="solo-filled" auto-grow clearable></v-textarea>

                <v-btn :disabled="!form" :loading="loading" color="success" size="large" type="submit"
                  variant="elevated" block>
                  Sign In
                </v-btn>
              </v-form>



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
          <v-btn color="primary" @click="resetTable"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <div>
    <GoHomePage/>
    <AddProductsRedirectionButton/>
    </div>
  </div>
</template>

<script>
import AddProductsRedirectionButton from '../components/AddProductsRedirectionButton.vue'
import GoHomePage from '../components/GoHomePage.vue'


export default {
  name: 'RegistryPage',
  components: {
    AddProductsRedirectionButton,
    GoHomePage
  },
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        { title: 'CI', value: 'ci', align: 'center', width: '10%' },
        { title: 'Nombre', value: 'client_name' },
        { title: 'Detalle', value: 'details', align: 'center' },
        { title: 'Producto', value: 'product' },
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
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
    async resetTable() {
      location.reload();
    },
    editItem(item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item) {
      this.editedIndex = this.products.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.products.splice(this.editedIndex, 1)
      this.closeDelete()
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.products[this.editedIndex], this.editedItem)
      } else {
        this.products.push(this.editedItem)
      }
      this.close()
    },
  }

};
</script>

<style scoped>
.scrollable-container {
  max-height: 800px;
  /* Set the maximum height for the scrollable container */
  overflow-y: auto;
  /* Enable vertical scrolling */
  width: 80%;
}

#item {
  background-color: #000000;
  color: white;
  margin-bottom: 5%;
  flex-direction: column;
  /* Alinea los elementos en columna */
}

.homeButton {
  align-self: end;
  margin-top: 1%;
  margin-bottom: 1%;
  margin-right: 10%;
}
</style>