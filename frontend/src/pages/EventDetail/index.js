import React, {useState, useEffect} from "react";
import {Link,useLocation, useHistory} from "react-router-dom";
import {FiArrowLeft, FiEdit} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';

import api from '../../services/api';
import logo from "../../assets/logo.png";
import './styles.css';

export default function EventDetail(){   
    const navigation = useHistory();
    const route = useLocation();
    const item = route.state;    
    const user_id = item.user_id;
    const [tickets, setTickets] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        api.get(`/ticket/event/${item.id}`).then(response => {
            setTickets(response.data); 
        })

        api.get(`company/event/${item.id}`).then(response => {
            setCompanies(response.data);
        })
    }, [item.id]);

    async function deleteEvent(id){
        try{
            await api.delete(`/event/delete/${id}`, {
                headers:{
                    Authorization: user_id,
                }
            })                
                navigation.push('/page/user/profile');
            }catch(err){
                alert('Erro ao deletar evento, tente novamente.');
            }
    }            

    function navigateToUpdate(item){
        navigation.push('/page/user/event/update', item);
    }

    return(
        <div className="event-container">
            
            
            <header>
                <img src={logo} alt="Event Manager"/>
                <h1>Informações</h1>
                <div>                    
                    <Link to="/page/user/profile">
                        <FiArrowLeft size={16} color="#FFF"/>
                        Voltar para home
                    </Link>
                </div>
            </header> 

                <ul className="event-info">
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
                            <p>{item.selectedStartDate}</p>
                            <p>{item.selectedEndDate}</p>
                        </div>

                        <section className="titles">
                            <strong>Começando às:</strong>
                            <strong>Terminando às:</strong>
                        </section>
                        
                        <div className = "container-time">
                            <p>{item.selectedStartTime}</p>                        
                            <p>{item.selectedEndTime}</p>
                        </div>

                        <strong>Tipo:</strong>
                        <p>{item.selectedValue}</p>
                                        
                        <strong>Ingressos disponíveis:</strong>
                        <ul className="list-ticket">
                            {tickets.map(ticket => (
                                <li key={ticket.id}>
                                    <strong>Ingresso:</strong>
                                    <p>{ticket.type}</p>

                                    <strong>Valor:</strong>
                                    <p>R$ {ticket.value}</p> 

                                    <strong>Disponível:</strong>
                                    <p>{ticket.amount}</p>      
                                </li> 
                            ))}                                  
                        </ul> 

                        <strong>Empresas contratadas:</strong>
                        <ul className="list-company">
                            {companies.map(company => (
                                <li key={company.id}>
                                    <strong>Empresa:</strong>
                                    <p>{company.name}</p>

                                    <strong>Serviço:</strong>
                                    <p>R$ {company.service}</p> 

                                    <strong>E-Mail:</strong>
                                    <p>{company.mail}</p> 
                                    
                                    <strong>Telefone:</strong>
                                    <p>{company.phone}</p> 
                                </li> 
                            ))}                                  
                        </ul> 

                        <button className="update-link" onClick={() => navigateToUpdate(item)} type="button">
                            Atualizar informações 
                            <FiEdit size={16} color="#1393f6"/>                    
                        </button>

                        <button className = 'delete-button' onClick={() => deleteEvent(item.id)} type="button">
                            <BsTrash size={18} color="#1393f6"/>
                        </button>
                    </li>
                </ul>
        </div>
        
    );
}
