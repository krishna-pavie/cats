<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Razas Existentes</title>
    <!-- Bootswatch Morph theme -->
    <link rel="stylesheet" href="https://bootswatch.com/5/morph/bootstrap.min.css" />
    <!-- DataTables CSS compatible con Bootstrap 5 -->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css" />

    <style>
    body {
        padding: 20px;
    }
    </style>
</head>

<body>
    <div id="app">
        <nav class="navbar navbar-expand-lg bg-body-tertiary px-3">
            <div class="container-fluid d-flex justify-content-between align-items-center">
                <a class="navbar-brand" href="cats.php">Inicio</a>
                <span class="navbar-text mx-auto fw-bold text-primary fs-5">
                    Razas de gatitos registrados🐈‍⬛
                </span>
            </div>
        </nav>

        <div class="container mt-4">
            <h3 class="text-center mb-4">Lista de Razas</h3>

            <!-- Mensaje de carga -->
            <div v-if="loading" class="text-center my-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p>Cargando razas...</p>
            </div>

            <!-- Mensaje de error -->
            <div v-if="error" class="alert alert-danger">
                {{ error }}
            </div>

            <!-- Tabla de razas -->
            <div v-if="!loading && !error" class="table-responsive">
                <table id="tablaRazas" class="table table-striped" style="width:100%">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre de la Raza</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="breed in breeds" :key="breed.id">
                            <td><span v-text="breed.id"></span></td>
                            <td><span v-text="breed.name"></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/vue@3.4.21/dist/vue.global.prod.js"></script>
    <script src="js/listbreed.js"></script>
</body>

</html>