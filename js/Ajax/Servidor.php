<?php
	
	$data = json_decode($_POST['data']);

	//echo json_encode($data);

	$fichero = $data -> Usuario . ".json";

	if(file_exists($fichero)){ //Comprueba si el fichero existe, si existe lo borra para que no lo sobreescriba
		unlink($fichero);
	}

	$fd = fopen($fichero,"a+"); //Crea dicho fichero
    
	fputs($fd,json_encode($data));
	
	fclose($fd);
	
	echo "Esta respuesta ha sido generada en el servidor. Espero volver a verte pronto usuario: ". $data -> Usuario;
    
?>