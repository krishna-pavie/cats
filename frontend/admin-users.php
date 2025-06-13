<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ver Usuarios</title>
    <link rel="stylesheet" href="https://bootswatch.com/5/morph/bootstrap.min.css" />
    <!-- <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/dataTables.bootstrap5.min.css" /> -->

    <style>
    body {
        padding: 20px;
    }

    .img-gatito {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 4px;
    }
    </style>
</head>

<body>
    <div id="app">
        <nav class="navbar navbar-expand-lg bg-body-tertiary px-3">
            <div class="container-fluid d-flex justify-content-between align-items-center">
                <a class="navbar-brand" href="admin-panel.php">Atrás</a>
                <span class="navbar-text mx-auto fw-bold text-primary fs-5">
                    Usuarios registrados en el sistema
                </span>
                <a href="register.php" class="btn btn-outline-success">Nuevo usuario</a>
            </div>
        </nav>

        <div class="container mt-4">
            <h3 class="text-center mb-4">Lista de Usuarios</h3>
            <div v-if="loading" class="text-center my-4">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
                <p>Cargando usuarios...</p>
            </div>

            <div v-if="!loading && !error" class="table-responsive">
                <table id="tablaUsuarios" class="table table-striped" style="width:100%">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Dirección</th>
                            <th>Región</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td><span v-text="user.id"></span></td>
                            <td><span v-text="user.name"></span></td>
                            <td><span v-text="user.email"></span></td>
                            <td><span v-text="user.role"></span></td> 
                            <td><span v-text="user.address"></span></td>
                            <td><span v-text="user.region.name"></span></td>
                            <td>
                            <button @click="showDeleteModal('user', user.id)"
                                class="btn btn-danger btn-sm me-2">Eliminar</button>
                            <button @click="editUser(user)" type="button" class="btn btn-primary btn-sm"
                                data-bs-toggle="modal" data-bs-target="#usersModal">
                                Editar
                            </button>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>    
            
        </div>

        <div>
<div class="container mt-5">
    <h3 class="text-center mb-4">Lista de Regiones</h3>
    <div v-if="!loading && !error" class="table-responsive">
        <table id="tablaRegiones" class="table table-striped" style="width:100%">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="region in regions" :key="region.id">
                    <td><span v-text="region.id"></span></td>
                    <td><span v-text="region.name"></span></td>
                    <td>
                        <button @click="showDeleteModal('user', user.id)"
                                class="btn btn-danger btn-sm me-2">Eliminar</button>
                            <button @click="editUser(user)" type="button" class="btn btn-primary btn-sm"
                                data-bs-toggle="modal" data-bs-target="#usersModal">
                                Editar
                            </button>   
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

        </div>
    </div>
<div class="modal fade" id="confirmDeleteModal" tabindex="-1" aria-hidden="true" v-if="showModal">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Confirmar Eliminación</h5>
                <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <p>¿Estás seguro que deseas eliminar este usuario? Esta acción no se puede deshacer.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
                <button type="button" class="btn btn-danger" @click="confirmDelete" :disabled="deleting">
                    <span v-if="deleting" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Eliminar
                </button>
            </div>
        </div>
    </div>
</div>
//edit users
<div class="modal fade" id="usersModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Editar Usuario</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="updateUser">
                    <div class="mb-3">
                        <label for="editUserName" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="editUserName" v-model="formEditUser.name" required>
                    </div>
                    <div class="mb-3">
                        <label for="editUserEmail" class="form-label">Email</label>
                        <input type="email" class="form-control" id="editUserEmail" v-model="formEditUser.email" required>
                    </div>
                    <div class="mb-3">
                        <label for="editUserRole" class="form-label">Rol</label>
                        <select class="form-select" id="editUserRole" v-model="formEditUser.role" required>
                            <option value="admin">Administrador</option>
                            <option value="user">Usuario</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="editUserAddress" class="form-label">Dirección</label>
                        <input type="text" class="form-control" id="editUserAddress" v-model="formEditUser.address">
                    </div>
                    <div class="mb-3">
                        <label for="editUserRegion" class="form-label">Región</label>
                        <input type="text" class="form-control" id="editUserRegion" v-model="formEditUser.region">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script> -->
    <!-- <script src="https://cdn.datatables.net/1.13.6/js/dataTables.bootstrap5.min.js"></script> -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://unpkg.com/vue@3.4.21/dist/vue.global.prod.js"></script>
    <script src="js/auth.js"></script>
    <script src="js/admin-users.js"></script>