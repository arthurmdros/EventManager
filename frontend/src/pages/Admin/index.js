import React from 'react';
import {BsPower, BsTrash} from "react-icons/bs";

import logo from '../../assets/logo.png';
import './styles.css';

export default function Admin(){

    function disparar(){
        alert('Cadastrar novo evento');
    }

    function logout(){
        alert('Saindo');
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
                    <BsPower size={18} color="#FFF"/>                    
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