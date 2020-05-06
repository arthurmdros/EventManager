import React from "react";
import {Link, useLocation, useHistory} from "react-router-dom";
import {FiArrowLeft, FiEdit} from 'react-icons/fi';
import {BsTrash} from 'react-icons/bs';

import api from '../../services/api';
import logo from "../../assets/logo.png";
import './styles.css';

export default function CompanyDetail(){
    const navigation = useHistory();
    const route = useLocation();
    const item = route.state;    
    const admin_id = item.admin_id;
        
    async function deleteCompany(id){
        try{
            await api.delete(`/company/delete/${id}`, {
                headers:{
                    Authorization: admin_id,
                }
            })                
            navigation.push('/page/admin/profile');
            }catch(err){
                alert('Erro ao deletar empresa, tente novamente.');
            }
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
                        <p>{item.name}</p>

                        <strong>Serviço:</strong>
                        <p>{item.service}</p>

                        <strong>E-mail:</strong>
                        <p>{item.mail}</p>

                        <strong>Telefone:</strong>
                        <p>{item.phone}</p>

                        <Link to="/page/admin/company/update">
                            Atualizar informações 
                            <FiEdit size={16} color="#1393f6"/>
                        </Link>
                        <button onClick={() => deleteCompany(item.id)} type="button">
                            <BsTrash size={18} color="#1393f6"/>
                        </button>
                    </li>
                </ul>
        </div>
        </div>
    );
}
