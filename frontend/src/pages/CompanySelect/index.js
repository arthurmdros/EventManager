import React, {useState, useEffect} from 'react';
import {FiArrowRight, FiArrowLeft, FiCheckCircle} from "react-icons/fi";
import {useHistory} from 'react-router-dom';

import api from '../../services/api';
import logo from '../../assets/logo.png';
import './styles.css';

export default function Profile(){
    const [companies, setCompanies] = useState([]);

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

    
    function navigateToBack(){
        navigation.push("/page/user/newevent");
    }

    return(
        <div className="select-company">
            <header>
                <img src={logo} alt="Event Manager"/>
                <div>                    
                    <button onClick={() => navigateToBack()} type="button">
                        <FiArrowLeft size={18} color="#FFF"/>     
                        Retornar                                               
                    </button>
                </div>
            </header>

            <h1>Empresas</h1>

            <ul>
            {companies.map(company => (
                <li key={company.id}>
                    <strong>Empresa:</strong>
                    <p>{company.name}</p>

                    <strong>Serviço:</strong>
                    <p>{company.service}</p>

                    <button className="button-select" onClick={() => alert('Emrpesa selecionada.')} type="button">
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