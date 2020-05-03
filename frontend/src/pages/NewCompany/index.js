import React, { useRef } from "react";
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Form } from "@unform/web";

import './styles.css';
import logo from '../../assets/logo.png';
import Input from '../component/input';

export default function NewCompany(){
    const formRef = useRef();
    const navigation = useHistory();

    function handleSubmit(data, {reset}){
        console.log(data);
        reset();
        navigation.push('/page/admin/profile');
    }

    return(
        <div className="newCompany-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Event Manager"/>
                    <h1>Cadastrar empresa</h1>
                    <p>Cadastre empresas que possam contribuir nos eventos com seus serviços, facilitando o contrato entre prestadores de serviços e organizadores de eventos.</p>
                    <Link to="/page/admin/profile">
                        <FiArrowLeft size={16} color="#FFF"/>
                        Voltar para home
                    </Link>
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