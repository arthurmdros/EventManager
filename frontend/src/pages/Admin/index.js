import React from 'react';
import {BsPower, BsTrash} from "react-icons/bs";
import {useHistory} from 'react-router-dom';

import logo from '../../assets/logo.png';
import './styles.css';

export default function Admin(){
    const navigation = useHistory();

    function disparar(){
        alert('Cadastrar novo evento');
    }

    function logout(){
        navigation.push('/page/login');
    }

    function deleteEvent(){
        alert('Deletar evento');
    }

    return(
        <div className="profileContainer">
            <header>
                <img src={logo} alt="Event Manager"/>
                <span>Bem vindo, Administrador</span>
                
                <a onClick={disparar}>Cadastrar empresa</a>
                <button onClick={logout} type="button">
                    <BsPower size={18} color="#E02041"/>                    
                </button>
            </header>

            <h1>Empresas</h1>

            <ul>
                <li>
                    <strong>Empresa:</strong>
                    <p>Unforte Vigilância</p>

                    <strong>Serviço:</strong>
                    <p>Segurança</p>

                    <button onClick={deleteEvent} type="button">
                        <BsTrash size={18} color="#1393f6"/>
                    </button>
                </li>   
                <li>
                    <strong>Empresa:</strong>
                    <p>Unforte Vigilância</p>

                    <strong>Serviço:</strong>
                    <p>Segurança</p>

                    <button onClick={deleteEvent} type="button">
                        <BsTrash size={18} color="#1393f6"/>
                    </button>
                </li> 
                <li>
                    <strong>Empresa:</strong>
                    <p>Unforte Vigilância</p>

                    <strong>Serviço:</strong>
                    <p>Segurança</p>

                    <button onClick={deleteEvent} type="button">
                        <BsTrash size={18} color="#1393f6"/>
                    </button>
                </li> 
                <li>
                    <strong>Empresa:</strong>
                    <p>Unforte Vigilância</p>

                    <strong>Serviço:</strong>
                    <p>Segurança</p>

                    <button onClick={deleteEvent} type="button">
                        <BsTrash size={18} color="#1393f6"/>
                    </button>
                </li>         
            </ul>
        </div>
    );
}