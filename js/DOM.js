//Funcion que inicializa todos los objetos y la relacion entre ellos
function initPopulate(){
	var resource = new Resource(180,"http://www.alec.com/resource",["Español","Ingles"],["Chino","Japones"]);
	var resource1 = new Resource(120,"http://www.alec.com/resource");
	var resource2 = new Resource(25,"http://www.alec.com/resource",["Español","Ingles"],["Ruso","Ingles"]);
	var resource3 = new Resource(50,"http://www.alec.com/resource",["Español","Ingles"],["Aleman","Ingles"]);

	var season = new Season("Temporada 1",[
		{title:'Episodio 1',episode: resource, scenarios:[new Coordinate(12,20)]},
		{title:'Episodio 2',episode: resource1, scenarios:[new Coordinate(21,30)]}
		]);
	var season1 = new Season("Temporada 2",[
			{title:'Episodio 1',episode: resource1, scenarios:[new Coordinate(12,20)]},
			{title:'Episodio 2',episode: resource2, scenarios:[new Coordinate(21,30)]}
			]);
	var season2 = new Season("Temporada 3",[]);

	//Se crea el objeto VideoSystem y se le añade el nombre 
	try {
		var video = VideoSystem.getInstance();
		video.name = "ALEC VIDEOCLUB";
	} catch (error) {
		console.log("" + error);
	}

	video.addResource(resource);
	video.addResource(resource1);
	video.addResource(resource2);
	video.addResource(resource3);

	video.addSeason(season);
	video.addSeason(season1);
	video.addSeason(season2);

	var baseDatos = indexedDB.open("VideoSystem");
	baseDatos.onsuccess = function(event) { 
		var db = event.target.result;        
		var almacenes = db.transaction(["Categorias","Directores","Actores","Producciones","Usuarios"]);      
		var tablaCategoria = almacenes.objectStore("Categorias");

		tablaCategoria.openCursor().onsuccess = function(event){
			var cursor = event.target.result;

			if(cursor){
				var categoria = new Category(cursor.value.Nombre, cursor.value.Descripcion);
				video.addCategory(categoria);

				cursor.continue();
			}
		}

		var tablaUsuarios = almacenes.objectStore("Usuarios");      
		
		tablaUsuarios.openCursor().onsuccess = function(event){
			var cursor = event.target.result;

			if(cursor){
				var usuario = new User(cursor.value.Usuario, cursor.value.Email, cursor.value.Contraseña);
				video.addUser(usuario);

				cursor.continue();
			}
		}

		var tablaProducciones = almacenes.objectStore("Producciones");      
		
		tablaProducciones.openCursor().onsuccess = function(event){
			var cursor = event.target.result;

			if(cursor){

				if(cursor.value.Tipo === "Serie"){
					var produccion = new Serie(cursor.value.Titulo,cursor.value.Nacionalidad,new Date(cursor.value.Publicacion),cursor.value.Synopsis,cursor.value.Imagen,cursor.value.Temporadas);
				}else{
					var produccion = new Movie(cursor.value.Titulo,cursor.value.Nacionalidad,new Date(cursor.value.Publicacion),cursor.value.Synopsis,cursor.value.Imagen,new Resource(cursor.value.Recurso),cursor.value.Localizacion);
				}

				video.addProduction(produccion);

				cursor.continue();
			}
		}

		var tablaActores = almacenes.objectStore("Actores");      
		
		tablaActores.openCursor().onsuccess = function(event){
			var cursor = event.target.result;

			if(cursor){
				var persona = new Person(cursor.value.Nombre, cursor.value.Apellido1, cursor.value.Apellido2, new Date(cursor.value.Nacimiento), cursor.value.Imagen);

				video.addActor(persona);

				cursor.continue();
			}
		}

		var tablaDirectores = almacenes.objectStore("Directores");      
		
		tablaDirectores.openCursor().onsuccess = function(event){
			var cursor = event.target.result;

			if(cursor){
				var persona = new Person(cursor.value.Nombre, cursor.value.Apellido1, cursor.value.Apellido2, new Date(cursor.value.Nacimiento), cursor.value.Imagen);

				video.addDirector(persona);

				cursor.continue();
			}
		}

		almacenes.oncomplete = function(event){
			var almacenesAsignar = db.transaction(["AsignarCategorias","AsignarActores","AsignarDirectores"]);
			var tablaAsignacionCatePro = almacenesAsignar.objectStore("AsignarCategorias");      
		
			tablaAsignacionCatePro.openCursor().onsuccess = function(event){
				var cursor = event.target.result;

				if(cursor){
					var encontradoCate = false;
					var categorias = video.categories;
					var categoria = categorias.next();

					while ((categoria.done !== true) && (!encontradoCate)){
						if (categoria.value.name == cursor.value.Categoria) {
							
							for(let i = 0; i < cursor.value.Producciones.length; i++){
								var encontradoPro = false;
								var producciones = video.productions;
								var produccion = producciones.next();

								while ((produccion.done !== true) && (!encontradoPro)){
									if (produccion.value.title == cursor.value.Producciones[i]) {
										
										video.assignCategory(categoria.value,produccion.value);

										encontradoPro = true;
									}
									produccion = producciones.next();
								}
							}
							encontradoCate = true;
						}
						categoria = categorias.next();
					}
					cursor.continue();
				}
			}

			var tablaAsignacionActPro = almacenesAsignar.objectStore("AsignarActores");      
		
			tablaAsignacionActPro.openCursor().onsuccess = function(event){
				var cursor = event.target.result;

				if(cursor){
					var encontradoAct = false;
					var actores = video.actors;
					var actor = actores.next();

					while ((actor.done !== true) && (!encontradoAct)){
						if (actor.value.name == cursor.value.Actor) {
							
							for(let i = 0; i < cursor.value.Producciones.length; i++){
								var encontradoPro = false;
								var producciones = video.productions;
								var produccion = producciones.next();

								while ((produccion.done !== true) && (!encontradoPro)){
									if (produccion.value.title == cursor.value.Producciones[i].Nombre) {
										
										video.assignActor(actor.value,produccion.value,cursor.value.Producciones[i].Papel, cursor.value.Producciones[i].Principal);

										encontradoPro = true;
									}
									produccion = producciones.next();
								}
							}
							encontradoAct = true;
						}
						actor = actores.next();
					}
					cursor.continue();
				}
			}

			var tablaAsignacionDirPro = almacenesAsignar.objectStore("AsignarDirectores");      
		
			tablaAsignacionDirPro.openCursor().onsuccess = function(event){
				var cursor = event.target.result;

				if(cursor){
					var encontradoDir = false;
					var directores = video.directors;
					var director = directores.next();

					while ((director.done !== true) && (!encontradoDir)){
						if (director.value.name == cursor.value.Director) {
							
							for(let i = 0; i < cursor.value.Producciones.length; i++){
								var encontradoPro = false;
								var producciones = video.productions;
								var produccion = producciones.next();

								while ((produccion.done !== true) && (!encontradoPro)){
									if (produccion.value.title == cursor.value.Producciones[i]) {
										
										video.assignDirector(director.value,produccion.value);

										encontradoPro = true;
									}
									produccion = producciones.next();
								}
							}
							encontradoDir = true;
						}
						director = directores.next()
					}
					cursor.continue();
				}
			}
		}
	}
}//Fin de initPopulate


//Carga las tarjetas de la pagina de inicio con las categorias
function showHomePage(){
	//Selecciona el titulo central y le cambia el nombre
	var tituloContenido = document.getElementById("tituloZona");
	tituloContenido.removeAttribute("class");
	tituloContenido.innerHTML = "Categorias del sistema";

	//Selecciona la zona central donde van las tarjetas de las categorias
	var tarjetas = document.getElementById("tarjetasZona");

	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (tarjetas.firstChild) {
		tarjetas.removeChild(tarjetas.firstChild);
	}

	//Con un iterador recorremos todas las categorias del sistema
	video = VideoSystem.getInstance();
	var categorias = video.categories; 
	var categoria = categorias.next();

	while (categoria.done !== true){
		//Crea las card de la zona central
		var tarjeta = document.createElement("div");
		tarjeta.setAttribute("class","col-lg-4 col-md-6 mb-4");
		var borde = document.createElement("div");
		borde.setAttribute("class","card h-100");
		var cuerpo = document.createElement("div");
		cuerpo.setAttribute("class","card-body");
		var imagen = document.createElement("img");
		imagen.setAttribute("class","card-img-top");

		/* FOTO DE LAS TARJETAS */ 
		imagen.setAttribute("src","img/"+categoria.value.name+".png");
		imagen.setAttribute("alt",categoria.value.name);
		var button = document.createElement("button");

		//ID que sirve para recoger la categoria pulsada en el evento
		button.setAttribute("id","botonCategoria");
		button.setAttribute("type","button");
		button.setAttribute("value",categoria.value.name);
		button.setAttribute("class","btn btn-link btn-lg btn-block");
		button.appendChild(document.createTextNode(categoria.value.name));	
		var descripCategory = document.createElement("p");
		descripCategory.setAttribute("class","card-text");

		/* DESCRIPCION DE LAS TARJETAS */ 
		descripCategory.appendChild(document.createTextNode(categoria.value.description));
		var valoracion = document.createElement("div");
		valoracion.setAttribute("class","card-footer");
		var estrellas = document.createElement("small");
		estrellas.setAttribute("class","text-muted");

		/* ESTRELLAS QUE SE MUESTRAN EN LAS TARJETAS */ 
		estrellas.appendChild(document.createTextNode('Valoracion'));
		
		//Se crea la estructura de las tarjetas con appendChild
		tarjetas.appendChild(tarjeta);
		tarjeta.appendChild(borde);
		borde.appendChild(cuerpo);
		cuerpo.appendChild(imagen);
		cuerpo.appendChild(button);
		cuerpo.appendChild(descripCategory);
		cuerpo.appendChild(valoracion);
		valoracion.appendChild(estrellas);
	
		//Añade eventos al hacer click sobre la imagen o sobre el nombre de la categoria
		button.addEventListener("click", showProductions);

        //Pasa a la siguiente categoria
		categoria = categorias.next();
	}//FIn del while iterador

}//Fin de categoriesMenuPopulate

//Carga el menu lateral con las categorias
function categoriesMenuPopulate(){
	//Selecciona el menu lateral donde van a ir las categorias del sistema
	var menu = document.getElementById("columnaCategorias").getElementsByClassName("list-group")[0];

	while (menu.firstChild) {
		menu.removeChild(menu.firstChild);
	}

	//Con un iterador recorremos todas las categorias del sistema
	video = VideoSystem.getInstance();
	var categorias = video.categories;
	var categoria = categorias.next();

	while (categoria.done !== true){
		//Crea las opciones
		var enlace = document.createElement("button");
		enlace.setAttribute("class","list-group-item btn btn-link");
		enlace.setAttribute("value",categoria.value.name);
		enlace.appendChild(document.createTextNode(categoria.value.name));
		enlace.addEventListener("click", showProductions);
		menu.appendChild(enlace);
		
        //Pasa a la siguiente categoria
		categoria = categorias.next();
	}//FIn del while iterador

	var enlace = document.createElement("button");
	enlace.setAttribute("class","mt-4 list-group-item btn btn-link");
	enlace.setAttribute("id","ocultarCerrarVenta");
	enlace.appendChild(document.createTextNode("Cerrar ventanas"));
	enlace.addEventListener("click", cerrarVentanas);
	menu.appendChild(enlace);

}//Fin de showHomePage

//Muestra un listado con los actores del sistema.
function showActors(){
	//Selecciona el titulo central y le cambia el nombre
	var tituloContenido = document.getElementById("tituloZona");
	tituloContenido.removeAttribute("class");
	tituloContenido.innerHTML = "Actores del sistema";

	//Selecciona la zona central donde van las tarjetas de las categorias
	var contenido = document.getElementById("tarjetasZona");

	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (contenido.firstChild) {
		contenido.removeChild(contenido.firstChild);
	}

	//SE PONE EL NUEVO CONTENIDO QUE TIENE QUE SER TODOS LOS ACTORES DEL SISTEMA
	video = VideoSystem.getInstance();
	var actores = video.actors;
	var actor = actores.next();
	while (actor.done !== true){
		//Crea las tarjetas de las producciones en la zona central
		var tarjeta = document.createElement("div");
		tarjeta.setAttribute("class","col-lg-4 col-md-6 mb-4");
		var borde = document.createElement("div");
		borde.setAttribute("class","card h-100");
		var cuerpo = document.createElement("div");
		cuerpo.setAttribute("class","card-body");
		var imagen = document.createElement("img");
		imagen.setAttribute("class","card-img");
		imagen.setAttribute("width","220");
		imagen.setAttribute("heigh","272");

		/* FOTO DE LAS TARJETAS */ 
		imagen.setAttribute("src","img/"+actor.value.name+" "+actor.value.lastname1+".png");
		imagen.setAttribute("alt",actor.value.name);
		var button = document.createElement("button");

		//ID que sirve para recoger la produccion pulsada en el evento
		button.setAttribute("id","botonActor");
		button.setAttribute("type","button");
		var nombre = actor.value.name+" "+actor.value.lastname1;
		button.setAttribute("value",nombre);
		button.setAttribute("class","btn btn-link btn-lg btn-block");
		button.appendChild(document.createTextNode(nombre));	

		var valoracion = document.createElement("div");
		valoracion.setAttribute("class","card-footer");
		var estrellas = document.createElement("small");
		estrellas.setAttribute("class","text-muted");

		/* ESTRELLAS QUE SE MUESTRAN EN LAS TARJETAS */ 
		estrellas.appendChild(document.createTextNode('Valoracion'));
		
		//Se crea la estructura de las tarjetas con appendChild
		contenido.appendChild(tarjeta);
		tarjeta.appendChild(borde);
		borde.appendChild(cuerpo);
		cuerpo.appendChild(imagen);
		cuerpo.appendChild(button);
		cuerpo.appendChild(valoracion);
		valoracion.appendChild(estrellas);
	
		//Añade eventos al hacer click sobre la imagen o sobre el nombre de la categoria
		button.addEventListener("click", showActor);
		//imagen.addEventListener("click", showActor);			

		//Pasa al siguiente actor
		actor = actores.next();
	}//Fin del while

}//Fin de showActors

//Muestra un listado con los directores del sistema.
function showDirectors(){
	//Cambia el titulo de la pagina principal
	var tituloContenido = document.getElementById("tituloZona");
	tituloContenido.removeAttribute("class");
	tituloContenido.innerHTML = "Directores del sistema";

	//Se selecciona la zona donde va a ir el nuevo contenido
	var contenido = document.getElementById("tarjetasZona");

	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (contenido.firstChild) {
		contenido.removeChild(contenido.firstChild);
	}

	//SE PONE EL NUEVO CONTENIDO QUE TIENE QUE SER TODOS LOS ACTORES DEL SISTEMA
	video = VideoSystem.getInstance();
	var directores = video.directors;
	var director = directores.next();
	while (director.done !== true){
		//Crea las tarjetas de las producciones en la zona central
		var tarjeta = document.createElement("div");
		tarjeta.setAttribute("class","col-lg-4 col-md-6 mb-4");
		var borde = document.createElement("div");
		borde.setAttribute("class","card h-100");
		var cuerpo = document.createElement("div");
		cuerpo.setAttribute("class","card-body");
		var imagen = document.createElement("img");
		imagen.setAttribute("class","card-img");
		imagen.setAttribute("width","750");
		imagen.setAttribute("heigh","200");

		/* FOTO DE LAS TARJETAS */ 
		imagen.setAttribute("src","img/"+director.value.name +".png");
		imagen.setAttribute("alt",director.value.name);
		var button = document.createElement("button");

		//ID que sirve para recoger la produccion pulsada en el evento
		button.setAttribute("id","botonDirector");
		button.setAttribute("type","button");
		var nombre = director.value.name+" "+director.value.lastname1;

		if (director.value.lastName2 != null) {
			nombre += " " + director.value.lastname2
		}

		button.setAttribute("value",nombre);
		button.setAttribute("class","btn btn-link btn-lg btn-block");
		button.appendChild(document.createTextNode(nombre));	
		var valoracion = document.createElement("div");
		valoracion.setAttribute("class","card-footer");
		var estrellas = document.createElement("small");
		estrellas.setAttribute("class","text-muted");

		/* ESTRELLAS QUE SE MUESTRAN EN LAS TARJETAS */ 
		estrellas.appendChild(document.createTextNode('Valoracion'));
		
		//Se crea la estructura de las tarjetas con appendChild
		contenido.appendChild(tarjeta);
		tarjeta.appendChild(borde);
		borde.appendChild(cuerpo);
		cuerpo.appendChild(imagen);
		cuerpo.appendChild(button);
		cuerpo.appendChild(valoracion);
		valoracion.appendChild(estrellas);

		//Añade eventos al hacer click sobre la imagen o sobre el nombre de la categoria
		button.addEventListener("click", showDirector);
		//imagen.addEventListener("click", showDirector);			

		//Pasa al siguiente actor
		director = directores.next();
	}//Fin del while
}//Fin de ShowDirectors

//Dado un actor muestra toda su información relacionada, incluida sus producciones.
function showActor(){
	//Quita el titulo de la zona
	var tituloContenido = document.getElementById("tituloZona");
	tituloContenido.removeAttribute("class");
	tituloContenido.innerHTML = this.value;

	var buttonAtras = document.createElement("button");
	buttonAtras.setAttribute("id","volverAtras");
	buttonAtras.setAttribute("type","button");
	buttonAtras.setAttribute("class","btn btn-primary");
	buttonAtras.appendChild(document.createTextNode("Volver atrás"));

	//Se selecciona la zona donde va a ir el nuevo contenido
	var contenido = document.getElementById("tarjetasZona");
	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (contenido.firstChild) {
		contenido.removeChild(contenido.firstChild);
	}

	//SE PONE EL NUEVO CONTENIDO QUE TIENE QUE SER LA PRODUCCION SELECCIONADA
	var encontrado = false;
	var actores = video.actors;
	var actor = actores.next();
	while ((actor.done !== true) && (!encontrado)){
		//Si coincide el name, lastName1 y lastName2 con el this.value es el actor seleccionado
		var nombreCompleto = actor.value.name +" "+ actor.value.lastname1;

		if (nombreCompleto == this.value){
			//Crea las tarjetas de las producciones en la zona central
			var tarjeta = document.createElement("div");
			tarjeta.setAttribute("class","col-lg-12 col-md-12 mb-4");
			var borde = document.createElement("div");
			borde.setAttribute("class","card h-100");
			var cuerpo = document.createElement("div");
			cuerpo.setAttribute("class","card-body");
			var imagen = document.createElement("img");
			imagen.setAttribute("class","card-img");
			imagen.setAttribute("width","750");
			imagen.setAttribute("heigh","200");

			/* FOTO DE LAS TARJETAS */ 
			imagen.setAttribute("src","img/"+nombreCompleto+"1.png");
			imagen.setAttribute("alt",actor.value.name);

			/*NACIONALIDAD DEL ACTOR */
			var nombre = document.createElement("p");
			nombre.setAttribute("class","card-text cajaTitulo");
			nombre.appendChild(document.createTextNode("Nombre: " + nombreCompleto));

			/* FECHA DE NACIMIENTO DEL ACTOR */
			var nacimiento = document.createElement("p");
			nacimiento.setAttribute("class","card-text cajaTitulo");
			nacimiento.appendChild(document.createTextNode("Fecha de nacimiento: " + actor.value.born.toLocaleDateString()));	
			
			//Se crea la estructura de las tarjetas con appendChild
			contenido.appendChild(tarjeta);
			tarjeta.appendChild(borde);
			borde.appendChild(cuerpo);
			cuerpo.appendChild(imagen);	
			cuerpo.appendChild(nombre);
			cuerpo.appendChild(nacimiento);
			contenido.appendChild(buttonAtras);

			buttonAtras.addEventListener("click", showActors);

			var film = document.createElement("h4");
			film.setAttribute("class","card-text");
			film.appendChild(document.createTextNode("Producciones en las que ha participado: "));
			cuerpo.appendChild(film);
			var union = document.createElement("div");
			union.setAttribute("class","row");
			cuerpo.appendChild(union);

			//Muestra las producciones en las que esta asignado el actor
			var productions = video.getProductionsActor(actor.value);
			var production = productions.next();
			
			while (production.done !== true){
				var tarjeta = document.createElement("div");
				tarjeta.setAttribute("class","col-lg-4 col-md-6 mb-4");
				var borde = document.createElement("div");
				borde.setAttribute("class","card h-100");
				var cuerpo1 = document.createElement("div");
				cuerpo1.setAttribute("class","card-body");
				var imagen = document.createElement("img");
				imagen.setAttribute("class","card-img-top");
				imagen.setAttribute("width","750");
				imagen.setAttribute("heigh","200");

				/* FOTO DE LAS TARJETAS */ 
				imagen.setAttribute("src","img/"+production.value.title+" poster.png");
				imagen.setAttribute("alt",production.value.title);
				
				var button = document.createElement("button");

				//ID que sirve para recoger la produccion pulsada en el evento
				button.setAttribute("id",this.value);
				button.setAttribute("type","button");
				button.setAttribute("value",production.value.title);
				button.setAttribute("class","btn btn-link btn-lg btn-block");
				button.appendChild(document.createTextNode(production.value.title));	
				button.addEventListener("click", showProduction);

				var valoracion = document.createElement("div");
				valoracion.setAttribute("class","card-footer");
				var estrellas = document.createElement("small");
				estrellas.setAttribute("class","text-muted");
				
				/* ESTRELLAS QUE SE MUESTRAN EN LAS TARJETAS */ 
				estrellas.appendChild(document.createTextNode("Papel: "+production.papel));
	
				//Se crea la estructura de las tarjetas con appendChild
				union.appendChild(tarjeta);
				tarjeta.appendChild(borde);
				borde.appendChild(cuerpo1);
				cuerpo1.appendChild(imagen);
				cuerpo1.appendChild(button);
				cuerpo1.appendChild(valoracion);
				valoracion.appendChild(estrellas);
				
				//Pasa a la siguiente produccion del actor
				production = productions.next();
			}//Fin del while iterador de producciones de un actor

			encontrado = true;
		}//Fin del if principal del while
		//Pasamos al siguiente actor
		actor = actores.next();
	}//Fin del while iterador de actores
}//Fin de showActor

//Dado un director, muestra toda su información relacionada, incluida sus producciones
function showDirector(){
	//Quita el titulo de la zona
	var tituloContenido = document.getElementById("tituloZona");
	tituloContenido.removeAttribute("class");
	tituloContenido.innerHTML = this.value;

	var buttonAtras = document.createElement("button");
	buttonAtras.setAttribute("id","volverAtras");
	buttonAtras.setAttribute("type","button");
	buttonAtras.setAttribute("class","btn btn-primary");
	buttonAtras.appendChild(document.createTextNode("Volver atrás"));

	//Se selecciona la zona donde va a ir el nuevo contenido
	var contenido = document.getElementById("tarjetasZona");

	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (contenido.firstChild) {
		contenido.removeChild(contenido.firstChild);
	}

	//SE PONE EL NUEVO CONTENIDO QUE TIENE QUE SER LA PRODUCCION SELECCIONADA
	var encontrado = false;
	var directores = video.directors;
	var director = directores.next();
	while ((director.done !== true) && (!encontrado)){
		//Si coincide el name, lastName1 y lastName2 con el this.value es el actor seleccionado
		var nombreCompleto = director.value.name +" "+ director.value.lastname1;

		if (director.value.lastName2 != null) {
			nombreCompleto += " " + director.value.lastname2
		}

		if (nombreCompleto == this.value){
			//Crea las tarjetas de las producciones en la zona central
			var tarjeta = document.createElement("div");
			tarjeta.setAttribute("class","col-lg-12 col-md-12 mb-4");
			var borde = document.createElement("div");
			borde.setAttribute("class","card h-100");
			var cuerpo = document.createElement("div");
			cuerpo.setAttribute("class","card-body");
			var imagen = document.createElement("img");
			imagen.setAttribute("class","card-img");
			imagen.setAttribute("width","750");
			imagen.setAttribute("heigh","200");

			/* FOTO DE LAS TARJETAS */ 
			imagen.setAttribute("src","img/"+director.value.name+"1.png");
			imagen.setAttribute("alt",director.value.name);

			/* NACIONALIDAD DEL ACTOR */
			var nombre = document.createElement("p");
			nombre.setAttribute("class","card-text cajaTitulo");
			nombre.appendChild(document.createTextNode("Nombre:"));
			var descripcion = document.createElement("p");
			descripcion.setAttribute("class","card-text cajaDescripcion");
			descripcion.appendChild(document.createTextNode(nombreCompleto));

			/* FECHA DE NACIMIENTO DEL DIRECTOR */
			var nacimiento = document.createElement("p");
			nacimiento.setAttribute("class","card-text cajaTitulo");
			nacimiento.appendChild(document.createTextNode("Fecha de nacimiento:"));
			var nacimientoDescript = document.createElement("p");
			nacimientoDescript.setAttribute("class","card-text cajaDescripcion");
			nacimientoDescript.appendChild(document.createTextNode(director.value.born.toLocaleDateString()));			
			
			//Se crea la estructura de las tarjetas con appendChild
			contenido.appendChild(tarjeta);
			tarjeta.appendChild(borde);
			borde.appendChild(cuerpo);
			cuerpo.appendChild(imagen);	
			cuerpo.appendChild(nombre);
			cuerpo.appendChild(descripcion);
			cuerpo.appendChild(nacimiento);
			cuerpo.appendChild(nacimientoDescript);
			contenido.appendChild(buttonAtras);

			buttonAtras.addEventListener("click", showDirectors);

			var film = document.createElement("h4");
			film.setAttribute("class","card-text");
			film.appendChild(document.createTextNode("Producciones en las que ha participado: "));
			cuerpo.appendChild(film);
			var union = document.createElement("div");
			union.setAttribute("class","row");
			cuerpo.appendChild(union);

			//Muestra las producciones en las que esta asignado el actor
			var productions = video.getProductionsDirector(director.value);
			var production = productions.next();

			while (production.done !== true){
				var tarjeta = document.createElement("div");
				tarjeta.setAttribute("class","col-lg-4 col-md-6 mb-4");
				var borde = document.createElement("div");
				borde.setAttribute("class","card h-100");
				var cuerpo1 = document.createElement("div");
				cuerpo1.setAttribute("class","card-body");
				var imagen = document.createElement("img");
				imagen.setAttribute("class","card-img-top");
				imagen.setAttribute("width","750");
				imagen.setAttribute("heigh","200");

				/* FOTO DE LAS TARJETAS */ 
				imagen.setAttribute("src","img/"+production.value.title+" poster.png");
				imagen.setAttribute("alt",production.value.title);
				
				var button = document.createElement("button");

				//ID que sirve para recoger la produccion pulsada en el evento
				button.setAttribute("id","1 " + this.value);
				button.setAttribute("type","button");
				button.setAttribute("value",production.value.title);
				button.setAttribute("class","btn btn-link btn-lg btn-block");
				button.appendChild(document.createTextNode(production.value.title));	
				button.addEventListener("click", showProduction);

				var valoracion = document.createElement("div");
				valoracion.setAttribute("class","card-footer");
				var estrellas = document.createElement("small");
				estrellas.setAttribute("class","text-muted");
				
				/* ESTRELLAS QUE SE MUESTRAN EN LAS TARJETAS */ 
				estrellas.appendChild(document.createTextNode("Papel:"));
	
				//Se crea la estructura de las tarjetas con appendChild
				union.appendChild(tarjeta);
				tarjeta.appendChild(borde);
				borde.appendChild(cuerpo1);
				cuerpo1.appendChild(imagen);
				cuerpo1.appendChild(button);
				cuerpo1.appendChild(valoracion);
				valoracion.appendChild(estrellas);
				
				//Pasa a la siguiente produccion del actor
				production = productions.next();
			}//Fin del while iterador de producciones de un actor

			encontrado = true;
		}//Fin del if principal del while
		//Pasamos al siguiente director
		director = directores.next();
	}//Fin del while iterador de directores
}//Fin de ShowDirector

function mostrarProduction(){
	//Cambia el titulo de la pagina principal
	var tituloContenido = document.getElementById("tituloZona");

	//El valor this.value lo recoge del valor del boton que hayamos pulsado
	tituloContenido.removeAttribute("class");
	tituloContenido.innerHTML = "Producciones del sistema";

	//Se selecciona la zona donde va a ir el nuevo contenido
	var contenido = document.getElementById("tarjetasZona");

	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (contenido.firstChild) {
		contenido.removeChild(contenido.firstChild);
	}

	//SE PONE EL NUEVO CONTENIDO QUE TIENE QUE SER LAS PRODUCCIONES DE UNA CATEGORIA
	video = VideoSystem.getInstance();
	var producciones = video.productions;
	var production = producciones.next();

	while (production.done !== true){
		//Crea las tarjetas de las producciones en la zona central
		var tarjeta = document.createElement("div");
		tarjeta.setAttribute("class","col-lg-4 col-md-6 mb-4");
		var borde = document.createElement("div");
		borde.setAttribute("class","card h-100");
		var cuerpo = document.createElement("div");
		cuerpo.setAttribute("class","card-body");
		var imagen = document.createElement("img");
		imagen.setAttribute("class","card-img-top");
		var tipo = document.createElement("span");
		tipo.setAttribute("class","badge");

		if(production.value instanceof Movie){
			tipo.appendChild(document.createTextNode("Pelicula"));
		}else{
			tipo.appendChild(document.createTextNode("Serie"));
		}

		imagen.setAttribute("width","750");
		imagen.setAttribute("heigh","200");

		/* FOTO DE LAS TARJETAS */ 
		imagen.setAttribute("src","img/"+production.value.title+" poster.png");
		imagen.setAttribute("alt",production.value.title);
		var button = document.createElement("button");

		//ID que sirve para recoger la produccion pulsada en el evento
		button.setAttribute("id","Produccion");
		button.setAttribute("type","button");
		button.setAttribute("value",production.value.title);
		button.setAttribute("class","btn btn-link btn-lg btn-block");
		button.appendChild(document.createTextNode(production.value.title));	
		
		//Se crea la estructura de las tarjetas con appendChild
		contenido.appendChild(tarjeta);
		tarjeta.appendChild(borde);
		borde.appendChild(cuerpo);
		cuerpo.appendChild(imagen);
		cuerpo.appendChild(button);
		button.appendChild(tipo);
		
		//Añade eventos al hacer click sobre la imagen o sobre el nombre de la categoria
		button.addEventListener("click", showProduction);
		//imagen.addEventListener("click", showProduction);	

		production = producciones.next()
	}//fin del while iterador
}

//Dado una categoría, muestra el listado de sus producciones.
function showProductions(){
	//Cambia el titulo de la pagina principal
	var tituloContenido = document.getElementById("tituloZona");

	//El valor this.value lo recoge del valor del boton que hayamos pulsado
	tituloContenido.removeAttribute("class");
	tituloContenido.innerHTML = this.value;

	//Se selecciona la zona donde va a ir el nuevo contenido
	var contenido = document.getElementById("tarjetasZona");

	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (contenido.firstChild) {
		contenido.removeChild(contenido.firstChild);
	}

	//SE PONE EL NUEVO CONTENIDO QUE TIENE QUE SER LAS PRODUCCIONES DE UNA CATEGORIA
	var encontrado = false;
	video = VideoSystem.getInstance();
	var categorias = video.categories;
	var categoria = categorias.next();

	while ((categoria.done !== true) && (!encontrado)){
		if (categoria.value.name == this.value) {
			//Si coincide nombre de la categoria con el valor del boton
			//Comienza el iterador de las producciones de esa categoria
			var productions = video.getProductionsCategory(categoria.value);
			var production = productions.next();

			while (production.done !== true){
				//Crea las tarjetas de las producciones en la zona central
				var tarjeta = document.createElement("div");
				tarjeta.setAttribute("class","col-lg-12 col-md-12 mb-4");
				var borde = document.createElement("div");
				borde.setAttribute("class","card h-100");
				var cuerpo = document.createElement("div");
				cuerpo.setAttribute("class","card-body");
				var imagen = document.createElement("img");
				imagen.setAttribute("class","card-img-top");
				var tipo = document.createElement("span");
				tipo.setAttribute("class","badge");

				if(production.value instanceof Movie){
					tipo.appendChild(document.createTextNode("Pelicula"));
				}else{
					tipo.appendChild(document.createTextNode("Serie"));
				}
	
				imagen.setAttribute("width","750");
				imagen.setAttribute("heigh","200");

				/* FOTO DE LAS TARJETAS */ 
				imagen.setAttribute("src","img/"+production.value.title+".png");
				imagen.setAttribute("alt",production.value.title);
				var button = document.createElement("button");

				//ID que sirve para recoger la produccion pulsada en el evento
				button.setAttribute("id",this.value);
				button.setAttribute("type","button");
				button.setAttribute("value",production.value.title);
				button.setAttribute("class","btn btn-link btn-lg btn-block");
				button.appendChild(document.createTextNode(production.value.title));	
				var descripProduction = document.createElement("p");
				descripProduction.setAttribute("class","card-text");

				/* DESCRIPCION DE LAS TARJETAS */ 
				descripProduction.appendChild(document.createTextNode(production.value.synopsis));
				var valoracion = document.createElement("div");
				valoracion.setAttribute("class","card-footer");
				var estrellas = document.createElement("small");
				estrellas.setAttribute("class","text-muted");

				/* ESTRELLAS QUE SE MUESTRAN EN LAS TARJETAS */ 
				estrellas.appendChild(document.createTextNode('Valoracion'));
				
				//Se crea la estructura de las tarjetas con appendChild
				contenido.appendChild(tarjeta);
				tarjeta.appendChild(borde);
				borde.appendChild(cuerpo);
				cuerpo.appendChild(imagen);
				cuerpo.appendChild(button);
				button.appendChild(tipo);
				cuerpo.appendChild(descripProduction);
				cuerpo.appendChild(valoracion);
				valoracion.appendChild(estrellas);
			
				//Añade eventos al hacer click sobre la imagen o sobre el nombre de la categoria
				button.addEventListener("click", showProduction);
				//imagen.addEventListener("click", showProduction);	

				production = productions.next();
			}//fin del while iterador

			//Variable para salir del bucle principal si encuentra la categoria
			encontrado = true;
		}//Fin del if que compara el nombre de la categoria con el valor del boton
		
        //Pasa a la siguiente categoria
		categoria = categorias.next();
	}//FIn del while iterador

}//Fin de showProductions

//Muestra la información de una producción, incluida su director y sus actores participantes.
function showProduction(){
	//Cambia el titulo de la zona
	var tituloContenido = document.getElementById("tituloZona");
	tituloContenido.setAttribute("class","ocultar");
	
	var categoria = this.getAttribute("id");
	var entrar = false;

	//Con este metodo comprobamos si el boton atras debe volver a directores
	if(categoria.substring(0, 1) == "1"){ 
		categoria = categoria.replace("1 ","");
		entrar = true;
	}

	var buttonAtras = document.createElement("button");

	buttonAtras.setAttribute("id","volverAtras");
	buttonAtras.setAttribute("type","button");
	buttonAtras.setAttribute("value",categoria);
	buttonAtras.setAttribute("class","btn btn-primary");
	buttonAtras.appendChild(document.createTextNode("Volver atrás"));

	//Se selecciona la zona donde va a ir el nuevo contenido
	var contenido = document.getElementById("tarjetasZona");

	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (contenido.firstChild) {
		contenido.removeChild(contenido.firstChild);
	}

	//SE PONE EL NUEVO CONTENIDO QUE TIENE QUE SER LA PRODUCCION SELECCIONADA
	var encontrado = false;
	var producciones = video.productions;
	var produccion = producciones.next();

	while ((produccion.done !== true) && (!encontrado)){
		if (produccion.value.title == this.value) {
			//Si coincide nombre de la produccion con el valor del boton muestra la informacion
			//Crea las tarjetas de las producciones en la zona central
			var tarjeta = document.createElement("div");
			tarjeta.setAttribute("class","col-lg-12 col-md-12 mb-4");
			var borde = document.createElement("div");
			borde.setAttribute("class","card h-100");
			var cuerpo = document.createElement("div");
			cuerpo.setAttribute("class","card-body");
			var titulo = document.createElement("h1");
			titulo.setAttribute("class","mx-auto");
			titulo.setAttribute("id","tituloProduccion")
			titulo.appendChild(document.createTextNode(produccion.value.title));
			var imagen = document.createElement("img");
			imagen.setAttribute("class","card-img");
			imagen.setAttribute("width","750");
			imagen.setAttribute("heigh","200");

			/* FOTO DE LAS TARJETAS */ 
			imagen.setAttribute("src","img/"+produccion.value.title+".png");
			imagen.setAttribute("alt",produccion.value.title);
			var nationality = document.createElement("p");
			nationality.setAttribute("class","card-text");

			/* NACIONALIDAD DE LA PRODUCCION */ 
			nationality.appendChild(document.createTextNode("Nacionalidad: " + produccion.value.nationality));
			var publication = document.createElement("p");
			publication.setAttribute("class","card-text");

			/* FECHA DE LA PRODUCCION */ 
			publication.appendChild(document.createTextNode("Fecha de publicacion: " + produccion.value.publication.toLocaleDateString()));
			var synopsis = document.createElement("p");
			synopsis.setAttribute("class","card-text");

			/* SIPNOSIS DE LA PRODUCCION */ 
			synopsis.appendChild(document.createTextNode("Sipnosis: " + produccion.value.synopsis));

			//Muestra el boton que abre una ventana nueva para mostrar los recursos
			var recurso = document.createElement("button");
			recurso.setAttribute("value",produccion.value.title);
			recurso.setAttribute("class","btn btn-link btn-lg btn-block");
			recurso.appendChild(document.createTextNode("Mostrar recursos")); 
			recurso.addEventListener("click", abrirVentana);

			//Se crea la estructura de las tarjetas con appendChild
			contenido.appendChild(titulo);	
			contenido.appendChild(tarjeta);
			contenido.appendChild(buttonAtras);
			tarjeta.appendChild(borde);
			borde.appendChild(cuerpo);
			cuerpo.appendChild(imagen);	
			cuerpo.appendChild(nationality);
			cuerpo.appendChild(publication);
			cuerpo.appendChild(synopsis);
			cuerpo.appendChild(recurso);


			//Todo este bloque de codigo es para saber el boton atras donde debe volver
			if(categoria === "Produccion"){
				buttonAtras.addEventListener("click", mostrarProduction);
			}else{
				if(entrar){
					buttonAtras.addEventListener("click", showDirector);
				}else{
					if(categoria == "Comedia" || categoria == "Romance" || categoria == "Terror" 
					|| categoria == "Acción" || categoria == "Ciencia Ficción" || categoria == "Drama"
					|| categoria == "Fantasía" || categoria == "Musical" || categoria == "Animacion"){
	
						buttonAtras.addEventListener("click", showProductions);
					}else{
						buttonAtras.addEventListener("click", showActor);
					}
				}
			}

			var union = document.createElement("div");
			union.setAttribute("class","row");
			cuerpo.appendChild(union);

			//Para mostrar los actores de la produccion necesitamos otro iterador
			var elenco = video.getCast(produccion.value);
			var actor = elenco.next();
			while (actor.done !== true){
				var tarjeta = document.createElement("div");
				tarjeta.setAttribute("class","col-lg-4 col-md-6 mb-4");
				var borde = document.createElement("div");
				borde.setAttribute("class","card h-100");
				var cuerpo = document.createElement("div");
				cuerpo.setAttribute("class","card-body");
				var tipo = document.createElement("h5");
				tipo.setAttribute("class","mx-auto text-center");
				tipo.setAttribute("id", "actorDirector");
				tipo.appendChild(document.createTextNode("Actor"));
				var imagen = document.createElement("img");
				imagen.setAttribute("class","card-img");
				imagen.setAttribute("width","220");
				imagen.setAttribute("heigh","272");

				/* FOTO DE LAS TARJETAS */ 
				imagen.setAttribute("src","img/"+actor.value.name+" "+actor.value.lastname1+".png");
				imagen.setAttribute("alt",actor.value.name);
				var button = document.createElement("button");

				//ID que sirve para recoger la produccion pulsada en el evento
				button.setAttribute("id","botonActor");
				button.setAttribute("type","button");
				var nombre = actor.value.name+" "+actor.value.lastname1;
				button.setAttribute("value",nombre);
				button.setAttribute("class","btn btn-link btn-lg btn-block");
				button.appendChild(document.createTextNode(nombre));	

				var valoracion = document.createElement("div");
				valoracion.setAttribute("class","card-footer");
				var estrellas = document.createElement("small");
				estrellas.setAttribute("class","text-muted");

				/* ESTRELLAS QUE SE MUESTRAN EN LAS TARJETAS */ 
				estrellas.appendChild(document.createTextNode('Papel: '+actor.papel));
				
				//Se crea la estructura de las tarjetas con appendChild
				union.appendChild(tarjeta);
				tarjeta.appendChild(borde);
				borde.appendChild(cuerpo);
				cuerpo.appendChild(imagen);
				cuerpo.appendChild(tipo);
				cuerpo.appendChild(button);
				cuerpo.appendChild(valoracion);
				valoracion.appendChild(estrellas);
			
				//Añade eventos al hacer click sobre la imagen o sobre el nombre de la categoria
				button.addEventListener("click", showActor);
				//imagen.addEventListener("click", showActor);			

				//Pasa al siguiente actor
				actor = elenco.next();
			}

			var encontrado = false;
			var directores = video.directors;
			var director = directores.next();
			while ((director.done !== true) && (!encontrado)){
				var productions = video.getProductionsDirector(director.value);
				var production = productions.next();

				while(production.done !== true){
					if(production.value.title === this.value){
						var tarjeta = document.createElement("div");
						tarjeta.setAttribute("class","col-lg-4 col-md-6 mb-4");
						var borde = document.createElement("div");
						borde.setAttribute("class","card h-100");
						var cuerpo = document.createElement("div");
						cuerpo.setAttribute("class","card-body");
						var tipo = document.createElement("h5");
						tipo.setAttribute("class","mx-auto text-center");
						tipo.setAttribute("id", "actorDirector");
						tipo.appendChild(document.createTextNode("Director"));
						var imagen = document.createElement("img");
						imagen.setAttribute("class","card-img");
						imagen.setAttribute("width","220");
						imagen.setAttribute("heigh","272");

						/* FOTO DE LAS TARJETAS */ 
						imagen.setAttribute("src","img/"+director.value.name+".png");
						imagen.setAttribute("alt",director.value.name);
						var button = document.createElement("button");

						//ID que sirve para recoger la produccion pulsada en el evento
						button.setAttribute("id","botonDirector");
						button.setAttribute("type","button");
						var nombre = director.value.name+" "+director.value.lastname1;
						button.setAttribute("value",nombre);
						button.setAttribute("class","btn btn-link btn-lg btn-block");
						button.appendChild(document.createTextNode(nombre));	

						var valoracion = document.createElement("div");
						valoracion.setAttribute("class","card-footer");
						var estrellas = document.createElement("small");
						estrellas.setAttribute("class","text-muted");

						/* ESTRELLAS QUE SE MUESTRAN EN LAS TARJETAS */ 
						estrellas.appendChild(document.createTextNode('Valoracion'));
						
						//Se crea la estructura de las tarjetas con appendChild
						union.appendChild(tarjeta);
						tarjeta.appendChild(borde);
						borde.appendChild(cuerpo);
						cuerpo.appendChild(imagen);
						cuerpo.appendChild(tipo);
						cuerpo.appendChild(button);
						cuerpo.appendChild(valoracion);
						valoracion.appendChild(estrellas);
					
						//Añade eventos al hacer click sobre la imagen o sobre el nombre de la categoria
						button.addEventListener("click", showDirector);
						//imagen.addEventListener("click", showActor);		
					}
					production = productions.next();
				}
				director = directores.next();
			}

			encontrado = true;
		}//Fin del if
		//Pasa a la siguiente produccion
		produccion = producciones.next();
	}//Fin del while iterador
}//Fin de showProduction

function entrarEnPagina(){
	initPopulate();
	control = setInterval(salida,100);
}

function salida(){
	var desaparecer = document.getElementById("Principal");
	var aparecer = document.getElementById("Secundario");

	showHomePage();
	categoriesMenuPopulate();
	crearBoton();
	comprobarSesion();

	desaparecer.setAttribute("class","d-none");
	aparecer.removeAttribute("class");

	clearInterval(control);
}

//Funcion que llama a todas las funciones que necesita el sistema
function init(){
	crearBBDD();
	cargarAjax();
}

window.onload = init;