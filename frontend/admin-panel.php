<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Panel de Administrador - Gatitos Vue</title>
    <link rel="stylesheet" href="https://bootswatch.com/5/morph/bootstrap.min.css" />
    <link rel="stylesheet" href="css/gatos.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>

<body>
    <div id="app">
        <nav class="navbar navbar-expand-lg bg-body-tertiary px-3">
            <div class="container-fluid d-flex align-items-center justify-content-between">
                <div>
                    <span class="navbar-brand fw-bold text-primary">PANEL DE ADMINISTRADOR</span>
                </div>
                <div class="text-center flex-grow-1">
                    <span class="navbar-text fw-bold text-primary fs-5">
                        🐈 Bienvenido administrador. Gestiona los michis. 🐈‍⬛
                    </span>
                </div>
                <div>
                <a href="cats.php" class="btn btn-success btn-lg">
                                    <i class="bi bi-pencil-square"></i> Cerrar sesión
                                </a>
                   
                </div>
            </div>
        </nav>

        <div class="container my-5">
            <div class="row justify-content-center">
                <div class="col-md-8 text-center">
                    <h2 class="mb-4">Opciones de Administración</h2>
                    
                    <div class="card shadow mb-4">
                        <div class="card-body">
                            <h4 class="card-title">Gestionar Datos</h4>
                            <p class="card-text">Visualiza y administra la información de la base de datos.</p>
                            <div class="d-grid gap-3 mt-4">
                                <a href="admin-users.php" class="btn btn-primary btn-lg">
                                    <i class="bi bi-table"></i> Ver Tabla de Datos
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card shadow">
                        <div class="card-body">
                            <h4 class="card-title">Gestión de Gatos y Razas</h4>
                            <p class="card-text">Agrega, modifica o elimina gatos y razas del sistema.</p>
                            <div class="d-grid gap-3 mt-4">
                                <a href="admin.php" class="btn btn-success btn-lg">
                                    <i class="bi bi-pencil-square"></i> Administrar Gatos/Razas
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer class="text-center mt-5 py-3 bg-light">
            <p>🐾 Panel de Administración de Michis 🐱 | Acceso restringido 🐾</p>
        </footer>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@3.2.47/dist/vue.global.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
   