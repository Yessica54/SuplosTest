<?php
    include 'db.php';
    class Realty{

        protected $dbhost = 'localhost';
        protected $dbuser = 'root';
        protected $dbpass = '';
        protected $dbname = 'bd';
        protected $db;

        public function __construct() {
            $this->db = new db($this->dbhost, $this->dbuser, $this->dbpass, $this->dbname);
        }

        public function save($id, $direccion, $ciudad,$telefono,$codigo_Postal,$tipo,$precio){
            $realty = $this->db->query('SELECT * FROM realty WHERE Id = ?', array($id))->fetchArray();
            if(sizeof($realty) == 0){
                $insert = $this->db->query('INSERT INTO realty (Id,Direccion,Ciudad,Telefono,Codigo_Postal,Tipo,Precio) VALUES (?,?,?,?,?,?,?)', $id, $direccion, $ciudad,$telefono,$codigo_Postal,$tipo,$precio);
                return $insert->affectedRows();
            }
            return 0; 
        }

        public function findAll(){
            $realtys = $this->db->query('SELECT * FROM realty')->fetchAll();
            return $realtys;
        }
        
    }
    
?>