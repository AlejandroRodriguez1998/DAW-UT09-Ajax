
function cargarAjax() {
	var request  = new XMLHttpRequest();
    request.onreadystatechange = function() {
  		if (this.readyState == 4 && this.status == 200) {
            var archivo = request.response;
				
            addValues("Categorias",archivo.AlmacenCategorias);
            addValues("Producciones",archivo.AlmacenProducciones);
            addValues("Actores",archivo.AlmacenActores);
            addValues("Directores",archivo.AlmacenDirectores);
            addValues("Usuarios",archivo.AlmacenUsuarios);
            addValuesAsignados("AsignarCategorias",archivo.AlmacenAsignarCategorias);
            addValuesAsignados("AsignarActores",archivo.AlmacenAsignarActores);
            addValuesAsignados("AsignarDirectores",archivo.AlmacenAsignarDirectores);
        }
    };
    request.open("GET", "js/Ajax/VideoSystem.json", true);
    request.responseType = 'json';
    request.send(); 
}

function creacionFichero() {
    var almacenCategoria = new Array();
	var almacenUsuarios = new Array();
	var almacenProducciones = new Array();
	var almacenActores = new Array();
	var almacenDirectores = new Array();
	var almacenCaPro = new Array();
	var almacenActPro = new Array();
	var almacenDirPro = new Array();

	var baseDatos = indexedDB.open("VideoSystem");
	baseDatos.onsuccess = function(event) { 
		var db = event.target.result;        
		var almacenes = db.transaction(["Categorias","Directores","Actores","Producciones","Usuarios","AsignarCategorias","AsignarActores","AsignarDirectores"]);      
		var tablaCategoria = almacenes.objectStore("Categorias");

		tablaCategoria.openCursor().onsuccess = function(event){
			var cursor = event.target.result;
			
			if(cursor){
				almacenCategoria.push(cursor.value);
				cursor.continue();
			}
		}

		var tablaUsuarios = almacenes.objectStore("Usuarios");      
		
		tablaUsuarios.openCursor().onsuccess = function(event){
			var cursor = event.target.result;

			if(cursor){
				almacenUsuarios.push(cursor.value);
				cursor.continue();
			}
		}

		var tablaProducciones = almacenes.objectStore("Producciones");      
		
		tablaProducciones.openCursor().onsuccess = function(event){
			var cursor = event.target.result;

			if(cursor){
				almacenProducciones.push(cursor.value);
				cursor.continue();
			}
		}

		var tablaActores = almacenes.objectStore("Actores");      
		
		tablaActores.openCursor().onsuccess = function(event){
			var cursor = event.target.result;

			if(cursor){
				almacenActores.push(cursor.value);
				cursor.continue();
			}
		}

		var tablaDirectores = almacenes.objectStore("Directores");      
		
		tablaDirectores.openCursor().onsuccess = function(event){
			var cursor = event.target.result;

			if(cursor){
				almacenDirectores.push(cursor.value);
				cursor.continue();
			}
		}

		var tablaAsignacionCatePro = almacenes.objectStore("AsignarCategorias");      
		
		tablaAsignacionCatePro.openCursor().onsuccess = function(event){
			var cursor = event.target.result;

			if(cursor){
				almacenCaPro.push(cursor.value);
				cursor.continue();
			}
		}

		var tablaAsignacionActPro = almacenes.objectStore("AsignarActores");      
	
		tablaAsignacionActPro.openCursor().onsuccess = function(event){
			var cursor = event.target.result;

			if(cursor){
				almacenActPro.push(cursor.value);
				cursor.continue();
			}
		}

		var tablaAsignacionDirPro = almacenes.objectStore("AsignarDirectores");      
	
		tablaAsignacionDirPro.openCursor().onsuccess = function(event){
			var cursor = event.target.result;

			if(cursor){
				almacenDirPro.push(cursor.value);
				cursor.continue();
			}
		}

		almacenes.oncomplete = function(event){
			var objeto = {
				Usuario: comprobarCookie("username"),
				AlmacenCategorias: almacenCategoria,
				AlmacenUsuarios: almacenUsuarios,
				AlmacenProducciones: almacenProducciones,
				AlmacenActores: almacenActores,
				AlmacenDirectores: almacenDirectores,
				AlmacenAsignarCategoriaProduccion: almacenCaPro,
				AlmacenAsignarActorProduccion: almacenActPro,
				AlmacenAsignarDirectorProduccion: almacenDirPro
			}

			var alerta = document.getElementById("divAlerta");

    		while(alerta.firstChild){
        	    alerta.removeChild(alerta.firstChild);
    	    }

    		var div = document.createElement("div");
    		div.setAttribute("role","alert");
			alerta.appendChild(div);
			
			var route = "js/Ajax/Servidor.php";

			var req = new XMLHttpRequest();
			data = JSON.stringify(objeto);
			
			req.onreadystatechange = function(){
				if (this.readyState == 4) {
					if (this.status == 200) {
                        div.setAttribute("class","alert alert-success");
                        div.appendChild(document.createTextNode(this.responseText));

						/*Respuesta sin parsear*/
                        //console.log(this.responseText);
                        
                        /*Respuesta convertida a JSON*/
                        //let json_data = JSON.parse(this.responseText);
                        //console.log(json_data);
					}else{
						div.setAttribute("class","alert alert-danger");
						div.appendChild(document.createTextNode("¡Atención! Hay algún problema con el servidor: " + this.status));
						//console.log(this.status);
					}
				}
			};
			req.open('POST', route, true);
			req.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			req.send('data=' + data);
		}
	}    
}