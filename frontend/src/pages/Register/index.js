import React, {useRef} from 'react';
import { Form } from '@unform/web';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory} from 'react-router-dom';

import logo from '../../assets/logo.png';
import './styles.css';
import Input from '../component/input';

export default function Register(){
    const navigation = useHistory();
    const formRef = useRef();
    
    function handleSubmit(data, {reset}){
        console.log(data);
        reset();
        navigation.push('/page/login');
    }

    return(
        <div className="registerContainer">
            <div className="content">
                <section>
                    <img src={logo} alt="Event Manager"/>

                    <h1>Registro</h1>
                    <p>Ao registrar-se no Event Manager você terá uma melhor organização, divulgação e credibilidade na realização de seus eventos.</p>
                    <Link to="/page/login">
                        <FiArrowLeft size={16} color="#FFF"/>
                        Já possuo registro                
                    </Link>
                </section>            
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>E-Mail:</h1>
                <Input
                    name="mail"
                    type="mail"
                />
                <h1>Senha:</h1>
                <Input
                    name="password"
                    type="password"
                />
                <h1>Nome:</h1>
                <Input
                    name="name"
                    type="name"
                />
                <h1>Telefone:</h1>
                <Input
                    name="phone"
                    type="phone"
                />
                <h1>Empresa:</h1>
                <Input
                    name="company"
                    type="company"
                />

                <button className="btnForm" onPress={() => formRef.current.submitForm()}>
                    Registrar
                </button>

            </Form>
            </div>
        </div>
    );
}