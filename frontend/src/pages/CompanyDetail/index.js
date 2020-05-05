import React from "react";
import {Link} from "react-router-dom";
import {FiArrowLeft, FiEdit} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';

import logo from "../../assets/logo.png";
import './styles.css';

export default function CompanyDetail(){
    function deleteCompany(){
        alert('Deletar Empresa');        
    }

    return(
        <div className="company-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Event Manager"/>
                    <h1>Informações</h1>
                    <p>Visualize os dados comerciais da empresa, atualize informações e exclua caso necessário.</p>
                    <Link to="/page/admin/profile">
                        <FiArrowLeft size={16} color="#FFF"/>
                        Voltar para home
                    </Link>
                </section>   

                <ul>
                    <li>
                        <strong>Empresa:</strong>
                        <p>Unforte Vigilância</p>

                        <strong>Serviço:</strong>
                        <p>Segurança</p>

                        <strong>E-mail:</strong>
                        <p>unforte@mail.com</p>

                        <strong>Telefone:</strong>
                        <p>(00) 1234-5678</p>

                        <Link to="/page/admin/company/update">
                            Atualizar informações 
                            <FiEdit size={16} color="#1393f6"/>
                        </Link>
                        <button onClick={deleteCompany} type="button">
                            <BsTrash size={18} color="#1393f6"/>
                        </button>
                    </li>
                </ul>
        </div>
        </div>
    );
}
