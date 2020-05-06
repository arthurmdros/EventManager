import React,{useState, useEffect} from 'react';
import {BsPower, BsTrash} from "react-icons/bs";
import {FiArrowRight} from "react-icons/fi";
import {Link, useHistory} from 'react-router-dom';

import api from '../../services/api';
import logo from '../../assets/logo.png';
import './styles.css';

export default function Admin(){
    const [companies, setCompanies] = useState([]);
    const admin_id = localStorage.getItem('admin_id');
    const login = localStorage.getItem('login');
    
    const navigation = useHistory();    
    
    useEffect(() =>{
        api.get('admin/profile',{
            headers: {
                Authorization: admin_id,
            }
        }).then(response => {
            setCompanies(response.data);
        })
    }, [admin_id]);

    function logout(){
        localStorage.clear();
        navigation.push('/page/login');
    }

    function navigateToDetail(company){
        navigation.push('/page/admin/company/detail', company);
    }

    async function deleteCompany(id){
        try{
            await api.delete(`/company/delete/${id}`, {
                headers:{
                    Authorization: admin_id,
                }
            })                
            setCompanies(companies.filter(company => company.id !== id));             
            }catch(err){
                alert('Erro ao deletar empresa, tente novamente.');
            }
    }

    return(
        <div className="adminContainer">
            <header>
                <img src={logo} alt="Event Manager"/>
                <span>Bem vindo, {login}</span>
                <div>
                    <Link to="/page/admin/newcompany">Cadatrar empresa</Link>                    
                    <Link to="/page/admin/update">Atualizar senha</Link>
                </div>
                <button onClick={logout} type="button">
                    <BsPower size={18} color="#E02041"/>                    
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

                        <button className="detail-link" onClick={() => navigateToDetail(company)} type="button">
                            Ver detalhes
                            <FiArrowRight size={18} color="#1393f6"/>
                        </button>

                        <button className="button-delete" onClick={() => deleteCompany(company.id)} type="button">
                            <BsTrash size={18} color="#1393f6"/>
                        </button>

                    </li>                                        
                ))}                
            </ul>
        </div>
    );
}