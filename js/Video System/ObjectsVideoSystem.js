"use strict";

/* Objecto Person */
function Person (name,lastname1,lastname2,born,picture) {
    //Comprobamos si la funcion se invoca con el operador new
    if (!(this instanceof Person)){
		throw new InvalidAccessConstructorException();
    };

    //Validación de parámetros obligatorios
    name = typeof name !== 'undefined' ? name : "";
    if (name === "") throw new EmptyValueException("name");
    lastname1 = typeof lastname1 !== 'undefined' ? lastname1 : "";
	if (lastname1 === "") throw new EmptyValueException("lastname1");
    lastname2 = typeof lastname2 !== 'undefined' ? lastname2 : "";
    if(!(born instanceof Date)) throw new InvalidAccessException("Date");
    born = typeof born !== 'undefined' ? born : "";
    if (born === "") throw new EmptyValueException("born");
    picture = typeof picture !== 'undefined' ? picture : "";

    //Atributos privados del objeto
    var _name = name;
    var _lastname1 = lastname1;
    var _lastname2 = lastname2;
    var _born = born;
    var _picture = picture;

    //Propiedades de acceso a los atributos privados
    Object.defineProperty(this,'name',{
        get:function(){
			return _name;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? value : "";
			if (value === "") throw new EmptyValueException("name");
			_name = value;
		}
    });

    Object.defineProperty(this,'lastname1',{
        get:function(){
			return _lastname1;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? value : "";
			if (value === "") throw new EmptyValueException("lastname1");
			_lastname1 = value;
		}
    });

    Object.defineProperty(this,'lastname2',{
        get:function(){
			return _lastname2;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? value : "";
			_lastname2 = value;
		}
    });

    Object.defineProperty(this,'born',{
        get:function(){
			return _born;
		},
		set:function(value){
            if(!(value instanceof Date)) throw new InvalidAccessException("Date");

            value = typeof value !== 'undefined' ? value : "";
            if (value === "") throw new EmptyValueException("born");
			_born = value;
		}
    });

    Object.defineProperty(this,'picture',{
        get:function(){
			return _picture;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? value : "";
			_picture = value;
		}
    });
}

Person.prototype = {}; 
Person.prototype.constructor = Person;
Person.prototype.toString = function(){
    return "Nombre: " + this.name + " 1er Apellido: " + this.lastname1 + " 2nd Apellido: " + this.lastname2 +
    " Fecha Nacimiento: " + this.born + " Imagen: " + this.picture;
};
Person.prototype.getObject = function(){
	return {
		Nombre: this.name,
		Apellido1: this.lastname1,
		Apellido2: this.lastname2,
		Nacimiento: this.born,
		Imagen: this.picture
	};
}


/* Objeto Category */
function Category(name,description){
	//Comprobamos si la funcion se invoca con el operador new
	if (!(this instanceof Category)){
		throw new InvalidAccessConstructorException();
    };

	//Validación de parámetros obligatorios
	name = typeof name !== 'undefined' ? name : "";
	if (name === "") throw new EmptyValueException("name");
	description = typeof description !== 'undefined' ? description : "";

	//Atributos privados del objeto
	var _name = name;
	var _description = description;

	//Propiedades de acceso a los atributos privados
	Object.defineProperty(this, 'name', {
		get:function(){
			return _name;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? value : "";
			if (value === "") throw new EmptyValueException("name");
			_name = value;
		}		
	});

	Object.defineProperty(this, 'description', {
		get:function(){
			return _description;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? value : "";
			_description = value;
		}		
	});
}
Category.prototype = {};
Category.prototype.constructor = Category;
Category.prototype.toString = function(){
	return "Nombre: " + this.name + " Descripcion: " + this.description;
};
Category.prototype.getObject = function(){
	return {
		Nombre: this.name,
		Descripcion: this.description
	}
};
/* Objeto Resource */
function Resource(duration,link,audios,subtitles){
	//Comprobamos si la funcion se invoca con el operador new
	if (!(this instanceof Resource)){
		throw new InvalidAccessConstructorException();
    };

	//Validación de parámetros obligatorios
	duration = typeof duration !== 'undefined' ? duration : 0;
	if (duration === 0) throw new EmptyValueException("duration");
	link = typeof link !== 'undefined' ? link : "";
	//if (link === "") throw new EmptyValueException("link");
	audios = typeof audios !== 'undefined' ? audios : [];
	subtitles = typeof subtitles !== 'undefined' ? subtitles : [];

	//Atributos privados del objeto
	var _duration = duration;
	var _link = link;
	var _audios = audios;
	var _subtitles = subtitles;

	//Propiedades de acceso a los atributos privados
	Object.defineProperty(this, 'duration', {
		get:function(){
			return _duration;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? value : 0;
			if (value === 0) throw new EmptyValueException("duration");
			_duration = value;
		}		
	});

	Object.defineProperty(this, 'link', {
		get:function(){
			return _link;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? value : "";
			if (value === "") throw new EmptyValueException("link");
			_link = value;
		}		
	});

	Object.defineProperty(this, 'audios', {
		get:function(){
			return _audios;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? value : [];
			_audios = value;
		}		
	});

	Object.defineProperty(this, 'subtitles', {
		get:function(){
			return _subtitles;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? value : [];
			_subtitles = value;
		}		
	});
}
Resource.prototype = {};
Resource.prototype.constructor = Resource;
Resource.prototype.toString = function(){
    return "Duracion: " +this.duration + " Link: " + this.link + " Audios: " + this.audios + " Subtitulos: " 
    +this.subtitles;
};
Resource.prototype.getObject = function(){
	return {
		Duracion: this.duration,
		Link: this.link,
		Audios: this.audios,
		Subtitulos: this.subtitles
	}
};


/* Objeto Abstracto Production */
function Production(title,nationality,publication,synopsis,image){
	//Comprobamos si la funcion se invoca con el operador new
	if (!(this instanceof Production)){
        throw new InvalidAccessConstructorException();
	};
	//Comprobación para que Production sea clase abstracta.
	if ((this.constructor === Production)) {
        throw new AbstractClassException("Production");
    }

	//Validación de parámetros obligatorios
	title = typeof title !== 'undefined' ? title : "";
	if (title === "") throw new EmptyValueException("title");
	nationality = typeof nationality !== 'undefined' ? nationality : "";
	if(!(publication instanceof Date)) throw new InvalidAccessException("Date");
	publication = typeof publication !== 'undefined' ? publication : "";
	if (publication === "") throw new EmptyValueException("publication");
	synopsis = typeof synopsis !== 'undefined' ? synopsis : "";
	image = typeof image !== 'undefined' ? image : "";

	//Atributos privados del objeto
	var _title = title;
	var _nationality = nationality;
	var _publication = publication;
	var _synopsis = synopsis;
	var _image = image;

	//Propiedades de acceso a los atributos privados
	Object.defineProperty(this, 'title', {
		get:function(){
			return _title;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? value : "";
			if (value === "") throw new EmptyValueException("title");
			_title = value;
		}		
	});

	Object.defineProperty(this, 'nationality', {
		get:function(){
			return _nationality;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? value : "";
			_nationality = value;
		}		
	});

	Object.defineProperty(this, 'publication', {
		get:function(){
			return _publication;
		},
		set:function(value){
			if(!(value instanceof Date)) throw new InvalidAccessException("Date");
			value = typeof value !== 'undefined' ? value : "";
			if (value === "") throw new EmptyValueException("publication");
			_publication = value;
		}		
	});

	Object.defineProperty(this, 'synopsis', {
		get:function(){
			return _synopsis;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? value : "";
			_synopsis = value;
		}		
	});

	Object.defineProperty(this, 'image', {
		get:function(){
			return _image;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? value : "";
			_image = value;
		}		
	});
}
Production.prototype = {};
Production.prototype.constructor = 	Production;
Production.prototype.toString = function(){
	return "Titulo: " + this.title + " Nacionalidad: " + this.nationality + " Fecha Publicacion: " + this.publication
	+ " Synopsis: " + this.synopsis + " Imagen: " + this.image;
}
Production.prototype.getObject = function(){
	return {
		Titulo: this.title,
		Nacionalidad: this.nationality,
		Publicacion: this.publication,
		Synopsis: this.synopsis,
		Imagen: this.image
	}
}

/* Objeto Movie que hereda de Production*/
function Movie(title,nationality,publication,synopsis,image,resource,locations){
	//Invocamos el constructor de la clase padre
    Production.call(this,title,nationality,publication,synopsis,image);
	
	//Validación de parámetros
	if(!(resource instanceof Resource) && !(resource === "")) throw new InvalidAccessException("Resource");
	resource = typeof resource !== 'undefined' ? resource : "";
	for(var i=0; i < locations.length; i++){
		if(!(locations[i] instanceof Coordinate)) throw new InvalidAccessException("Coordinate");
	}//EN UN FUTURO ESTO POSIBLEMENTE HABRÁ QUE CAMBIARLO COMO RESOURCE
	locations = typeof locations !== 'undefined' ? locations : [];

	//Atributos privados del objeto
    var _resource = resource;
	var _locations = locations;
	
	//Propiedades de acceso a los atributos privados
	Object.defineProperty(this,'resource',{
		get:function(){
			return _resource;
		},
		set:function(value){
			if(!(value instanceof Resource) && !(value === "")) throw new InvalidAccessException("Resource");
			value = typeof value !== 'undefined' ? value : "";
			_resource = value;
		}
	});

	Object.defineProperty(this,'locations',{
		get:function(){
			return _locations;
		},
		set:function(value){
			for(var i=0; i < value.length; i++){
				if(!(value[i] instanceof Coordinate)) throw new InvalidAccessException("Coordinate");
			}
			value = typeof value !== 'undefined' ? value : [];
			_locations = value;
		}
	});

}
Movie.prototype = Object.create(Production.prototype);
Movie.prototype.constructor = Movie;
Movie.prototype.toString = function(){
	return Production.prototype.toString.call(this) + " Resource: " + this.resource + " Locations: " + this.locations;
}
Movie.prototype.getObject = function(){
	return {
		Titulo: this.title,
		Nacionalidad: this.nationality,
		Publicacion: this.publication,
		Synopsis: this.synopsis,
		Imagen: this.image,
		Recurso: this.resource.getObject(),
		Localizacion: devolverLoca(this.locations),
		Tipo: "Pelicula"
	}

	function devolverLoca(value){
		if (value instanceof Coordinate){
			return value.getObject();
		}else{
			return "";
		}
	}
}

/* Objeto Serie que hereda de Production*/
function Serie(title,nationality,publication,synopsis,image,seasons){
	//Invocamos el constructor de la clase padre
	Production.call(this,title,nationality,publication,synopsis,image);

	/*for(var i=0; i < seasons.length; i++){
		if(!(seasons[i] instanceof Season)) throw new InvalidAccessException("Season");
	}*///EN UN FUTURO ESTO POSIBLEMENTE HABRÁ QUE CAMBIARLO COMO RESOURCE
	seasons = typeof seasons !== 'undefined' ? seasons : [];

	var _seasons = seasons;

	Object.defineProperty(this,'seasons',{
		get:function(){
			return _seasons;
		},
		set:function(value){
			for(var i=0; i < value.length; i++){
				if(!(value[i] instanceof Season)) throw new InvalidAccessException("Season");
			}
			value = typeof value !== 'undefined' ? value : [];
			_seasons = value;
		}
	});
}
Serie.prototype = Object.create(Production.prototype);
Serie.prototype.constructor = Serie;
Serie.prototype.toString = function(){
	return Production.prototype.toString.call(this) + " Seasons: " + this.seasons;
};
Serie.prototype.getObject = function(){
	return {
		Titulo: this.title,
		Nacionalidad: this.nationality,
		Publicacion: this.publication,
		Synopsis: this.synopsis,
		Imagen: this.image,
		Temporadas: desplegarTemporadas(this.seasons),
		Tipo: "Serie"
	}

	function desplegarTemporadas(value){
		var array = new Array();
		for(let i = 0; i < value.length; i++){
			array.push(value[i].getObject());
		}
		return array;
	}
}

/* Objeto Season */
function Season(title,episodes){
    //Comprobamos si la funcion se invoca con el operador new
    if (!(this instanceof Season)){
        throw new InvalidAccessConstructorException();
    };

    //Validación de parámetros obligatorios
    title = typeof title !== 'undefined' ? title : "";
	if (title === "") throw new EmptyValueException("title");
	/*for(var i=0; i < episodes.length; i++){
		//if(!(episodes[i].episode instanceof Resource)) throw new InvalidAccessException('Resource');
		for(var y = 0; y < episodes[i].scenarios.length; y++ ){
			if(!(episodes[i].scenarios[y] instanceof Coordinate)) throw new InvalidAccessException("Coordinate");
		}
	}*/
	episodes = typeof episodes !== 'undefined' ? episodes : [];

    //Atributos privados del objeto
    var _title = title;
	var _episodes = episodes;

    //Propiedades de acceso a los atributos privados
    Object.defineProperty(this,'title',{
        get:function(){
			return _title;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? value : "";
			if (value === "") throw new EmptyValueException("title");
			_title = value;
		}
    });

    Object.defineProperty(this,'episodes',{
        get:function(){
			return _episodes;
		},
		set:function(value){
			for(var i=0; i < value.length; i++){
				if(!(value[i].episode instanceof Resource)) throw new InvalidAccessException('Resource');
				for(var y = 0; y < value[i].scenarios.length; y++ ){
					if(!(value[i].scenarios[y] instanceof Coordinate)) throw new InvalidAccessException("Coordinate");
				}
			}

			value = typeof value !== 'undefined' ? value : [];
			_episodes = value;
		}
    });
}
Season.prototype = {};
Season.prototype.constructor = Season;
Season.prototype.toString = function(){
    return "Titulo: " + this.title + " Episodios: " + this.episodes;
};
Season.prototype.getObject = function(){
	return {
		Titulo: this.title,
		Episodios: desplegarEpisodios(this.episodes)
	}

	function desplegarEpisodios(value){
		var array = new Array();
		for(let i = 0; i < value.length; i++){
			array.push({Titulo: value[i].title});
			array.push(value[i].episode.getObject());
			for(var y = 0; y < value[i].scenarios.length; y++ ){
				array.push(value[i].scenarios[y].getObject());
			}
		}
		return array;
	}
}

/* Objeto User */
function User(username,email,password){
	//Comprobamos si la funcion se invoca con el operador new
	if (!(this instanceof User))
		throw new InvalidAccessConstructorException();
	
	username = username.trim();
	email = email.trim();

	//Validación de parámetros obligatorios
	if (username === 'undefined' || username === '') throw new EmptyValueException("username");
	if (/^[a-zA-Z][a-zA-Z0-9_\-]*(\.[a-zA-Z0-9_\-]*)*[a-zA-Z0-9]$/.test (username) !== true)
		throw new InvalidValueException("username", username);		

	if (email === 'undefined' || email === '') throw new EmptyValueException("email");	
	if (/^[a-zA-Z][a-zA-Z0-9_\-]*(\.[a-zA-Z0-9_\-]*)*[a-zA-Z0-9]\@[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test (email) !== true)
		throw new InvalidValueException("email", email);

	password = typeof password !== 'undefined' ? password : "";
	if (password === "") throw new EmptyValueException("password");
	

    //Atributos privados del objeto
    var _username = username;
    var _email = email;
    var _password = password;

	//Propiedades de acceso a los atributos privados
	Object.defineProperty(this, 'username', {
		get:function(){
			return _username;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("username");
			if (/^[a-z][a-z0-9_\-]*(\.[a-z0-9_\-]*)*[a-z0-9]$/.test (value) !== true)
				throw new InvalidValueException("username", value);		
			_username = value;
		}		
	});		

	Object.defineProperty(this, 'email', {
		get:function(){
			return _email;
		},
		set:function(value){
			if (value === 'undefined' || value === '') throw new EmptyValueException("email");	
			if (/^[a-z][a-z0-9_\-]*(\.[a-z0-9_\-]*)*[a-z0-9]\@[a-z0-9]+\.[a-z]{2,3}$/.test (value) !== true)
				throw new InvalidValueException("email", value);		
			_email = value;
		}		
	});	

    Object.defineProperty(this, 'password', {
		get:function(){
			return _password;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? value : "";
			if (value === "") throw new EmptyValueException("password")
			_password = value;
		}		
    });
}
User.prototype = {};
User.prototype.constructor = User;
User.prototype.toString = function(){
    return "Usuario: " + this.username + "(" + this.email + ")" + " Contraseña: " + this.password;
};
User.prototype.getObject = function(){
	return {
		Usuario: this.username,
		Email: this.email,
		Contraseña: this.password
	}
}

/* Objeto Coordinate */
function Coordinate(latitude, longitude){
	//La función se invoca con el operador new
	if (!(this instanceof Coordinate)) 
		throw new InvalidAccessConstructorException();

	latitude = typeof latitude !== 'undefined' ? Number(latitude).valueOf() : 0;
	if (Number.isNaN(latitude)  || latitude < -90 || latitude > 90) 
		throw new InvalidValueException("latitude", latitude);
	longitude = typeof longitude !== 'undefined' ? Number(longitude).valueOf() : 0;
	if (Number.isNaN(longitude)  || longitude < -180 || longitude > 180) 
		throw new InvalidValueException("longitude", longitude);

	var _latitude = latitude;
	var _longitude = longitude;

	Object.defineProperty(this, 'latitude', {
		get:function(){
			return _latitude;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
			if (Number.isNaN(value)  || value < -90 || value > 90) 
				throw new InvalidValueException("latitude", value);
			_latitude = value;
		}		
	});		

	Object.defineProperty(this, 'longitude', {
		get:function(){
			return _longitude;
		},
		set:function(value){
			value = typeof value !== 'undefined' ? Number(value).valueOf() : 0;
			if (Number.isNaN(value)  || value < -180 || value > 180) 
				throw new InvalidValueException("latitude", value);
			_longitude = value;
		}		
	});		

}
Coordinate.prototype = {};
Coordinate.prototype.constructor = Coordinate;
Coordinate.prototype.toString = function(){
	return "Latitud: " + this.latitude + " Longitud: " + this.longitude;
}
Coordinate.prototype.getObject = function(){
	return {
		Latitud: this.latitude,
		Longitud: this.longitude
	}
}