import React, {useRef} from 'react';
import './styles.css';
import { Form } from '@unform/web';

import Input from '../component/input';
import logo from '../../assets/logo.png';

export default function Login(){
    const formRef = useRef(null);

    function hanldeSubmit(data,{reset}){
        console.log(data);
        reset();
    }

    function navigateToRegister(){
        alert('Navegar para formulário de cadastro');
    }

    return(
        <div className="loginContainer">                        
            <section className="loginForm">            
                <img src={logo} alt="Event Manager"/>                            
                
                <Form ref={formRef} onSubmit={hanldeSubmit}>
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