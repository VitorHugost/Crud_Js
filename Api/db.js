//import da biblioteca mysql
import mysql from "mysql";

//Passando os parametros de conexao do meu Banco de dados
export const db = mysql.createConnection({
  host: "localhost",
  user:"root",
  password:"Vitor99790691#",
  database:"americanas",
})
