# Vac Inventory
## Prueba técnica

## Proceso de desarrollo
- Primero se procedí a realizar un boceto a mano en una hoja de las diferentes pantallas que iba a necesitar. Con un poco más de tiempo hubiera procedido a válidar los distintos prototipos para mejorar la experiencia de usuario. Aunque dentro de un equipo de desarrollo se agradecería que este trabajo lo hiciera el UX/UI Designer.
- Luego decidí escoger las herramientas que podrían permitirme obtener un resultado funcional de manera eficiente
- Usando vite se puede crear un proyecto de React de manera rápida con el comando vite `npm create vite@latest`
- Procedí a crear las diferentes directorios que iba a utilizar
- Empecé a crear las diferentes páginas que iban a aparecer en la aplicación en conjunto con los componentes que iban a utilizarse dentro de ellas, con dummy data. Cabe recalcar que hay dos páginas de inicio de sesión por un tema de experiencia de usuario debido a que quería que los usuarios administradores puedan diferenciar cuando quieran ingresar como administrador
- Utilizando el hook de formularios `useForm` que provee la librería manttine, en conjunto con la librería Yup implenté los formularios con sus respectivas validaciones. 
- Agregué el componente de tabla que provee la librería AgGrid para mostrar los empleados. La rázon por la que agregué esta dependencia fue con el propósito de mantener un buen rendimiento al mostrar una gran cantidad de empleados ya que posee virtualización. Además, permite varias funciones ya implementadas como el filtrad por columna o permitir descargar la info a csv o xls, para exportar de manera fácil la información como un futuro feature de la app.
- Procedí a crear un layout que se encuentra dentro de la carpeta layout
- Procedí a realizar el routing de la aplicción utilizando react-router-dom v6
- Luego cree la aplicación en Firebase para poder utilizar sus servicios
- Cree un usuario administrador y al estar utilizando roles tuve que enlazarlo con una colección en firestore
- Cree una colección de employees en firestore para enlazar los usuarios con un respectivo documento con toda la información extra del usuario
- Procedí crear un usuario de administrador y unos usuarios de empleador para poder consumir sus datos dentro de la app
- Primero enlacé la aplicación web con firebase usando la cofiguración brindada desde firebase la cual se puede encontrar en el archivo firebase
- Procedí a crear el esquema de rutas protegidas basada en roles, utilizando react router dom en conjunto con la autenticación de firebase
- Utilizando contextAPI cree un contexto referente al usuario que ha iniciado sesión, y en el se agregaron todas las funciones referentes a authenticación y usuarios.
- Utilizando contextAPI cree un contexto referente a los empleados y todas las funciones referentes a ellos.
- Procedí a utilizar el estado del contexto y las funciones dentro de la aplicación para poder enlazar el frontend con el backend
- Procedí a realizar pruebas de los diferentes features, por falta de tiempo no pude realizar pruebas unitarias de cada componente y ciertas mejoras detalladas a continuación

## Mejoras sugeridas
 Dichas mejoras no fueron implementadas pero con un poco más de tiempo pueden ser implementadas sin ningun problema
 
- Desacoplar un poco el componente de Datatable ya que posee mucha lógica dentro de un solo componente
- Agregar useReducer como manejador de estados de los contextos para estructurar de mejor manera el estado de cada contexto
- Agregar paginación dentro de la tabla a pesar de que la tabla es bastante eficiente en temas de renderizado. Si se requiere mejorar el performance de la consulta realizada a firebase, se puede utilizar paginación para ir obteniendo los empleados a mostrar por lotes.
- Agregar una lectura en tiempo real de los empleados para que se puedan ver las actualizaciones en tiempo real hechas por otros administradores sin necesidad de recargar la página.
- Poder crear usuarios con rol como input en el formulario, para poder crear usuarios administradores desde la aplicación
 
Actualmente se tiene una limitación ya que solo se crea un usuario en la colección de employee más no en Firebase Authentication esto debido a que la contraseña tiene que ser randómica y si utilizo dentro de la aplicación la función de firebase para registrar un usuario, se inicia sesión automáticamente con ese usuario, por ende la solución sería
- Crear un trigger en firebase que ejecute el registro de un usuario cada vez que se crea un documento dentro de la colección de employees. Esto tambn puede ser hecho desde AWS con una función lambda. Aunque esta tarea puede ser realizado por el equipo de backend


## Installation

Ejecutar los siguientes comandos

```sh
cd vac-inventory
npm i
npm run dev
```

Luego ir al navegador o dar click en el link dado en la consola


La aplicación es funcional en un 90% ya que los nuevos usuarios no pueden ingresar a la plataforma debido a que actualmente hace falta la función remota que ejecute el registro cuando se agregué un nuevo empleado a la coleccion de firestore

Pero para poder probar la aplicación he dejado algunos usuarios creados, a continuación detallo las diferentes credenciales de cada uno
| usuario | contraseña | rol |
| ------ | ------ | ------ |
| `andresxavier99@gmail.com` | `c0ntr453ña` | admin |
| `jhon@example.com` | `temp123` | employee |
| `jhon@example.com` | `temp123` | employee |
| `jhon@example.com` | `temp123` | employee |
| `jhon@example.com` | `temp123` | employee |


## Tecnologías usadas

| Technologías | Descripción |
| ------ | ------ |
| React | Framework de js para el frontend |
| Mantine | Librería de css compatible con React, principal proveedor de componentes y manejo de formularios a través de hooks |
| Ag grid | Librería de tabla virtualizada para el manejo de grandes cantidades de datos y filtrado de ellos |
| React Router DOM v6 | Librería de ruteo para aplicaciones de React |
| Yup | Librería para generar esquemas de validación de formularios |
| Github | Versionador de código |
| Vite | Bundler de la aplicación,usado debido a que es más rápido de webpack |
| Firebase Auth | Manejador de usuarios de la aplicación |
| Firestore | Base de datos basada en documentos en la nube |

## Carácterísticas de la aplicación
- Ingresar como administrador o como empleado desde urls distintas para que el usurio administrador pueda diferenciar fácilmente en a que aplicación va a ingresar
- Drawer responsivo con la navegación para as distintas pantallas de los usuario (implementada solo la UI no lógica de navegación)
- Light/Dark mode en el Appbar de la applicación

#### Administradores
- Puedes crear nuevos usuarios
- Listar usuarios en una tabla
- Filtrar usuarios directamente en la tabla por cualquier campo
- Seleccionar os usuario para borrar por lotes o de manera individual
- Ingresar a la información de los usuarios a través de un doble click en la fila de la tabla
- Editar la información de los usuarios

#### Empleados
- Pueden ingresar a su información dentro del menú ubicado en la esquina superior derecha de la pantalla para poder actualizarla





PD: **Espero les guste mi trabajo, puse mucho esfuerzo en el a pesar del poco tiempo que poseía ya que solo podía programar de tarde debido a que actualmente me encuentro trabajando**
