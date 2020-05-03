import React from 'react';
import {BsPower, BsTrash} from "react-icons/bs";
import {useHistory} from 'react-router-dom';

import logo from '../../assets/logo.png';
import './styles.css';

export default function Profile(){
    const navigation = useHistory();

    function disparar(){
        alert('Cadastrar novo evento');
    }

    function disparar_aux(){
        alert('Atualizar usuário');
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
                <span>Bem vindo, Fulano de tal</span>
                <div>
                    <a onClick={disparar}>Cadastrar evento</a>
                    <a onClick={disparar_aux}>Atualizar informações</a>
                </div>
                <button onClick={logout} type="button">
                    <BsPower size={18} color="#E02041"/>                    
                </button>
            </header>

            <h1>Eventos</h1>

            <ul>
                <li>
                    <strong>Evento:</strong>
                    <p>LiquidSky</p>

                    <strong>Tipo evento:</strong>
                    <p>Festa rave</p>

                    <button onClick={deleteEvent} type="button">
                        <BsTrash size={18} color="#1393f6"/>
                    </button>
                </li>   
                <li>
                    <strong>Evento:</strong>
                    <p>LiquidSky</p>

                    <strong>Tipo evento:</strong>
                    <p>Festa rave</p>

                    <button onClick={deleteEvent} type="button">
                        <BsTrash size={18} color="#1393f6"/>
                    </button>
                </li> 
                <li>
                    <strong>Evento:</strong>
                    <p>LiquidSky</p>

                    <strong>Tipo evento:</strong>
                    <p>Festa rave</p>

                    <button onClick={deleteEvent} type="button">
                        <BsTrash size={18} color="#1393f6"/>
                    </button>
                </li> 
                <li>
                    <strong>Evento:</strong>
                    <p>LiquidSky</p>

                    <strong>Tipo evento:</strong>
                    <p>Festa rave</p>

                    <button onClick={deleteEvent} type="button">
                        <BsTrash size={18} color="#1393f6"/>
                    </button>
                </li>         
            </ul>
        </div>
    );
}