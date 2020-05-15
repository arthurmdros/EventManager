import React, {useState, useEffect} from 'react';
import {FiArrowLeft, FiCheckCircle} from "react-icons/fi";
import {useHistory} from 'react-router-dom';

import api from '../../services/api';
import logo from '../../assets/logo.png';
import './styles.css';

export default function EventTicket(){

    const event_id = localStorage.getItem('event_id');    
    const [tickets, setTickets] = useState([]);    
    const navigation = useHistory();

    useEffect(() => {
        api.get(`/ticket/event/${event_id}`).then(response => {
            setTickets(response.data); 
        })
    }, [event_id]);
          
    async function removeTicket(id){    
        try{
            await api.delete(`/ticket/delete/${id}`);   
            setTickets(tickets.filter(ticket => ticket.id !== id));         
            }catch(err){
                alert('Erro ao deletar ingresso, tente novamente.');
            }          
    }

    return(
        <div className="event-ticket">
            <header>
                <img src={logo} alt="Event Manager"/>                 
                    <button className = "btn-ticket" onClick={() => navigation.push('/page/user/event/companies')} type="button">                    
                        Empresas contratadas                                               
                    </button>               
                    <button onClick={() => navigation.push("/page/user/profile")} type="button">
                        <FiArrowLeft size={18} color="#FFF"/>     
                        Home                                               
                    </button>
            </header>

            <h1>Ingressos adicionados</h1>

            <ul>
            {tickets.map(ticket => (
                <li key={ticket.id}>
                    <strong>Ingresso:</strong>
                    <p>{ticket.type}</p>

                    <strong>Valor:</strong>
                    <p>R$ {ticket.value}</p>

                    <strong>Quantidade disponível:</strong>
                    <p>{ticket.amount}</p>

                    <button className="button-select" onClick={() => removeTicket(ticket.id)} type="button">
                            <FiCheckCircle size={18} color="#1393f6"/>
                    </button>
                </li>                                        
            ))}                
            </ul>
        </div>
    );
}