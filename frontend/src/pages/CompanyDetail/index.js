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

    function navigateToUpdate(item){
        navigation.push('/page/admin/company/update', item);
    }

    return(
        <div id="company-container">            
                <header>
                    <img src={logo} alt="Event Manager"/>
                   <Link to="/page/admin/profile">
                        <FiArrowLeft size={16} color="#FFF"/>
                        Voltar para home
                    </Link>
                </header>   

                <div className="info-company">

                    <h1>Informações</h1>
                    <p>Visualize os dados comerciais da empresa, atualize informações e exclua caso necessário.</p>
                    
                    <img src={item.image_url} alt="Logo da empresa" />
                    
                    <fieldset>
                            <div className="field">
                                <strong>Empresa:</strong>
                                <p>{item.name}</p>
                            </div>

                            <div className="field">
                                <strong>Serviço:</strong>
                                <p>{item.service}</p>
                            </div>
                        
                        <div className="field-group">
                            <div className="field">
                                <strong>E-mail:</strong>
                                <p>{item.mail}</p>
                            </div>
                            <div className="field">
                                <strong>Telefone:</strong>
                                <p>{item.phone}</p>
                            </div>
                        </div>
                        </fieldset>
                        <button className="update-link" onClick={() => navigateToUpdate(item)} type="button">
                            Atualizar informações 
                            <FiEdit size={16} color="#1393f6"/>                    
                        </button>
                        
                            
                        <button className="delete-button" onClick={() => deleteCompany(item.id)} type="button">
                            <BsTrash size={18} color="#1393f6"/>
                        </button>
                    </div>
                </div>     
    );
}
