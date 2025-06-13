console.log("🚀 listcat.js cargado correctamente");
const {createApp} = Vue;

createApp({
  data(){
    return{
          cat: [],
          loading: true
    };
  },
  methods: {
    async fetchData() {
       try {
      const response = await axios.get("http://localhost:3407/api/v1/cats")
       console.log("Respuesta de la API:", response.data);
      this.cats = response.data;
    }catch(error) {
      console.error("Error", error);
      alert("Error al cargar los gatitos");
    } finally {
      this.loading = false;
    }
  },  
},
 mounted() {
  console.log("Componente montado");
  this.fetchData();
  }
}).mount("#app");