# 🐱 Cats — API REST para gestión de felinos

API REST desarrollada para la gestión de felinos en refugios y clínicas veterinarias.

El proyecto permite administrar información de felinos y usuarios mediante un backend desarrollado con **NestJS**, utilizando **TypeORM** para la persistencia de datos y **MySQL** como base de datos.

Además, incorpora autenticación mediante **JWT**, control de acceso basado en roles y una arquitectura separada entre backend y frontend.

---

## 🚀 Tecnologías

### Backend

- NestJS
- TypeScript
- TypeORM
- MySQL
- JWT
- Passport
- bcrypt
- Class Validator
- Class Transformer

### Frontend

- PHP
- Apache

### Infraestructura

- Docker
- Docker Compose
- MySQL 8.0

---

## ✨ Características

- Registro y autenticación de usuarios.
- Autenticación mediante JWT.
- Control de acceso según roles.
- Gestión de información de felinos.
- Consulta de información de felinos.
- Creación, modificación y eliminación de registros.
- Validación de datos mediante DTOs.
- Persistencia de información utilizando TypeORM y MySQL.
- Arquitectura separada entre frontend y backend.
- Ejecución del proyecto mediante Docker Compose.

---

## 🔐 Autenticación

La API utiliza **JSON Web Tokens (JWT)** para la autenticación de usuarios.

Los endpoints que requieren autenticación utilizan el token mediante el encabezado:

```http
Authorization: Bearer <token>
