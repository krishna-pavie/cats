<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Crear Gatitos</title>
    <link rel="stylesheet" href="https://bootswatch.com/5/morph/bootstrap.min.css" />
</head>

<body>
    <div id="app">
        <nav class="navbar navbar-expand-lg bg-body-tertiary px-3">
            <div class="container-fluid d-flex justify-content-between align-items-center">
                <a class="navbar-brand" href="cats.php">Inicio</a>
                <span class="navbar-text mx-auto fw-bold text-primary fs-5">
                    ¡Siempre es bienvenido un nuevo integrante a la secta de michis 🐱!
                </span>
            </div>
        </nav>

        <div v-if="alert.show"
            :class="`alert alert-${alert.type} alert-dismissible fade show position-fixed top-0 end-0 m-3`"
            style="z-index: 1100; min-width: 300px;" role="alert">
            {{ alert.message }}
            <button type="button" class="btn-close" @click="alert.show = false" aria-label="Close"></button>
        </div>


        <div class="container mt-5 d-flex justify-content-center">
            <div class="card shadow p-4 w-100" style="max-width: 600px; border-radius: 1rem;">
                <h2 class="text-center mb-4">Registrar un nuevo gatito 🐾</h2>
                <form @submit.prevent="addCat">
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre del gatito</label>
                        <input v-model="newCat.name" type="text" class="form-control" placeholder="Ingresa un nombre"
                            id="nombre" required>
                    </div>
                    <div class="mb-3">
                        <label for="edad" class="form-label">Edad(años, sin meses)</label>
                        <input v-model.number="newCat.age" type="number" class="form-control"
                            placeholder="Ingresa una edad" min="0" required>
                    </div>
                    <div class="mb-3">
                        <label for="raza" class="form-label">Raza del gatito</label>
                        <select v-model="newCat.breed" class="form-select" required>
                            <option value="">Selecciona raza</option>
                            <option v-for="breed in breeds" :key="breed.id" :value="breed.name">
                                {{ breed.name }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="foto" class="form-label">Foto del gatito (URL)</label>
                        <input v-model="newCat.imgUrl" type="text" class="form-control" placeholder="URL Imagen"
                            required>
                    </div>

                    <!-- Botón dentro del formulario pero con margen superior -->
                    <div class="mt-4">
                        <button type="submit" class="btn btn-primary w-100">
                            Agregar gatito
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>


    <div class="position-absolute end-0" style="top: 50%; transform: translateY(-50%); z-index: 1;">
        <img src="https://i.pinimg.com/originals/44/72/66/447266173c1a71da872660fe46fcfdba.gif"
            alt="Gatito decorativo derecho" style="max-width: 150px;">
    </div>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"></script>
    <script src="JS/createcat.js"></script>
</body>

</html>