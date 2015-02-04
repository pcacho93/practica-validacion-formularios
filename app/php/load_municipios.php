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
                $conexion = new PDO("mysql:host=localhost;dbname=dbname;charset=utf8","user","pass");
                
                //HABILTAMOS EL MODO DE RRORES DE PDO
                $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                
                
            } catch (Exception $ex) {
                //GET CODE Y GETMESSAGE NOS DEVUELVEN EL ERROR
                echo "Erro de conexion Nº" . $ex->getCode() . " - " . $ex->getMessage() . "<br />";
            }
            
              try {
                //lanzamos el metodo query para las consultas dcl
                //capturar errores con excepciones
                 $sql = $conexion->prepare("SELECT Municipio FROM t_municipios WHERE CodPostal=?");
                 $sql->bindParam(1, $zip, PDO::PARAM_STR);       
                
                //recurremos el objeto PDOStatment con el metodo fetch
                //si solo queremos array asociativo solicitamos FECTH_ASSOC, si no, nos devuelve dos arrays, asociativo y numerico
                
                $sql->execute(); //no hace falta bind_param, se pueden pasr los parametros en el execute con un array asociativo
                if ($sql->rowCount() > 0) {
                
                  echo "<select name='localidad' id='localidad'>";
                    while ($row = $sql->fetch(PDO::FETCH_ASSOC)) {
                    //echo "<input type='text' name='localidad' id='localidad' placeholder='Localidad' value='" . $row['Municipio'] . "' />"; 
                      echo "<option value='" . $row['Municipio'] . "' >" . $row['Municipio'] . "</option>";
                    }
                  echo "</select>";
                  echo '<span class="required"></span>';
                } else {
                   echo "<input type='text' name='localidad' id='localidad' placeholder='Localidad' />"; 
                   echo '<span class="required"></span>';
                }
                
            } catch (Exception $ex) {
                echo "Error en la consulta Nº" . $ex->getCode() . " - " . $ex->getMessage();
            }
        ?>
