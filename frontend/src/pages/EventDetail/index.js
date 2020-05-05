import React from "react";
import {Link} from "react-router-dom";
import {FiArrowLeft, FiEdit} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';

import logo from "../../assets/logo.png";
import './styles.css';

export default function EventDetail(){
    function deleteEvent(){
        alert('Deletar evento');        
    }

    return(
        <div className="event-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Event Manager"/>
                    <h1>Informações</h1>
                    <p>Visualize os dados do seu evento, atualize informações e exclua caso necessário.</p>
                    <Link to="/page/user/profile">
                        <FiArrowLeft size={16} color="#FFF"/>
                        Voltar para home
                    </Link>
                </section>   

                <ul>
                    <li>
                        <strong>Evento:</strong>
                        <p>LiquidSky</p>

                        <strong>Descrição:</strong>
                        <p>Festa de música eletrônica com a participação de atrações exclusivas.</p>
                        
                        <section className="titles">
                            <strong>Inicia dia:</strong>                        
                            <strong>Termina dia:</strong>
                        </section>

                        <div className = "container-date">
                            <p>12/10/2020</p>
                            <p>13/10/2020</p>
                        </div>

                        <section className="titles">
                            <strong>Começando às:</strong>
                            <strong>Terminando às:</strong>
                        </section>
                        
                        <div className = "container-time">
                            <p>10:00 AM</p>                        
                            <p>3:00 AM</p>
                        </div>

                        <strong>Tipo:</strong>
                        <p>Música</p>

                        <Link to="/page/user/event/update">
                            Atualizar informações 
                            <FiEdit size={16} color="#1393f6"/>
                        </Link>
                        <button onClick={deleteEvent} type="button">
                            <BsTrash size={18} color="#1393f6"/>
                        </button>
                    </li>
                </ul>
        </div>
        </div>
    );
}
