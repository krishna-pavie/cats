<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acceso al sistema</title>
    <link rel="stylesheet" href="https://bootswatch.com/5/morph/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">
    <style>
    body {
        background-color: #f8f9fa;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
    }

    .login-container {
        width: 100%;
        max-width: 400px;
        animation: fadeIn 0.5s ease-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .password-toggle {
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #6c757d;
    }

    .btn-loading {
        position: relative;
    }

    .spinner {
        position: absolute;
        left: 50%;
        margin-left: -10px;
    }

    /* Estilos para el modal personalizado */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }

    .modal-overlay.active {
        opacity: 1;
        visibility: visible;
    }

    .modal-content {
        background-color: white;
        padding: 2rem;
        border-radius: 0.5rem;
        max-width: 400px;
        width: 90%;
        text-align: center;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
        transform: translateY(-20px);
        transition: transform 0.3s ease;
    }

    .modal-overlay.active .modal-content {
        transform: translateY(0);
    }

    .modal-icon {
        font-size: 3rem;
        color: #198754;
        margin-bottom: 1rem;
    }
    </style>
</head>

<body>
    <div id="app" class="login-container">
        <div class="card shadow-sm">
            <div class="card-body p-4">
                <div class="text-center mb-4">
                    <h2 class="text-primary"><i class="bi bi-shield-lock"></i> Acceso al portal</h2>
                    <p class="text-muted">Ingresa tus credenciales para continuar</p>
                </div>

                <form @submit.prevent="handleLogin">
                    <div class="mb-3">
                        <label class="form-label">Correo Electrónico</label>
                        <input v-model="email" type="email" class="form-control" required
                            placeholder="admin@example.com" autocomplete="username">
                    </div>

                    <div class="mb-3 position-relative">
                        <label class="form-label">Contraseña</label>
                        <input v-model="password" :type="showPassword ? 'text' : 'password'" class="form-control"
                            required placeholder="••••••••" autocomplete="current-password">
                        <i class="bi password-toggle" :class="showPassword ? 'bi-eye-slash' : 'bi-eye'"
                            @click="togglePassword"></i>
                    </div>

                    <button type="submit" class="btn btn-primary w-100 btn-loading" :disabled="loading">
                        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                        {{ loading ? 'Autenticando...' : 'Ingresar' }}
                    </button>

                    <div class="mt-3 text-center">
                        <p class="text-muted">¿Aún no tienes cuenta? <a href="register.php"
                                class="text-primary">Regístrate</a></p>
                    </div>
                </form>

                <div v-if="error" class="alert alert-danger mt-3 alert-dismissible fade show" role="alert">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    {{ error }}
                    <button type="button" class="btn-close" @click="error = ''" aria-label="Close"></button>
                </div>
            </div>
        </div>

        <!-- Modal de éxito -->
        <div class="modal-overlay" :class="{ 'active': showSuccessModal }">
            <div class="modal-content">
                <div class="modal-icon">
                    <i class="bi bi-check-circle-fill"></i>
                </div>
                <h3>¡Inicio de sesión exitoso!</h3>
                <p>Serás redirigido a la siguiente página</p>
                <div class="spinner-border text-primary mt-3" role="status" v-if="redirecting">
                    <span class="visually-hidden">Cargando...</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Vue 3 + Axios -->
    <script src="https://cdn.jsdelivr.net/npm/vue@3.2.47/dist/vue.global.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="js/login.js"></script>
</body>