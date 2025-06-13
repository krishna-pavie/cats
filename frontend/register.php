<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Cuentas</title>
    <link rel="stylesheet" href="https://bootswatch.com/5/morph/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
</head>

<body>
    <div id="app">
        <nav class="navbar navbar-expand-lg bg-body-tertiary px-3">
            <div class="container-fluid d-flex justify-content-between align-items-center">
                <a class="navbar-brand" href="cats.php">
                    <i class="bi bi-arrow-left"></i>Inicio
                </a>
                <span class="navbar-text mx-auto fw-bold text-primary fs-5">
                    <i class="bi bi-person-plus"></i> Registrar Nueva Cuenta
                </span>
            </div>
        </nav>

        <!-- Alertas -->
        <div v-if="alert.show"
            :class="`alert alert-${alert.type} alert-dismissible fade show position-fixed top-0 end-0 m-3`"
            style="z-index: 1100; min-width: 300px;" role="alert">
            <i :class="alert.type === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-exclamation-triangle-fill'"></i>
            {{ alert.message }}
            <button type="button" class="btn-close" @click="alert.show = false" aria-label="Close"></button>
        </div>

        <div class="container mt-5 d-flex justify-content-center">
            <div class="card shadow p-4 w-100"
                style="max-width: 600px; border-radius: 1rem; border-top: 4px solid #6f42c1;">
                <h2 class="text-center mb-4 text-primary">
                    <i class="bi bi-person-badge"></i> Formulario de Registro
                </h2>

                <form @submit.prevent="addUser">
                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="name" class="form-label">
                                <i class="bi bi-person-fill"></i> Nombre Completo
                            </label>
                            <input v-model="newUser.name" type="text" class="form-control" placeholder="Nombre completo"
                                id="name" required>
                        </div>
                        <div class="col-md-6">
                            <label for="email" class="form-label">
                                <i class="bi bi-envelope-fill"></i> Correo Electrónico
                            </label>
                            <input v-model="newUser.email" type="email" class="form-control"
                                placeholder="correo@ejemplo.com" id="email"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required>
                        </div>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="password" class="form-label">
                                <i class="bi bi-lock-fill"></i> Contraseña
                            </label>
                            <input v-model="newUser.password" type="password" class="form-control"
                                placeholder="Mínimo 6 caracteres" minlength="6" id="password"
                                autocomplete="new-password" required>
                        </div>
                        <div class="col-md-6">
                            <label for="confirmPassword" class="form-label">
                                <i class="bi bi-lock-fill"></i> Confirmar Contraseña
                            </label>
                            <input v-model="newUser.confirmPassword" type="password" class="form-control"
                                placeholder="Repite la contraseña" id="confirmPassword" autocomplete="new-password"
                                required>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="address" class="form-label">
                            <i class="bi bi-house-door-fill"></i> Dirección
                        </label>
                        <input v-model="newUser.address" type="text" class="form-control"
                            placeholder="Dirección completa" id="address" required>
                    </div>

                    <div class="row g-3 mb-3">
                        <div class="col-md-6">
                            <label for="userRole" class="form-label">
                                <i class="bi bi-person-rolodex"></i> Tipo de Cuenta
                            </label>
                            <select v-model="newUser.role" class="form-select" id="userRole" required>
                                <option value="">Seleccione un rol</option>
                                <option value="user">Usuario Normal</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <label for="region" class="form-label">
                                <i class="bi bi-map-fill"></i> Región
                            </label>
                            <select v-model="newUser.regionId" ...>
                                <option v-for="region in regions" :key="region.id" :value="region.id">
                                    {{ region.name }}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="termsCheck" required>
                        <label class="form-check-label" for="termsCheck">
                            <i class="bi bi-check-circle-fill"></i> Confirmo que los datos proporcionados son correctos
                        </label>
                    </div>

                    <div class="d-grid gap-2 mt-4">
                        <button type="submit" class="btn btn-primary">
                            <i class="bi bi-person-plus"></i> Registrar Usuario
                        </button>
                        <button type="reset" class="btn btn-outline-secondary">
                            <i class="bi bi-x-circle"></i> Limpiar Formulario
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css" />
    <script src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
    <script src="js/register.js"></script>
</body>

</html>