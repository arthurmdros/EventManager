import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

import api from '../../services/api';
import Dropzone from '../../components/Dropzone';
import './styles.css';
import logo from '../../assets/logo.png';


export default function NewEvent(){    
    const navigation = useHistory();    
    var auxTicket = 0;
    var auxCompany = 0;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    
    const [initialStartDate, setInitialStartDate] = useState(new Date());
    const [startDate, setStartDate] = useState('');   
    
    const [initialEndDate, setInitialEndDate] = useState(new Date());    
    const [endDate, setEndDate] = useState('');  

    const [initialStartTime, setInitialStartTime] = useState(new Date());    
    const [startTime, setStartTime] = useState(''); 

    const [initialEndTime, setInitialEndTime] = useState(new Date());    
    const [endTime, setEndTime] = useState('');   

    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    const [initialPosition, setInitialPosition] = useState([0,0]);
    const [selectedPosition, setSelectedPosition] = useState([0,0]);

    const [selectedFile, setSelectedFile] = useState();

    const eventoptions = [
        { value: 'Show', label: 'Show' },
        { value: 'Festival ou Feira', label: 'Festival ou Feira' },
        { value: 'Viagem, Retiro, Acampamento ou Excursão', label: 'Viagem, Retiro, Acampamento ou Excursão' },
        { value: 'Festa ou Evento social', label: 'Festa ou Evento social' },
        { value: 'Seminário ou Palestra', label: 'Seminário ou Palestra' },
        { value: 'Convenção', label: 'Convenção' },
        { value: 'Aula, Treinamento ou Workshop', label: 'Aula, Treinamento ou Workshop' }
      ]    
    const [initialValue, setInitialValue] = useState('');
    const user_id = localStorage.getItem('user_id');

        
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

    function handleChange (e){
        setInitialValue(e.value);
    }

    function handleInputChange(event){        
        const { name, value } = event.target;

        setFormData({...formData, [name]: value});
    } 

    function hanldeStartDateChange(date) {  
        setInitialStartDate(date);
        const day = date.getDate();   
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();   
        setStartDate(day+'/'+month+'/'+year);        
    }

    function hanldeEndDateChange(date) {  
        setInitialEndDate(date);
        const day = date.getDate();   
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();   
        setEndDate(day+'/'+month+'/'+year);        
    }

    function hanldeStartTimeChange(date) {  
        setInitialStartTime(date);
        const hour = date.getHours();   
        const minute = date.getMinutes();         
        setStartTime(hour+':'+minute);                
    }

    function hanldeEndTimeChange(date) {  
        setInitialEndTime(date);
        const hour = date.getHours();   
        const minute = date.getMinutes();         
        setEndTime(hour+':'+minute);     
    }

    function navigateToTicket(e){
        auxTicket += 1;
        createEvent(e);        
    }

    function navigateToCompany(e){
        auxCompany += 1;
        createEvent(e);        
    }

    async function createEvent(e){
        e.preventDefault();

        const { title, description } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const selectedStartDate = startDate;
        const selectedEndDate = endDate;
        const selectedStartTime = startTime;
        const selectedEndTime = endTime;
        const selectedValue = initialValue;
        const [latitude, longitude] = selectedPosition;

        const data = new FormData();

        data.append('title', title);            
        data.append('description', description);            
        data.append('selectedStartDate', selectedStartDate);     
        data.append('selectedEndDate', selectedEndDate);  
        data.append('selectedStartTime', selectedStartTime);  
        data.append('selectedEndTime', selectedEndTime);  
        data.append('selectedValue', selectedValue);  
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
        else if(data.get('title') === ""){
            alert('Nome do evento é obrigatório para cadastro, adição de ingresso ou empresa.');
        }else{
            try {
                const response = await api.post('event/create', data, {
                    headers:{
                        Authorization: user_id,
                    }
                })                    
                if(auxTicket === 1){
                    alert('Evento criado com sucesso, adicione ingressos para ele.');
                    localStorage.setItem('event_id', response.data.id);
                    navigation.push('/page/user/newevent/ticket');
                }else if(auxCompany === 1){
                    alert('Evento criado com sucesso, adicione empresas para ele.');
                    localStorage.setItem('event_id', response.data.id);
                    navigation.push('/page/user/newevent/company');
                }else{
                    alert('Evento criado com sucesso.');
                    localStorage.setItem('event_id', response.data.id);
                    navigation.push('/page/user/profile');   
                }                
            }catch(err){
                alert('Erro ao cadastrar evento, tente novamente.');
            }
        }  
        
    }

    return(
        <div id="newEvent-container">            
                <header>
                    <img src={logo} alt="Event Manager"/>
                    <Link to="/page/user/profile">
                        <FiArrowLeft size={16} color="#FFF"/>
                        Voltar para home
                    </Link>
                </header>
                
                <form onSubmit={createEvent}>
                    <h1>Cadastrar evento</h1>
                    <p>Cadastre seu evento para que pessoas possam conhecer seu trabalho como organizador.</p>                                       
                
                <Dropzone onFileUploaded={setSelectedFile} />

                <fieldset>
                    <legend>
                        <h2>Informações</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="title">Evento:</label>
                        <input 
                            type="text"
                            name="title"
                            id="title"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="description">Descrição</label>
                        <textarea                                 
                            name="description"        
                            id="description"            
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="name">Tipo de evento</label>
                        <Select                                                    
                            className="select-input" 
                            options={eventoptions}
                            value={eventoptions.filter(obj => obj.value === initialValue)} 
                            onChange={handleChange}
                        />
                    </div>  
                    
                    <legend>
                        <h2>Horários do evento</h2>
                    </legend>                 
                    
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="startTime">Inicio ás:</label>
                            <DatePicker  
                                className="select-datepicker"                          
                                selected={initialStartTime}
                                onChange={date => hanldeStartTimeChange(date)}
                                showTimeSelect
                                showTimeSelectOnly                               
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="h:mm a"                                
                                value={initialStartTime}
                                
                            /> 
                        </div>
                        <div className="field">
                            <label htmlFor="endTime">Termina ás:</label>
                            <DatePicker
                                className="select-datepicker"                          
                                selected={initialEndTime}
                                onChange={date => hanldeEndTimeChange(date)}
                                showTimeSelect
                                showTimeSelectOnly                            
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="h:mm a"  
                                value={initialEndTime}                          
                            /> 
                        </div>                       
                    </div>

                    <legend>
                        <h2>Datas do evento</h2>
                    </legend>  

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="startDate">Inicio dia:</label>
                            <DatePicker
                                className="select-datepicker"                          
                                selected={initialStartDate}
                                onChange={date => hanldeStartDateChange(date)}                         
                                dateFormat="dd/MM/yyyy"  
                                value={initialStartDate}                                                         
                            />  
                        </div>
                        <div className="field">
                            <label htmlFor="startTime">Termina dia:</label>
                            <DatePicker
                                className="select-datepicker"                          
                                selected={initialEndDate}
                                onChange={date => hanldeEndDateChange(date)}
                                dateFormat="dd/MM/yyyy"
                                value={initialEndDate}    
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
                    <div className="field-group">
                        <div className="field">
                            <button className='btn-ticket' onClick={navigateToTicket} type="button">Adicionar ingresso</button>             
                        </div>
                        <div className="field">
                            <button className='btn-company' onClick={navigateToCompany} type="button">Adicionar empresa</button>                                     
                        </div>
                    </div>                 
                    <button className="btnForm" type="submit">Cadastrar</button>
                </form>                
            </div>        
    );
}