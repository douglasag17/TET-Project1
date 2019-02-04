# TET-Project1
Materia: Topicos Especiales en Telemática

Por: Douglas Ardila Garces

Email: dardila5@eafit.edu.co

1. Descripción de aplicación:

    Primer proyecto de Topicos Especiales en Telemática. 
    
    Aplicación desarrollada con Mongodb, Express, Nodejs, Javascript, Api Google Maps para Javascript
    Cada usuario puede crear, editar y borrar rutas agregando coordenadas (puntos) a esta ruta. Luego podrás compartir tus rutas con otros usuarios.
    
2. Instrucciones de uso:
    
    Para instalar modulos de Nodejs usados:
    
        npm install
    Para iniciar la applicacion en el localhost:3000
    
        npm start
    Para instalar mongodb siga esta guia de acuerdo a su sistema operativo
    
        https://docs.mongodb.com/manual/installation/
    
3. Modelo de datos
    
        User:
        {
            name: String,
            email: String,
            password: String,
            date: Date
        }

        Point:
        {
            latitude: String,
            longitude: String,
            date: Date,
            user: String
        }

        Route:
        {
            name: String,
            route: String,
            date: Date
        }

4. Servicios Web
    

5. Despliegue (DCA y nube IaaS de AWS) con docker
    
    DCA
        
        https://dardila5.dis.eafit.edu.co/
    Nube IaaS de AWS
        
        http://ec2-18-206-35-89.compute-1.amazonaws.com/
        
