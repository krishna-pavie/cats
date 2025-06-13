const { createApp } = Vue;

createApp({
    data() {
        return {
            user: {
                name: '',
                email: '',
                address: '',
                region: ''
            },
            cats: []
        };
    },
    mounted() {
        this.getUserData();
    },
    methods: {
        getUserData() {
            const token = localStorage.getItem('authToken');
            if (!token) {
                window.location.href = 'login.php';
                return;
            }

            console.log('Token enviado', token)

            axios.get('http://localhost:3407/api/v1/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                console.log('Datos recibidos:', res.data);
                this.user = res.data.user;
                this.cats = res.data.cats || [];
            })
            .catch(err => {
                console.error('Error al cargar los datos:', err);
                // Si es un 401 o problema de autenticación, redirigir
                if (err.response && err.response.status === 401) {
                    alert('Sesión expirada. Inicia sesión nuevamente.');
                    localStorage.removeItem('authToken');
                    window.location.href = 'login.php';
                } else {
                    alert('Ocurrió un error al cargar los datos.');
                }
            });
        }
    }
}).mount('#app');
