# Discord Clon

Este es un clon de Discord, una aplicación de chat y voz en tiempo real. Este proyecto está construido con NextJS, TypeScript entre otras librerías.

## Librerías instaladas

1. Tailwind: un framework de CSS que permite crear diseños personalizados de manera rápida y sencilla.

2. Shadcn/ui: una librería de componentes de React que proporciona una amplia variedad de elementos de interfaz de usuario.

3. Clerk: una plataforma de autenticación y autorización que permite agregar fácilmente funciones de inicio de sesión y registro a una aplicación.

4. Next-Themes: una librería de React que permite agregar soporte para temas oscuros y claros a una aplicación.

5. Prisma: un ORM (Object-Relational Mapping) para Node.js que permite interactuar con una base de datos de manera sencilla y segura.

6. React Hook Form: una librería de React que permite crear formularios de manera sencilla y eficiente.

7. uploadthing: una librería de React que permite subir archivos a un servidor.

8. react-dropzone: una librería de React que proporciona una zona de arrastrar y soltar para subir archivos.

9. Axios: Nos permite realizar solicitudes HTTP desde el navegador o desde Node.js.

10. UUID: una librería de JavaScript que permite generar identificadores únicos.

11. Zustand: una librería de React que permite gestionar el estado de una aplicación de manera sencilla y eficiente.

12. Query-String: una librería de JavaScript que permite analizar y generar cadenas de consulta.

13. Socket.io: una librería de Node.js que permite agregar soporte para comunicación en tiempo real a una aplicación.

14. Socket.io Client: una librería de JavaScript que permite conectarse a un servidor de Socket.io desde el navegador.

15. emoji-mart, @emoji-mart/data, @emoji-mart/react: una colección de librerías de React que proporcionan una amplia variedad de emojis.

16. @tanstack/react-query: una librería de React que permite realizar solicitudes a una API de manera sencilla y eficiente.

## Cómo ejecutar el proyecto

Para ejecutar este proyecto, sigue estos pasos:

1. Clona este repositorio en tu máquina local.

2. Abre una terminal en la carpeta raíz del proyecto.

3. Ejecuta el siguiente comando para instalar las dependencias:

```
npm install
```

4. Ejecuta el siguiente comando para iniciar la aplicación:

```
npm run dev
```

5. Abre tu navegador y navega a http://localhost:3000 para ver la aplicación en funcionamiento.

Cómo contribuir
Si deseas contribuir a este proyecto, sigue estos pasos:

Haz un fork de este repositorio.

Clona tu fork en tu máquina local.

Crea una nueva rama para tu contribución:

Realiza tus cambios y haz commit de tus cambios:

Haz push de tus cambios a tu fork:

Abre un pull request en este repositorio y describe tus cambios.

Espera a que se revise y apruebe tu pull request.

Licencia
Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE.md para obtener más información.

## Librerías instaladas

1. Tailwind
2. Shadcn/ui
3. Clerk
4. Next-Themes
5. Prisma
   npx prisma generate -> Cada vez que modifiquemos el schema prisma
   npx prisma db push -> Creamos las colecciones en planetscale o mysql gestion
   npx prisma studio -> Para ver las tablas

6. React Hook Form
7. uploadthing
8. react-dropzone

9. Axios
10. UUID

11. Zustand
12. Query-String

13. Socket.io
14. Socket.io CLient

15. emoji-mart @emoji-mart/data @emoji-mart/react
16. @tanstack/react-query

17. dat-fns
18. LiveKit

Referencias -> https://www.youtube.com/watch?v=ZbX4Ok9YX94&t=605s

## To fix Hydration issues

1. const [isMounted, setIsMounted] = useState(false)

2. useEffect(() => {
   setIsMounted(true)
   }, [])
3. if (!isMounted) return null
