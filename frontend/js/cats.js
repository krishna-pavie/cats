const { createApp } = Vue;

createApp({
    data() {
        return {
            breeds: []
        };
    },
    methods: {
        async getBreeds() {
            Swal.fire({
                title: "Cargando...",
                text: "Por favor espera mientras procesamos tu solicitud.",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
            try {
                const res = await axios.get("http://localhost:3407/api/v1/breeds");
                this.breeds = res.data.data;
                console.log(this.breeds);
                Swal.close();
            } catch (error) {
                Swal.close();
                console.log(error);
            }
        },
    },
    mounted() {
        this.getBreeds();
        console.log("hola mundo");
    },
}).mount("#app");
