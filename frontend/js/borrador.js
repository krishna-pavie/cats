//list.cat(modificar js y php)
const { createApp, ref, onMounted, nextTick } = Vue;

createApp({
  setup() {
    const cats = ref([]);
    const loading = ref(true);
    const error = ref(null);
    let dataTable = null;

    const initDataTable = () => {
      if ($.fn.DataTable.isDataTable("#tablaGatitos")) {
        dataTable.destroy();
      }
      dataTable = $("#tablaGatitos").DataTable({
        responsive: true,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
        },
        destroy: true, // Permite reinicialización
      });
    };

    const cargarGatitos = async () => {
      //esto hizo el vic
      Swal.fire({
        title: "Cargando",
        text: "Espere por favor",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const response = await axios.get("http://localhost:3407/api/v1/cats/public");
        if (!Array.isArray(response.data.data)) {
          throw new Error("Formato de datos inválido");
        }
        cats.value = response.data.data;
        nextTick(initDataTable);

        //esto hizo el vic
        Swal.fire({
          icon: "success",
          text: response.data.message,
        });
      } catch (err) {
        //esto hizo el vic
        Swal.fire({
          icon: "success",
          text: response.data.message,
        });
        error.value = `Error: ${err.message}`;
        console.error("Detalles:", err);
      } finally {
        loading.value = false;
      }
    };

    onMounted(cargarGatitos);
    if (!validateAccess(["admin"])) return;
  this.fetchData();

    return { cats, loading, error };
  },
}).mount("#app");
