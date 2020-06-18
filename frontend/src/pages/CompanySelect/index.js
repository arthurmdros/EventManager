import React, {useState, useEffect} from 'react';
import {FiArrowRight, FiArrowLeft, FiCheckCircle} from "react-icons/fi";
import {useHistory} from 'react-router-dom';

import api from '../../services/api';
import logo from '../../assets/logo.png';
import './styles.css';

export default function Profile(){

    const event_id = localStorage.getItem('event_id');    
    const [companies, setCompanies] = useState([]);
    const [limit, setLimit] = useState(0);
    const navigation = useHistory();

    useEffect(() => {
        api.get('/company/all')
        .then(response => {
            setCompanies(response.data);            
        })
    }, []);
   
    function navigateToDetail(company){
        navigation.push('/page/user/newevent/company/detail', company);
    }    
             
    async function selectCompany(company){    
        company.event_id = event_id;
        if(limit === 4){
            alert('Limite de empresas contratadas atingido.');
            return;
        }else{
            try{
                await api.put(`company/select/${company.id}`, company);  
                setLimit(limit + 1);                
                setCompanies(companies.filter(item => item.id !== company.id));
                alert('Empresa selecionada com sucesso.');
            }catch(err){
                alert('Erro ao selecionar empresa, tente novamente.');
            }  
        }              
    }

    return(
        <div className="select-company">
            <header>
                <img src={logo} alt="Event Manager"/>                 
                    <button className = "btn-ticket" onClick={() => navigation.push('/page/user/newevent/ticket')} type="button">                    
                        Adicionar ingresso                                               
                    </button>               
                    <button onClick={() => navigation.push("/page/user/profile")} type="button">
                        <FiArrowLeft size={18} color="#FFF"/>     
                        Home                                               
                    </button>
            </header>

            <h1>Empresas</h1>

            <ul>
            {companies.map(company => (
                <li key={company.id}>
                    <strong>Empresa:</strong>
                    <p>{company.name}</p>

                    <strong>Serviço:</strong>
                    <p>{company.service}</p>

                    <button className="button-select" onClick={() => selectCompany(company)} type="button">
                            <FiCheckCircle size={18} color="#1393f6"/>
                    </button>
                    <button className="detail-link" onClick={() => navigateToDetail(company)} type="button">
                        Ver detalhes
                        <FiArrowRight size={18} color="#1393f6"/>
                    </button>
                </li>                                        
            ))}                
            </ul>
        </div>
    );
}