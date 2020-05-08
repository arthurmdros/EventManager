import React, {useRef, useEffect} from 'react';
import { Form } from '@unform/web';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory} from 'react-router-dom';

import api from '../../services/api';
import logo from '../../assets/logo.png';
import './styles.css';
import Input from '../component/input';

export default function UserUpdate(){
    const navigation = useHistory();
    const formRef = useRef(null);
    
    const user_id = localStorage.getItem('user_id');
    
    useEffect(() => {
        api.get(`/user/index/data/${user_id}`)
        .then(response => {
            formRef.current.setData({mail: response.data.mail});            
        });
    }, [user_id]);

    async function handleSubmit(data, {reset}){
        if(data.mail === ""){
            alert("Campo e-mail é obrigatório");            
        }else if(data.password.length < 8){
            alert('Campo senha deve ter 8 caracteres.');
        }else if(data.password !== data.confirmPassword){
            alert('Senhas diferentes.');            
        }else{
            try{
                await api.put(`/user/account/update/${user_id}`, data);
                alert('Atualizado com sucesso!');
                navigation.push('/page/user/profile');
            }catch(err){
                reset();
                alert('Erro ao atualizar, tente novamente');
            }
        }
    }

    return(
        <div className="userUpdateContainer">
            <div className="content">
                <section>
                    <img src={logo} alt="Event Manager"/>

                    <h1>Configurar conta</h1>                
                    <Link to="/page/user/profile">
                        <FiArrowLeft size={16} color="#FFF"/>
                        Voltar para home               
                    </Link>
                </section>            
            <Form ref={formRef} onSubmit={handleSubmit}>                    
                <h1>E-mail:</h1>
                <Input
                    name="mail"
                    type="mail"
                />                
                <h1>Nova senha:</h1>
                <Input
                    name="password"
                    type="password"
                />
                <h1>Confirmar senha:</h1>
                <Input
                    name="confirmPassword"
                    type="password"
                />

                <button className="btnForm" onPress={() => formRef.current.submitForm()}>
                    Salvar
                </button>

            </Form>
            </div>
        </div>
    );
}