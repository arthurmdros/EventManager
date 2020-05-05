import React from "react";
import {Link,useLocation} from "react-router-dom";
import {FiArrowLeft, FiEdit} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';

import logo from "../../assets/logo.png";
import './styles.css';

export default function EventDetail(){    
    const route = useLocation();
    const item = route.state;    
    const user_id = item.user_id;
        
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
                        <p>{item.title}</p>

                        <strong>Descrição:</strong>
                        <p>{item.description}</p>
                        
                        <section className="titles">
                            <strong>Inicia dia:</strong>                        
                            <strong>Termina dia:</strong>
                        </section>

                        <div className = "container-date">
                            <p>{item.start_date}</p>
                            <p>{item.end_date}</p>
                        </div>

                        <section className="titles">
                            <strong>Começando às:</strong>
                            <strong>Terminando às:</strong>
                        </section>
                        
                        <div className = "container-time">
                            <p>{item.start_time}</p>                        
                            <p>{item.end_time}</p>
                        </div>

                        <strong>Tipo:</strong>
                        <p>{item.event}</p>

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
