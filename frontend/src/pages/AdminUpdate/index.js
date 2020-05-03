import React, {useRef} from 'react';
import { Form } from '@unform/web';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory} from 'react-router-dom';

import logo from '../../assets/logo.png';
import './styles.css';
import Input from '../component/input';

export default function AdminUpdate(){
    const navigation = useHistory();
    const formRef = useRef();
    
    function handleSubmit(data, {reset}){
        console.log(data);
        reset();
        navigation.push('/page/admin/profile');
    }

    return(
        <div className="adminUpdateContainer">
            <div className="content">
                <section>
                    <img src={logo} alt="Event Manager"/>

                    <h1>Atualizar senha</h1>                
                    <Link to="/page/admin/profile">
                        <FiArrowLeft size={16} color="#FFF"/>
                        Voltar para home               
                    </Link>
                </section>            
            <Form ref={formRef} onSubmit={handleSubmit}>                
                <h1>Senha atual:</h1>
                <Input
                    name="password"
                    type="password"
                />
                <h1>Nova senha:</h1>
                <Input
                    name="password"
                    type="password"
                />
                <h1>Confirmar senha:</h1>
                <Input
                    name="password"
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