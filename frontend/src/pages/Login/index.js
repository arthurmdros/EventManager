import React, {useRef} from 'react';
import { Form } from '@unform/web';
import {useHistory} from 'react-router-dom';

import './styles.css';


import Input from '../component/input';
import logo from '../../assets/logo.png';

export default function Login(){
    const formRef = useRef(null);
    const navigation = useHistory();

    function handleSubmit(data,{reset}){
        console.log(data);
        reset();
        if(data.login === "admin"){
            navigation.push('/page/admin');
        }
    }

    function navigateToRegister(){
        alert('Navegar para formulário de cadastro');
    }
    

    return(
        <div className="loginContainer">                        
            <section className="loginForm">            
                <img src={logo} alt="Event Manager"/>                            
                
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Username:</h1>
                    <Input
                        name="login"
                        type="login"
                    />   

                    <h1>Password:</h1>
                    <Input
                        secureTextEntry={true}
                        name="password"
                        type="password"
                    />

                    <button className="btnForm" onPress={() => formRef.current.submitForm()}>
                        Entrar
                    </button>

                    <a onClick={navigateToRegister}>Cadastrar-se</a>
                </Form>
            </section>
        </div>
    );
}