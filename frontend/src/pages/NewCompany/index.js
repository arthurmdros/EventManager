import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';
import logo from '../../assets/logo.png';

export default function NewCompany(){    
    const navigation = useHistory();   

    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    
    const [formData, setFormData] = useState({
        name: '',
        service: '',
        mail: '',
        phone: '',
    });
    
    const admin_id = localStorage.getItem('admin_id');    
    
    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
            const ufInitials = res.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        });

    }, []);

    useEffect(() => {
        if(selectedUf === '0') return;

        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(res => {
            const citiesNames = res.data.map(city => city.nome);
            
            setCities(citiesNames);
        });

    }, [selectedUf]);
    
    function handleInputChange(event){
        const { name, value } = event.target;

        setFormData({...formData, [name]: value});
    } 

    
    function handleSelectedUf(event){
        const uf = event.target.value;

        setSelectedUf(uf);
    }

    function handleSelectedCity(event){
        const city = event.target.value;

        setSelectedCity(city);
    }

    async function handleSubmit(event){
        event.preventDefault();

        if(formData.name === ""){
            alert("Campo nome é obrigatório");            
        }else{
            try{
                await api.post('company/create', formData, {
                    headers: {
                        Authorization: admin_id,
                    }
                });
                alert('Salvo com sucesso!');
                navigation.push('/page/admin/profile');
            }catch(err){                
                alert('Erro ao cadastrar, tente novamente');
            }
        }
    }

    return(
        <div id="newCompany-container">            
                <header>
                    <img src={logo} alt="Event Manager"/>                    
                    <Link to="/page/admin/profile">
                        <FiArrowLeft size={16} color="#FFF"/>
                        Voltar para home
                    </Link>
                </header>

               
                <form onSubmit={handleSubmit}> 
                    <h1>Cadastrar empresa</h1>
                    <p>Cadastre empresas que possam contribuir nos eventos com seus serviços, facilitando o contrato entre prestadores de serviços e organizadores de eventos.</p>


                    <fieldset>
                        <legend>
                            <h2>Informações</h2>
                        </legend> 

                        <div className="field">
                        <label htmlFor="name">Empresa</label>
                            <input 
                                name="name"
                                type="name"
                                id="name"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                        <label htmlFor="service">Serviço</label>
                            <input 
                                name="service"
                                type="service"
                                id="service"
                                onChange={handleInputChange}
                            />
                        </div>

                        <legend>
                            <h2>Contato</h2>
                        </legend> 

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="email">E-mail</label>
                                <input 
                                    name="mail"
                                    type="email"
                                    id="email"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="phone">Telefone</label>
                                <input 
                                    name="phone"
                                    type="text"
                                    id="phone"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>                                              
                    </fieldset>
                    <fieldset>
                        <legend>
                            <h2>Endereços</h2>
                        </legend> 

                        <div className="field-group">
                            <div className="field">
                                <label htmlFor="uf">Estado (UF)</label>
                                <select name="uf" id="uf" value={selectedUf} onChange={handleSelectedUf}>
                                    <option value="0">Selecione um estado</option>
                                        {ufs.map(uf => (
                                            <option key={uf} value={uf}>{uf}</option>
                                        ))}
                                </select>
                            </div>

                            <div className="field">
                                <label htmlFor="city">Cidade</label>
                                <select name="city" id="city" value={selectedCity} onChange={handleSelectedCity}>
                                    <option value="0">Selecione uma cidade</option>
                                        {cities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                </select>
                            </div>

                        </div>
                    </fieldset>
                    <button type="submit">
                        Salvar
                    </button>
                </form>
            </div>        
    );
}