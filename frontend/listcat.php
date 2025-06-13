<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ver Gatitos</title>
    <link rel="stylesheet" href="https://bootswatch.com/5/morph/bootstrap.min.css" />

    <style>
    body {
        padding: 20px;
    }

    .img-gatito {
        width: 100px;
        height: 100pxpx;
        object-fit: cover;
        border-radius: 4px;
    }
    </style>
</head>

<body>
    <div id="app">
        <nav class="navbar navbar-expand-lg bg-body-tertiary px-3">
            <div class="container-fluid d-flex justify-content-between align-items-center">
                <a class="navbar-brand" href="cats.php">Inicio</a>
                <span class="navbar-text mx-auto fw-bold text-primary fs-5">
                    🐈Gatitos registrados en la base gatuna🐈‍⬛
                </span>
            </div>
        </nav>

        <div class="container mt-4">
            <h3 class="text-center mb-4">Lista de Gatitos</h3>

            <!-- Mensaje de carga -->
            <div v-if="loading" class="text-center my-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p>Cargando gatitos...</p>
            </div>


            <h3 class="mb-3">Gatitos Registrados</h3>
            <div class="table-responsive mb-5">
                <table id="tablaGatitos" class="table table-striped">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Edad</th>
                            <th>Raza</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cat in cats" :key="cat.id">
                            <td><span v-text="cat.name"></span></td>
                            <td><span v-text="cat.age"></span></td>
                            <td><span v-text="cat.breed.name"></span></td>
                            <td><img :src="cat.imgUrl" :alt="cat.name" class="img-gatito rounded"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script> -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/vue@3.4.21/dist/vue.global.prod.js"></script>
    <script src="js/auth.js"></script>
    <script src="js/listcat.js"></script>

</body>

</html>