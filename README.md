# Ñefli (Microservicios + Docker)

Aplicación web tipo plataforma de streaming que gestiona **películas**, **series**, **episodios**, **actores**, **géneros** y **perfiles de usuario**, con arquitectura de **microservicios** y una interfaz web para administración/gestión.

El proyecto está dividido en tres microservicios principales:
- **User**: gestión de usuarios y perfiles.
- **Content**: gestión de contenido (películas/series/episodios/actores/géneros).
- **Visualization**: lógica relacionada con visualización/acciones de consumo (según la implementación del servicio).

La comunicación entre frontend y microservicios se realiza mediante un **reverse proxy (Nginx)** que expone rutas `/api/...` hacia los servicios.

## Vista rápida
<img src="docs/img/pantallaInicio.png" width="700" alt="Pantalla de inicio" />
<img src="docs/img/paginaPrincipal.png" width="700" alt="Pantalla principal" />

Más capturas: [docs/img/](docs/img/)

## Tecnologías
- Backend: Java + Spring Boot + Maven (microservicios).
- Base de datos: PostgreSQL (inicialización mediante scripts `.sql`).
- Frontend: estático servido con Nginx (y peticiones a `/api/...`).
- Infra: Docker + Docker Compose.

## Requisitos
- Docker instalado
- Docker Compose (plugin v2) instalado

Comprobar:
```bash
docker --version
docker compose version
````
## Arranque en local (Docker)

### 1) Clonar el repositorio
```bash
git clone <URL_DE_TU_REPO>
cd <CARPETA_DEL_REPO>
```
### 2) Crear el archivo .env
Este repositorio no incluye `.env`  para no subir credenciales/configuración local.

Crea el `.env` a partir del ejemplo:
```bash
cp .env.example .env
```
Después, revisa/edita el .env si necesitas cambiar puertos, URLs o credenciales para tu equipo.

### 3) Construir y levantar los contenedores
Desde la raíz del proyecto (donde está `docker-compose.yml`):

```bash
docker compose up -d --build
```

### 4) Ver estado y logs
Comprueba que los contenedores están levantados y revisa los logs si algo falla:

```bash
docker compose ps
docker compose logs -f
````

### 5) Acceso a la aplicación (local)
- Frontend: `http://localhost:3000`

APIs a través del reverse proxy:
- `http://localhost:3000/api/user/...`
- `http://localhost:3000/api/content/...`
- `http://localhost:3000/api/visualization/...`

> Si tu `docker-compose.yml` expone otros puertos, ajusta estas URLs.

### 6) Parar el entorno
Parar contenedores:

```bash
docker compose down
```
Parar y borrar volúmenes (esto elimina los datos de la base de datos):
```bash
docker compose down -v
```
## Troubleshooting rápido
- Ver logs de un servicio concreto:
```bash
docker compose logs -f <nombre-servicio>
```
Reiniciar “de cero” (borra volúmenes y por tanto los datos de la BD):
```bash
docker compose down -v
docker compose up -d --build
```




