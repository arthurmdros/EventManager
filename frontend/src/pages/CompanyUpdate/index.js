import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import { Map, Marker, TileLayer } from 'react-leaflet';

import './styles.css';
import api from '../../services/api';
import logo from '../../assets/logo.png';

export default function CompanyUpdate(){
    
    const navigation = useHistory();
    const route = useLocation();
    const item = route.state;      
    
    const admin_id = item.admin_id; 
    
    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedUf, setSelectedUf] = useState(item.uf);
    const [selectedCity, setSelectedCity] = useState(item.city);

    const [selectedPosition, setSelectedPosition] = useState([item.latitude, item.longitude]);    

    const [formData, setFormData] = useState({
        name: item.name,
        service: item.service,
        mail: item.mail,
        phone: item.phone,
    });


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

    function handleMapClick(event){
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng,
        ])
    }


    async function handleSubmit(event){
        event.preventDefault();

        const { name, service, mail, phone } = formData;
        const uf = selectedUf;
        const city = selectedCity;

        const [latitude, longitude] = selectedPosition;

        const data = new FormData();

        data.append('name', name);            
        data.append('service', service);            
        data.append('mail', mail);     
        data.append('phone', phone);
        data.append('uf', uf);            
        data.append('city', city);            
        data.append('latitude', String(latitude));            
        data.append('longitude', String(longitude));                       
        data.append('image', item.image);

        if(data.get('name') === ""){
            alert("Campo nome é obrigatório");            
        }else{
            try{
                await api.put(`company/update/${item.id}`, data, {
                    headers: {
                        Authorization: admin_id,
                    }
                });
                alert('Atualizado com sucesso!');
                navigation.push('/page/admin/profile');
            }catch(err){                
                alert('Erro ao atualizar, tente novamente');
            }
        }
       
    }

    function navigateToDetail(item){
        navigation.push('/page/admin/company/detail', item);
    }

    return(
        <div id="companyupdate-container">            
                <header>
                    <img src={logo} alt="Event Manager"/>                                                     
                    <button className="detail-link" onClick={() => navigateToDetail(item)} type="button">
                        <FiArrowLeft size={16} color="#FFF"/>
                        Voltar
                    </button>
                </header>

                <form onSubmit={handleSubmit}> 
                    <h1>Atualizar informações</h1>   
                    <img src={item.image_url} alt={item.name}/>

                    <fieldset>
                        <legend>
                            <h2>Informações</h2>
                        </legend> 

                        <div className="field">
                        <label htmlFor="name">Empresa</label>
                            <input 
                                defaultValue={formData.name}
                                name="name"
                                type="name"
                                id="name"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                        <label htmlFor="service">Serviço</label>
                            <input 
                                defaultValue={formData.service}
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
                                    defaultValue={formData.mail}
                                    name="mail"
                                    type="email"
                                    id="email"
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="phone">Telefone</label>
                                <input 
                                    defaultValue={formData.phone}
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
                            <span>Selecione o endereço no mapa</span>
                        </legend> 

                        <Map center={selectedPosition} zoom={15} onClick={handleMapClick}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            <Marker position={selectedPosition} />
                        </Map>

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