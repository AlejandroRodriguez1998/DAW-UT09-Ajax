const nombreDB = 'VideoSystem';

function crearBBDD(){
	if(!window.indexedDB){
		window.alert("El navegador no soporta la base de datos IndexedDB. El contenido que añadas, elimines o modifiques no es permanente");
	}

	var dataBase = indexedDB.open(nombreDB, 1);

	dataBase.onupgradeneeded = function (e) {  
		var active = dataBase.result;

		//Creacion de la tabla Categorias
		active.createObjectStore("Categorias", { keyPath: 'Nombre' });

		//Creacion de la tabla Producciones
		active.createObjectStore("Producciones", { keyPath: 'Titulo' });

		//Creacion de la tabla actores
		active.createObjectStore("Actores", { keyPath: 'Nombre' });
		
		//Creacion de la tabla directores
		active.createObjectStore("Directores", { keyPath: 'Nombre' });

		//Creacion de la tabla usuarios
		active.createObjectStore("Usuarios", { keyPath: 'Usuario' });

		//Creacion de la tabla Categorias y Producciones
		active.createObjectStore("AsignarCategorias", {keyPath: 'Categoria'});

		//Creacion de la tabla Actores y Producciones
		active.createObjectStore("AsignarActores", { keyPath: 'Actor' });

		//Creacion de la tabla Directores y Producciones
		active.createObjectStore("AsignarDirectores", { keyPath: 'Director' });
	};
};

function addValues(tabla,array) {
	var request = indexedDB.open(nombreDB);

	request.onsuccess = function(event) {
		var db = event.target.result;         
		var objectStore = db.transaction([tabla],"readwrite").objectStore(tabla);

		objectStore.transaction.oncomplete = function(event) {
			var addObjectStore = db.transaction([tabla],"readwrite").objectStore(tabla);
			for (var i in array) {
				addObjectStore.add(array[i]);
			}
		};
	};
}

function addValuesAsignados(tabla,array) {
	var request = indexedDB.open(nombreDB);

	request.onsuccess = function(event) {
		var db = event.target.result;         
		var objectStore = db.transaction([tabla],"readwrite").objectStore(tabla);

		objectStore.transaction.oncomplete = function(event) {
			var addObjectStore = db.transaction([tabla],"readwrite").objectStore(tabla);
			for (var i in array) {
				addObjectStore.add(array[i]);
			}
		};
	};
}

function addOneValue(tabla,objeto){
	var request = indexedDB.open(nombreDB);

	request.onsuccess = function(event) {
		var db = event.target.result;         
		var objectStore = db.transaction([tabla],"readwrite").objectStore(tabla);

		objectStore.transaction.oncomplete = function(event) {
			var addObjectStore = db.transaction([tabla],"readwrite").objectStore(tabla);
		
			addObjectStore.add(objeto.getObject());
		};
	};
}

function addOneValuesAsignados(tabla,assignar) {
	var request = indexedDB.open(nombreDB);

	request.onsuccess = function(event) {
		var db = event.target.result;         
		var objectStore = db.transaction([tabla],"readwrite").objectStore(tabla);

		objectStore.transaction.oncomplete = function(event) {
			var addObjectStore = db.transaction([tabla],"readwrite").objectStore(tabla);
			
			addObjectStore.add(assignar);
		};
	};
}

function deleteValue(tabla,clave){
	var request = indexedDB.open(nombreDB);

	request.onsuccess = function(event) {
		var db = event.target.result;         
		db.transaction([tabla],"readwrite").objectStore(tabla).delete(clave);
	};
}

function modifyCategory(clave,nombreCambiar,descripcion){
	var request = indexedDB.open(nombreDB);

	request.onsuccess = function(event) {
		var db = event.target.result;         
		var objectStore = db.transaction(["Categorias"],"readwrite").objectStore("Categorias");

		var objeto = objectStore.get(clave);

		objectStore.delete(clave);

		objeto.onsuccess = function(event) {
			// Get the old value that we want to update
			var datos = objeto.result;
			
			datos.Nombre = nombreCambiar;
			datos.Descripcion = descripcion;

			objectStore.add(datos);
		};
	};
}

function modifyPerson(tabla,clave,nombreCambiar,apellido1,apellido2,nacimiento){
	var request = indexedDB.open(nombreDB);

	request.onsuccess = function(event) {
		var db = event.target.result;         
		var objectStore = db.transaction([tabla],"readwrite").objectStore(tabla);

		var objeto = objectStore.get(clave);

		objectStore.delete(clave);

		objeto.onsuccess = function(event) {
			// Get the old value that we want to update
			var datos = objeto.result;
			
			datos.Nombre = nombreCambiar;
			datos.Apellido1 = apellido1;
			datos.Apellido2 = apellido2;
			datos.Nacimiento = nacimiento;

			objectStore.add(datos);
		};
	};
}

function assignar(tabla,clave,assignar){
	var request = indexedDB.open(nombreDB);

	request.onsuccess = function(event) {
		var db = event.target.result;         
		var objectStore = db.transaction([tabla],"readwrite").objectStore(tabla);

		var objeto = objectStore.get(clave);

		objectStore.delete(clave);

		objeto.onsuccess = function(event) {
			// Get the old value that we want to update
			var datos = objeto.result;
			
			datos.Producciones.push(assignar);

			objectStore.add(datos);
		};
	};
}

function dessasignar(tabla,clave,dessasignar){
	var request = indexedDB.open(nombreDB);

	request.onsuccess = function(event) {
		var db = event.target.result;         
		var objectStore = db.transaction([tabla],"readwrite").objectStore(tabla);

		var objeto = objectStore.get(clave);

		objectStore.delete(clave);

		objeto.onsuccess = function(event) {
			var datos = objeto.result;
			
			var lista = datos.Producciones;

			var posicion = lista.indexOf(dessasignar);

			if(posicion != -1){
				lista.splice(posicion,1); //Lo borro
			}

			objectStore.add(datos);
		};
	};
}

function dessasignarActor(tabla,clave,dessasignar){
	var request = indexedDB.open(nombreDB);

	request.onsuccess = function(event) {
		var db = event.target.result;         
		var objectStore = db.transaction([tabla],"readwrite").objectStore(tabla);

		var objeto = objectStore.get(clave);

		objectStore.delete(clave);

		objeto.onsuccess = function(event) {
			var datos = objeto.result;
			
			var lista = datos.Producciones;

			for(let i = 0; i < lista.length; i++){
				if(lista[i].Nombre == undefined){
					var posicion = lista.indexOf(dessasignar);
				}else{
					if(lista[i].Nombre == dessasignar){
						var posicion = lista[i];
					}
				}
			}

			if(posicion != -1){
				lista.splice(posicion,1); //Lo borro
			}

			objectStore.add(datos);
		};
	};
}

var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;

function comprobarSesion() {
	var tiempo = sessionStorage.getItem("tiempo");
	if(tiempo != null ){
		var partesTiempo = tiempo.split(":");

		horas = partesTiempo[0];
		minutos = partesTiempo[1];
		segundos = partesTiempo[2];
		centesimas = partesTiempo[3];

		if(horas.length != 2){ horas = "0"+horas; }
		if(minutos.length != 2){ minutos = "0"+minutos; }
		if(segundos.length != 2){ segundos = "0"+segundos }
		if(centesimas.length != 2){ centesimas = "0"+centesimas }
		
		Centesimas.innerHTML = ":"+centesimas;
		Segundos.innerHTML = ":"+segundos;
		Minutos.innerHTML = ":"+minutos;
		Horas.innerHTML = horas;
	}
}

function inicio() {
	control = setInterval(cronometro,10);

	var play = document.getElementById("inicio");
	var parar = document.getElementById("parar");
	var stop =  document.getElementById("reinicio");

	play.disabled = true;
	play.style.backgroundImage = "url('img/playDesa.png')";
	parar.disabled = false;
	parar.style.backgroundImage = "url('img/pause.png')";
	stop.disabled = false;
	stop.style.backgroundImage = "url('img/stop.png')";
}

function parar() {
	clearInterval(control);

	var play = document.getElementById("inicio");
	var parar = document.getElementById("parar");

	play.disabled = false;
	play.style.backgroundImage = "url('img/play.png')";
	parar.disabled = true;
	parar.style.backgroundImage = "url('img/pauseDesa.png')";
}

function reinicio() {
	clearInterval(control);
	centesimas = 0;
	segundos = 0;
	minutos = 0;
	horas = 0;

	sessionStorage.setItem('tiempo', horas.toString()+":"+minutos.toString()+":"+segundos.toString()+":"+centesimas.toString()+"");

	Centesimas.innerHTML = ":00";
	Segundos.innerHTML = ":00";
	Minutos.innerHTML = ":00";
	Horas.innerHTML = "00";

	var play = document.getElementById("inicio");
	var parar = document.getElementById("parar");
	var stop =  document.getElementById("reinicio");

	play.disabled = false;
	play.style.backgroundImage = "url('img/play.png')";
	parar.disabled = true;
	parar.style.backgroundImage = "url('img/pauseDesa.png')";
	stop.disabled = true;
	stop.style.backgroundImage = "url('img/stopDesa.png')";
}

function cronometro() {
	if (centesimas < 99) {
		centesimas++;
		if (centesimas < 10) { centesimas = "0"+centesimas }
		Centesimas.innerHTML = ":"+centesimas;
	}
	if (centesimas == 99) {
		centesimas = -1;
	}
	if (centesimas == 0) {
		segundos ++;
		if (segundos < 10) { segundos = "0"+segundos }
		Segundos.innerHTML = ":"+segundos;
	}
	if (segundos == 59) {
		segundos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0) ) {
		minutos++;
		if (minutos < 10) { minutos = "0"+minutos }
		Minutos.innerHTML = ":"+minutos;
	}
	if (minutos == 59) {
		minutos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
		horas ++;
		if (horas < 10) { horas = "0"+horas }
		Horas.innerHTML = horas;
	}

	sessionStorage.setItem('tiempo', horas.toString()+":"+minutos.toString()+":"+segundos.toString()+":"+centesimas.toString());
}

