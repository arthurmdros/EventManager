import React, {useRef} from 'react';
import { Form } from '@unform/web';
import {Link, useHistory} from 'react-router-dom';

import './styles.css';

import api from '../../services/api';
import Input from '../component/input';
import logo from '../../assets/logo.png';

export default function Login(){
    const formRef = useRef(null);
    const navigation = useHistory();

    async function login(data,{reset}){
        if(data.login === "" && data.password === ""){
            alert('Informe os campos obrigatórios.')            
        }else{
            if(data.password.length >= 8){
                if(data.login === "admin"){
                    try{                    
                        const admin = await api.post('admin/session', data);
                        alert(`Bem-Vindo! ${admin.data.login}`);
                        localStorage.setItem('admin_id',admin.data.id);
                        localStorage.setItem('login',admin.data.login);
                        navigation.push('/page/admin/profile');
                        reset();
                    }catch(err){
                        alert('Falha no login, tente novamente');
                        reset();
                    }
                }
                try{
                    const user = await api.post('user/session', data);
                    alert(`Bem-Vindo! ${user.data.name}`);
                    localStorage.setItem('user_id',user.data.id);
                    localStorage.setItem('user_name',user.data.name);
                    navigation.push('/page/user/profile');
                    reset();
                }catch(err){
                    alert("Falha no login, tente novamente");
                    reset();
                }
            }else{
                alert('Campo senha deve ter no mínimo 8 caracteres.');                
            }
        }
        
        
    }
    

    return(
        <div className="loginContainer">                        
            <section className="loginForm">            
                <img src={logo} alt="Event Manager"/>                            
                
                <Form ref={formRef} onSubmit={login}>
                    <h1>E-mail:</h1>
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

                   
                    <Link className="registerLink" to="/page/register">
                        Registrar-se
                    </Link>
                </Form>
            </section>
        </div>
    );
}