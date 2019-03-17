"use strict";
// Objeto VideoSystem


function VideoSystemException() {
	this.name = "VideoSystemException";
	this.message = "Error: Video System Exception Generica.";
}
VideoSystemException.prototype = new BaseException(); //Heredamos de BaseException
VideoSystemException.prototype.constructor = VideoSystemException;

function CategoryVideoSystemException() {
	this.name = "CategoryVideoSystemException";
	this.message = "Error: El metodo necesita una categoria como parametro.";
}
CategoryVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
CategoryVideoSystemException.prototype.constructor = CategoryVideoSystemException;

function CategoryExistsVideoSystemException() {
	this.name = "CategoryExistsVideoSystemException";
	this.message = "Error: La categoria existe en el sistema de video.";
}
CategoryExistsVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
CategoryExistsVideoSystemException.prototype.constructor = CategoryExistsVideoSystemException;

function CategoryNotExistsVideoSystemException() {
	this.name = "CategoryNotExistsVideoSystemException";
	this.message = "Error: La categoria no existe en el sistema de video.";
}
CategoryNotExistsVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
CategoryNotExistsVideoSystemException.prototype.constructor = CategoryNotExistsVideoSystemException;

function UserVideoSystemException() {
	this.name = "UserVideoSystemException";
	this.message = "Error: El metodo necesita un usuario como parametro.";
}
UserVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
UserVideoSystemException.prototype.constructor = UserVideoSystemException;

function UserExistsVideoSystemException() {
	this.name = "UserExistsVideoSystemException";
	this.message = "Error: El usuario existe en el sistema de video.";
}
UserExistsVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
UserExistsVideoSystemException.prototype.constructor = UserExistsVideoSystemException;

function UserNotExistsVideoSystemException() {
	this.name = "UserNotExistsVideoSystemException";
	this.message = "Error: El usuario no existe en el sistema de video.";
}
UserNotExistsVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
UserNotExistsVideoSystemException.prototype.constructor = UserNotExistsVideoSystemException;

function ProductionVideoSystemException() {
	this.name = "ProductionVideoSystemException";
	this.message = "Error: El metodo necesita una producion como paramentro.";
}
ProductionVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
ProductionVideoSystemException.prototype.constructor = ProductionVideoSystemException;

function ProductionExistsVideoSystemException() {
	this.name = "ProductionExistsVideoSystemException";
	this.message = "Error: La producion existe en el sistema.";
}
ProductionExistsVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
ProductionExistsVideoSystemException.prototype.constructor = ProductionExistsVideoSystemException;

function ProductionNotExistsVideoSystemException() {
	this.name = "ProductionNotExistsVideoSystemException";
	this.message = "Error: La producion no existe en el sistema.";
}
ProductionNotExistsVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
ProductionNotExistsVideoSystemException.prototype.constructor = ProductionNotExistsVideoSystemException;

function PersonVideoSystemException() {
	this.name = "PersonVideoSystemException";
	this.message = "Error: El metodo necesita una persona como paramentro.";
}
PersonVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
PersonVideoSystemException.prototype.constructor = PersonVideoSystemException;

function PersonExistsVideoSystemException() {
	this.name = "PersonExistsVideoSystemException";
	this.message = "Error: La persona existe en el sistema.";
}
PersonExistsVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
PersonExistsVideoSystemException.prototype.constructor = PersonExistsVideoSystemException;

function PersonNotExistsVideoSystemException() {
	this.name = "PersonNotExistsVideoSystemException";
	this.message = "Error: La persona no existe en el sistema.";
}
PersonNotExistsVideoSystemException.prototype = new VideoSystemException(); //Heredamos de VideoSystemException
PersonNotExistsVideoSystemException.prototype.constructor = PersonNotExistsVideoSystemException;

function NullParamException(param) {
	this.name = "NullParamException";
	this.message = "Error: El parametro "+param+" no puede ser nulo";
}
NullParamException.prototype = new VideoSystemException();
NullParamException.prototype.constructor = NullParamException;

function AssignCategoryException() {
	this.name = "AssignCategoryException";
	this.message = "Error: La categoria ya tiene asignada esa produccion.";
}
AssignCategoryException.prototype = new VideoSystemException();
AssignCategoryException.prototype.constructor = AssignCategoryException;

function AssignDirectorException() {
	this.name = "AssignDirectorException";
	this.message = "Error: El director ya tiene asignada esa produccion.";
}
AssignDirectorException.prototype = new BaseException();
AssignDirectorException.prototype.constructor = AssignDirectorException;

function AssignActorException() {
	this.name = "AssignActorException";
	this.message = "Error: El actor ya tiene asignada esa produccion.";
}
AssignActorException.prototype = new BaseException();
AssignActorException.prototype.constructor = AssignActorException;



var VideoSystem = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
	var instantiated; //Objeto con la instancia única VideoSystem

	function init() { //Inicialización del Singleton

		//Declaración de la función constructora de la instancia VideoSystem
		function VideoSystem(){
			//La función se invoca con el operador new
			if (!(this instanceof VideoSystem)) 
				throw new InvalidAccessConstructorException();

			/* Definición del atributo name */
			var _name = "";
			Object.defineProperty(this, 'name', {
				get:function(){
					return _name;
				},
				set:function(name = ""){
					name = name.trim();
					if (name === 'undefined' || name === "") throw new EmptyValueException("name");					
					_name = name;
				}		
			});

			var _resources = [];
			Object.defineProperty(this, 'resources',{
				get:function(){
					return _resources;
				}
			});

			this.addResource = function(resource){
				_resources.push(resource);
			}

			var _seasons = [];
			Object.defineProperty(this, 'seasons',{
				get:function(){
					return _seasons;
				}
			});

			this.addSeason = function(season){
				_seasons.push(season);
			}

			/* Definición del atributo categories como array para contener todas las categorías del sistema. */
			var _categories = []; //array de categorías.

			//Devuelve un iterator de los autores del gestor
			Object.defineProperty(this, 'categories', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				        next: function(){
				            return nextIndex < _categories.length ?
				            {value: _categories[nextIndex++].category, done: false} : {done: true};
				        }
				    }
				}	
			});	

			//Añade un nueva categoria al gestor
			this.addCategory = function(category){
				if (!(category instanceof Category)) { 
					throw new CategoryVideoSystemException();
				}		
				var position = this.getCategoryPosition(category); 	
				if (position === -1){
					_categories.push(
						{
							category: category,
							productions:[]
						}
					);
				} else{
					throw new CategoryExistsVideoSystemException();
				}	

				return _categories.length;
			}

			//Elimina una categoría del gestor
			this.removeCategory = function(category){
				if (!(category instanceof Category)) { 
					throw new CategoryVideoSystemException();
				}		
				var position = this.getCategoryPosition(category); 	
				if (position !== -1){
					_categories.splice(position, 1);				
				} else{
					throw new CategoryNotExistsVideoSystemException();
				}	
				return _categories.length;
			}

			//Dado una categoría, devuelve la posición de esa categoría en el array de categorías o -1 si no lo encontramos.
			this.getCategoryPosition = function(category){
				if (!(category instanceof Category)) { 
					throw new CategoryVideoSystemException();
				}		

				function compareElements(element) {
				  return (element.category.name.toLowerCase() === category.name.toLowerCase());
				}
				
				return _categories.findIndex(compareElements);		
			}

			var _users = []; //array con los users del sistema.
			//Devuelve un iterator de los usuarios del sistema
			Object.defineProperty(this, 'users', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       	next: function(){
							return nextIndex < _users.length ?
							{value: _users[nextIndex++], done: false} : {done: true};
				        }
				    }
				}	
			});	

			//Añade un nuevo usuario al sistema
			this.addUser = function(user){
				if (!(user instanceof User)) { 
					throw new UserVideoSystemException ();
				}
				//Compruebo que el surname no este registrado, lo busco
				var positionName = this.getUserNamePosition(user); 
				if (positionName !== -1){ //Si existe lanzo una excepcion
					throw new UserExistsVideoSystemException();
				} 
				//Compruebo que el email no este registrado, lo busco
				var positionEmail = this.getUserEmailPosition(user);
				if(positionEmail !== -1){ //Si existe lanzo una excepcion
					throw new EmailExistsVideoSystemExeption();
				}
				//Si no ha saltado ninguna exepcion añado el usuario al sistema, lo añado
				_users.push(user);

				return _users.length; //Devuelvo el nº elementos
			}

			//Elimina un nuevo usuario del sistema
			this.removeUser = function(user){
				if (!(user instanceof User)) { 
					throw new UserVideoSystemException ();
				}		
				var position = this.getUserNamePosition(user); 	
				if (position !== -1){
					_users.splice(position, 1);															
				} else{
					throw new UserNotExistsVideoSystemException();
				}	
				return _users.length;
			}

			//Dado un usuario, devuelve la posición de ese usu en el array de usuarios o -1 si no lo encontramos.
			this.getUserNamePosition = function(user){
				if (!(user instanceof User)) { 
					throw new UserVideoSystemException ();
				}	
				
				function compareElements(element) {
					return (element.username === user.username)
				}
	  
				return _users.findIndex(compareElements);		
			}

			//Dado un usuario, devuelve la posición de ese usu en el array de usuarios o -1 si no lo encontramos.
			this.getUserEmailPosition = function(user){
				if (!(user instanceof User)) { 
					throw new UserVideoSystemException ();
				}	
				
				function compareElements(element) {
					return (element.email === user.email)
				}
	  
				return _users.findIndex(compareElements);	
			}

			/* Definición del atributo directors como array para contener todos las produciones del gestor. */
			var _productions = []; //array con las produciones del sistema.
			//Devuelve un iterator de los produciones del gestor
			Object.defineProperty(this, 'productions', {
				get:function(){
					var nextIndex = 0;		    
					return {
						next: function(){
							return nextIndex < _productions.length ?
								{value: _productions[nextIndex++], done: false} : {done: true};
						}
					}
				}	
			});

			//Añade una nueva producion al sistema
			this.addProduction = function(production){
				if(!(production instanceof Production)){
					throw new ProductionVideoSystemException;
				}
				
				var position = this.getProductionPosition(production); 
				//Si no existe la produccion se añade al array	
				if (position === -1){
					_productions.push(production);
				} else{
					throw new ProductionExistsVideoSystemException();
				}
				return _productions.length;
			};

			//Elimina una producion del gestor
			this.removeProduction = function(production){
				if(!(production instanceof Production)){
					throw new ProductionVideoSystemException;
				}
				
				var position = this.getProductionPosition(production);
				if (position !== -1){
					_productions.splice(position, 1);			
				} else{
					throw new ProductionNotExistsVideoSystemException();
				}	
				return _productions.length;
			};

			//Dado una producion, devuelve la posición de ese usu en el array de usuarios o -1 si no lo encontramos.
			this.getProductionPosition = function(production){
				if(!(production instanceof Production)){
					throw new ProductionVideoSystemException;
				}

				function compareElements(element) {
				  return (element.title === production.title)
				}
				return _productions.findIndex(compareElements);		
			}

			/* Definición del atributo actor como array para contener todos las produciones del gestor. */
			var _actors = []; //array con los actores del sistema.
			//Devuelve un iterador que permite recorrer los actores registrados en el sistema
			Object.defineProperty(this, 'actors', {
				get:function(){
					var nextIndex = 0;		    
					return {
						next: function(){
							return nextIndex < _actors.length ?
								{value: _actors[nextIndex++].actor, done: false} : {done: true};
						}
					}
				}	
			});

			//Añade una nuevo actor
			this.addActor = function(actor){
				if(!(actor instanceof Person)){
					throw new PersonVideoSystemException ();
				}
				
				var position = this.getActorPosition(actor); 
				//Si la posicion de position es igual a -1, no
				//existe ningun actor con el mismo nombre
				if (position === -1){
					_actors.push(
						{
							actor: actor,
							productions: []
						}
					);
				} else{
					throw new PersonExistsVideoSystemException;
				}
				return _actors.length;
			};

			//Elimina un actor del sistema
			this.removeActor = function(actor){
				if(!(actor instanceof Person)){
					throw new PersonVideoSystemException();
				}

				var position = this.getActorPosition(actor);
				if (position !== -1){
					_actors.splice(position, 1);			
				} else{
					throw new PersonNotExistsVideoSystemException();
				}
				return _actors.length;
			};

			//Dado un objeto Actor, devuelve la posición de ese objeto.
			this.getActorPosition = function(actor){
				if(!(actor instanceof Person)){
					throw new PersonVideoSystemException();
				}

				function compareElements(element) {
				  return (element.actor.name.toLowerCase() === actor.name.toLowerCase() || element.actor.lastname1.toLowerCase() === actor.lastname1.toLowerCase())
				}
				return _actors.findIndex(compareElements);		
			}

			/* Definición del atributo directors como array para contener todos los directores del gestor. */
			var _directors = []; //array con los directores del sistema.
			//Devuelve un iterator de los directores del gestor
			Object.defineProperty(this, 'directors', {
				get:function(){
				    var nextIndex = 0;		    
				    return {
				       next: function(){
				           return nextIndex < _directors.length ?
				               {value: _directors[nextIndex++].director, done: false} : {done: true};
				       }
				    }
				}	
			});	

			//Añade una nuevo director
			this.addDirector = function(director){
				if(!(director instanceof Person)){
					throw new PersonVideoSystemException ();
				}

				var position = this.getDirectorPosition(director); 
				if (position === -1){
					_directors.push(
						{
							director: director,
							productions: []
						}
					);
				} else{
					throw new PersonExistsVideoSystemException();
				}
				return _directors.length;
			};

			//Elimina un nuevo director del sistema
			this.removeDirector = function(person){
				if (!(person instanceof Person)) { 
					throw new PersonVideoSystemException ();
				}		
				var position = this.getDirectorPosition(person); 	
				if (position !== -1){
					_directors.splice(position, 1);															
				} else{
					throw new PersonNotExistsVideoSystemException();
				}	
				return _directors.length;
			}

			//Dado un director, devuelve la posición de ese director en el array de directores o -1 si no lo encontramos.
			this.getDirectorPosition = function(person){
				if (!(person instanceof Person)) { 
					throw new PersonVideoSystemException ();
				}		

				function compareElements(element) {
				  return (element.director.name.toLowerCase() === person.name.toLowerCase())
				}
				
				return _directors.findIndex(compareElements);		
			}
		
			/* LAS SIGUIENTES FUNCIONES ASIGNAN Y DESAGINAN A CATEGORY */
			//Asigna uno más producciones a una categoría. Si el objeto Category o Production no existen se añaden al sistema.
			this.assignCategory = function(category, production){
				if (category == null) {
					throw new NullParamException("category");
				}
				if (production == null) {
					throw new NullParamException("production");
				}
				var positionCategory = this.getCategoryPosition(category); 
				var positionProduction = this.getProductionPosition(production);

				if(positionCategory !== -1){//Si existe la categoria, busca la produccion
					if(positionProduction !== -1){//Buscamos en el array de productions si coincide con la introducida
						var i = 0;
						var encontrado = false;
						while(i < _categories[positionCategory].productions.length && !encontrado){
							if (_categories[positionCategory].productions[i].title === production.title){
								encontrado = true;
							}
							i++;
						}
						if(!encontrado){//Coge la categoria que coincida con la position de la categoria encontrada.
						//La propiedad production de ese elemento. Hace el push al array
							_categories[positionCategory].productions.push(production);
						}else{
							throw new AssignCategoryException();
						}
					}else{//Si no existe la añade
						this.addProduction(production);
						this.assignCategory(category, production); //Vuelve a llamar a la funcion
					}
				}else{//Si no existe la añade
					this.addCategory(category);
					this.assignCategory(category, production);
				}

				return _categories[positionCategory].productions.length;
			};

			//Dado una produccion y el array productions de las categories, devuelve la posición de esa produccion.
			this.getProductionCategoryPosition = function(production, categoryProduction){
				function compareElements(element) {
					return (element.title === production.title)
				}
				return categoryProduction.findIndex(compareElements);		
			}

			//Desasigna una o más producciones de una categoría.
			this.deassignCategory = function(category, production){
				if (category == null) {
					throw new NullParamException("category");
				}
				if (production == null) {
					throw new NullParamException("production");
				}
				//Busca la posicion de esa categoria en _categories para ver si existe
				var positionCategory = this.getCategoryPosition(category); 
				var positionProduction = this.getProductionCategoryPosition(production, _categories[positionCategory].productions);

				if(positionCategory !== -1){//Si existe la categoria, busca la produccion
					if(positionProduction !== -1){//Si la produccion existe			
						_categories[positionCategory].productions.splice(positionProduction,1);
					}else{//Si no existe la produccion
						throw new ProductionNotExistsVideoSystemException();
					}	
				}else{//Si no existe la categoria
					throw new CategoryNotExistsVideoSystemException();
				}

				return _categories[positionCategory].productions.length;
			};

			/* LAS SIGUIENTES FUNCIONES ASIGNAN Y DESAGINAN A DIRECTOR */
			//Asigna uno más producciones a un director.
			this.assignDirector = function(director, production){
				if (director == null) {
					throw new NullParamException("director");
				}
				if (production == null) {
					throw new NullParamException("production");
				}
				var positionDirector = this.getDirectorPosition(director); 
				var positionProduction = this.getProductionPosition(production);

				if(positionDirector !== -1){ //Si existe el director, busca la produccion
					if(positionProduction !== -1){ //Si existe la produccion, la asigna al director
						//Buscamos en el array de productions si coincide alguna con la introducida
						var i = 0;
						var encontrado = false;
						while(i < _directors[positionDirector].productions.length && !encontrado){
							if (_directors[positionDirector].productions[i].title === production.title){
								encontrado = true;
							}
							i++;
						}
						if(!encontrado){//Coge el actor que coincida con la position del actor encontrado.
							//La propiedad production de ese elemento.Hace el push al array con el objeto literal
							_directors[positionDirector].productions.push(production);
						}else{
							throw new AssignDirectorException();
						}
					}else{//Si no existe la añade
						this.addProduction(production);
						this.assignDirector(director, production);
					}
				}else{//Si no existe la añade
					this.addDirector(director);
					this.assignDirector(director, production);
				}
				return _directors[positionDirector].productions.length;
			};

			//Dado una produccion y el array productions de los directores, devuelve la posición de esa produccion.
			this.getProductionDirectorPosition = function(production, directorProduction){
				function compareElements(element) {
					return (element.title === production.title)
				}
				return directorProduction.findIndex(compareElements);		
			}

			//Desasigna una o más producciones de un director.
			this.deassignDirector = function(director, production){
				if (director == null) {
					throw new NullParamException("director");
				}
				if (production == null) {
					throw new NullParamException("production");
				}

				var positionDirector = this.getDirectorPosition(director); 
				var positionProduction = this.getProductionDirectorPosition(production, _directors[positionDirector].productions);
				
				if(positionDirector !== -1){//Si existe el director, busca la produccion
					if(positionProduction !== -1){//Si existe la produccion, la asigna al director
						//Coge el director que coincida con la position del director encontrado.
						_directors[positionDirector].productions.splice(positionProduction,1);
					}else{//Si no existe la produccion
						throw new ProductionNotExistsVideoSystemException();
					}
				}else{//Si no existe el director
					throw new PersonNotExistsVideoSystemException();
				}
				return _directors[positionDirector].productions.length;
			};

			/* LAS SIGUIENTES FUNCIONES ASIGNAN Y DESAGINAN A ACTOR */
			//Asigna uno más producciones a un actor.
			this.assignActor = function(actor, production, character, main){
				if (actor == null) {
					throw new NullParamException("actor");
				}
				if (production == null) {
					throw new NullParamException("production");
				}
				var positionActor = this.getActorPosition(actor); 
				var positionProduction = this.getProductionPosition(production);

				if(positionActor !== -1){//Si existe el actor, busca la produccion
					if(positionProduction !== -1){//Si existe la produccion, la asigna al actor
						//Buscamos en el array de productions si coincide alguna con la introducida
						var i = 0;
						var encontrado = false;
						while(i < _actors[positionActor].productions.length && !encontrado){
							if (_actors[positionActor].productions[i].production.title === production.title){
								encontrado = true;
							}
							i++;
						}
						if(!encontrado){
							//Coge el actor que coincida con la position del actor encontrado.
							_actors[positionActor].productions.push(
								{
									production: production,
									character: character,
									main: main
								}
							);
						}else{
							throw new AssignActorException();
						}
					}else{//Si no existe la añade
						this.addProduction(production);
						this.assignActor(actor, production, character, main);
					}	
				}else{//Si no existe lo añade
					this.addActor(actor);
					this.assignActor(actor, production, character, main);
				}
				
				return _actors[positionActor].productions.length;
			};

			//Dado una produccion y el array productions de los actores, devuelve la posición de esa produccion.
			this.getProductionActorPosition = function(production, actorProduction){
				function compareElements(element) {
					return (element.production.title === production.title)
				}
				return actorProduction.findIndex(compareElements);		
			}

			//Desasigna una o más producciones de un actor.
			this.deassignActor = function(actor, production){
				if (actor == null) {
					throw new NullParamException("actor");
				}
				if (production == null) {
					throw new NullParamException("production");
				}
				var positionActor = this.getActorPosition(actor); 
				var positionProduction = this.getProductionActorPosition(production, _actors[positionActor].productions);
				
				if(positionActor !== -1){ //Si existe el actor, busca la produccion
					if(positionProduction !== -1){
						_actors[positionActor].productions.splice(positionProduction,1);
					}else{ //Si no existe la produccion
						throw new ProductionNotExistsVideoSystemException();
					}	
				}else{ //Si no existe el actor
					throw new PersonNotExistsVideoSystemException();
				}

				return _actors[positionActor].productions.length;
			};

			/* LAS SIGUIENTES FUNCIONES SON LOS ITERADORES DE LAS FUNCIONES DE ASSIGN Y DESASSIGN ANTERIORES */
			//Obtiene un iterador con la relación de los actores.
			this.getCast = function(production){
				if (production == null) {
					throw new NullParamException("production");
				}			
				var positionProduction = this.getProductionPosition(production); 	
				if (positionProduction === -1) {throw new ProductionNotExistsVideoSystemException();}
				var nextActor = 0;
				var nextProduction = 0;
			    return {
					next: function(){
						var actor = null;
						var papel = null;
						var principal = null;
						while (nextActor < _actors.length && actor === null){
							if (nextProduction < _actors[nextActor].productions.length && _actors[nextActor].productions[nextProduction].production.title === production.title){
								actor = _actors[nextActor].actor;
								papel = _actors[nextActor].productions[nextProduction].character;
								principal = _actors[nextActor].productions[nextProduction].main;
							}
							nextProduction++;
							if (nextProduction >= _actors[nextActor].productions.length){
								nextProduction = 0;
								nextActor++;
							}
						}
						if (actor !== null && papel !== null && principal !== null){
							return {value: actor, papel: papel, principal: principal, done: false}
						}
						if (nextActor >= _actors.length) return {done: true};
					}
				}
			};

			//Obtiene un iterador con las producciones de un director.
			this.getProductionsDirector = function(director){
				if (director == null) {
					throw new NullParamException("director");
				}			
				var positionDirector = this.getDirectorPosition(director); 	
				if (positionDirector === -1) {throw new PersonNotExistsVideoSystemException();}
				var nextIndex = 0;
			    return {
			       next: function(){
			       		var directors = null;
			       		while (nextIndex < _directors[positionDirector].productions.length && directors === null){
			       			if (_directors[positionDirector].director.name === director.name){
								directors = _directors[positionDirector].productions[nextIndex];
			       			}
			       			nextIndex++;
			       		}
			       		if (directors !== null){
			       			return {value: directors, done: false}
			       		}
			       		if (nextIndex >= _directors[positionDirector].productions.length) return {done: true};
			       }
			    }
			};
			
			//Obtiene un iterador con las producciones de un actor y su papel en la producción.
			this.getProductionsActor = function(actor){
				if (actor == null) {
					throw new NullParamException("actor");
				}			
				var positionActor = this.getActorPosition(actor); 	
				if (positionActor === -1) {throw new PersonNotExistsVideoSystemException();}
				var nextIndex = 0;
			    return {
			       next: function(){
						   var production = null;
						   var papel = null;
			       		while (nextIndex < _actors[positionActor].productions.length && production === null){
			       			if (_actors[positionActor].actor.name === actor.name){
								production = _actors[positionActor].productions[nextIndex].production;
								papel = _actors[positionActor].productions[nextIndex].character;
			       			}
			       			nextIndex++;
			       		}
			       		if (production !== null){
			       			return {value: production, papel: papel, done: false}
			       		}
			       		if (nextIndex >= _actors[positionActor].productions.length) return {done: true};
			       }
			    }
			};

			//Obtiene un iterador con las producciones de una categoría determinada.
			this.getProductionsCategory = function(category){
				if (category == null) {
					throw new NullParamException("category");
				}			
				var positionCategory = this.getCategoryPosition(category); 	
				if (positionCategory === -1) {throw new CategoryNotExistsVideoSystemException();}
				var nextIndex = 0;
			    return {
			       next: function(){
			       		var production = null;
			       		while (nextIndex < _categories[positionCategory].productions.length && production === null){
			       			if (_categories[positionCategory].category.name === category.name){
								production = _categories[positionCategory].productions[nextIndex];
			       			}
			       			nextIndex++;
			       		}
			       		if (production !== null){
			       			return {value: production, done: false}
			       		}
			       		if (nextIndex >= _categories[positionCategory].productions.length) return {done: true};
			       }
			    }
			};

		} //Fin constructor VideoSystem
		VideoSystem.prototype = {}; 
		VideoSystem.prototype.constructor = VideoSystem;

		var instance = new VideoSystem();//Devolvemos el objeto VideoSytem para que sea una instancia única.
		Object.freeze(instance);
		return instance;
	} //Fin inicialización del Singleton
	return {
		// Devuelve un objeto con el método getInstance
		getInstance: function () { 
			if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
				instantiated = init(); //instantiated contiene el objeto único
			}
			return instantiated; //Si ya está asignado devuelve la asignación.
		}
	};
})();