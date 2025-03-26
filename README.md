# Crud MK Characters

Este proyecto es una aplicación CRUD para gestionar personajes de Mortal Kombat. Está desarrollado con Angular y utiliza una API externa para manejar los datos.

## Tecnologías Usadas

- **Angular**: Framework principal para el desarrollo de la aplicación.
- **TailwindCSS**: Para el diseño y estilos responsivos.
- **SweetAlert2**: Para mostrar alertas y confirmaciones.
- **Auth0**: Para la autenticación y autorización de usuarios.
- **RxJS**: Para manejar flujos de datos reactivos.
- **Material Design**: Componentes de Angular Material para formularios y botones.
- **NestJS**: Conexión a una API externa para gestionar los datos de los personajes.
- **MongoDB**: Bases de datos no relacional. Interactuando mediante un orm
- **Docker**: Se utilixó docker compose para poder dockerizar la base de datos

## Cómo Hacer Funcionar el Proyecto

1. **Clonar el Repositorio**:
   ```bash
   git clone https://github.com/facundo000/api-MK-characters-nest/tree/characters-nest-v2
   cd crud-mk-characters
   ```

2. **Instalar Dependencias**:
   Asegúrate de tener Node.js instalado y ejecuta:
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno**:
   Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables:
   ```env
   NG_APP_API=http://localhost:3000/api/v1/mortalkombat
   NG_APP_AUTH0_DOMAIN=tu-dominio.auth0.com
   NG_APP_AUTH0_CLIENT_ID=tu-client-id
   NG_APP_AUTH0_AUDIENCE=tu-audience
   ```

4. **Iniciar el Proyecto**:
   Ejecuta el siguiente comando para iniciar el servidor de desarrollo:
   ```bash
   npm start
   ```
   La aplicación estará disponible en `http://localhost:4200`.

5. **Backend**:
   Asegúrate de que el backend esté corriendo. Puedes encontrar el backend en el siguiente repositorio: [API MK Characters](https://github.com/facundo000/api-MK-characters-nest/tree/characters-nest-v2).

## Funcionalidades del Proyecto

- **Autenticación y Autorización**:
  - Inicio de sesión y registro de usuarios mediante Auth0.
  - Protección de rutas para garantizar que solo usuarios autenticados puedan acceder a ciertas funcionalidades.

- **Gestión de Personajes**:
  - Listar todos los personajes disponibles.
  - Buscar personajes por nombre.
  - Agregar nuevos personajes con nombre e imagen.
  - Editar personajes existentes.
  - Eliminar personajes con confirmación.

- **Interfaz de Usuario**:
  - Diseño responsivo y moderno utilizando TailwindCSS.
  - Alertas y notificaciones amigables con SweetAlert2.
  - Barra de búsqueda para encontrar personajes rápidamente.

- **Perfil de Usuario**:
  - Visualización de información del usuario autenticado.
  - Opciones para editar el perfil o cerrar sesión.

## Capturas de Pantalla


