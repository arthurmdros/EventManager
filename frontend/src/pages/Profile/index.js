import React, {useState, useEffect} from 'react';
import {BsPower, BsTrash} from "react-icons/bs";
import {FiArrowRight} from "react-icons/fi";
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';
import logo from '../../assets/logo.png';
import './styles.css';

export default function Profile(){
    const [events, setEvents] = useState([]);

    const navigation = useHistory();
    const user_id = localStorage.getItem('user_id');
    const user_name = localStorage.getItem('user_name');

    useEffect(() => {
        api.get('/user/profile', {
            headers: {
                Authorization: user_id,
            }
        }).then(response => {
            setEvents(response.data);
        })
    }, [user_id]);

    function logout(){
        localStorage.clear();
        navigation.push('/page/login');
    }

    function deleteEvent(){
        alert('Deletar evento');
    }

    return(
        <div className="profileContainer">
            <header>
                <img src={logo} alt="Event Manager"/>
                <span>Bem vindo, {user_name}</span>
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
                {events.map(evento => (
                    <li key={evento.id}>
                        <strong>Evento:</strong>
                        <p>{evento.title}</p>

                        <strong>Tipo evento:</strong>
                        <p>{evento.event}</p>

                        <button onClick={deleteEvent} type="button">
                            <BsTrash size={18} color="#1393f6"/>
                        </button>
                        <Link to="/page/user/event/detail">
                            Ver detalhes
                            <FiArrowRight size={16} color="#1393f6"/>
                        </Link>
                    </li> 
                ))}                                  
            </ul>
        </div>
    );
}