# Catálogo API

API REST para administrar productos y categorías de una tienda.
Construida con NestJS, Mongoose y MongoDB.

## Requisitos

- Node.js v18 o superior
- MongoDB corriendo localmente
- Bruno (para probar los endpoints)

## Instalación

```bash
npm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```env
MONGO_URI=mongodb://localhost:27017/catalogo-api
PORT=3000
```

## Correr el proyecto

```bash
npm run start:dev
```

La API quedará disponible en `http://localhost:3000`

## Endpoints disponibles

### Categorías
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /categorias | Crear categoría |
| GET | /categorias | Listar todas las categorías |
| GET | /categorias/:id | Obtener categoría por id |
| PATCH | /categorias/:id | Actualizar categoría |
| DELETE | /categorias/:id | Eliminar categoría |

### Productos
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /productos | Crear producto |
| GET | /productos | Listar productos activos |
| GET | /productos?incluirInactivos=true | Listar todos los productos |
| GET | /productos?categoria=id | Filtrar por categoría |
| GET | /productos/:id | Obtener producto por id |
| PATCH | /productos/:id | Actualizar producto |
| PATCH | /productos/:id/desactivar | Desactivar producto |
| DELETE | /productos/:id | Eliminar producto |

## Colección Bruno

Importar la colección desde la carpeta `/bruno` en Bruno.

## Autora

Carol Yureimi Ledezma Gómez
ADSO 3145636
I.Diego Calderon