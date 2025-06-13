<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administrador de Gatitos</title>

    <!-- Bootswatch Morph theme -->
    <link rel="stylesheet" href="https://bootswatch.com/5/morph/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">

    <style>
    body {
        padding: 20px;
    }

    img {
        width: 60px;
    }

    .modal {
        background-color: rgba(0, 0, 0, 0.5);
    }

    .spinner-border {
        vertical-align: middle;
    }
    </style>
</head>

<body>
    <div id="app">
        <nav class="navbar navbar-expand-lg bg-body-tertiary px-3 mb-4">
            <div class="container-fluid d-flex justify-content-between align-items-center">
                <!-- <a class="navbar-brand" href="admin.php">Administración</a> -->
                <a href="admin-panel.php" class="btn btn-outline-success">Atrás</a>
                <span class="navbar-text mx-auto fw-bold text-primary fs-5">
                    🐈‍⬛ Gestión de Gatitos y Razas 🐾
                </span>
                <a class="navbar-brand" href="admin.php">Administración</a>
                <!-- <a href="admin-panel.php" class="btn btn-outline-danger">Atrás</a> -->
            </div>
        </nav>
        
        <div class="container">
            <!-- Formulario para agregar gatitos -->
            <div class="mb-5">
                <h3>Agregar Nuevo Gatito</h3>
                <form @submit.prevent="addCat" class="mb-5">
                    <div class="row g-3">
                        <div class="col-md-4">
                            <input v-model="newCat.name" type="text" class="form-control" placeholder="Nombre" required>
                        </div>
                        <div class="col-md-2">
                            <input v-model.number="newCat.age" type="number" class="form-control" placeholder="Edad" required>
                        </div>
                        <div class="col-md-4">
                            <input v-model="newCat.imgUrl" type="text" class="form-control" placeholder="URL Imagen" required>
                        </div>
                        <div class="col-md-2">
                            <select v-model="newCat.breed" class="form-select" required>
                                <option value="">Selecciona raza</option>
                                <option v-for="breed in breeds" :key="breed.id" :value="breed.name">
                                    {{ breed.name }}
                                </option>
                            </select>
                        </div>
                        <div class="col-md-12 text-end">
                            <button type="submit" class="btn btn-success" :disabled="loading">
                                <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                                {{ loading ? 'Agregando...' : 'Agregar Gatito' }}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Tabla de gatitos -->
            <h3 class="mb-3">Gatitos Registrados</h3>
            <div class="table-responsive mb-5">
                <table id="tablaGatitos" class="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Edad</th>
                            <th>Raza</th>
                            <th>Imagen</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="cat in cats" :key="cat.id">
                            <td>{{ cat.id }}</td>
                            <td>{{ cat.name }}</td>
                            <td>{{ cat.age }}</td>
                            <td>{{ cat.breed?.name || 'Sin raza' }}</td>
                            <td><img :src="cat.imgUrl" :alt="cat.name" class="rounded"></td>
                            <td>
                                <button @click="showDeleteModal('gato', cat.id)" class="btn btn-danger btn-sm me-2">Eliminar</button>
                                <button @click="editCat(cat)" type="button" class="btn btn-danger btn-sm me-2" data-bs-toggle="modal" data-bs-target="#catsModal">
                                    Editar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Modal para editar gatitos -->
            <div class="modal fade" id="catsModal" tabindex="-1" aria-labelledby="catsModalLabel">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="catsModalLabel">Datos del gatito</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clearEditCatForm()"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="nombre" class="form-label">Nombre del gatito</label>
                                <input v-model="formEditCat.name" type="text" class="form-control" id="nombre" required>
                            </div>
                            <div class="mb-3">
                                <label for="edad" class="form-label">Edad(años, sin meses)</label>
                                <input v-model.number="formEditCat.age" type="number" class="form-control" id="edad" min="0" required>
                            </div>
                            <div class="mb-3">
                                <label for="raza" class="form-label">Raza del gatito</label>
                                <div class="col-md-12">
                                    <select v-model="formEditCat.breed" class="form-select" required>
                                        <option value="">Selecciona raza</option>
                                        <option v-for="breed in breeds" :key="breed.id" :value="breed.name">
                                            {{ breed.name }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="foto" class="form-label">Foto del gatito (URL)</label>
                                <input v-model="formEditCat.imgUrl" type="text" class="form-control" placeholder="URL Imagen" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="clearEditCatForm()">Cerrar</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateCats()">Guardar cambios</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Formulario para agregar razas -->
            <div class="mb-5">
                <h3>Agregar Nueva Raza</h3>
                <form @submit.prevent="addBreed" class="mb-5">
                    <div class="row g-3">
                        <div class="col-md-8">
                            <input v-model="newBreed.name" type="text" class="form-control" placeholder="Nombre de la raza" required>
                        </div>
                        <div class="col-md-4 text-end">
                            <button type="submit" class="btn btn-primary" :disabled="loadingBreed">
                                <span v-if="loadingBreed" class="spinner-border spinner-border-sm"></span>
                                {{ loadingBreed ? 'Agregando...' : 'Agregar Raza' }}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <!-- Tabla de razas -->
            <h3 class="mb-3">Razas Registradas</h3>
            <div class="table-responsive">
                <table id="tablaRazas" class="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="breed in breeds" :key="breed.id">
                            <td><span v-text="breed.id"></span></td>
                            <td><span v-text="breed.name"></span></td>
                            <td>
                                <button @click="showDeleteModal('raza', breed.id)" class="btn btn-danger btn-sm me-2">Eliminar</button>
                                <button @click="editBreed(breed)" type="button" class="btn btn-danger btn-sm me-2" data-bs-toggle="modal" data-bs-target="#breedModal">
                                    Editar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Modal para editar razas -->
            <div class="modal fade" id="breedModal" tabindex="-1" aria-labelledby="breedModalLabel">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="breedModalLabel">Formulario</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clearEditBreedForm()"></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <label for="raza" class="form-label">Raza del gatito</label>
                                <input v-model="formEditBreed.name" type="text" class="form-control" id="nombre" required>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="clearEditBreedForm()">Cerrar</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="updateBreeds()">Guardar cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal de confirmación de eliminación -->
        <div class="modal fade" :class="{ show: showModal }" tabindex="-1" :style="showModal ? 'display: block' : 'display: none'">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirmar Eliminación</h5>
                        <button type="button" class="btn-close" @click="closeModal" aria-label="Cerrar"></button>
                    </div>
                    <div class="modal-body">
                        ¿Estás seguro que deseas eliminar este elemento?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal">
                            Cancelar
                        </button>
                        <button type="button" class="btn btn-danger" @click="confirmDelete" :disabled="deleting">
                            <span v-if="deleting" class="spinner-border spinner-border-sm"></span>
                            {{ deleting ? 'Eliminando...' : 'Eliminar' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
     

    <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <!-- <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script> -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/auth.js"></script>
    <script src="js/admin.js"></script>
</body>

</html>