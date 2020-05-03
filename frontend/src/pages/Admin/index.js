import React from 'react';
import {BsPower, BsTrash} from "react-icons/bs";
import {useHistory} from 'react-router-dom';

import logo from '../../assets/logo.png';
import './styles.css';

export default function Admin(){
    const navigation = useHistory();

    function disparar(){
        alert('Cadastrar nova empresa');
    }
    
    function disparar_aux(){
        alert('Atualizar usuário');
    }


    function logout(){
        navigation.push('/page/login');
    }

    function deleteCompany(){
        alert('Deletar empresa');
    }

    return(
        <div className="profileContainer">
            <header>
                <img src={logo} alt="Event Manager"/>
                <span>Bem vindo, Administrador</span>
                <div>
                    <a onClick={disparar}>Cadastrar empresa</a>
                    <a onClick={disparar_aux}>Atualizar informações</a>
                </div>
                <button onClick={logout} type="button">
                    <BsPower size={18} color="#E02041"/>                    
                </button>
            </header>

            <h1>Empresas</h1>

            <ul>
                <li>
                    <strong>Empresa:</strong>
                    <p>Unforte Vigilância</p>

                    <strong>Serviço:</strong>
                    <p>Segurança</p>

                    <button onClick={deleteCompany} type="button">
                        <BsTrash size={18} color="#1393f6"/>
                    </button>
                </li>   
                <li>
                    <strong>Empresa:</strong>
                    <p>Unforte Vigilância</p>

                    <strong>Serviço:</strong>
                    <p>Segurança</p>

                    <button onClick={deleteCompany} type="button">
                        <BsTrash size={18} color="#1393f6"/>
                    </button>
                </li> 
                <li>
                    <strong>Empresa:</strong>
                    <p>Unforte Vigilância</p>

                    <strong>Serviço:</strong>
                    <p>Segurança</p>

                    <button onClick={deleteCompany} type="button">
                        <BsTrash size={18} color="#1393f6"/>
                    </button>
                </li> 
                <li>
                    <strong>Empresa:</strong>
                    <p>Unforte Vigilância</p>

                    <strong>Serviço:</strong>
                    <p>Segurança</p>

                    <button onClick={deleteCompany} type="button">
                        <BsTrash size={18} color="#1393f6"/>
                    </button>
                </li>         
            </ul>
        </div>
    );
}