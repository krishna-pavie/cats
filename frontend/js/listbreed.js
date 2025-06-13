const { createApp, ref, onMounted, nextTick } = Vue;

createApp({
    setup() {
        const breeds = ref([]);
        const loading = ref(true);
        const error = ref(null);
        let dataTable = null;

        const cargarRazas = async () => {
            //ventana razas
            Swal.fire({
                title: "Cargando",
                text: "Espere por favor",
                didOpen: () => {
                  Swal.showLoading();
                },
              });

            try {
                loading.value = true;
                error.value = null;
                
                const response = await axios.get('http://localhost:3407/api/v1/breeds');
                breeds.value = response.data.data;
                //para la ventana
                Swal.fire({
                    icon: "success",
                    text: response.data.message,
                  });
            } catch (err) {
//va aquí
                Swal.fire({
                    icon: "success",
                    text: response.data.message,
                  });
                console.error('Error al cargar razas:', err);
                error.value = 'No se pudo cargar la lista de razas 😿';
                if (err.response) {
                    error.value += ` (Error ${err.response.status}: ${err.response.data.data?.message || 'Sin detalles'})`;
                }
            } finally {
                loading.value = false;
            }
        };

        const editarRaza = (id) => {
            // Implementar lógica de edición
            console.log('Editar raza con ID:', id);
            alert(`Funcionalidad de edición para raza ID: ${id}`);
        };

        const eliminarRaza = async (id) => {
            if (!confirm(`¿Estás seguro de que deseas eliminar esta raza?`)) {
                return;
            }
            
            try {
                await axios.delete(`http://localhost:3407/api/v1/breeds/${id}`);
                alert('Raza eliminada correctamente');
                cargarRazas(); // Recargar la lista
            } catch (err) {
                console.error('Error al eliminar raza:', err);
                alert('Error al eliminar la raza');
            }
        };

        onMounted(() => {
            cargarRazas();
        });

        return {
            breeds,
            loading,
            error,
            editarRaza,
            eliminarRaza
        };
    }
}).mount('#app');