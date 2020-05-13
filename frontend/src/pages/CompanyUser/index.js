import React from "react";
import {Link, useLocation} from "react-router-dom";
import {FiArrowLeft, FiCheckCircle} from 'react-icons/fi';

import logo from "../../assets/logo.png";
import './styles.css';

export default function CompanyDetail(){
   
    const route = useLocation();
    const item = route.state;    
     

    return(
        <div className="company-user">
            <div className="content">
                <section>
                    <img src={logo} alt="Event Manager"/>
                    <h1>Dados da empresa</h1>                    
                    <Link to="/page/user/newevent/company">
                        <FiArrowLeft size={16} color="#FFF"/>
                        Voltar
                    </Link>
                </section>   

                <ul>
                    <li>
                        <strong>Empresa:</strong>
                        <p>{item.name}</p>

                        <strong>Serviço:</strong>
                        <p>{item.service}</p>

                        <strong>E-mail:</strong>
                        <p>{item.mail}</p>

                        <strong>Telefone:</strong>
                        <p>{item.phone}</p>

                        <button className="button-select" onClick={() => alert('Emrpesa selecionada.')} type="button">
                            <FiCheckCircle size={18} color="#1393f6"/>
                        </button>
                    </li>
                </ul>
        </div>
        </div>
    );
}
