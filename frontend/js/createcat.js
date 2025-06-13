const { createApp } = Vue;

createApp({
  data() {
    return {
      // Datos necesarios para el formulario
      newCat: {
        name: "",
        age: null,
        imgUrl: "",
        breed: ""
      },
      breeds: [], // Para almacenar las razas disponibles
      loading: false, // Para mostrar estado de carga
      
      // Sistema de alertas (NUEVO)
      alert: {
        show: false,
        type: 'success',
        message: ''
      }
    };
  },
  methods: {
    // Método para cargar las razas disponibles
    async fetchBreeds() {
      try {
        console.log("Cargando razas de gatos...");
        const response = await axios.get("http://localhost:3407/api/v1/breeds");
        this.breeds = response.data.data;
        console.log("Razas cargadas:", this.breeds);
      } catch (error) {
        console.error("Error al cargar las razas:", error);
        this.showAlert("No se pudieron cargar las razas disponibles", "danger"); // Modificado
      }
    },

    // Método para agregar un nuevo gato
    async addCat() {
      // Validación básica
      if (!this.newCat.name || !this.newCat.age || !this.newCat.imgUrl || !this.newCat.breed) {
        console.warn("Faltan campos por completar", this.newCat);
        this.showAlert("Por favor, completa todos los campos", "warning"); // Modificado
        return;
      }

      this.loading = true;
      Swal.fire({
        title: "Cargando",
        text: "Espere por favor",
        didOpen: () => {
          Swal.showLoading();
        },
      });

      console.log("Enviando datos del gato:", this.newCat);

      try {
        const response = await axios.post("http://localhost:3407/api/v1/cats", {
          name: this.newCat.name,
          age: this.newCat.age,
          imgUrl: this.newCat.imgUrl,
          breed: this.newCat.breed
        });

        Swal.fire({
          icon: "success",
          text: response.data.message,
        });

        console.log("Gato creado exitosamente:", response.data.data);
       
        
        this.newCat = {
          name: "",
          age: null,
          imgUrl: "",
          breed: ""
        };


      } catch (error) {

        Swal.fire({
          icon: "success",
          text: response.data.message,
        });
        console.error("Error al agregar el gato:", error.response || error);
        this.showAlert("Error al agregar el gatito. Por favor, intenta nuevamente.", "danger"); 
      } finally {
        this.loading = false;
      }
    },
    
  
  },
  mounted() {
    this.fetchBreeds();
    console.log("Formulario de creación de gatos listo");
  }
}).mount("#app");