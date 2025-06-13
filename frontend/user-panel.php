<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>Panel de Usuario</title>
    <link rel="stylesheet" href="https://bootswatch.com/5/morph/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
</head>

<body>
    <div id="app" class="container mt-5">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary rounded">
            <div class="container-fluid">
                <a class="navbar-brand" href="cats.php">Cerrar sesión</a>
                <span class="navbar-text text-white ms-auto">
                    Hola, <span v-text="user.name"></span>
                </span>
            </div>
        </nav>
        <div class="card mt-4">
            <div class="card-header">
                <h4>Información del Usuario</h4>
            </div>
            <div class="card-body">
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <th>Nombre</th>
                            <td><span v-text="user.name"></span></td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td><span v-text="user.email"></span></td>
                        </tr>
                        <tr>
                            <th>Dirección</th>
                            <td><span v-text="user.address"></span></td>
                        </tr>
                        <tr>
                            <th>Región</th>
                            <td><span v-text="user.region"></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="text-end mt-3">
            <a href="createcat.php" class="btn btn-success">Registrar nuevo gatito</a>
        </div>
        <div class="mt-4">
            <h4>Gatitos Registrados</h4>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Edad</th>
                            <th>Raza</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cat in cats" :key="cat.id">
                            <td><span v-text="cat.id"></span></td>
                            <td><span v-text="cat.name"></span></td>
                            <td><span v-text="cat.age"></span></td>
                            <td><span v-text="cat.breed"></span></td>
                            <td><span v-text="cat.imgUrl"></span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="js/user-panel.js"></script>


</body>

</html>