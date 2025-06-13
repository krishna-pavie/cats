const { createApp } = Vue;

createApp({
    data() {
        return {
            regions: [],
            users: [],
            loading: false,
            loadingRegion: false,
            alert: {
                show: false,
                type: 'success',
                message: ''
            },
            newUser: {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                address: "",
                role: "user",
                region: "",
            },
            tablaRegion: null,
            tablaUsers: null
        };
    },

    methods: {
        showAlert(message, type = 'success') {
            this.alert.show = true;
            this.alert.message = message;
            this.alert.type = type;
            setTimeout(() => {
                this.alert.show = false;
                this.alert.message = '';
            }, 3000);
        },

        async fetchData() {
            try {
                const [regionResponse, usersResponse] = await Promise.all([
                    axios.get("http://localhost:3407/api/v1/region"),
                    axios.get("http://localhost:3407/api/v1/users"),
                ]);

                this.regions = regionResponse.data.data;
                this.users = usersResponse.data.data;

                this.$nextTick(() => {
                    if (!this.tablaRegion && this.regions.length) {
                        this.tablaRegion = $("#tablaRegion").DataTable({
                            responsive: true,
                            language: {
                                url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
                            },
                        });
                    }

                    if (!this.tablaUsers && this.users.length) {
                        this.tablaUsers = $("#tablaUsers").DataTable({
                            responsive: true,
                            language: {
                                url: "//cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
                            },
                        });
                    }
                });
            } catch (error) {
                this.showAlert("Error al cargar los datos", "danger");
            }
        },

        validateForm() {
            if (this.newUser.password !== this.newUser.confirmPassword) {
                this.showAlert("Las contraseñas no coinciden", "danger");
                return false;
            }

            if (this.newUser.password.length < 6) {
                this.showAlert("La contraseña debe tener al menos 6 caracteres", "danger");
                return false;
            }

            return true;
        },

        async addUser() {
            if (!this.validateForm()) return;

            const requiredFields = ['name', 'email', 'password', 'address', 'role', 'region'];
            const missingFields = requiredFields.filter(field => !this.newUser[field]);

            if (missingFields.length) {
                this.showAlert("Por favor, completa todos los campos", "warning");
                return;
            }

            this.loading = true;
            try {
                const response = await axios.post("http://localhost:3407/api/v1/users", {
                    name: this.newUser.name,
                    email: this.newUser.email,
                    password: this.newUser.password,
                    address: this.newUser.address,
                    role: this.newUser.role,
                    regionId: this.newUser.region
                });

                this.users.push(response.data.data);
                this.resetForm();
                this.showAlert("Usuario registrado exitosamente", "success");
                this.refreshTables();
                await this.handleAutoLogin();

            } catch (error) {
                const errorMsg = error.response?.data?.message || "Error al registrar el usuario";
                this.showAlert(errorMsg, "danger");
            } finally {
                this.loading = false;
            }
        },

        async handleAutoLogin() {
            try {
                const loginResponse = await axios.post("http://localhost:3407/api/v1/auth/login", {
                    email: this.newUser.email,
                    password: this.newUser.password
                });

                localStorage.setItem('authToken', loginResponse.data.token);
                localStorage.setItem('userRole', this.newUser.role);

                const redirectPath = this.newUser.role === 'admin' ? '/admin' : '/dashboard';
                window.location.href = redirectPath;

            } catch (loginError) {
                console.error("Auto-login falló:", loginError);
            }
        },

        resetForm() {
            this.newUser = {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                address: "",
                role: "user",
                region: "",
            };
        },

        refreshTables() {
            if (this.tablaUsers) {
                this.tablaUsers.clear();
                this.tablaUsers.rows.add(this.users);
                this.tablaUsers.draw();
            }
        }
    },

    mounted() {
        this.fetchData();
    }
}).mount('#app');
