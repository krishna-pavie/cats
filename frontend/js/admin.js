const { createApp } = Vue;

createApp({
  data() {
    return {
      cats: [],
      breeds: [],
      showModal: false,
      itemToDelete: null,
      deleteType: "",
      loading: false,
      loadingBreed: false,
      deleting: false,
      formEditCat: {
        name: "",
        age: null,
        imgUrl: "",
        breed: "",
      },
      newCat: {
        name: "",
        age: null,
        imgUrl: "",
        breed: "",
      },
      newBreed: {
        name: "",
      },
      formEditBreed: {
        name: "",
      },
      
      // DataTables instances
      // tablaGatitos: null,
      // tablaRazas: null,
    };
  },
  methods: {
    ///modal

    async fetchData() {
      try {
        const [catsResponse, breedsResponse] = await Promise.all([
          axios.get("http://localhost:3407/api/v1/cats"),
          axios.get("http://localhost:3407/api/v1/breeds"),
        ]);

        this.cats = catsResponse.data;
        this.breeds = breedsResponse.data.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error al cargar los datos");
      }
    },

    async addCat() {
      if (
        !this.newCat.name ||
        !this.newCat.age ||
        !this.newCat.imgUrl ||
        !this.newCat.breed
      ) {
        alert("Por favor, completa todos los campos");
        return;
      }

      this.loading = true;
      try {
        const response = await axios.post("http://localhost:3407/api/v1/cats", {
          name: this.newCat.name,
          age: this.newCat.age,
          imgUrl: this.newCat.imgUrl,
          breed: this.newCat.breed,
        });

        this.cats.push(response.data.data);
        this.newCat = { name: "", age: null, imgUrl: "", breed: "" };
        alert("Gatito agregado!");

        // Refresh DataTables
        if (this.tablaGatitos) {
          this.tablaGatitos.destroy();
          this.tablaGatitos = null;
        }
        this.fetchData();
      } catch (error) {
        console.error("Error adding cat:", error);
        alert("Error al agregar gatito");
      } finally {
        this.loading = false;
      }
    },

    async addBreed() {
      if (!this.newBreed.name) {
        alert("Por favor, ingresa un nombre para la raza");
        return;
      }

      this.loadingBreed = true;
      try {
        const response = await axios.post(
          "http://localhost:3407/api/v1/breeds",
          {
            name: this.newBreed.name,
          }
        );

        this.breeds.push(response.data.data);
        this.newBreed = { name: "" };
        alert("Raza agregada!");

        // Refresh DataTables
        if (this.tablaRazas) {
          this.tablaRazas.destroy();
          this.tablaRazas = null;
        }
        this.fetchData();
      } catch (error) {
        console.error("Error adding breed:", error);
        alert("Error al agregar raza");
      } finally {
        this.loadingBreed = false;
      }
    },

    //razas
    showDeleteModal(type, id) {
      this.deleteType = type;
      this.itemToDelete = id;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    async confirmDelete() {
      this.deleting = true;
      try {
        if (this.deleteType === "gato") {
          await axios.delete(
            `http://localhost:3407/api/v1/cats/${this.itemToDelete}`
          );
          this.cats = this.cats.filter((cat) => cat.id !== this.itemToDelete);

          if (this.tablaGatitos) {
            this.tablaGatitos.destroy();
            this.tablaGatitos = null;
          }
        } else {
          await axios.delete(
            `http://localhost:3407/api/v1/breeds/${this.itemToDelete}`
          );
          this.breeds = this.breeds.filter(
            (breed) => breed.id !== this.itemToDelete
          );

          if (this.tablaRazas) {
            this.tablaRazas.destroy();
            this.tablaRazas = null;
          }
        }

        alert(`${this.deleteType === "gato" ? "Gatito" : "Raza"} eliminado!`);
        this.showModal = false;

        // Refresh DataTables
        this.fetchData();
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Error al eliminar");
      } finally {
        this.deleting = false;
      }
    },

    editCat(cat) {
      console.log("gato seleccionado ", cat);
      this.formEditCat = cat
      console.log(this.formEditCat);
    },
    
    clearEditCatForm(){
      this.formEditCat = {
        name: "",
        age: null,
        imgUrl: "",
        breed: "",
      },
      console.log("se vacio el formulario ", this.formEditCat);
    },


    editBreed(breed) {
      console.log("raza seleccionada", breed);
      this.formEditBreed = breed
      console.log(this.formEditBreed);
    },

    clearformEditBreed(){
      this.formEditBreed = {
        name: "",
      },
      console.log("se vació el formulario", this.formEditBreed);
    },
    
    async updateBreeds(){
      console.log(this.formEditBreed);
      try {
        const res = await axios.patch(`http://localhost:3407/api/v1/breeds/${this.formEditBreed.id}`,
          {
            name: this.formEditBreed.name,
          }
        );
        alert('actualizado');
        console.log("respuesta ", res);
      } catch (error) {
        console.error("error ", error);
      }
    },

    async updateCats() {
      console.log(this.formEditCat);
      try {
        const res = await axios.patch(`http://localhost:3407/api/v1/cats/${this.formEditCat.id}`,
          {
              name: this.formEditCat.name,
              age: this.formEditCat.age,
              imgUrl: this.formEditCat.imgUrl,
              breed: this.formEditCat.breed,
          }
        );
        alert('actualizado');
        console.log("respuesta", res);
      } catch (error) {
        console.error("error", error);
      }
    },

    logout() {
      // Implementar lógica de logout
      window.location.href = "login.php";
    },

  },
  mounted() {
     if (!validateAccess(["admin"])) return;
  this.fetchData();
  },
  beforeUnmount() {
    // Clean up DataTables instances
    if (this.tablaGatitos) {
      this.tablaGatitos.destroy();
    }
    if (this.tablaRazas) {
      this.tablaRazas.destroy();
    }
  },
}).mount("#app");
