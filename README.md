# Discord Clon

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

Referencias -> https://www.youtube.com/watch?v=ZbX4Ok9YX94&t=605s
https://github.com/AntonioErdeljac/next13-discord-clone

## To fix Hydration issues

1. const [isMounted, setIsMounted] = useState(false)

2. useEffect(() => {
        setIsMounted(true)
    }, [])
    
3. if (!isMounted) return null
