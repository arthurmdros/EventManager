import React, {useRef} from 'react';
import { Form } from '@unform/web';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory} from 'react-router-dom';

import logo from '../../assets/logo.png';
import './styles.css';
import Input from '../component/input';

export default function ProfileUpdate(){
    const navigation = useHistory();
    const formRef = useRef();
    
    function handleSubmit(data, {reset}){
        console.log(data);
        reset();
        navigation.push('/page/user/profile');
    }

    return(
        <div className="updateContainer">
            <div className="content">
                <section>
                    <img src={logo} alt="Event Manager"/>

                    <h1>Atualizar perfil</h1>                
                    <Link to="/page/user/profile">
                        <FiArrowLeft size={16} color="#FFF"/>
                        Voltar para home               
                    </Link>
                </section>            
            <Form ref={formRef} onSubmit={handleSubmit}>               
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
                    Salvar
                </button>

            </Form>
            </div>
        </div>
    );
}