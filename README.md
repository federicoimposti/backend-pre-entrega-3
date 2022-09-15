## Segunda pre-entrega Backend Coderhouse

 1. Clonar el proyecto.
 2. Realizar la instalación de dependencias ejecutando `npm i`
 3. En la raíz del proyecto ejecutar `nodemon src/app.js`

En el archivo .env al cambiar el valor de `PERS` es posible cambiar el método de persistencia: `memory`, `mongodb`, `firebase`, `file`.

 4. Una vez que el proyecto está corriendo, será posible realizar request CRUD en sus distintos métodos de persistencia. Para el caso de peticiones POST de productos, a modo de ejemplo, enviar en el BODY con algún cliente:

	    {
			    "title": "Cuadrícula",
	            "description": "Cuadrícula ideal para matemática.",
	            "codigo": "12311",
	            "thumbnail": "https://google.com.ar/image/",
	            "price": "32131",
	            "stock": "4"
	     }