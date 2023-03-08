import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ pegarCliente, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      user.nome.value = onEdit.nome;
      user.cpf.value = onEdit.cpf;
      user.telefone.value = onEdit.telefone;
      user.endereco.value = onEdit.endereco;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = ref.current;

    if(  
        !user.nome.value||
        !user.cpf.value ||
        !user.telefone.value ||
        !user.endereco.value 
    ){
        return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
        await axios
          .put("http://localhost:8800/" + onEdit.id_cliente, {
            nome: user.nome.value,
            cpf: user.cpf.value,
            telefone: user.telefone.value,
            endereco: user.endereco.value,
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      } else {
        await axios
          .post("http://localhost:8800", {
            nome: user.nome.value,
            cpf: user.cpf.value,
            telefone: user.telefone.value,
            endereco: user.endereco.value,
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      }

      user.nome.value = "";
      user.cpf.value = "";
      user.telefone.value = "";
      user.endereco.value = "";
  
      setOnEdit(null);
      pegarCliente();
}


   return(
    <FormContainer ref={ref} onSubmit={handleSubmit}> 
        <InputArea>
            <Label>Nome</Label>
            <Input name="nome"/>
        </InputArea>
        <InputArea>
            <Label>CPF</Label>
            <Input name="cpf"/>
        </InputArea>
        <InputArea>
            <Label>Telefone</Label>
            <Input name="telefone"/>
        </InputArea>
        <InputArea>
            <Label>Endereço</Label>
            <Input name="endereco"/>
        </InputArea>
        <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form
