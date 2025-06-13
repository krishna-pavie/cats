const { createApp, ref } = Vue;

createApp({
  setup() {
    const email = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const loading = ref(false);
    const error = ref("");
    const showSuccessModal = ref(false);
    const redirecting = ref(false);

    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };

    const setAuthData = (token, userData) => {
      console.log('Guardando token y datos de usuario en localStorage');
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));
    };

    const handleLogin = async () => {
      try {
        console.log("Intentando iniciar sesión con:", email.value, password.value);
        loading.value = true;
        error.value = "";

        const response = await axios.post(`http://localhost:3407/api/v1/auth/login`, {
          email: email.value,
          password: password.value,
        });

        const data = response.data;
        const token = data.access_token;
        const user = data.user?.user; // accedemos correctamente

        if (token && user) {
          console.log("Autenticación exitosa. Datos recibidos:", { token, user });
          setAuthData(token, user);
          showSuccessModal.value = true;
          redirecting.value = true;

          // ✅ Redirección basada en el rol recibido
          const userRole = user.role;
          console.log("Rol del usuario:", userRole);

          if (userRole === "admin") {
            window.location.href = "admin-panel.php";
          } else if (userRole === "user") {
            window.location.href = "user-panel.php";
          } else {
            error.value = "Rol no reconocido. Contacte al administrador.";
          }
        } else {
          throw new Error("Respuesta de autenticación inválida");
        }
      } catch (err) {
        console.error("Error durante el login:", err);
        error.value = "Error al iniciar sesión. Verifique sus credenciales.";
      } finally {
        loading.value = false;
      }
    };

    return {
      email,
      password,
      showPassword,
      loading,
      error,
      showSuccessModal,
      redirecting,
      togglePassword,
      handleLogin,
    };
  }
}).mount("#app");
