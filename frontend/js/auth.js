// no usar export

function getAuthData() {
  const token = localStorage.getItem("authToken");
  const userData = JSON.parse(localStorage.getItem("userData"));
  return { token, userData };
}

function setAxiosAuthHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

function validateAccess(allowedRoles = [], redirectIfInvalid = true) {
  const { token, userData } = getAuthData();

  if (!token || !userData || (allowedRoles.length && !allowedRoles.includes(userData.role))) {
    if (redirectIfInvalid) {
      alert("Acceso denegado. Inicia sesión nuevamente.");
      window.location.href = "login.php";
    }
    return false;
  }

  setAxiosAuthHeader(token); // Aplica el token globalmente a axios
  return true;
}

function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userData");
  window.location.href = "login.php";
}
