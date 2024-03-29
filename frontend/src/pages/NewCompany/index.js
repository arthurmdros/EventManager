import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import Dropzone from '../../components/Dropzone';
import api from '../../services/api';
import logo from '../../assets/logo.png';

export default function NewCompany(){    
    const navigation = useHistory();  
    const admin_id = localStorage.getItem('admin_id'); 

    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    const [initialPosition, setInitialPosition] = useState([0,0]);
    const [selectedPosition, setSelectedPosition] = useState([0,0]);
    const [selectedFile, setSelectedFile] = useState();

    const [formData, setFormData] = useState({
        name: '',
        service: '',
        mail: '',
        phone: '',
    });
    
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            setInitialPosition([latitude, longitude]);
        });
    }, []);


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

        if (selectedFile) {
            data.append('image', selectedFile);
        }

        if(selectedFile === undefined){
            alert("Uma imagem é obrigatória");
        }
        else if(data.get('name') === ""){
            alert("Campo nome é obrigatório");            
        }else{            
            try{
                await api.post('company/create', data, {
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

                    <Dropzone onFileUploaded={setSelectedFile} />

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
                            <span>Selecione o endereço no mapa</span>
                        </legend> 

                        <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
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