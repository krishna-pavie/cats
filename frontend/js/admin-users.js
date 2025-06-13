const { createApp } = Vue;

createApp({
  data() {
    return {
      users: [],
      regions: [],
      showModal: false,
      itemToDelete: null,
      deleteType: "",
      loading: false,
      loadingRegion: false,
      deleting: false,
      
      formEditUser: {
        name: "",
        email: "",
        role: "",
        address: "",
        region: ""
      },
      newUser: {
        name: "",
        email: "",
        role: "",
        address: "",
        region: ""
      },
      newRegion: {
        name: "",
      },
      formEditRegion: {
        name: "",
      },
      // tablaUsuarios: null,
      // tablaRegiones: null,
    };
  },
  methods: {

    async fetchData(){
      try {
        [userResponse, regionResponse] = await Promise.all([
        axios.get("http://localhost:3407/api/v1/users"),
        axios.get("http://localhost:3407/api/v1/region"),
      ]);
      
      this.users = userResponse.data;
      this.regions = regionResponse.data.data;
      console.log("Usuarios recibidos:", userResponse.data);
      console.log("Regiones recibidas:", regionResponse.data);
      

      // this.$nextTick(() => {
      //   if (!this.tablaUsuarios) {
      //     this.tablaUsuarios = $("#tablaUsuarios").DataTable ({
      //       responsive : true, 
      //       language: {
      //         url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
      //       },
      //   });
      //   }
        
      //   if(!this.tablaRegiones) {
      //     this.tablaRegiones = $("#tablaRegiones").DataTable({
      //       responsive: true,
      //       language: {
      //         url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
      //       },
      //     });
      //   }
      // });
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error al cargar los datos");
    }
    },

    async addUser() {
      if (
        !this.newUser.name ||
        !this.newUser.email ||
        !this.newUser.role ||
        !this.newUser.address ||
        !this.newUser.region 
      ) {
        alert("Por favor, completa todos los campos con tu información");
        return; 
      }

      this.loading = true;
      try {
        const response = await axios.post("http://localhost:3407/api/v1/users", {
          name: this.newUser.name,
          email: this.newUser.email,
          role: this.newUser.role,
          address: this.newUser.address,
          region: this.newUser.region,
        });

        this.users.push(response.data.data);
        this.newUser = {
          name: "",
          email: "",
          role: "",
          address: "",
          region: "",
        };
        alert ("Usuario agregado");

        if(this.tablaUsuarios) {
          this.tablaUsuarios.destroy();
        this.tablaUsuarios = null;
        } this.fetchData();
      } catch(error) {
        console.error("Error adding user", error);
        alert("Error al agregar un usuario");
      } finally { 
        this.loading = false;
      }
    },

    async addRegion(){
      if(!this.newRegion.name){
        alert("Por favor, ingresa el nombre de una región");
        return;
      }

      this.loadingRegion = true;
      try {
        const response = await axios.post("http://localhost:3407/api/v1/region", 
          { name: this.newRegion.name 

          }
        );

        this.region.push(response.data.data);
        this.newRegion = {name: ""};
        alert("Región agregada con éxito.")

        if(this.tablaRegiones) {
          this.tablaRegiones.destroy();
          this.tablaRegiones = null;
        }
        this.fetchData();
      } catch (error) {
        console.error("Error adding region", error);
        alert("Error al agregar una región nueva");
      } finally {
        this.loadingRegion = false;
      }
    },

    showDeleteModal(type, id) {
      this.deleteType = type;
      this.itemToDelete = id;
      this.showModal = true;
    },

    closeModal(){
      this.showModal = false;
    },

    async confirmDelete(){
      this.deleting = true;
      try {
        if(this.deleteType === "usuario") {
          await axios.delete(`http://localhost:3407/api/v1/users/${this.itemToDelete}`);
          this.users = this.users.filter((user) => user.id !== this.itemToDelete)

          if(this.tablaUsuarios) {
            this.tablaUsuarios.destroy();
            this.tablaUsuarios = null;
          }
        } else {
          await axios.delete(`http://localhost:3407/api/v1/region/${this.itemToDelete}`);
          this.region = this.region.filter((region) => region.id !== this.itemToDelete);

          if(this.tablaRegiones) {
            this.tablaRegiones.destroy();
            this.tablaRegiones = null;
          }
        }

        alert(`${this.deleteType == "usuario" ? "user" : "region"} eliminado`);
        this.showModal = false;

        this.fetchData();
      } catch(error) {
        console.error("Error deleting", error);
        alert("Ha ocurrido un error al tratar de eliminar");
      } finally {
        this.deleting = false;
      }
    },

    editUser(user) {
      console.log("Usuario seleccionado", user);
      this.formEditUser = user;
      console.log(this.formEditUser);
    },

    clearEditUserForm() {
      this.formEditUser = {
         name: "",
        email: "",
        role: "",
        address: "",
        region: ""
      };
      console.log("Se vació el formulario", this.formEditUser)
    },

    editRegion(region) {
      console.log("Región seleccionada", region);
      this.formEditRegion = region
      console.log(this.formEditRegion);
    },

    clearFormEditRegion() {
      this.formEditRegion = {
        name: ""
      },
      console.log("Se vació el formulario", this.formEditRegion);
    },

    async updateRegions() {
      console.log(this.formEditRegion);
      try {
        const res = await axios.patch(`http://localhost:3407/api/v1/region/${this.formEditRegion.id}`, 
          { name: this.formEditRegion.name}
        );
        alert('Región actualizada correctamente');
        console.log("respuesta", res);
      } catch (error) {
        console.error("Error al actualizar la Región", error);
      }
    },

    logout() {
      window.location.href = "login.php";
    },

  },
mounted() {
  if (!validateAccess(["admin"])) return;
  this.fetchData();
},
beforeUnmount() {
  if(this.tablaUsuarios) {
    this.tablaUsuarios.destroy();
  }
  if(this.tablaRegiones) {
    this.tablaRegiones.destroy();
  }
},
}).mount("#app");