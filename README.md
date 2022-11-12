# Vac Inventory
## Prueba técnica

## Proceso de desarrollo
- Primero se procedí a realizar un boceto a mano en una hoja de las diferentes pantallas que iba a necesitar. Con un poco más de tiempo hubiera procedido a válidar los distintos prototipos para mejorar la experiencia de usuario. Aunque dentro de un equipo de desarrollo se agradecería que este trabajo lo hiciera el UX/UI Designer.
- Luego decidí escoger las herramientas que podrían permitirme obtener un resultado funcional de manera eficiente
- Usando vite se puede crear un proyecto de React de manera rápida con el comando vite `npm create vite@latest`
- Procedí a crear las diferentes directorios que iba a utilizar
<img width="164" alt="CleanShot 2022-11-11 at 23 12 48@2x" src="https://user-images.githubusercontent.com/56695700/201456530-3aba673e-bb91-488a-93a7-01f8f5aa6490.png">

- Empecé a crear las diferentes páginas que iban a aparecer en la aplicación en conjunto con los componentes que iban a utilizarse dentro de ellas, con dummy data. Cabe recalcar que hay dos páginas de inicio de sesión por un tema de experiencia de usuario debido a que quería que los usuarios administradores puedan diferenciar cuando quieran ingresar como administrador
- Utilizando el hook de formularios `useForm` que provee la librería manttine, en conjunto con la librería Yup implenté los formularios con sus respectivas validaciones. 
- Agregué el componente de tabla que provee la librería AgGrid para mostrar los empleados. La rázon por la que agregué esta dependencia fue con el propósito de mantener un buen rendimiento al mostrar una gran cantidad de empleados ya que posee virtualización. Además, permite varias funciones ya implementadas como el filtrad por columna o permitir descargar la info a csv o xls, para exportar de manera fácil la información como un futuro feature de la app.
- Procedí a crear un layout que se encuentra dentro de la carpeta layout
- Procedí a realizar el routing de la aplicción utilizando react-router-dom v6
- Luego cree la aplicación en Firebase para poder utilizar sus servicios
- Cree un usuario administrador y al estar utilizando roles tuve que enlazarlo con una colección en firestore
- Cree una colección de employees en firestore para enlazar los usuarios con un respectivo documento con toda la información extra del usuario (Esta info por lo general no se sube a github, pero por motivos de que se pueda probar fácilmente la aplicación decidí subirlo)
- Procedí crear un usuario de administrador y unos usuarios de empleador para poder consumir sus datos dentro de la app
<img width="1283" alt="CleanShot 2022-11-11 at 23 16 18@2x" src="https://user-images.githubusercontent.com/56695700/201456624-3ef1a968-6839-4685-8d27-5b08fc424222.png">

<img width="963" alt="CleanShot 2022-11-11 at 23 16 58@2x" src="https://user-images.githubusercontent.com/56695700/201456647-ea7f3599-f8e9-4917-837a-cdee4120057a.png">

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
- Crear un trigger similar al anterior pero que sea ejecutado cuando un usuario sea eliminado para que no tenga acceso a la aplicación los usuarios eliminados


## Installation

Ejecutar los siguientes comandos

```sh
cd vac-inventory
npm i
npm run dev
```

Luego ir al navegador o dar click en el link dado en la consola

<img width="259" alt="CleanShot 2022-11-11 at 23 43 12@2x" src="https://user-images.githubusercontent.com/56695700/201457444-7e10c65e-9e00-46b8-aa73-52004b31d6fe.png">


La aplicación es funcional en un 90% ya que los nuevos usuarios no pueden ingresar a la plataforma debido a que actualmente hace falta la función remota que ejecute el registro cuando se agregué un nuevo empleado a la coleccion de firestore

Pero para poder probar la aplicación he dejado algunos usuarios creados, a continuación detallo las diferentes credenciales de cada uno
| usuario | contraseña | rol |
| ------ | ------ | ------ |
| `andresxavier99@gmail.com` | `c0ntr453ña` | admin |
| `pame@example.com` | `admin123` | admin |
| `gaby@example.com` | `temp123` | employee |
| `chiripa@example.com` | `temp123` | employee |
| `jhon@example.com` | `temp123` | employee |

Por favor no borrar los empleados mostrados en la tabla anterior, sin antes probar lo que puede hacer el usuario empleado dentro de la app

Para poder ingresar como admin la url sería: http://127.0.0.1:5173/admin

Para poder ingresar como admin la url sería : http://127.0.0.1:5173/




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
<img width="1178" alt="CleanShot 2022-11-11 at 23 41 32@2x" src="https://user-images.githubusercontent.com/56695700/201457412-02328b1c-a1f2-4e00-a4a6-6a95de1f24fc.png">
<img width="1178" alt="CleanShot 2022-11-11 at 23 41 32@2x" src="https://user-images.githubusercontent.com/56695700/201457416-bd9bf333-2cf0-47c5-a3a7-73cf6dfd0ced.png">
<img width="1171" alt="CleanShot 2022-11-11 at 23 42 26@2x" src="https://user-images.githubusercontent.com/56695700/201457430-4f784686-247e-4005-baa1-99df96fe419f.png">
<img width="479" alt="CleanShot 2022-11-11 at 23 42 51@2x" src="https://user-images.githubusercontent.com/56695700/201457438-97d84534-0ba3-45c4-9060-13871cc8140c.png">


#### Empleados
- Pueden ingresar a su información dentro del menú ubicado en la esquina superior derecha de la pantalla para poder actualizarla
<img width="323" alt="CleanShot 2022-11-11 at 23 20 33@2x" src="https://user-images.githubusercontent.com/56695700/201456781-6d63fa3c-6dc5-41bb-b63c-82e8b2d4f8b8.png">
<img width="1180" alt="CleanShot 2022-11-11 at 23 21 16@2x" src="https://user-images.githubusercontent.com/56695700/201456799-3e206c4e-b6b7-49cf-8ed5-e32e51463b45.png">





PD: **Espero les guste mi trabajo, puse mucho esfuerzo en el a pesar del poco tiempo que poseía ya que solo podía programar de tarde debido a que actualmente me encuentro trabajando**
