import { db } from "../db.js";

export const getUsers = (_,res) =>{

    const q = "SELECT * FROM cliente"

    db.query(q, (err, data) => {
        if(err)return res.json(err)
        
        return res.status(200).json(data)

    });
};

export const addUser  = (req, res) =>{
const SQL = "INSERT INTO cliente (`nome`,`cpf`,`telefone`,`endereco`) VALUES(?)";

const values = [
    req.body.nome,
    req.body.cpf,
    req.body.telefone,
    req.body.endereco,
];

db.query(SQL, [values],(err) =>{

    if(err) return res.json(err)
    return res.status(200).json("Cliente cadastrado !!!");
})

}

export const updateUser  = (req, res) =>{
let SQL = "UPDATE cliente SET `nome` = ?,`cpf` = ?,`telefone` = ?,`endereco` = ? WHERE id_cliente = ?";

const values =[
    req.body.nome,
    req.body.cpf,
    req.body.telefone,
    req.body.endereco,
];

db.query(SQL, [...values, req.params.id],(err) =>{
    if(err) return res.json(err)

    return res.status(200).json("Atualizado com sucesso !!!")

})

}

export const deleteUser = (req, res) => {
    const SQL = "DELETE FROM cliente WHERE `id_cliente` = ?";
  
    db.query(SQL, [req.params.id], (err) => {
      if (err) return res.json(err);
  
      return res.status(200).json("Usuário deletado com sucesso.");
    });
  };

