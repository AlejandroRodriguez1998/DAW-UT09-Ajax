
//Crea una ventana
function crearVentana(nombre){
	var ventanaNueva = window.open("Recurso.html",nombre,"toolbar=yes,scrollbars=yes,resizable=yes,width=640,height=670");
	ventanas.push(ventanaNueva);
}//Fin de crearVentana

var ventanas = [];

//Abre una nueva ventana
function abrirVentana(){
	var index = 0;
	var encontrada = false;
	//Si es la primera vez que se ejecuta la funcion crea directamente la ventana
	if(ventanas[0] == undefined){
		crearVentana(this.value);
	}else{
		while ((index < ventanas.length) || encontrada) {
			if (ventanas[index] && !ventanas[index].closed && ventanas[index] == this.value){
				//Si la ventana no esta cerrada, esta creada y ya tiene ese nombre
				encontrada = true;
			}
			index++;
		}

		if (encontrada) {
			ventanas[index].focus();
		}else{
			crearVentana(this.value);
		}
	}

}//Fin de abrir ventana

//Cierra las ventanas abiertas
function cerrarVentanas(){
	for (let index = 0; index < ventanas.length; index++) {
		//Si la ventana no esta cerrada la cierra
		if (!ventanas[index].closed) {
			ventanas[index].close();	
		}
	}
}//FIn de cerrarVentanas

//Muestra los recursos relacionados con una producción en una nueva ventana
//Esta funcion se ejecuta al cargar la ventana
function showResource(){
	//Se recoge el titulo de la produccion
	var tituloProduccion = document.getElementById("tituloProduccion");
	
	//Se recorre el array de ventanas 
	for (let index = 0; index < ventanas.length; index++) {
		//Si el titulo es igual a la ventana que haya en el array
		if (ventanas[index].name == tituloProduccion.textContent) {
			//Selecciona la zona de la ventana nueva
			var ventana = ventanas[index];
		}
	}

	var contenidoVentana = ventana.document.getElementById("contenidoZona");
	//Cambia el titulo de la ventana
	ventana.document.title = "Recursos de " + tituloProduccion.textContent;

	var encontrado = false;
	var producciones = video.productions;
	var produccion = producciones.next();
	while ((produccion.done !== true) && (!encontrado)){
		//Compara el titulo de la produccion del iterador con el titulo que hay en el h2 de la tarjeta
		if (produccion.value.title == tituloProduccion.textContent) {
			//Si la produccion es una movie tendra unos parametros distintos a las series

				var tarjeta = document.createElement("div");
				tarjeta.setAttribute("class","col-lg-12 col-md-12 mb-4");
				var borde = document.createElement("div");
				borde.setAttribute("class","card h-100");
				var cuerpo = document.createElement("div");
				cuerpo.setAttribute("class","card-body");
				var tipo = document.createElement("h5");
				tipo.setAttribute("class","mx-auto text-center");
				tipo.setAttribute("id", "actorDirector");
				tipo.appendChild(document.createTextNode("Actor"));
				var imagen = document.createElement("img");
				imagen.setAttribute("class","card-img mb-2");
				imagen.setAttribute("width","50");
				imagen.setAttribute("heigh","50");

				/* FOTO DE LAS TARJETAS */ 
				imagen.setAttribute("src","img/" + produccion.value.title + ".png");
				imagen.setAttribute("alt",produccion.value.title);

				//Pinta todo en la nueva ventana
				var tituloProdu = ventana.document.getElementById("tituloZona");
				tituloProdu.setAttribute("class","mx-auto text-center");
				tituloProdu.innerHTML = tituloProduccion.textContent;

				contenidoVentana.appendChild(tarjeta);
				tarjeta.appendChild(borde);
				borde.appendChild(cuerpo);
				cuerpo.appendChild(imagen);

			if(produccion.value instanceof Movie){
				//Si es distinto de null pone el recurso de la produccion
				if(produccion.value.resource != null){
					var resource = document.createElement("p");
					resource.setAttribute("class","card-text font-weight-bold m-0");
					resource.appendChild(document.createTextNode("• Recurso: "));

					cuerpo.appendChild(resource);
					
					var duracion = document.createElement("p");
					duracion.setAttribute("class","card-text m-0 ml-3");
					duracion.appendChild(document.createTextNode("Duración: " + produccion.value.resource.duration.Duracion));

					cuerpo.appendChild(duracion);

					var link = document.createElement("p");
					link.setAttribute("class","card-text m-0 ml-3");
					link.appendChild(document.createTextNode("Link: " + produccion.value.resource.duration.Link));

					cuerpo.appendChild(link);

					var audios = document.createElement("p");
					audios.setAttribute("class","card-text m-0 ml-3");
					audios.appendChild(document.createTextNode("Audios: " + produccion.value.resource.duration.Audios));

					cuerpo.appendChild(audios);

					var subtitulos = document.createElement("p");
					subtitulos.setAttribute("class","card-text m-0 ml-3");
					subtitulos.appendChild(document.createTextNode("Subtitulos: " + produccion.value.resource.duration.Subtitulos));

					cuerpo.appendChild(subtitulos);
				}
				//Si es distinto de null pone la localizacion de la produccion
				if(produccion.value.locations != ""){
					var locations = document.createElement("p");
					locations.setAttribute("class","card-text font-weight-bold m-0");
					locations.appendChild(document.createTextNode("• Localizacion: "));

					cuerpo.appendChild(locations);

					var locations = document.createElement("p");
					locations.setAttribute("class","card-text m-0 ml-3");
					locations.appendChild(document.createTextNode("Latitud: " + produccion.value.locations.Latitud));
					
					cuerpo.appendChild(locations);

					var locations = document.createElement("p");
					locations.setAttribute("class","card-text m-0 ml-3");
					locations.appendChild(document.createTextNode("Longitud: " + produccion.value.locations.Longitud));
					
					cuerpo.appendChild(locations);
				}
			}//Fin del instanceof

			if(produccion.value.seasons != null){
				//Si tiene temporadas las muestra
				
				for (let index = 0; index < produccion.value.seasons.length; index++){
					var season = document.createElement("p");
					season.setAttribute("class","cajaTitulo font-weight-bold m-0");
					season.appendChild(document.createTextNode("• " + produccion.value.seasons[index].Titulo + ":"));

					cuerpo.appendChild(season);

					for(let indexArray = 0; indexArray < produccion.value.seasons[index].Episodios.length; indexArray++){
					
						if(produccion.value.seasons[index].Episodios[indexArray].Titulo != undefined && produccion.value.seasons[index].Episodios[indexArray].Titulo != ""){
							var episodio = document.createElement("p");
							episodio.setAttribute("class","cajaDescripcion m-0 ml-1 font-weight-light");
							episodio.appendChild(document.createTextNode(produccion.value.seasons[index].Episodios[indexArray].Titulo)); 	
							
							cuerpo.appendChild(episodio);
						}

						if(produccion.value.seasons[index].Episodios[indexArray].Duracion != undefined && produccion.value.seasons[index].Episodios[indexArray].Duracion != ""){
							var episodio = document.createElement("p");
							episodio.setAttribute("class","cajaDescripcion m-0 ml-3");
							episodio.appendChild(document.createTextNode("Recurso: " + produccion.value.seasons[index].Episodios[indexArray].Duracion + " Duracion")); 	
							
							cuerpo.appendChild(episodio);
						}

						if(produccion.value.seasons[index].Episodios[indexArray].Link != undefined && produccion.value.seasons[index].Episodios[indexArray].Link != ""){
							var episodio = document.createElement("p");
							episodio.setAttribute("class","cajaDescripcion m-0 ml-5");
							episodio.appendChild(document.createTextNode("Link: " + produccion.value.seasons[index].Episodios[indexArray].Link));
							
							cuerpo.appendChild(episodio);
						}

						if(produccion.value.seasons[index].Episodios[indexArray].Audios != undefined && produccion.value.seasons[index].Episodios[indexArray].Audios != ""){
							var episodio = document.createElement("p");
							episodio.setAttribute("class","cajaDescripcion m-0 ml-5");
							episodio.appendChild(document.createTextNode("Audios: " + produccion.value.seasons[index].Episodios[indexArray].Audios));
	
							cuerpo.appendChild(episodio);
						}

						if(produccion.value.seasons[index].Episodios[indexArray].Subtitulos != undefined && produccion.value.seasons[index].Episodios[indexArray].Subtitulos != ""){
							var episodio = document.createElement("p");
							episodio.setAttribute("class","cajaDescripcion m-0 ml-5");
							episodio.appendChild(document.createTextNode("Subtitulos: " + produccion.value.seasons[index].Episodios[indexArray].Subtitulos));
							
							cuerpo.appendChild(episodio);
						}

						if(produccion.value.seasons[index].Episodios[indexArray].Latitud != undefined && produccion.value.seasons[index].Episodios[indexArray].Latitud != "" && produccion.value.seasons[index].Episodios[indexArray].Longitud != undefined && produccion.value.seasons[index].Episodios[indexArray].Longitud != ""){
							var episodio = document.createElement("p");
							episodio.setAttribute("class","cajaDescripcion m-0 ml-3");
							episodio.appendChild(document.createTextNode("Localización: Latitud: " + produccion.value.seasons[index].Episodios[indexArray].Latitud + " Longitud: " + produccion.value.seasons[index].Episodios[indexArray].Longitud));
							
							cuerpo.appendChild(episodio);
						}
					}
				}
			}
			var episodio = document.createElement("p");
			episodio.setAttribute("class","cajaDescripcion text-center m-1");
			episodio.appendChild(document.createTextNode("ʕ•ᴥ•ʔ"));
			
			cuerpo.appendChild(episodio);
		}//Fin del if
		produccion = producciones.next();
	}//Fin del while
}//Fin de showResource