<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Gatitos Vue</title>
    <link rel="stylesheet" href="https://bootswatch.com/5/morph/bootstrap.min.css" />
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
</head>

<body>
    <nav class="navbar navbar-expand-lg bg-body-tertiary px-3">
        <div class="container-fluid d-flex align-items-center justify-content-between">
            <div class="text-center flex-grow-1">
                <span class="navbar-text fw-bold text-primary fs-5">
                    🐈 Bienvenido humano. Éste es un servicio nacional de gatitos. 🐈‍⬛
                </span>
            </div>
            <div style="width: 80px;"></div>

             <a href="login.php" class="btn btn-primary">Ingresar</a>
        </div>
    </nav>

    <div class="container">
        <div class="row align-items-center">
            <div class="col-md-8">
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <h4 class="card-title">¿Por qué registrar a tu gato?</h4>
                        <p class="card-text">
                            Registrar a tu gato en nuestro sistema te permite llevar un control de su información
                            importante, como características especiales y datos de contacto en
                            caso de emergencia. Además, contribuyes a nuestra base de datos de felinos.
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-4 text-center">
                <img src="https://i.gifer.com/origin/6d/6dca36888ff7930293168c2c720e0ed8_w200.gif"
                    alt="Gif de gatito" class="img-fluid rounded shadow" style="max-width: 80px; height: auto" />
            </div>
        </div>
    </div>

    <div class="d-flex justify-content-center my-4">
        <img src="https://gatos.sollamascotas.com/sites/default/files/blog/shutterstock_602702633%20%281%29.jpg"
            alt="Gatito" class="img-fluid rounded shadow" style="max-width: 600px; height: auto" />
    </div>

    <div class="container text-center mb-5">
        <div class="row justify-content-center">
            <div class="col-md-6 col-sm-12 mb-3">
                <div class="d-grid gap-3">
                    <a href="listcat.php" class="btn btn-success w-100">📋 Ver Gatos</a>
                </div>
            </div>
            <div class="col-md-6 col-sm-12 mb-3">
                <div class="d-grid gap-3">
                    <a href="listbreed.php" class="btn btn-info w-100">📖 Ver Razas</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Recuadro informativo añadido -->
    <div class="container mb-4">
        <div class="card shadow-sm">
            <div class="card-body text-center">
                <h4 class="card-title">🐱 Datos curiosos sobre gatos 🐱</h4>
                <p class="card-text">
                    Los gatos domésticos pasan aproximadamente el 70% de su vida durmiendo.
                    Un gato puede rotar sus orejas 180 grados y escuchar sonidos a frecuencias
                    mucho más altas que los humanos. ¿Sabías que el ronroneo de los gatos puede
                    tener propiedades curativas y ayudar a reducir el estrés en los humanos?
                </p>
                <small class="text-muted">Fuente: Asociación de Amantes de los Gatos</small>
            </div>
        </div>
    </div>




    <footer class="text-center mt-5">
        <p>🐾 Sitio de michis 🐱 | Hecho con cariño para los amantes de los gatos. 🐾</p>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/vue@3.2.47/dist/vue.global.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="js/cats.js"></script>
</body>

</html>