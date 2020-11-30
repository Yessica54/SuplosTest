<?php
    include 'Realty.php';
    $retaly = new Realty();

    switch($_SERVER['REQUEST_METHOD']){
        case 'GET':
            echo json_encode($retaly->findAll());
            break;
        case 'POST': 
            $data = json_decode(file_get_contents('php://input'), true);
            echo json_encode($retaly->save(
                $data["Id"],
                $data['Direccion'],
                $data['Ciudad'],
                $data['Telefono'],
                $data['Codigo_Postal'],
                $data['Tipo'],
                $data['Precio']
            ));
            break;
        default:
            echo 'default';
            break;
    }

?>