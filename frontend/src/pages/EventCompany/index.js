import React, {useState, useEffect} from 'react';
import {FiArrowLeft, FiCheckCircle} from "react-icons/fi";
import {useHistory} from 'react-router-dom';

import api from '../../services/api';
import logo from '../../assets/logo.png';
import './styles.css';

export default function EventCompany(){

    const event_id = localStorage.getItem('event_id');    
    const [companies, setCompanies] = useState([]);    
    const navigation = useHistory();

    useEffect(() => {
        api.get(`company/event/${event_id}`).then(response => {
            setCompanies(response.data);
        })
    }, [event_id]);
          
    async function removeCompany(company){        
        company.event_id = null;      
        try{
            await api.put(`company/select/${company.id}`, company);                                 
            setCompanies(companies.filter(item => item.id !== company.id)); 
        }catch(err){
            alert('Erro ao selecionar empresa, tente novamente.');
        }  
                    
    }

    return(
        <div className="event-company">
            <header>
                <img src={logo} alt="Event Manager"/>                 
                    <button className = "btn-ticket" onClick={() => navigation.push('/page/user/event/tickets')} type="button">                    
                        Ingressos adicionados                                               
                    </button>               
                    <button onClick={() => navigation.push("/page/user/profile")} type="button">
                        <FiArrowLeft size={18} color="#FFF"/>     
                        Home                                               
                    </button>
            </header>

            <h1>Empresas contratadas</h1>

            <ul>
            {companies.map(company => (
                <li key={company.id}>
                    <strong>Empresa:</strong>
                    <p>{company.name}</p>

                    <strong>Serviço:</strong>
                    <p>{company.service}</p>

                    <strong>E-Mail:</strong>
                    <p>{company.mail}</p>

                    <strong>Telefone:</strong>
                    <p>{company.phone}</p>

                    <button className="button-select" onClick={() => removeCompany(company)} type="button">
                            <FiCheckCircle size={18} color="#1393f6"/>
                    </button>
                </li>                                        
            ))}                
            </ul>
        </div>
    );
}