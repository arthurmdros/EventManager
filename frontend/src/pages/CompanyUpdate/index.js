import React, { useRef } from "react";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Form } from "@unform/web";

import './styles.css';
import api from '../../services/api';
import logo from '../../assets/logo.png';
import Input from '../component/input';

export default function CompanyUpdate(){
    const formRef = useRef();
    const navigation = useHistory();
    const route = useLocation();
    const item = route.state;        
    const admin_id = item.admin_id;         

    async function handleSubmit(data, {reset}){
        if(data.name === ""){
            alert("Campo nome é obrigatório");            
        }else{
            try{
                await api.put(`company/update/${item.id}`, data, {
                    headers: {
                        Authorization: admin_id,
                    }
                });
                alert('Atualizado com sucesso!');
                navigation.push('/page/admin/profile');
            }catch(err){
                reset();
                alert('Erro ao atualizar, tente novamente');
            }
        }
    }

    function navigateToDetail(item){
        navigation.push('/page/admin/company/detail', item);
    }

    return(
        <div className="companyupdate-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Event Manager"/>
                    <h1>Atualizar informações</h1>                                    
                    <button className="detail-link" onClick={() => navigateToDetail(item)} type="button">
                        <FiArrowLeft size={16} color="#FFF"/>
                        Voltar
                    </button>
                </section>

                <Form ref={formRef} onSubmit={handleSubmit}> 
                    <h1>Empresa:</h1> 
                    <Input 
                        name="name"
                        type="name"
                    />
                    <h1>Serviço:</h1>
                    <Input 
                        name="service"
                        type="service"
                    />
                    <h1>E-mail:</h1>
                    <Input 
                        name="mail"
                        type="mail"
                    />
                    <h1>Telefone:</h1>
                    <Input 
                        name="phone"
                        type="phone"
                    />
                    <button className="btnForm" onPress={() => formRef.current.submitForm()}>
                        Salvar
                    </button>

                </Form>
            </div>
        </div>
    );
}