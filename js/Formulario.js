
var video = VideoSystem.getInstance();
var arrayRecursos = video.resources;
var arraySeason = video.seasons;

function comprobarCookie(nombreValor) {
    var nombre = nombreValor + "=";
    var cookieArray = document.cookie.split(';');
    for(var i = 0; i < cookieArray.length; i++) {
        var palabra = cookieArray[i];
        while (palabra.charAt(0) == ' ') {
            palabra = palabra.substring(1);
        }

        if (palabra.indexOf(nombre) == 0) {
            return palabra.substring(nombre.length, palabra.length);
        }
    }
    return "";
}

function crearBoton() {
    var menu = document.getElementById("menu");
    var divBoton = document.getElementById("botonAñadir");

	var iniciar = document.createElement("button");
	iniciar.setAttribute("type","button");
    iniciar.setAttribute("class","btn botonMismoColor text-white");

    if(comprobarCookie("username") == ""){
        menu.removeChild(menu.lastChild);
        divBoton.setAttribute("class","d-none");

        iniciar.addEventListener("click", iniciarSesion);
	    iniciar.appendChild(document.createTextNode("Iniciar Sesión"));
    }else {
        menu.removeChild(menu.lastChild);
        divBoton.setAttribute("class","d-incline-block");

        iniciar.addEventListener("click", cerrarSesion);
	    iniciar.appendChild(document.createTextNode("Cerrar Sesión"));
    }

	menu.appendChild(iniciar);
}

function iniciarSesion() {
    //Selecciona el titulo central y le cambia el nombre
	var tituloContenido = document.getElementById("tituloZona");
	tituloContenido.removeAttribute("class");
    tituloContenido.innerHTML = "¡Bienvenido!";
    tituloContenido.setAttribute("class","text-center");

	//Selecciona la zona central donde van las tarjetas de las categorias
	var tarjetas = document.getElementById("tarjetasZona");

	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (tarjetas.firstChild) {
		tarjetas.removeChild(tarjetas.firstChild);
    }

    var tarjeta = document.createElement("div");
    tarjeta.setAttribute("class","col-lg-12 col-md-12 mb-4");
    var borde = document.createElement("div");
    borde.setAttribute("class","border rounded d-flex justify-content-center");
    var cuerpo = document.createElement("div");
    cuerpo.setAttribute("class","card-body");
    var divImg = document.createElement("div");
    divImg.setAttribute("id","imagenInicioSesion");
    var imagen = document.createElement("img");
    imagen.setAttribute("class","iniciarSesion");

    /* FOTO DE LAS TARJETAS */ 
    imagen.setAttribute("src","img/IniciarSesion.png");
    imagen.setAttribute("alt","");
    
    var formulario = document.createElement("form");

    var divForm = document.createElement("div");
    divForm.setAttribute("class","form-group");

    var label1 = document.createElement("label");
    label1.setAttribute("for","inputUsuario");
    label1.setAttribute("class","mt-3");
    label1.appendChild(document.createTextNode("Usuario: "));

    var usuario = document.createElement("input");
    usuario.setAttribute("type","text");
    usuario.setAttribute("id","inputUsuario");
    usuario.setAttribute("class","form-control");

    var errorUsu = document.createElement("p");
    errorUsu.setAttribute("id","errorUsu");
    errorUsu.setAttribute("style","color:red");

    var label2 = document.createElement("label");
    label2.setAttribute("for","inputContrasenia");
    label2.setAttribute("class","mt-3");
    label2.appendChild(document.createTextNode("Contraseña:"));

    var contrasenia = document.createElement("input");
    contrasenia.setAttribute("type","password");
    contrasenia.setAttribute("id","inputContrasenia");
    contrasenia.setAttribute("class","form-control");

    var errorContra = document.createElement("p");
    errorContra.setAttribute("id","errorContra");
    errorContra.setAttribute("style","color:red");
    
    var iniciarSesion = document.createElement("button");
    iniciarSesion.setAttribute("type","button");
	iniciarSesion.setAttribute("class","btn botonMismoColor text-white btn-block mt-3");
	iniciarSesion.addEventListener("click", crearCookie);
	iniciarSesion.appendChild(document.createTextNode("Iniciar Sesión"));

    tarjetas.appendChild(tarjeta);
    tarjeta.appendChild(borde);
    borde.appendChild(divImg);
    borde.appendChild(cuerpo);
    divImg.appendChild(imagen);
    cuerpo.appendChild(formulario);
    formulario.appendChild(divForm);
    divForm.appendChild(label1);
    divForm.appendChild(usuario);
    divForm.appendChild(errorUsu);
    divForm.appendChild(label2);
    divForm.appendChild(contrasenia);
    divForm.appendChild(errorContra);
    divForm.appendChild(iniciarSesion);
     
}

function cerrarSesion(){
    document.cookie = "username=";
    document.cookie = "password=";
    document.cookie = "expires=Thu, 01 Jan 1970 00:00:00 UTC";

    var tituloContenido = document.getElementById("tituloZona").innerHTML;

    if(tituloContenido.substring(0, 1).charCodeAt() == 9642){
        showHomePage();
    }

    crearBoton();
}

function crearCookie() {
    var nombre = document.getElementById("inputUsuario");
    var contra = document.getElementById("inputContrasenia");
    var errorNombre = document.getElementById("errorUsu");
    var errorContra = document.getElementById("errorContra");
    var divImagen = document.getElementById("imagenInicioSesion");
    var expiresdate = new Date(2068, 1, 02, 11, 20);

    var encontrado = false;
    video = VideoSystem.getInstance();
	var usuarios = video.users;
	var usuario = usuarios.next();

    while ((usuario.done !== true) && (!encontrado)){
        if(usuario.value.username == nombre.value && usuario.value.password == contra.value){
            document.cookie = "username = " + nombre.value;
            document.cookie = "password = " + contra.value;
            document.cookie = "expires = " + expiresdate.toUTCString();

            crearBoton();
            showHomePage();

            encontrado = true;
        }
        usuario = usuarios.next();
    }

    if(!encontrado){
        errorNombre.innerHTML = "Introduce un <b>campo</b> valido";
        errorContra.innerHTML = "Introduce un <b>campo</b> valido";
        nombre.setAttribute("style","border-color: red");
        contra.setAttribute("style","border-color: red");

        divImagen.removeChild(divImagen.firstChild);

        var imagenError = document.createElement("img");
        imagenError.setAttribute("class","iniciarSesion");
        imagenError.setAttribute("src","img/Error.png");
        imagenError.setAttribute("alt","");

        divImagen.appendChild(imagenError);
    }
}

function entrarAlSistema(){
    var tituloContenido = document.getElementById("tituloZona");
    tituloContenido.removeAttribute("class");
    tituloContenido.setAttribute("class","text-center");
    tituloContenido.innerHTML = "▪️ Gestión del sistema ▪️";

    //Selecciona la zona central donde van las tarjetas de las categorias
	var tarjetas = document.getElementById("tarjetasZona");

	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (tarjetas.firstChild) {
		tarjetas.removeChild(tarjetas.firstChild);
    }

    var arrayPalabras = ["Categorías","Actores","Directores","Producciones","Recursos","Valoración"];

    for(let i = 0; i < arrayPalabras.length; i++){
        var tarjeta = document.createElement("div");
		tarjeta.setAttribute("class","col-lg-4 col-md-6 mb-4");
		var borde = document.createElement("div");
		borde.setAttribute("class","card h-100");
		var cuerpo = document.createElement("div");
		cuerpo.setAttribute("class","card-body text-center p-0");
		var imagen = document.createElement("img");
        imagen.setAttribute("class","card-img-top mt-3");
        imagen.setAttribute("style","width: 100px;");

		/* FOTO DE LAS TARJETAS */ 
		imagen.setAttribute("src","img/"+arrayPalabras[i]+".png");
        imagen.setAttribute("alt",arrayPalabras[i]);
        
        var titulo = document.createElement("h5");
        titulo.setAttribute("id","tituloCategoria");
        titulo.setAttribute("class","m-3");
        titulo.setAttribute("style","color: #007bff");
        titulo.appendChild(document.createTextNode(arrayPalabras[i]));	
        
        var divBotones = document.createElement("div");
        divBotones.setAttribute("class","card-body p-0 border-top");

		//Se crea la estructura de las tarjetas con appendChild
		tarjetas.appendChild(tarjeta);
		tarjeta.appendChild(borde);
		borde.appendChild(cuerpo);
		cuerpo.appendChild(imagen);
        cuerpo.appendChild(titulo);
        cuerpo.appendChild(divBotones);

        var añadir = document.createElement("button");
        añadir.setAttribute("type","button");
        añadir.setAttribute("class","btn btn-link");
        añadir.setAttribute("value", arrayPalabras[i]);
        añadir.appendChild(document.createTextNode("Añadir"));
        añadir.addEventListener("click", añadirCampos);

        divBotones.appendChild(añadir);

        if(arrayPalabras[i] != "Producciones" && arrayPalabras[i] != "Recursos" && arrayPalabras[i] != "Valoración"){
            var modificar = document.createElement("button");
            modificar.setAttribute("type","button");
            modificar.setAttribute("class","btn btn-link");
            modificar.setAttribute("value", arrayPalabras[i]);
            modificar.appendChild(document.createTextNode("Modificar"));
            modificar.addEventListener("click", modificarCampos);
        
            divBotones.appendChild(modificar);
        }
        
        var eliminar = document.createElement("button");
        eliminar.setAttribute("type","button");
        eliminar.setAttribute("class","btn btn-link");
        eliminar.setAttribute("value", arrayPalabras[i]);
        eliminar.appendChild(document.createTextNode("Eliminar"));
        eliminar.addEventListener("click", eliminarCampos);
        
        divBotones.appendChild(eliminar);
    }

    var divContenido = document.createElement("div");
    divContenido.setAttribute("class","col-12 text-center m-0");
    
    tarjetas.appendChild(divContenido);

    var server = document.createElement("button");
    server.setAttribute("type","button");
    server.setAttribute("class","btn botonMismoColor text-white");
    server.appendChild(document.createTextNode("Copia de seguridad"));
    server.addEventListener("click", creacionFichero);

    divContenido.appendChild(server);

    var divAlerta = document.createElement("div");
    divAlerta.setAttribute("id","divAlerta");
    divAlerta.setAttribute("class","mt-2");

    divContenido.appendChild(divAlerta);
}

function añadirCampos(){
    var titulo = this.value;

    var tituloContenido = document.getElementById("tituloZona");
    tituloContenido.removeAttribute("class");
    tituloContenido.setAttribute("class","text-center");
    tituloContenido.innerHTML = "▪️ Añadir " + titulo +" ▪️";

    //Selecciona la zona central donde van las tarjetas de las categorias
	var tarjetas = document.getElementById("tarjetasZona");

	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (tarjetas.firstChild) {
		tarjetas.removeChild(tarjetas.firstChild);
    }

    var tarjeta = document.createElement("div");
    tarjeta.setAttribute("class","col-lg-12 col-md-12 mb-4");
    var borde = document.createElement("div");
    borde.setAttribute("class","card h-100");
    var cuerpo = document.createElement("div");
    cuerpo.setAttribute("class","card-body");
    var form = document.createElement("form");

    tarjetas.appendChild(tarjeta);
    tarjeta.appendChild(borde);
    borde.appendChild(cuerpo);

    if(titulo != "Producciones"){
        cuerpo.appendChild(form);
    }

    if(titulo == "Categorías"){
        form.innerHTML = "<p id=\"exception\" class=\"text-center font-weight-bold\"></p>\
        <div class=\"form-group\">\
            <label for=\"name\">Nombre</label>\
            <input type=\"text\" class=\"form-control\" id=\"name\">\
            <p id=\"errorNombre\" class=\"error\"></p>\
        </div>\
        <div class=\"form-group\">\
            <label for=\"description\">Descripción</label>\
            <textarea id=\"description\" rows=\"5\" cols=\"5\" class=\"form-control\"></textarea>\
        </div>";

        var button = document.createElement("button");
        button.setAttribute("type","button");
        button.setAttribute("class","btn botonMismoColor text-white btn-block mt-3");
        button.addEventListener("click", añadirCategorias);
        button.appendChild(document.createTextNode("Añadir"));

        form.appendChild(button);
    }

    if(titulo == "Actores"){
        var pExepcion = document.createElement("p");
        pExepcion.setAttribute("id","exception");
        pExepcion.setAttribute("class","text-center font-weight-bold mt-2");

        cuerpo.appendChild(pExepcion);
        form.setAttribute("id","myForm");
        form.setAttribute("class","d-flex justify-content-between")
        form.innerHTML = "<div class=\"padding w-50\">\
            <div class=\"form-group\">\
                <label for=\"name\">Nombre</label>\
                <input type=\"text\" class=\"form-control\" id=\"name\">\
                <p id=\"errorNombre\" class=\"error\"></p>\
            </div>\
            <div class=\"form-group\">\
                <label for=\"lastname1\">Primer apellido</label>\
                <input type=\"text\" class=\"form-control\" id=\"lastname1\">\
                <p id=\"errorApellido\" class=\"error\"></p>\
            </div>\
            <div class=\"form-group\">\
                <label for=\"lastname2\">Segundo apellido</label>\
                <input type=\"text\" class=\"form-control\" id=\"lastname2\">\
            </div>\
            <div class=\"form-group\">\
                <label for=\"born\">Fecha de nacimiento</label>\
                <input type=\"date\" class=\"form-control\" id=\"born\">\
                <p id=\"errorNacimiento\" class=\"error\"></p>\
            </div>\
            <div class=\"form-group\">\
                <label for=\"picture\">Imagen</label>\
                <input type=\"text\" class=\"form-control\" id=\"picture\">\
            </div>\
            <div class=\"form-group\">\
                <label for=\"nombrePapel\">Papel de la produccion</label>\
                <input type=\"text\" class=\"form-control\" id=\"nombrePapel\">\
                <p id=\"errorNacimiento\" class=\"error\"></p>\
            </div>\
            <div class=\"form-group\">\
                <label class=\"radio-inline\"><input type=\"radio\" name=\"papel\" id=\"radioPapel\" value=\"TRUE\"> Principal</label>\
                <br>\
                <label class=\"radio-inline\"><input type=\"radio\" name=\"papel\" id=\"radioPapel\" value=\"FALSE\"> Secundario</label>\
            </div>\
        </div>";

        var div2 = document.createElement("div");
        div2.setAttribute("class","w-50 padding");

        var pPersonas = document.createElement("p");
        pPersonas.appendChild(document.createTextNode("Producciones"));
        pPersonas.setAttribute("class","mb-2");

        var search = document.createElement("input");
        search.setAttribute("class","form-control mb-3");
        search.setAttribute("id","myInput");
        search.setAttribute("type","text");
        search.setAttribute("placeholder","Buscar...");

        var ul = document.createElement("ul");
        ul.setAttribute("class","list-group");
        ul.setAttribute("id","myList");

        var button = document.createElement("button");
        button.setAttribute("type","button");
        button.setAttribute("class","btn botonMismoColor text-white btn-block mt-3");
        button.addEventListener("click", añadirActor);
        button.appendChild(document.createTextNode("Añadir"));
        
        form.appendChild(div2);
        div2.appendChild(pPersonas);
        div2.appendChild(search);
        div2.appendChild(ul)
        cuerpo.appendChild(button);

        var producciones = video.productions;
	    var produccion = producciones.next();

	    while ((produccion.done !== true)){
            var radio = document.createElement("input");
            radio.setAttribute("type","radio");
            radio.setAttribute("class","mr-1");
            radio.setAttribute("id","produccionRadio");
            radio.setAttribute("name","produccion");
            radio.setAttribute("value",produccion.value.title);

            var li = document.createElement("li");
            li.setAttribute("class","list-group-item");
            
            li.appendChild(radio);
            
            li.appendChild(document.createTextNode(produccion.value.title));

            ul.appendChild(li);
		
		    produccion = producciones.next();
        }
    }

    if(titulo == "Directores"){
        var pExepcion = document.createElement("p");
        pExepcion.setAttribute("id","exception");
        pExepcion.setAttribute("class","text-center font-weight-bold mt-2");

        cuerpo.appendChild(pExepcion);
        form.setAttribute("id","myForm");
        form.setAttribute("class","d-flex justify-content-between");
        form.innerHTML = "<div class=\"padding w-50\">\
            <div class=\"form-group\">\
                <label for=\"name\">Nombre</label>\
                <input type=\"text\" class=\"form-control\" id=\"name\">\
                <p id=\"errorNombre\" class=\"error\"></p>\
            </div>\
            <div class=\"form-group\">\
                <label for=\"lastname1\">Primer apellido</label>\
                <input type=\"text\" class=\"form-control\" id=\"lastname1\">\
                <p id=\"errorApellido\" class=\"error\"></p>\
            </div>\
            <div class=\"form-group\">\
                <label for=\"lastname2\">Segundo apellido</label>\
                <input type=\"text\" class=\"form-control\" id=\"lastname2\">\
            </div>\
            <div class=\"form-group\">\
                <label for=\"born\">Fecha de nacimiento</label>\
                <input type=\"date\" class=\"form-control\" id=\"born\">\
                <p id=\"errorNacimiento\" class=\"error\"></p>\
            </div>\
            <div class=\"form-group\">\
                <label for=\"picture\">Imagen</label>\
                <input type=\"text\" class=\"form-control\" id=\"picture\">\
            </div>\
        </div>";

        var div2 = document.createElement("div");
        div2.setAttribute("class","w-50 padding");

        var pPersonas = document.createElement("p");
        pPersonas.appendChild(document.createTextNode("Producciones"));
        pPersonas.setAttribute("class","mb-2");

        var search = document.createElement("input");
        search.setAttribute("class","form-control mb-3");
        search.setAttribute("id","myInput");
        search.setAttribute("type","text");
        search.setAttribute("placeholder","Buscar...");

        var ul = document.createElement("ul");
        ul.setAttribute("class","list-group");
        ul.setAttribute("id","myList");

        var button = document.createElement("button");
        button.setAttribute("type","button");
        button.setAttribute("class","btn botonMismoColor text-white btn-block mt-3");
        button.addEventListener("click", añadirDirector);
        button.appendChild(document.createTextNode("Añadir"));
        
        form.appendChild(div2);
        div2.appendChild(pPersonas);
        div2.appendChild(search);
        div2.appendChild(ul)
        cuerpo.appendChild(button);

        var producciones = video.productions;
	    var produccion = producciones.next();

	    while ((produccion.done !== true)){
            var radio = document.createElement("input");
            radio.setAttribute("type","radio");
            radio.setAttribute("class","mr-1");
            radio.setAttribute("id","produccionRadio");
            radio.setAttribute("name","produccion");
            radio.setAttribute("value",produccion.value.title);

            var li = document.createElement("li");
            li.setAttribute("class","list-group-item");
            
            li.appendChild(radio);
            
            li.appendChild(document.createTextNode(produccion.value.title));

            ul.appendChild(li);
		
		    produccion = producciones.next();
        }
    }

    if(titulo == "Producciones"){
        var divFlex = document.createElement("div");
        divFlex.setAttribute("class","d-flex justify-content-center"); 

        var serie = document.createElement("button");
        serie.setAttribute("type","button");
        serie.setAttribute("class","btn botonMismoColor text-white mb-3 w-25 mr-2");
        serie.setAttribute("value","serie");
        serie.addEventListener("click", añadirProduccion);
        serie.appendChild(document.createTextNode("Series"));

        var pelicula = document.createElement("button");
        pelicula.setAttribute("type","button");
        pelicula.setAttribute("class","btn botonMismoColor text-white mb-3 w-25 ml-2");
        pelicula.setAttribute("value","pelicula");
        pelicula.addEventListener("click",añadirProduccion);
        pelicula.appendChild(document.createTextNode("Películas"));

        cuerpo.appendChild(divFlex);
        divFlex.appendChild(serie);
        divFlex.appendChild(pelicula);
        cuerpo.appendChild(form);

        form.setAttribute("id","myForm");
        form.setAttribute("class","d-flex justify-content-between");
  
        form.innerHTML = "<div class=\"padding w-50\">\
            <div class=\"form-group\">\
                <label for=\"title\">Titulo</label>\
                <input type=\"text\" class=\"form-control\" id=\"title\">\
                <p id=\"errorTitulo\" class=\"error\"></p>\
            </div>\
            <div class=\"form-group\">\
                <label for=\"nationality\">Nacionalidad</label>\
                <input type=\"text\" class=\"form-control\" id=\"nationality\">\
            </div>\
            <div class=\"form-group\">\
                <label for=\"publications\">Publicación</label>\
                <input type=\"date\" class=\"form-control\" id=\"publications\">\
                <p id=\"errorPublicacion\" class=\"error\"></p>\
            </div>\
            <div class=\"form-group\">\
                <label for=\"synopsis\">Synopsis</label>\
                <textarea id=\"synopsis\" rows=\"5\" cols=\"5\" class=\"form-control\"></textarea>\
            </div>\
            <div class=\"form-group\">\
                <label for=\"image\">Imagen</label>\
                <input type=\"text\" class=\"form-control\" id=\"image\">\
            </div>\
        </div><div id=\"meterContenido\" class=\"w-50 padding\"></div>";
    
        var divFlexAsignar = document.createElement("div");
        divFlexAsignar.setAttribute("class","d-flex justify-content-center");
        
        var divCategorias = document.createElement("div");
        divCategorias.setAttribute("class","mx-auto");
        
        var pCategorias = document.createElement("p");
        pCategorias.appendChild(document.createTextNode("Categorias"));
        pCategorias.setAttribute("class","mb-2");

        var searchCa = document.createElement("input");
        searchCa.setAttribute("class","form-control mb-3");
        searchCa.setAttribute("id","myInputCategorias");
        searchCa.setAttribute("type","text");
        searchCa.setAttribute("placeholder","Buscar...");

        var ulCa = document.createElement("ul");
        ulCa.setAttribute("class","list-group");
        ulCa.setAttribute("id","myListCa");

        cuerpo.appendChild(divFlexAsignar);
        divFlexAsignar.appendChild(divCategorias);
        divCategorias.appendChild(pCategorias);
        divCategorias.appendChild(searchCa);
        divCategorias.appendChild(ulCa);


        var categorias = video.categories;
	    var categoria = categorias.next();

	    while ((categoria.done !== true)){
            var radioCa = document.createElement("input");
            radioCa.setAttribute("type","checkbox");
            radioCa.setAttribute("class","mr-1 categoriaBox");
            radioCa.setAttribute("name",categoria.value.name);
            radioCa.setAttribute("value",categoria.value.name);

            var liCa = document.createElement("li");
            liCa.setAttribute("class","list-group-item");
            
            liCa.appendChild(radioCa);
            
            liCa.appendChild(document.createTextNode(categoria.value.name));

            ulCa.appendChild(liCa);
		
		    categoria = categorias.next();
        }

        var divActores = document.createElement("div");
        divActores.setAttribute("class","mx-auto");
        
        var pActores = document.createElement("p");
        pActores.appendChild(document.createTextNode("Actores"));
        pActores.setAttribute("class","mb-2");

        var searchAc = document.createElement("input");
        searchAc.setAttribute("class","form-control mb-3");
        searchAc.setAttribute("id","myInputActores");
        searchAc.setAttribute("type","text");
        searchAc.setAttribute("placeholder","Buscar...");

        var ulAc = document.createElement("ul");
        ulAc.setAttribute("class","list-group");
        ulAc.setAttribute("id","myListAc");

        divFlexAsignar.appendChild(divActores);
        divActores.appendChild(pActores);
        divActores.appendChild(searchAc);
        divActores.appendChild(ulAc);

        var actores = video.actors;
	    var actor = actores.next();

	    while ((actor.done !== true)){
            var radioAc = document.createElement("input");
            radioAc.setAttribute("type","checkbox");
            radioAc.setAttribute("class","mr-1 actorBox");
            radioAc.setAttribute("name",actor.value.name);
            radioAc.setAttribute("value",actor.value.name);

            var liAc = document.createElement("li");
            liAc.setAttribute("class","list-group-item");
            
            liAc.appendChild(radioAc);
            
            liAc.appendChild(document.createTextNode(actor.value.name + " " + actor.value.lastname1));

            ulAc.appendChild(liAc);
		
		    actor = actores.next();
        }

        var divDirectores = document.createElement("div");
        divDirectores.setAttribute("class","mx-auto");
        
        var pDirectores = document.createElement("p");
        pDirectores.appendChild(document.createTextNode("Directores"));
        pDirectores.setAttribute("class","mb-2");

        var searchDi = document.createElement("input");
        searchDi.setAttribute("class","form-control mb-3");
        searchDi.setAttribute("id","myInputDirectores");
        searchDi.setAttribute("type","text");
        searchDi.setAttribute("placeholder","Buscar...");

        var ulDi = document.createElement("ul");
        ulDi.setAttribute("class","list-group");
        ulDi.setAttribute("id","myListDi");

        divFlexAsignar.appendChild(divDirectores);
        divDirectores.appendChild(pDirectores);
        divDirectores.appendChild(searchDi);
        divDirectores.appendChild(ulDi);

        var directores = video.directors;
	    var director = directores.next();

	    while ((director.done !== true)){
            var radioDi = document.createElement("input");
            radioDi.setAttribute("type","checkbox");
            radioDi.setAttribute("class","mr-1 directorBox");
            radioDi.setAttribute("name",director.value.name);
            radioDi.setAttribute("value",director.value.name);

            var liDi = document.createElement("li");
            liDi.setAttribute("class","list-group-item");
            
            liDi.appendChild(radioDi);
            
            liDi.appendChild(document.createTextNode(director.value.name + " " + director.value.lastname1));

            ulDi.appendChild(liDi);
		
		    director = directores.next();
        }

        var divBoton = document.createElement("div");
        divBoton.setAttribute("id","cuerpoBoton");

        var pExepcion = document.createElement("p");
        pExepcion.setAttribute("id","exception");
        pExepcion.setAttribute("class","text-center font-weight-bold mt-2");

        cuerpo.appendChild(pExepcion);
        cuerpo.appendChild(divBoton);  
    }

    if(titulo == "Recursos"){
        var pExepcion = document.createElement("p");
        pExepcion.setAttribute("id","exception");
        pExepcion.setAttribute("class","text-center font-weight-bold mt-2");

        cuerpo.appendChild(pExepcion);

        form.setAttribute("id","myForm");
        form.setAttribute("class","d-flex justify-content-between");

        var div2 = document.createElement("div");
        div2.setAttribute("class","w-50 padding");

        var pPersonas = document.createElement("p");
        pPersonas.appendChild(document.createTextNode("Producciones"));
        pPersonas.setAttribute("class","mb-2");

        var search = document.createElement("input");
        search.setAttribute("class","form-control mb-3");
        search.setAttribute("id","myInput");
        search.setAttribute("type","text");
        search.setAttribute("placeholder","Buscar...");

        var pError = document.createElement("p");
        pError.setAttribute("id","pErrorProduccion");
        pError.setAttribute("class","error m-0 mb-2");

        var ul = document.createElement("ul");
        ul.setAttribute("class","list-group");
        ul.setAttribute("id","myList");

        form.appendChild(div2);
        div2.appendChild(pPersonas);
        div2.appendChild(search);
        div2.appendChild(pError);
        div2.appendChild(ul)

        var producciones = video.productions;
	    var produccion = producciones.next();

	    while ((produccion.done !== true)){
            var radio = document.createElement("input");
            radio.setAttribute("type","radio");
            radio.setAttribute("class","mr-1");
            radio.setAttribute("id","produccionRadio");
            radio.setAttribute("name","produccion");
            radio.setAttribute("value",produccion.value.title);

            var li = document.createElement("li");
            li.setAttribute("class","list-group-item");
            
            li.appendChild(radio);
            
            li.appendChild(document.createTextNode(produccion.value.title));

            ul.appendChild(li);
		
		    produccion = producciones.next();
        }

        var div1 = document.createElement("div");
        div1.setAttribute("class","w-50 padding");

        var p1 = document.createElement("p");
        p1.appendChild(document.createTextNode("Recursos"));
        p1.setAttribute("class","mb-2");

        var pErrorR = document.createElement("p");
        pErrorR.setAttribute("id","pErrorRecurso");
        pErrorR.setAttribute("class","error m-0 mb-2");

        var ul1 = document.createElement("ul");
        ul1.setAttribute("id","listaRecursos");
        ul1.setAttribute("class","list-group");

        form.appendChild(div1);
        div1.appendChild(p1);
        div1.appendChild(pErrorR);
        div1.appendChild(ul1);

        for(let i = 0; i < arrayRecursos.length; i++){
            var radio1 = document.createElement("input");
            radio1.setAttribute("type","radio");
            radio1.setAttribute("class","mr-1");
            radio1.setAttribute("id","produccionRadio");
            radio1.setAttribute("name","recurso");
            radio1.setAttribute("value",arrayRecursos[i].duration);

            var li1 = document.createElement("li");
            li1.setAttribute("class","list-group-item");
            
            li1.appendChild(radio1);

            var pD = document.createElement("span");
            pD.appendChild(document.createTextNode("Duración: " + arrayRecursos[i].duration));

            var pE = document.createElement("p");
            pE.setAttribute("class","m-0");
            pE.appendChild(document.createTextNode("Enlace: " + arrayRecursos[i].link));

            var pA = document.createElement("p");
            pA.setAttribute("class","m-0");
            pA.appendChild(document.createTextNode("Audios: " + arrayRecursos[i].audios));

            var pS = document.createElement("p");
            pS.setAttribute("class","m-0");
            pS.appendChild(document.createTextNode("Subtitulos: " + arrayRecursos[i].subtitles));

            li1.appendChild(pD);
            li1.appendChild(pE);
            li1.appendChild(pA);
            li1.appendChild(pS);

            ul1.appendChild(li1);   
        }

        var button = document.createElement("button");
        button.setAttribute("type","button");
        button.setAttribute("class","btn botonMismoColor text-white btn-block mt-3");
        button.appendChild(document.createTextNode("Añadir"));
        button.addEventListener("click", añadirRecurso);

        cuerpo.appendChild(button);
    }

    if(titulo == "Valoración"){
        var imagen = document.createElement("img");
        imagen.setAttribute("class","img-card");
        imagen.setAttribute("src","img/pandaencontruccion.gif");
        imagen.setAttribute("style","width: 100%");
        imagen.setAttribute("alt","imagencontruccion");

        var divCos = document.createElement("div");
        divCos.setAttribute("class","card-img-overlay");

        var h1 = document.createElement("h1");
        h1.setAttribute("class","card-title text-center m-0");
        h1.setAttribute("style","background-color: white");
        h1.appendChild(document.createTextNode("En construcción"));

        var p = document.createElement("p");
        p.setAttribute("class","card-text text-center pb-3");
        p.setAttribute("style","background-color: white");
        p.appendChild(document.createTextNode("Sentimos las molestias"));

        form.appendChild(imagen);
        form.appendChild(divCos);
        divCos.appendChild(h1);
        divCos.appendChild(p);
    }

    $(document).ready(function(){
        $("#myInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myList li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

    $(document).ready(function(){
        $("#myInputCategorias").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myListCa li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

    $(document).ready(function(){
        $("#myInputActores").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myListAc li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

    $(document).ready(function(){
        $("#myInputDirectores").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#myListDi li").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

}

function añadirCategorias(){
    var nombre = document.getElementById("name");
    var descripcion = document.getElementById("description");
    var errorNombre = document.getElementById("errorNombre");
    var exception = document.getElementById("exception");

    if(nombre.value == ""){
        nombre.setAttribute("style","border-color: red");
        errorNombre.innerHTML = "El campo <b>nombre</b> es obligatorio";
    }else{
        nombre.removeAttribute("style");
        errorNombre.innerHTML = "";

        var category = new Category(nombre.value,descripcion.value);

        try{
            video.addCategory(category);
            addOneValue("Categorias",category);
            exception.innerHTML = "Categoría añadida con éxito";
        }catch(error){
            exception.innerHTML = error.message;
        }
       
        categoriesMenuPopulate();
    }
}

function añadirActor(){
    var nombre = document.getElementById("name");
    var apellido1 = document.getElementById("lastname1");
    var apellido2 = document.getElementById("lastname2").value;
    var nacimiento = document.getElementById("born");
    var imagen = document.getElementById("picture").value;
    var errorNombre = document.getElementById("errorNombre");
    var errorApellido = document.getElementById("errorApellido");
    var errorNacimiento = document.getElementById("errorNacimiento");
    var produccionRadio = $('input[name=produccion]:checked', '#myForm').val();
    var produccionNombrePapel = document.getElementById("nombrePapel").value;
    var produccionPapel = $('input[name=papel]:checked', '#myForm').val();
    var exception = document.getElementById("exception");

    if(nombre.value == ""){
        nombre.setAttribute("style","border-color: red");
        errorNombre.innerHTML = "El campo <b>nombre</b> es obligatorio";
    }else{
        nombre.removeAttribute("style");
        errorNombre.innerHTML = "";
    }

    if(apellido1.value == ""){
        apellido1.setAttribute("style","border-color: red");
        errorApellido.innerHTML = "El campo <b>primer apellido</b> es obligatorio";
    }else{
        apellido1.removeAttribute("style");
        errorApellido.innerHTML = "";
    }

    if(nacimiento.value == ""){
        nacimiento.setAttribute("style","border-color: red");
        errorNacimiento.innerHTML = "El campo <b>fecha nacimiento</b> es obligatorio";
    }else{
        nacimiento.removeAttribute("style");
        errorNacimiento.innerHTML = "";
    }

    if(nombre.value != "" && apellido1.value != "" && nacimiento.value != ""){
        var encontrado = false
        var producciones = video.productions;
        var produccion = producciones.next();

        while ((produccion.done !== true) && (!encontrado)){
            if(produccion.value.title == produccionRadio){
                
                var produccionAñadir = produccion.value;
                
                encontrado = true;
            }
        
            produccion = producciones.next();
        }
    
        try{
            var persona = new Person(nombre.value,apellido1.value,apellido2,new Date(nacimiento.value),imagen);

            video.addActor(persona);
            addOneValue("Actores",persona);
        
            if(produccionRadio != undefined){
                video.assignActor(persona,produccionAñadir,produccionNombrePapel,produccionPapel);
                addOneValuesAsignados("AsignarActores", {Actor: persona.name, Producciones: [{Nombre: produccionAñadir.title, Papel: produccionNombrePapel, Principal: produccionPapel}]});
                
            }

            exception.innerHTML = "Actor añadido con exito";
            
        }catch(error){
            exception.innerHTML = error.message;
        }
       
    }
}

function añadirDirector(){
    var nombre = document.getElementById("name");
    var apellido1 = document.getElementById("lastname1");
    var apellido2 = document.getElementById("lastname2").value;
    var nacimiento = document.getElementById("born");
    var imagen = document.getElementById("picture").value;
    var errorNombre = document.getElementById("errorNombre");
    var errorApellido = document.getElementById("errorApellido");
    var errorNacimiento = document.getElementById("errorNacimiento");
    var produccionRadio = $('input[name=produccion]:checked', '#myForm').val();
    var exception = document.getElementById("exception");

    console.log(produccionRadio);

    if(nombre.value == ""){
        nombre.setAttribute("style","border-color: red");
        errorNombre.innerHTML = "El campo <b>nombre</b> es obligatorio";
    }else{
        nombre.removeAttribute("style");
        errorNombre.innerHTML = "";
    }

    if(apellido1.value == ""){
        apellido1.setAttribute("style","border-color: red");
        errorApellido.innerHTML = "El campo <b>primer apellido</b> es obligatorio";
    }else{
        apellido1.removeAttribute("style");
        errorApellido.innerHTML = "";
    }

    if(nacimiento.value == ""){
        nacimiento.setAttribute("style","border-color: red");
        errorNacimiento.innerHTML = "El campo <b>fecha nacimiento</b> es obligatorio";
    }else{
        nacimiento.removeAttribute("style");
        errorNacimiento.innerHTML = "";
    }

    if(nombre.value != "" && apellido1.value != "" && nacimiento.value != ""){
        var encontrado = false
        var producciones = video.productions;
        var produccion = producciones.next();

        while ((produccion.done !== true) && (!encontrado)){
            if(produccion.value.title == produccionRadio){
                
                var produccionAñadir = produccion.value;
                
                encontrado = true;
            }
        
            produccion = producciones.next();
        }
    
        try{
            var persona = new Person(nombre.value,apellido1.value,apellido2,new Date(nacimiento.value),imagen);

            video.addDirector(persona);
            addOneValue("Directores",persona);

            if(produccionRadio != undefined){
                video.assignDirector(persona,produccionAñadir);
                addOneValuesAsignados("AsignarDirectores",{Director: persona.name, Producciones: [produccionAñadir.title]});
            }

            exception.innerHTML = "Director añadido con exito";
            
        }catch(error){
            exception.innerHTML = error.message;
        }

    }
}

function añadirProduccion(){
    var produccion = this.value;
    var formulario = document.getElementById("meterContenido");
    var cuerpo = document.getElementById("cuerpoBoton");

    while (cuerpo.firstChild) {
		cuerpo.removeChild(cuerpo.firstChild);
	}

    while (formulario.firstChild){
        formulario.removeChild(formulario.firstChild);
    }

    var button = document.createElement("button");
    button.setAttribute("type","button");
    button.setAttribute("class","btn botonMismoColor text-white btn-block mt-3");
    button.appendChild(document.createTextNode("Añadir"));

    if(produccion == "serie"){
        button.addEventListener("click", añadirSerie);

        var pTemporadas = document.createElement("p");
        pTemporadas.setAttribute("class","m-0 mb-2");
        pTemporadas.appendChild(document.createTextNode("Temporadas"));
        
        var ul = document.createElement("ul");
        ul.setAttribute("class","list-group");

        formulario.appendChild(pTemporadas);
        formulario.appendChild(ul);

        for(let i = 0; i < arraySeason.length; i++){
            var radio = document.createElement("input");
            radio.setAttribute("type","radio");
            radio.setAttribute("class","mr-1");
            radio.setAttribute("id","produccionRadio");
            radio.setAttribute("name","season");
            radio.setAttribute("value",arraySeason[i].title);

            var li = document.createElement("li");
            li.setAttribute("class","list-group-item");
            
            li.appendChild(radio);

            var pT = document.createElement("span");
            pT.appendChild(document.createTextNode(arraySeason[i].title));

            li.appendChild(pT);
          
            for(let y = 0; y < arraySeason[i].episodes.length; y++){
                var pE = document.createElement("p");
                pE.setAttribute("class","m-0 font-weight-light");
                pE.appendChild(document.createTextNode(arraySeason[i].episodes[y].title));

                var pReCu = document.createElement("p");
                pReCu.setAttribute("class","m-0 ml-3");
                pReCu.appendChild(document.createTextNode("Recurso: " + arraySeason[i].episodes[y].episode.duration + " duración"));
                
                li.appendChild(pE);
                li.appendChild(pReCu);

                if(arraySeason[i].episodes[y].episode.audios != ""){
                    var pRecuAu = document.createElement("p");
                    pRecuAu.setAttribute("class","m-0 ml-5");
                    pRecuAu.appendChild(document.createTextNode("Audios: " + arraySeason[i].episodes[y].episode.audios));
                    
                    li.appendChild(pRecuAu);
                }

                if(arraySeason[i].episodes[y].episode.subtitles != ""){
                    var pRecuSub = document.createElement("p");
                    pRecuSub.setAttribute("class","m-0 ml-5");
                    pRecuSub.appendChild(document.createTextNode("Subtitulos : " + arraySeason[i].episodes[y].episode.subtitles));
                
                    li.appendChild(pRecuSub);
                }

                for(let z = 0; z < arraySeason[i].episodes[y].scenarios.length; z++){
                    var pL = document.createElement("p");
                    pL.setAttribute("class","m-0 ml-3");
                    pL.appendChild(document.createTextNode("Localización : " + arraySeason[i].episodes[y].scenarios[z]));
                    
                    li.appendChild(pL);
                }
            }

            ul.appendChild(li);   
        }

    }else{
        button.addEventListener("click", añadirPelicula);

        var labelLocations = document.createElement("label");
        labelLocations.setAttribute("for","locations");
        labelLocations.appendChild(document.createTextNode("Localización"));

        var inputLoca = document.createElement("input");
        inputLoca.setAttribute("type","text");
        inputLoca.setAttribute("id","locations");
        inputLoca.setAttribute("placeholder","50, 120");
        inputLoca.setAttribute("class","form-control");

        var pRecursos = document.createElement("p");
        pRecursos.setAttribute("class","m-0 mt-3 mb-2");
        pRecursos.appendChild(document.createTextNode("Recursos"));

        var pRecursosError = document.createElement("p");
        pRecursosError.setAttribute("id","errorRecursos");
        pRecursosError.setAttribute("class","error");
        
        var ul = document.createElement("ul");
        ul.setAttribute("class","list-group");

        formulario.appendChild(labelLocations);
        formulario.appendChild(inputLoca);
        formulario.appendChild(pRecursos);
        formulario.appendChild(pRecursosError);
        formulario.appendChild(ul);

        for(let i = 0; i < arrayRecursos.length; i++){
            var radio = document.createElement("input");
            radio.setAttribute("type","radio");
            radio.setAttribute("class","mr-1");
            radio.setAttribute("id","produccionRadio");
            radio.setAttribute("name","produccion");
            radio.setAttribute("value",arrayRecursos[i].duration);

            var li = document.createElement("li");
            li.setAttribute("class","list-group-item");
            
            li.appendChild(radio);

            var pD = document.createElement("span");
            pD.appendChild(document.createTextNode("Duración: " + arrayRecursos[i].duration));

            var pA = document.createElement("p");
            pA.setAttribute("class","m-0");
            pA.appendChild(document.createTextNode("Audios: " + arrayRecursos[i].audios));

            var pS = document.createElement("p");
            pS.setAttribute("class","m-0");
            pS.appendChild(document.createTextNode("Subtitulos: " + arrayRecursos[i].subtitles));

            li.appendChild(pD);
            li.appendChild(pA);
            li.appendChild(pS);

            ul.appendChild(li);   
        }

    }
    
    cuerpo.appendChild(button);
}

function añadirSerie(){
    var exepcion = document.getElementById("exception");
    var titulo = document.getElementById("title");
    var publicacion = document.getElementById("publications");
    var errorTitu = document.getElementById("errorTitulo");
    var errorPubli = document.getElementById("errorPublicacion");
    
    var nacionalidad = document.getElementById("nationality").value;
    var synopsis = document.getElementById("synopsis").value;
    var imagen = document.getElementById("image").value;

    var arrayCategorias = [];
    var arrayActores = [];
    var arrayDirectores = [];

    $('.categoriaBox:checked').each(
        function() {
            arrayCategorias.push($(this).val());
        }
    );

    $('.actorBox:checked').each(
        function() {
            arrayActores.push($(this).val());
        }
    );

    $('.directorBox:checked').each(
        function() {
            arrayDirectores.push($(this).val());
        }
    );

    var radioSeason = $('input[name=season]:checked', '#myForm').val();

    if(titulo.value == ""){
        titulo.setAttribute("style","border-color: red");
        errorTitu.innerHTML = "El campo <b>titulo</b> es obligatorio";
    }else{
        titulo.removeAttribute("style");
        errorTitu.innerHTML = "";
    }

    if(publicacion.value == ""){
        publicacion.setAttribute("style","border-color: red");
        errorPubli.innerHTML = "El campo <b>publicación</b> es obligatorio";
    }else{
        publicacion.removeAttribute("style");
        errorPubli.innerHTML = "";
    }

    if(titulo.value != "" && publicacion.value  != ""){

        var arrayCategoriasAsociar = [];

        for(let i = 0; i < arrayCategorias.length; i++){
            var encontrado = false;
            var categorias = video.categories;
            var categoria = categorias.next();

            while ((categoria.done !== true) && (!encontrado)){
                if (categoria.value.name == arrayCategorias[i]) {

                    arrayCategoriasAsociar.push(categoria.value);

                    encontrado = true;
                }
                categoria = categorias.next();
            }
        }

        var arrayActorAsociar = [];

        for(let i = 0; i < arrayActores.length; i++){
            var encontrado = false;
            var actores = video.actors;
            var actor = actores.next();

            while ((actor.done !== true) && (!encontrado)){
                if (actor.value.name == arrayActores[i]) {

                    arrayActorAsociar.push(actor.value);
            
                    encontrado = true;
                }
                actor = actores.next();
            }
        }

        var arrayDirectorAsociar = [];

        for(let i = 0; i < arrayDirectores.length; i++){
            var encontrado = false;
            var directores = video.directors;
            var director = directores.next();

            while ((director.done !== true) && (!encontrado)){
                if (director.value.name == arrayDirectores[i]) {

                    arrayDirectorAsociar.push(director.value);
            
                    encontrado = true;
                }
                director = directores.next();
            }
        }

        var arraySeasonAsignar = []; 

        if(radioSeason != undefined){
            for(let i = 0; i < arraySeason.length; i++){
                if(radioSeason == arraySeason[i].title){
                    var season = arraySeason[i];
                }
            }
            
            arraySeasonAsignar.push(season);
        }

        try{
            var serie = new Serie(titulo.value,nacionalidad,new Date(publicacion.value),synopsis,imagen,arraySeasonAsignar);

            video.addProduction(serie);
            addOneValue("Producciones",serie);

            for(let i = 0; i < arrayCategoriasAsociar.length; i++){
                video.assignCategory(arrayCategoriasAsociar[i],serie);
                assignar("AsignarCategorias",arrayCategoriasAsociar[i].name,serie.title);
            }

            for(let i = 0; i < arrayActorAsociar.length; i++){
                video.assignActor(arrayActorAsociar[i],serie);
                assignar("AsignarActores",arrayActorAsociar[i].name,serie.title);
            }

            for(let i = 0; i < arrayDirectorAsociar.length; i++){
                video.assignDirector(arrayDirectorAsociar[i],serie);
                assignar("AsignarDirectores",arrayDirectorAsociar[i].name,serie.title);
            }

            exepcion.innerHTML = "Serie añadida con éxito";
        }catch(error){
            exepcion.innerHTML = error.message;
        }
    }
}

function añadirPelicula(){
    var exepcion = document.getElementById("exception");
    var titulo = document.getElementById("title");
    var publicacion = document.getElementById("publications");
    var errorTitu = document.getElementById("errorTitulo");
    var errorPubli = document.getElementById("errorPublicacion");
    
    var nacionalidad = document.getElementById("nationality").value;
    var synopsis = document.getElementById("synopsis").value;
    var imagen = document.getElementById("image").value;

    var arrayCategorias = [];
    var arrayActores = [];
    var arrayDirectores = [];

    $('.categoriaBox:checked').each(
        function() {
            arrayCategorias.push($(this).val());
        }
    );

    $('.actorBox:checked').each(
        function() {
            arrayActores.push($(this).val());
        }
    );

    $('.directorBox:checked').each(
        function() {
            arrayDirectores.push($(this).val());
        }
    );

    var localizacion = document.getElementById("locations").value;
    var arrayLoca = localizacion.split(",");

    var radioRecurso = $('input[name=produccion]:checked', '#myForm').val();
    var errorRecurso = document.getElementById("errorRecursos");

    if(titulo.value == ""){
        titulo.setAttribute("style","border-color: red");
        errorTitu.innerHTML = "El campo <b>titulo</b> es obligatorio";
    }else{
        titulo.removeAttribute("style");
        errorTitu.innerHTML = "";
    }

    if(publicacion.value == ""){
        publicacion.setAttribute("style","border-color: red");
        errorPubli.innerHTML = "El campo <b>publicación</b> es obligatorio";
    }else{
        publicacion.removeAttribute("style");
        errorPubli.innerHTML = "";
    }

    if(radioRecurso == undefined){
        errorRecurso.innerHTML = "Debes marcar un <b>recurso</b>";
    }else{
        errorRecurso.innerHTML = "";
    }

    if(titulo.value != "" && publicacion.value  != "" && radioRecurso != undefined){

        var arrayCategoriasAsociar = [];

        for(let i = 0; i < arrayCategorias.length; i++){
            var encontrado = false;
            var categorias = video.categories;
            var categoria = categorias.next();

            while ((categoria.done !== true) && (!encontrado)){
                if (categoria.value.name == arrayCategorias[i]) {

                    arrayCategoriasAsociar.push(categoria.value);

                    encontrado = true;
                }
                categoria = categorias.next();
            }
        }

        var arrayActorAsociar = [];

        for(let i = 0; i < arrayActores.length; i++){
            var encontrado = false;
            var actores = video.actors;
            var actor = actores.next();

            while ((actor.done !== true) && (!encontrado)){
                if (actor.value.name == arrayActores[i]) {

                    arrayActorAsociar.push(actor.value);
            
                    encontrado = true;
                }
                actor = actores.next();
            }
        }

        var arrayDirectorAsociar = [];

        for(let i = 0; i < arrayDirectores.length; i++){
            var encontrado = false;
            var directores = video.directors;
            var director = directores.next();

            while ((director.done !== true) && (!encontrado)){
                if (director.value.name == arrayDirectores[i]) {

                    arrayDirectorAsociar.push(director.value);
            
                    encontrado = true;
                }
                director = directores.next();
            }
        }

        for(let i = 0; i < arrayRecursos.length; i++){
            if(radioRecurso == arrayRecursos[i].duration){
                var recurso = arrayRecursos[i];
            }
        }
        
        try{
            var movie = new Movie(titulo.value,nacionalidad,new Date(publicacion.value),synopsis,imagen,recurso,new Coordinate(arrayLoca[0],arrayLoca[1]));

            video.addProduction(movie);
            addOneValue("Producciones",movie);

            for(let i = 0; i < arrayCategoriasAsociar.length; i++){
                video.assignCategory(arrayCategoriasAsociar[i],movie);
                assignar("AsignarCategorias",arrayCategoriasAsociar[i].name,movie.title);
            }

            for(let i = 0; i < arrayActorAsociar.length; i++){
                video.assignActor(arrayActorAsociar[i],movie);
                assignar("AsignarActores",arrayActorAsociar[i].name,movie.title);
            }

            for(let i = 0; i < arrayDirectorAsociar.length; i++){
                video.assignDirector(arrayDirectorAsociar[i],movie);
                assignar("AsignarDirectores",arrayDirectorAsociar[i].name,movie.title);
            }

            exepcion.innerHTML = "Pelicula añadida con éxito";
        }catch(error){
            exepcion.innerHTML = error.message;
        }

    }

}

function añadirRecurso(){
    var errorProduccion = document.getElementById("pErrorProduccion");
    var errorRecurso = document.getElementById("pErrorRecurso");
    var inputProduccion = document.getElementById("myInput");
    var radioProduccion = $('input[name=produccion]:checked', '#myForm').val();
    var radioRecurso = $('input[name=recurso]:checked', '#myForm').val();
    var validacion = document.getElementById("exception");

    if(radioProduccion == undefined){
        inputProduccion.setAttribute("style","border-color: red");
        errorProduccion.innerHTML = "Hay que marcar una <b>producción</b> para añadir";
    }else{
        inputProduccion.removeAttribute("style");
        errorProduccion.innerHTML = "";
    }

    if(radioRecurso == undefined){
        errorRecurso.innerHTML = "Hay que marcar un <b>recurso</b> para añadir";
    }else{
        errorRecurso.innerHTML = "";
    }

    if(radioProduccion != undefined && radioRecurso != undefined){
        for(let i = 0; i < arrayRecursos.length; i++){
            if(radioRecurso == arrayRecursos[i].duration){
                var recurso = arrayRecursos[i];
            }
        }

        var encontrado = false;
        var producciones = video.productions;
	    var produccion = producciones.next();

	    while ((produccion.done !== true) && (!encontrado)){
            if(produccion.value.title == radioProduccion){
                if(produccion.value instanceof Movie){
                    produccion.value.resource = recurso;
                }else{
                    for (let index = 0; index < produccion.value.seasons.length; index++) {
                        for(let indexArray = 0; indexArray < produccion.value.seasons[index].episodes.length; indexArray++){
                            produccion.value.seasons[index].episodes[indexArray].episode = recurso;
                        }
                    }
                }

                encontrado = true;
            }
		
		    produccion = producciones.next();
        }

        validacion.innerHTML = "Recurso añadido con éxito";

    }

}

function modificarCampos(){
    var titulo = this.value;

    var tituloContenido = document.getElementById("tituloZona");
    tituloContenido.removeAttribute("class");
    tituloContenido.setAttribute("class","text-center");
    tituloContenido.innerHTML = "▪️ Modificar " + titulo +" ▪️";

    //Selecciona la zona central donde van las tarjetas de las categorias
	var tarjetas = document.getElementById("tarjetasZona");

	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (tarjetas.firstChild) {
		tarjetas.removeChild(tarjetas.firstChild);
    }

    var tarjeta = document.createElement("div");
    tarjeta.setAttribute("class","col-lg-12 col-md-12 mb-4");
    var borde = document.createElement("div");
    borde.setAttribute("class","card h-100");
    var cuerpo = document.createElement("div");
    cuerpo.setAttribute("class","card-body");
    var form = document.createElement("form");

    tarjetas.appendChild(tarjeta);
    tarjeta.appendChild(borde);
    borde.appendChild(cuerpo);
    cuerpo.appendChild(form);

    if(titulo == "Categorías"){
        var table = document.createElement("table");
        table.setAttribute("class","table table-bordered table-striped mt-3");
        var thead = document.createElement("thead");
        var tr1 = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.appendChild(document.createTextNode(""));
        var th2 = document.createElement("th");
        th2.appendChild(document.createTextNode("Nombre"));
        var th3 = document.createElement("th");
        th3.appendChild(document.createTextNode("Descripción"));
        var tbody = document.createElement("tbody");
        tbody.setAttribute("id","myTable");

        form.appendChild(table);
        table.appendChild(thead);
        thead.appendChild(tr1);
        tr1.appendChild(th1);
        tr1.appendChild(th2);
        tr1.appendChild(th3);
        table.appendChild(tbody);

        var categorias = video.categories;
	    var categoria = categorias.next();

	    while (categoria.done !== true){
            var tr = document.createElement("tr");
            var tdButton = document.createElement("td");
            var button = document.createElement("button");
            button.setAttribute("type","button");
            button.setAttribute("class","btn borrarBoton p-0");
            button.setAttribute("value",categoria.value.name);
            button.addEventListener("click", modificarCategorias);
        
            var img = document.createElement("img");
            img.setAttribute("class","img-fluid");
            img.setAttribute("src","img/modificar.png");
            img.setAttribute("alt",categoria.value.name);
            img.setAttribute("style","width: 25px;");

            button.appendChild(img);
            tdButton.appendChild(button);

            var tdNombre = document.createElement("td");
            var inputNombre = document.createElement("input");
            inputNombre.setAttribute("class","form-control");
            inputNombre.setAttribute("type","text");
            inputNombre.setAttribute("id","inputNom" + categoria.value.name);
            inputNombre.setAttribute("value",categoria.value.name);

            tdNombre.appendChild(inputNombre);
            
            var tdDescripcion = document.createElement("td");
            var inputDesc = document.createElement("textarea");
            inputDesc.setAttribute("class","form-control");
            inputDesc.setAttribute("id","inputDes" + categoria.value.name);
            inputDesc.appendChild(document.createTextNode(categoria.value.description));
            inputDesc.setAttribute("cols","50");
            inputDesc.setAttribute("rows","4");
           
            tdDescripcion.appendChild(inputDesc);

            tbody.appendChild(tr);
            tr.appendChild(tdButton);
            tr.appendChild(tdNombre);
            tr.appendChild(tdDescripcion);
        
            //Pasa a la siguiente categoria
            categoria = categorias.next();
	    }//FIn del while iterador
    }

    if(titulo == "Actores"){
        var table = document.createElement("table");
        table.setAttribute("class","table table-bordered table-striped mt-3");
        var thead = document.createElement("thead");
        var tr1 = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.appendChild(document.createTextNode(""));
        var th2 = document.createElement("th");
        th2.appendChild(document.createTextNode("Nombre"));
        var th3 = document.createElement("th");
        th3.appendChild(document.createTextNode("Primer Apellido"));
        var th4 = document.createElement("th");
        th4.appendChild(document.createTextNode("Segundo Apellido"));
        var th5 = document.createElement("th");
        th5.appendChild(document.createTextNode("Fecha de nacimiento"));
        var tbody = document.createElement("tbody");
        tbody.setAttribute("id","myTable");

        form.appendChild(table);
        table.appendChild(thead);
        thead.appendChild(tr1);
        tr1.appendChild(th1);
        tr1.appendChild(th2);
        tr1.appendChild(th3);
        tr1.appendChild(th4);
        tr1.appendChild(th5);
        table.appendChild(tbody);

        var actores = video.actors;
	    var actor = actores.next();

	    while (actor.done !== true){
            var tr = document.createElement("tr");
            var tdButton = document.createElement("td");
            var button = document.createElement("button");
            button.setAttribute("type","button");
            button.setAttribute("class","btn borrarBoton p-0");
            button.setAttribute("value",actor.value.name);
            button.addEventListener("click", modificarActor);
        
            var img = document.createElement("img");
            img.setAttribute("class","img-fluid");
            img.setAttribute("src","img/modificar.png");
            img.setAttribute("alt",actor.value.name);
            img.setAttribute("style","width: 35px;");

            button.appendChild(img);
            tdButton.appendChild(button);

            var tdNombre = document.createElement("td");
            var inputNombre = document.createElement("input");
            inputNombre.setAttribute("class","form-control");
            inputNombre.setAttribute("type","text");
            inputNombre.setAttribute("id","inputNom" + actor.value.name);
            inputNombre.setAttribute("value",actor.value.name);

            tdNombre.appendChild(inputNombre);
            
            var tdApe1 = document.createElement("td");
            var inputApe1 = document.createElement("input");
            inputApe1.setAttribute("class","form-control");
            inputApe1.setAttribute("type","text");
            inputApe1.setAttribute("id","inputApe1" + actor.value.name);
            inputApe1.setAttribute("value",actor.value.lastname1);
           
            tdApe1.appendChild(inputApe1);

            var tdApe2 = document.createElement("td");
            var inputApe2 = document.createElement("input");
            inputApe2.setAttribute("class","form-control");
            inputApe2.setAttribute("type","text");
            inputApe2.setAttribute("id","inputApe2" + actor.value.name);
            inputApe2.setAttribute("value",actor.value.lastname2);
           
            tdApe2.appendChild(inputApe2);

            var tdNaci = document.createElement("td");
            var inputNaci = document.createElement("input");
            inputNaci.setAttribute("class","form-control");
            inputNaci.setAttribute("type","text");
            inputNaci.setAttribute("id","inputNaci" + actor.value.name);
            inputNaci.setAttribute("value",actor.value.born.toLocaleDateString());
           
            tdNaci.appendChild(inputNaci);

            tbody.appendChild(tr);
            tr.appendChild(tdButton);
            tr.appendChild(tdNombre);
            tr.appendChild(tdApe1);
            tr.appendChild(tdApe2);
            tr.appendChild(tdNaci);
        
            //Pasa al siguiente actor
            actor = actores.next();
	    }//FIn del while iterador
    }

    if(titulo == "Directores"){
        var table = document.createElement("table");
        table.setAttribute("class","table table-bordered table-striped mt-3");
        var thead = document.createElement("thead");
        var tr1 = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.appendChild(document.createTextNode(""));
        var th2 = document.createElement("th");
        th2.appendChild(document.createTextNode("Nombre"));
        var th3 = document.createElement("th");
        th3.appendChild(document.createTextNode("Primer Apellido"));
        var th4 = document.createElement("th");
        th4.appendChild(document.createTextNode("Segundo Apellido"));
        var th5 = document.createElement("th");
        th5.appendChild(document.createTextNode("Fecha de nacimiento"));
        var tbody = document.createElement("tbody");
        tbody.setAttribute("id","myTable");

        form.appendChild(table);
        table.appendChild(thead);
        thead.appendChild(tr1);
        tr1.appendChild(th1);
        tr1.appendChild(th2);
        tr1.appendChild(th3);
        tr1.appendChild(th4);
        tr1.appendChild(th5);
        table.appendChild(tbody);

        var directores = video.directors;
	    var director = directores.next();

	    while (director.done !== true){
            var tr = document.createElement("tr");
            var tdButton = document.createElement("td");
            var button = document.createElement("button");
            button.setAttribute("type","button");
            button.setAttribute("class","btn borrarBoton p-0");
            button.setAttribute("value",director.value.name);
            button.addEventListener("click", modificarDirector);
        
            var img = document.createElement("img");
            img.setAttribute("class","img-fluid");
            img.setAttribute("src","img/modificar.png");
            img.setAttribute("alt",director.value.name);
            img.setAttribute("style","width: 35px;");

            button.appendChild(img);
            tdButton.appendChild(button);

            var tdNombre = document.createElement("td");
            var inputNombre = document.createElement("input");
            inputNombre.setAttribute("class","form-control");
            inputNombre.setAttribute("type","text");
            inputNombre.setAttribute("id","inputNom" + director.value.name);
            inputNombre.setAttribute("value",director.value.name);

            tdNombre.appendChild(inputNombre);
            
            var tdApe1 = document.createElement("td");
            var inputApe1 = document.createElement("input");
            inputApe1.setAttribute("class","form-control");
            inputApe1.setAttribute("type","text");
            inputApe1.setAttribute("id","inputApe1" + director.value.name);
            inputApe1.setAttribute("value",director.value.lastname1);
           
            tdApe1.appendChild(inputApe1);

            var tdApe2 = document.createElement("td");
            var inputApe2 = document.createElement("input");
            inputApe2.setAttribute("class","form-control");
            inputApe2.setAttribute("type","text");
            inputApe2.setAttribute("id","inputApe2" + director.value.name);
            inputApe2.setAttribute("value",director.value.lastname2);
           
            tdApe2.appendChild(inputApe2);

            var tdNaci = document.createElement("td");
            var inputNaci = document.createElement("input");
            inputNaci.setAttribute("class","form-control");
            inputNaci.setAttribute("type","text");
            inputNaci.setAttribute("id","inputNaci" + director.value.name);
            inputNaci.setAttribute("value",director.value.born.toLocaleDateString());
           
            tdNaci.appendChild(inputNaci);

            tbody.appendChild(tr);
            tr.appendChild(tdButton);
            tr.appendChild(tdNombre);
            tr.appendChild(tdApe1);
            tr.appendChild(tdApe2);
            tr.appendChild(tdNaci);
        
            //Pasa al siguiente director
            director = directores.next();
	    }//FIn del while iterador
    }

}

function modificarCategorias(){
    var nombreBuscar = this.value;
    var nombre = document.getElementById("inputNom" + this.value).value;
    var descripcion = document.getElementById("inputDes" + this.value).value;

    var encontrado = false;
    var categorias = video.categories;
	var categoria = categorias.next();

	while ((categoria.done !== true) && (!encontrado)){
		if (categoria.value.name == nombreBuscar) {

            categoria.value.name = nombre;
            categoria.value.description = descripcion;

            modifyCategory(nombreBuscar,nombre,descripcion);

			encontrado = true;
		}
		
		categoria = categorias.next();
    }
   
    categoriesMenuPopulate();
    entrarAlSistema();
}

function modificarActor(){
    var nombreBuscar = this.value;
    var nombre = document.getElementById("inputNom" + this.value).value;
    var apellido1 = document.getElementById("inputApe1" + this.value).value;
    var apellido2 = document.getElementById("inputApe2" + this.value).value;
    var nacimiento = document.getElementById("inputNaci" + this.value).value;
    var arrayNacimiento = nacimiento.split("/");

    var encontrado = false;
    var actores = video.actors;
	var actor = actores.next();

	while ((actor.done !== true) && (!encontrado)){
		if (actor.value.name == nombreBuscar) {

            actor.value.name = nombre;
            actor.value.lastname1 = apellido1;
            actor.value.lastname2 = apellido2;
            actor.value.born = new Date(arrayNacimiento[2],arrayNacimiento[1],arrayNacimiento[0]);

            modifyPerson("Actores",nombreBuscar,nombre,apellido1,apellido2,new Date(arrayNacimiento[2],arrayNacimiento[1],arrayNacimiento[0]));

			encontrado = true;
		}
		
		actor = actores.next();
    }

    categoriesMenuPopulate();
    entrarAlSistema();


}

function modificarDirector(){
    var nombreBuscar = this.value;
    var nombre = document.getElementById("inputNom" + this.value).value;
    var apellido1 = document.getElementById("inputApe1" + this.value).value;
    var apellido2 = document.getElementById("inputApe2" + this.value).value;
    var nacimiento = document.getElementById("inputNaci" + this.value).value;
    var arrayNacimiento = nacimiento.split("/");

    var encontrado = false;
    var directores = video.directors;
	var director = directores.next();

	while ((director.done !== true) && (!encontrado)){
		if (director.value.name == nombreBuscar) {

            director.value.name = nombre;
            director.value.lastname1 = apellido1;
            director.value.lastname2 = apellido2;
            director.value.born = new Date(arrayNacimiento[2],arrayNacimiento[1],arrayNacimiento[0]);

            modifyPerson("Directores",nombreBuscar,nombre,apellido1,apellido2,new Date(arrayNacimiento[2],arrayNacimiento[1],arrayNacimiento[0]));

			encontrado = true;
		}
		
		director = directores.next();
    }

    categoriesMenuPopulate();
    entrarAlSistema();
}

function eliminarCampos(){
    var titulo = this.value;

    var tituloContenido = document.getElementById("tituloZona");
    tituloContenido.removeAttribute("class");
    tituloContenido.setAttribute("class","text-center");
    tituloContenido.innerHTML = "▪️ Eliminar " + titulo +" ▪️";

    //Selecciona la zona central donde van las tarjetas de las categorias
	var tarjetas = document.getElementById("tarjetasZona");

	//QUITA TODO EL CONTENIDO QUE HAYA EN LA VARIABLE CONTENIDO
	while (tarjetas.firstChild) {
		tarjetas.removeChild(tarjetas.firstChild);
    }

    var tarjeta = document.createElement("div");
    tarjeta.setAttribute("class","ccol-lg-12 col-md-12 mb-4");
    var borde = document.createElement("div");
    borde.setAttribute("class","card h-100");
    var cuerpo = document.createElement("div");
    cuerpo.setAttribute("class","card-body");
    var pError = document.createElement("p");
    pError.setAttribute("id","pError");
    pError.setAttribute("class","text-center font-weight-bold error");

    tarjetas.appendChild(tarjeta);
    tarjeta.appendChild(borde);
    borde.appendChild(cuerpo);
    cuerpo.appendChild(pError);

    if(titulo == "Categorías"){
        var seach = document.createElement("input");
        seach.setAttribute("class","form-control");
        seach.setAttribute("id","miInput");
        seach.setAttribute("type","text");
        seach.setAttribute("placeholder","Buscar...");

        var table = document.createElement("table");
        table.setAttribute("class","table table-bordered table-striped mt-3");
        var thead = document.createElement("thead");
        var tr1 = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.appendChild(document.createTextNode(""));
        var th2 = document.createElement("th");
        th2.appendChild(document.createTextNode("Nombre"));
        var tbody = document.createElement("tbody");
        tbody.setAttribute("id","miTabla");

        cuerpo.appendChild(seach);
        cuerpo.appendChild(table);
        table.appendChild(thead);
        thead.appendChild(tr1);
        tr1.appendChild(th1);
        tr1.appendChild(th2);
        table.appendChild(tbody);

        var categorias = video.categories;
	    var categoria = categorias.next();

	    while (categoria.done !== true){
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            var button = document.createElement("button");
            button.setAttribute("type","button");
            button.setAttribute("class","btn borrarBoton p-0");
            button.setAttribute("data-toggle","modal");
            button.setAttribute("data-target","#exampleModal");
            button.setAttribute("value",categoria.value.name);
            button.addEventListener("click", mostrarCosasModal);

            var img = document.createElement("img");
            img.setAttribute("class","img-fluid");
            img.setAttribute("src","img/delete.png");
            img.setAttribute("alt",categoria.value.name);
            img.setAttribute("style","width: 25px;");

            button.appendChild(img);
            
            var tdNombre = document.createElement("td");
            tdNombre.appendChild(document.createTextNode(categoria.value.name));

            tbody.appendChild(tr);
            tr.appendChild(td);
            tr.appendChild(tdNombre);
            td.appendChild(button);
            
        
            //Pasa a la siguiente categoria
            categoria = categorias.next();
	    }//FIn del while iterador

    }

    if(titulo == "Actores"){
        var seach = document.createElement("input");
        seach.setAttribute("class","form-control");
        seach.setAttribute("id","miInput");
        seach.setAttribute("type","text");
        seach.setAttribute("placeholder","Buscar...");

        var table = document.createElement("table");
        table.setAttribute("class","table table-bordered table-striped mt-3");
        var thead = document.createElement("thead");
        var tr1 = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.appendChild(document.createTextNode(""));
        var th2 = document.createElement("th");
        th2.appendChild(document.createTextNode("Nombre"));
        var tbody = document.createElement("tbody");
        tbody.setAttribute("id","miTabla");

        cuerpo.appendChild(seach);
        cuerpo.appendChild(table);
        table.appendChild(thead);
        thead.appendChild(tr1);
        tr1.appendChild(th1);
        tr1.appendChild(th2);
        table.appendChild(tbody);

        var actores = video.actors;
	    var actor = actores.next();

	    while (actor.done !== true){
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            var button = document.createElement("button");
            button.setAttribute("type","button");
            button.setAttribute("class","btn borrarBoton p-0");
            button.setAttribute("data-toggle","modal");
            button.setAttribute("data-target","#exampleModal");
            button.setAttribute("value",actor.value.name);
            button.addEventListener("click", mostrarCosasModal);

            var img = document.createElement("img");
            img.setAttribute("class","img-fluid");
            img.setAttribute("src","img/delete.png");
            img.setAttribute("alt",actor.value.name);
            img.setAttribute("style","width: 25px;");

            button.appendChild(img);
            
            var tdNombre = document.createElement("td");
            tdNombre.appendChild(document.createTextNode(actor.value.name + " " + actor.value.lastname1 + " " + actor.value.lastname2));

            tbody.appendChild(tr);
            tr.appendChild(td);
            tr.appendChild(tdNombre);
            td.appendChild(button);
            
            //Pasa al siguiente actor
            actor = actores.next();
	    }//FIn del while iterador
    }

    if(titulo == "Directores"){
        var seach = document.createElement("input");
        seach.setAttribute("class","form-control");
        seach.setAttribute("id","miInput");
        seach.setAttribute("type","text");
        seach.setAttribute("placeholder","Buscar...");

        var table = document.createElement("table");
        table.setAttribute("class","table table-bordered table-striped mt-3");
        var thead = document.createElement("thead");
        var tr1 = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.appendChild(document.createTextNode(""));
        var th2 = document.createElement("th");
        th2.appendChild(document.createTextNode("Nombre"));
        var tbody = document.createElement("tbody");
        tbody.setAttribute("id","miTabla");

        cuerpo.appendChild(seach);
        cuerpo.appendChild(table);
        table.appendChild(thead);
        thead.appendChild(tr1);
        tr1.appendChild(th1);
        tr1.appendChild(th2);
        table.appendChild(tbody);

        var directores = video.directors;
	    var director = directores.next();

	    while (director.done !== true){
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            var button = document.createElement("button");
            button.setAttribute("type","button");
            button.setAttribute("class","btn borrarBoton p-0");
            button.setAttribute("data-toggle","modal");
            button.setAttribute("data-target","#exampleModal");
            button.setAttribute("value",director.value.name);
            button.addEventListener("click", mostrarCosasModal);

            var img = document.createElement("img");
            img.setAttribute("class","img-fluid");
            img.setAttribute("src","img/delete.png");
            img.setAttribute("alt",director.value.name);
            img.setAttribute("style","width: 25px;");

            button.appendChild(img);
            
            var tdNombre = document.createElement("td");
            tdNombre.appendChild(document.createTextNode(director.value.name + " " + director.value.lastname1 + " " + director.value.lastname2));

            tbody.appendChild(tr);
            tr.appendChild(td);
            tr.appendChild(tdNombre);
            td.appendChild(button);
            
            //Pasa al siguiente director
            director = directores.next();
	    }//FIn del while iterador
    }

    if(titulo == "Producciones"){
        var seach = document.createElement("input");
        seach.setAttribute("class","form-control");
        seach.setAttribute("id","miInput");
        seach.setAttribute("type","text");
        seach.setAttribute("placeholder","Buscar...");

        var table = document.createElement("table");
        table.setAttribute("class","table table-bordered table-striped mt-3");
        var thead = document.createElement("thead");
        var tr1 = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.appendChild(document.createTextNode(""));
        var th2 = document.createElement("th");
        th2.appendChild(document.createTextNode("Nombre"));
        var tbody = document.createElement("tbody");
        tbody.setAttribute("id","miTabla");

        cuerpo.appendChild(seach);
        cuerpo.appendChild(table);
        table.appendChild(thead);
        thead.appendChild(tr1);
        tr1.appendChild(th1);
        tr1.appendChild(th2);
        table.appendChild(tbody);

        var producciones = video.productions;
	    var produccion = producciones.next();

	    while (produccion.done !== true){
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            var button = document.createElement("button");

            button.setAttribute("type","button");
            button.setAttribute("class","btn borrarBoton p-0");
            button.setAttribute("data-toggle","modal");
            button.setAttribute("data-target","#exampleModal");
            button.setAttribute("value",produccion.value.title);
            button.addEventListener("click", mostrarCosasModal);

            var img = document.createElement("img");
            img.setAttribute("class","img-fluid");
            img.setAttribute("src","img/delete.png");
            img.setAttribute("alt",produccion.value.title);
            img.setAttribute("style","width: 25px;");

            button.appendChild(img);
            
            var tdNombre = document.createElement("td");
            tdNombre.appendChild(document.createTextNode(produccion.value.title));

            tbody.appendChild(tr);
            td.appendChild(button);
            tr.appendChild(td);
            tr.appendChild(tdNombre);
            
            //Pasa a la siguiente produccion
            produccion = producciones.next();
	    }//FIn del while iterador
    }

    if(titulo == "Recursos"){
        var seach = document.createElement("input");
        seach.setAttribute("class","form-control");
        seach.setAttribute("id","miInput");
        seach.setAttribute("type","text");
        seach.setAttribute("placeholder","Buscar...");

        var table = document.createElement("table");
        table.setAttribute("class","table table-bordered table-striped mt-3");
        var thead = document.createElement("thead");
        var tr1 = document.createElement("tr");
        var th1 = document.createElement("th");
        th1.appendChild(document.createTextNode(""));
        var th2 = document.createElement("th");
        th2.appendChild(document.createTextNode("Nombre"));
        var th3 = document.createElement("th");
        th3.appendChild(document.createTextNode("Recurso"));

        var tbody = document.createElement("tbody");
        tbody.setAttribute("id","miTabla");

        cuerpo.appendChild(seach);
        cuerpo.appendChild(table);
        table.appendChild(thead);
        thead.appendChild(tr1);
        tr1.appendChild(th1);
        tr1.appendChild(th2);
        tr1.appendChild(th3);
        table.appendChild(tbody);

        var producciones = video.productions;
	    var produccion = producciones.next();

	    while (produccion.done !== true){
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.setAttribute("style","width: 10%;");
            var button = document.createElement("button");

            button.setAttribute("type","button");
            button.setAttribute("class","btn borrarBoton p-0");
            button.setAttribute("data-toggle","modal");
            button.setAttribute("data-target","#exampleModal");
            button.setAttribute("value",produccion.value.title);
            button.addEventListener("click", mostrarCosasModal);

            var img = document.createElement("img");
            img.setAttribute("class","img-fluid");
            img.setAttribute("src","img/delete.png");
            img.setAttribute("alt",produccion.value.title);
            img.setAttribute("style","width: 25px;");

            button.appendChild(img);
            
            var tdNombre = document.createElement("td");
            tdNombre.appendChild(document.createTextNode(produccion.value.title));

            var tdRecurso = document.createElement("td");

            if(produccion.value instanceof Movie){
                tdRecurso.appendChild(document.createTextNode(produccion.value.resource));
            }else{
                for (let index = 0; index < produccion.value.seasons.length; index++) {
                    for(let indexArray = 0; indexArray < produccion.value.seasons[index].episodes.length; indexArray++){
                        tdRecurso.appendChild(document.createTextNode(produccion.value.seasons[index].episodes[indexArray].episode + " "));
                    }
                }
            }

            tbody.appendChild(tr);
            td.appendChild(button);
            tr.appendChild(td);
            tr.appendChild(tdNombre);
            tr.appendChild(tdRecurso);
            
            //Pasa a la siguiente produccion
            produccion = producciones.next();
	    }//FIn del while iterador
    }

    if(titulo == "Valoración"){
        var imagen = document.createElement("img");
        imagen.setAttribute("class","img-card");
        imagen.setAttribute("src","img/pandaencontruccion.gif");
        imagen.setAttribute("style","width: 100%");
        imagen.setAttribute("alt","imagencontruccion");

        var divCos = document.createElement("div");
        divCos.setAttribute("class","card-img-overlay");

        var h1 = document.createElement("h1");
        h1.setAttribute("class","card-title text-center m-0");
        h1.setAttribute("style","background-color: white");
        h1.appendChild(document.createTextNode("En construcción"));

        var p = document.createElement("p");
        p.setAttribute("class","card-text text-center pb-3");
        p.setAttribute("style","background-color: white");
        p.appendChild(document.createTextNode("Sentimos las molestias"));

        cuerpo.appendChild(imagen);
        cuerpo.appendChild(divCos);
        divCos.appendChild(h1);
        divCos.appendChild(p);
    }

    $(document).ready(function(){
        $("#miInput").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#miTabla tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });
}

function eliminarCategorias(){
    var contenidoBorrar = document.getElementById("nombreBorrar").textContent;
    var pError = document.getElementById("pError");

    var encontrado = false;
    var categorias = video.categories;
	var categoria = categorias.next();

	while ((categoria.done !== true) && (!encontrado)){
		if (categoria.value.name == contenidoBorrar) {

            var categoriaBorrar = categoria.value;

			var productions = video.getProductionsCategory(categoria.value);
			var production = productions.next();

			while (production.done !== true){
                
                video.deassignCategory(categoriaBorrar,production.value);

				production = productions.next();
			}

			encontrado = true;
		}
		
		categoria = categorias.next();
    }
    
    try{
        video.removeCategory(categoriaBorrar);

        deleteValue("Categorias", categoriaBorrar.name);
        deleteValue("AsignarCategorias", categoriaBorrar.name);

        categoriesMenuPopulate();
        entrarAlSistema();

    }catch(error){
        pError.innerHTML = error.message;
    }

}

function eliminarActor(){
    var contenidoBorrar = document.getElementById("nombreBorrar").textContent;
    var pError = document.getElementById("pError");

    var encontrado = false;
    var actores = video.actors;
    var actor = actores.next();
    
    while ((actor.done !== true) && (!encontrado)){
		if (actor.value.name == contenidoBorrar) {

            var actorBorrar = actor.value;

			var productions =  video.getProductionsActor(actor.value);
			var production = productions.next();

			while (production.done !== true){
                
                video.deassignActor(actorBorrar,production.value);

				production = productions.next();
			}

			encontrado = true;
		}
		
		actor = actores.next();
    }

    try{
        video.removeActor(actorBorrar);

        deleteValue("Actores",actorBorrar.name);
        deleteValue("AsignarActores",actorBorrar.name);

        entrarAlSistema();

    }catch(error){
        pError.innerHTML = error.message;
    }

}

function eliminarDirector(){
    var contenidoBorrar = document.getElementById("nombreBorrar").textContent;
    var pError = document.getElementById("pError");

    var encontrado = false;
    var directores = video.directors;
    var director = directores.next();
    
    while ((director.done !== true) && (!encontrado)){
		if (director.value.name == contenidoBorrar) {

            var directorBorrar = director.value;

			var productions =  video.getProductionsDirector(director.value);
			var production = productions.next();

			while (production.done !== true){
                
                video.deassignDirector(directorBorrar,production.value);

				production = productions.next();
			}

			encontrado = true;
		}
		
		director = directores.next();
    }

    try{
        video.removeDirector(directorBorrar);

        deleteValue("Directores",directorBorrar.name);
        deleteValue("AsignarDirectores",directorBorrar.name);

        entrarAlSistema();

    }catch(error){
        pError.innerHTML = error.message;
    }

}

function eliminarProduccion(){
    var contenidoBorrar = document.getElementById("nombreBorrar").textContent;
    var pError = document.getElementById("pError");

    var encontrado = false;
    var producciones = video.productions;
    var produccion = producciones.next();
    
    while ((produccion.done !== true) && (!encontrado)){
		if (produccion.value.title == contenidoBorrar) {

            var produccionBorrar = produccion.value;

            var categorias = video.categories;
	        var categoria = categorias.next();
            while ((categoria.done !== true)){
                var productions = video.getProductionsCategory(categoria.value);
                var production = productions.next();
    
                while (production.done !== true){
                    if(production.value.title === contenidoBorrar){
                        video.deassignCategory(categoria.value,produccionBorrar);
                        dessasignar("AsignarCategorias",categoria.value.name,produccionBorrar.title);
                    }
                    production = productions.next();
                }
                categoria = categorias.next();
            }

			var elenco = video.getCast(produccion.value);
			var actor = elenco.next();
			while (actor.done !== true){
                video.deassignActor(actor.value, produccionBorrar);
                dessasignarActor("AsignarActores",actor.value.name,produccionBorrar.title);
				actor = elenco.next();
            }
            
			var directores = video.directors;
			var director = directores.next();
			while ((director.done !== true)){
				var productions = video.getProductionsDirector(director.value);
				var production = productions.next();

				while(production.done !== true){
					if(production.value.title === contenidoBorrar){
                            video.deassignDirector(director.value, produccionBorrar);
                            dessasignar("AsignarDirectores",director.value.name,produccionBorrar.title);
					}
					production = productions.next();
				}
				director = directores.next();
			}

			encontrado = true;
		}
		
		produccion = producciones.next();
    }

    try{
        video.removeProduction(produccionBorrar);

        deleteValue("Producciones",produccionBorrar.title);

        entrarAlSistema();
    }catch(error){
        pError.innerHTML = error.message;
    }
}

function eliminarRecurso(){
    var contenidoBorrar = document.getElementById("nombreBorrar").textContent;

    var encontrado = false;
    var producciones = video.productions;
    var produccion = producciones.next();

    while ((produccion.done !== true) && (!encontrado)){
        if(produccion.value.title == contenidoBorrar){
            if(produccion.value instanceof Movie){
                produccion.value.resource = "";
            }else{
                for (let index = 0; index < produccion.value.seasons.length; index++) {
                    for(let indexArray = 0; indexArray < produccion.value.seasons[index].episodes.length; indexArray++){
                        produccion.value.seasons[index].episodes[indexArray].episode = "";
                    }
                }
            }

            encontrado = true;
        }
    
        produccion = producciones.next();
    }

}

function mostrarCosasModal(){
    var titulo = document.getElementById("tituloZona").textContent;
    var tituloComprobar = titulo.substring(12,13).trim();
    var boton = document.getElementById("aceptarBorrar");

    if(tituloComprobar == "C"){
        boton.addEventListener("click",eliminarCategorias);
    }

    if(tituloComprobar == "A"){
        boton.addEventListener("click",eliminarActor);
    }

    if(tituloComprobar == "D"){
        boton.addEventListener("click",eliminarDirector);
    }

    if(tituloComprobar == "P"){
        boton.addEventListener("click",eliminarProduccion);
    }

    var contenido = document.getElementById("mostrarContenido");
    contenido.textContent = "¿Seguro qué quieres borrar "+ this.value + "?";

    if(tituloComprobar == "R"){
        boton.addEventListener("click",eliminarRecurso);
        contenido.innerHTML = "¿Seguro qué quieres borrar el <b>recurso</b> de "+ this.value + "?"
    }

    var valor = document.getElementById("nombreBorrar");
    valor.textContent = this.value

}