//Excepción base para ir creando el resto de excepciones.
function BaseException() {
}
BaseException.prototype = new Error(); //Herencia del objeto Error.
BaseException.prototype.constructor = BaseException; //Definimos el constructor
//Sobrescribimos el método toString para personalizarlos
BaseException.prototype.toString = function(){
	// note that name and message are properties of Error
	return this.name + ": " + this.message;
};

//Excepción acceso inválido a constructor
function InvalidAccessConstructorException() {
	this.name = "InvalidAccessConstructorException";
	this.message = "El construstor no puede llamarse por una funcion.";
}
InvalidAccessConstructorException.prototype = new BaseException(); 
InvalidAccessConstructorException.prototype.constructor = InvalidAccessConstructorException;

//Excepción acceso inválido a constructor
function InvalidAccessException(param) {
	this.name = "InvalidAccessException";
	this.message = "El construstor de '" + param + "' no puede llamarse por una funcion.";
}
InvalidAccessException.prototype = new BaseException(); 
InvalidAccessException.prototype.constructor = InvalidAccessException;

//Excepciones de validación de parámetros. Reutilizables en todas las clases
function ParameterValidationException() {
	this.name = "ParameterValidationException";
	this.message = "Error: Excepcion de validacion de parametros.";
}
ParameterValidationException.prototype = new BaseException(); //Heredamos de BaseException
ParameterValidationException.prototype.constructor = ParameterValidationException;

//Excepción personalizada para indicar valores vacios.
function EmptyValueException(param) {
	this.name = "EmptyValueException";
	this.message = "Error: El parametro " + param + " no puede estar vacio.";
}
EmptyValueException.prototype = new ParameterValidationException(); //Heredamos de ParameterValidationException
EmptyValueException.prototype.constructor = EmptyValueException;

//Excepción de valor inválido
function InvalidValueException(param, value) {
	this.name = "InvalidValueException";
	this.message = "Error: El parametro " + param + " tiene un valor invalido. (" + param + ": " + value + ")";
}
InvalidValueException.prototype = new ParameterValidationException(); //Heredamos de ParameterValidationException
InvalidValueException.prototype.constructor = InvalidValueException;

//Excepción acceso inválido a constructor
function UninstantiatedObjectException(param) {
	this.name = "UninstantiatedObjectException";
	this.message = "No puede instanciar " + param + " objecto.";
}
UninstantiatedObjectException.prototype = new BaseException(); 
UninstantiatedObjectException.prototype.constructor = UninstantiatedObjectException;

//Excepción intento de instacia clase abstracta
function AbstractClassException(classValue) {
	this.name = "AbstractClassException";
	this.message = classValue + " es una clase abstracta.";
}
AbstractClassException.prototype = new BaseException(); 
AbstractClassException.prototype.constructor = AbstractClassException;