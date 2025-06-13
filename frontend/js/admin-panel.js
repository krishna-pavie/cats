const { createApp } = Vue;
        
createApp({
    data() {
        return {
            // Puedes agregar datos reactivos aquí si los necesitas
        }
    },
    methods: {
        redirectToDataTable() {
            // Redirige a la vista de tabla de datos
            window.location.href = 'data_table.php';
        },
        redirectToCatsManagement() {
            // Redirige a la vista de gestión de gatos
            window.location.href = 'cats_management.php';
        },
        logout() {
            // Lógica para cerrar sesión usando Axios
            axios.post('logout.php')
                .then(response => {
                    window.location.href = 'index.php';
                })
                .catch(error => {
                    console.error('Error al cerrar sesión:', error);
                });
        }
    },
    mounted() {
        // Puedes agregar lógica de inicialización aquí
        // Por ejemplo, verificar permisos de administrador
    }
}).mount('#app');