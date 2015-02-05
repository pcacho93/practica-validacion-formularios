<?php
header('content-type: text/html; charset: utf-8');
if (strlen($_POST['cp']) == 4) {
    $zip = 0 . $_POST['cp'];
} else {
    $zip = $_POST['cp'];
}
$cp = substr($zip,0,2);
 //creamos una nueva conexion mediante la clase PDO capturando errores con try
            try {
                $conexion = new PDO("mysql:host=localhost;dbname=formulario;charset=utf8","root","root");
                
                //HABILTAMOS EL MODO DE RRORES DE PDO
                $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                
                
            } catch (Exception $ex) {
                //GET CODE Y GETMESSAGE NOS DEVUELVEN EL ERROR
                echo "Erro de conexion Nº" . $ex->getCode() . " - " . $ex->getMessage() . "<br />";
            }
            
            try {
                //lanzamos el metodo query para las consultas dcl
                //capturar errores con excepciones
                $resultado = $conexion->query("SELECT provincia, id_provincia FROM provincias");
                
                
               
                
                //recurremos el objeto PDOStatment con el metodo fetch
                //si solo queremos array asociativo solicitamos FECTH_ASSOC, si no, nos devuelve dos arrays, asociativo y numerico
                echo "<select name='prov' id='prov'>";
                while ($rows = $resultado->fetch(PDO::FETCH_ASSOC)) {
                    if ($cp != $rows['CodProv']) {
                        echo "<option value='" . $rows['CodProv'] . "'>" . $rows['Provincia'] . "</option>";
                    } else {
                        echo "<option value='" . $rows['CodProv'] . "' selected='selected'>" . $rows['Provincia'] . "</option>";
                    }
                    
                   
                }
                echo "</select>";
                echo '<span class="required"></span>';
            } catch (Exception $ex) {
                echo "Error en la sentencia Nº" . $ex->getCode() . " - " . $ex->getMessage() . " <br />";
            }
        ?>