import React from 'react';
import {BsPower, BsTrash} from "react-icons/bs";
import {FiArrowRight} from "react-icons/fi";
import {Link, useHistory} from 'react-router-dom';

import logo from '../../assets/logo.png';
import './styles.css';

export default function Profile(){
    const navigation = useHistory();

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
                    <Link to="/page/user/newevent">Cadastrar evento</Link>                    
                    <Link to="/page/user/profile/update">Atualizar perfil</Link>
                    <Link to="/page/user/update">Configurar conta</Link>
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
                    <Link to="/page/user/event/detail">
                        Ver detalhes
                        <FiArrowRight size={16} color="#1393f6"/>
                    </Link>
                </li>   
                <li>
                    <strong>Evento:</strong>
                    <p>LiquidSky</p>

                    <strong>Tipo evento:</strong>
                    <p>Festa rave</p>

                    <button onClick={deleteEvent} type="button">
                        <BsTrash size={18} color="#1393f6"/>
                    </button>
                    <Link to="/page/user/event/detail">
                        Ver detalhes
                        <FiArrowRight size={16} color="#1393f6"/>
                    </Link>
                </li> 
                <li>
                    <strong>Evento:</strong>
                    <p>LiquidSky</p>

                    <strong>Tipo evento:</strong>
                    <p>Festa rave</p>

                    <button onClick={deleteEvent} type="button">
                        <BsTrash size={18} color="#1393f6"/>
                    </button>
                    <Link to="/page/user/event/detail">
                        Ver detalhes
                        <FiArrowRight size={16} color="#1393f6"/>
                    </Link>
                </li> 
                <li>
                    <strong>Evento:</strong>
                    <p>LiquidSky</p>

                    <strong>Tipo evento:</strong>
                    <p>Festa rave</p>

                    <button onClick={deleteEvent} type="button">
                        <BsTrash size={18} color="#1393f6"/>
                    </button>
                    <Link to="/page/user/event/detail">
                        Ver detalhes
                        <FiArrowRight size={16} color="#1393f6"/>
                    </Link>
                </li>         
                <li>
                    <strong>Evento:</strong>
                    <p>LiquidSky</p>

                    <strong>Tipo evento:</strong>
                    <p>Festa rave</p>

                    <button onClick={deleteEvent} type="button">
                        <BsTrash size={18} color="#1393f6"/>
                    </button>
                    <Link to="/page/user/event/detail">
                        Ver detalhes
                        <FiArrowRight size={16} color="#1393f6"/>
                    </Link>
                </li>      
                <li>
                    <strong>Evento:</strong>
                    <p>LiquidSky</p>

                    <strong>Tipo evento:</strong>
                    <p>Festa rave</p>

                    <button onClick={deleteEvent} type="button">
                        <BsTrash size={18} color="#1393f6"/>
                    </button>
                    <Link to="/page/user/event/detail">
                        Ver detalhes
                        <FiArrowRight size={16} color="#1393f6"/>
                    </Link>
                </li>      
            </ul>
        </div>
    );
}