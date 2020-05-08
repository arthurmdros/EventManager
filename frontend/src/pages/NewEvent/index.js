import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

import api from '../../services/api';
import './styles.css';
import logo from '../../assets/logo.png';


export default function NewEvent(){    
    const navigation = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [selectedStartDate, setSelectedStartDate] = useState('');   

    const [endDate, setEndDate] = useState(new Date());    
    const [selectedEndDate, setSelectedEndDate] = useState('');  

    const [startTime, setStartTime] = useState(new Date());    
    const [selectedStartTime, setSelectedStartTime] = useState(''); 

    const [endTime, setEndTime] = useState(new Date());    
    const [selectedEndTime, setSelectedEndTime] = useState('');   

    const eventoptions = [
        { value: 'Show', label: 'Show' },
        { value: 'Festival ou Feira', label: 'Festival ou Feira' },
        { value: 'Viagem, Retiro, Acampamento ou Excursão', label: 'Viagem, Retiro, Acampamento ou Excursão' },
        { value: 'Festa ou Evento social', label: 'Festa ou Evento social' },
        { value: 'Seminário ou Palestra', label: 'Seminário ou Palestra' },
        { value: 'Convenção', label: 'Convenção' },
        { value: 'Aula, Treinamento ou Workshop', label: 'Aula, Treinamento ou Workshop' }
      ]    
    const [selectedValue, setSelectedValue] = useState('');
    const user_id = localStorage.getItem('user_id');

    async function createEvent(e){
        e.preventDefault();
        const data = { 
            title,
            description,
            selectedStartDate,            
            selectedEndDate,
            selectedStartTime,
            selectedEndTime,
            selectedValue
        };
        
        try {
            await api.post('event/create', data, {
                headers:{
                    Authorization: user_id,
                }
            })

            navigation.push('/page/user/profile');
        }catch(err){
            alert('Erro ao cadastrar evento, tente novamente.');
        }
    }
  
    function handleChange (e){
        setSelectedValue(e.value);
    }

    function hanldeStartDateChange(date) {  
        setStartDate(date);
        const day = date.getDate();   
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();   
        setSelectedStartDate(day+'/'+month+'/'+year);        
    }

    function hanldeEndDateChange(date) {  
        setEndDate(date);
        const day = date.getDate();   
        const month = date.getMonth() + 1; 
        const year = date.getFullYear();   
        setSelectedEndDate(day+'/'+month+'/'+year);        
    }

    function hanldeStartTimeChange(date) {  
        setStartTime(date);
        const hour = date.getHours();   
        const minute = date.getMinutes();         
        setSelectedStartTime(hour+':'+minute);                
    }

    function hanldeEndTimeChange(date) {  
        setEndTime(date);
        const hour = date.getHours();   
        const minute = date.getMinutes();         
        setSelectedEndTime(hour+':'+minute);     
    }

    return(
        <div className="newEvent-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Event Manager"/>
                    <h1>Cadastrar evento</h1>
                    <p>Cadastre seu evento para que pessoas possam conhecer seu trabalho como organizador.</p>
                    <Link to="/page/user/profile">
                        <FiArrowLeft size={16} color="#FFF"/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={createEvent}>
                    <h1>Evento:</h1>
                    <input                         
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <h1>Descrição:</h1>
                    <textarea                         
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <h1>Tipo de evento:</h1>
                    <Select                         
                        className="select-input" 
                        options={eventoptions}
                        value={eventoptions.filter(obj => obj.value === selectedValue)} 
                        onChange={handleChange}
                    />
                    <section className="titles">
                        <h1>Inicio ás:</h1>
                        <h1>Termina ás:</h1>
                    </section>
                    <div className = "container-time">                        
                        <DatePicker
                            selected={startTime}
                            onChange={date => hanldeStartTimeChange(date)}
                            showTimeSelect
                            showTimeSelectOnly                               
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="h:mm a"                                
                            value={startTime}
                            
                        />                        
                        <DatePicker
                            selected={endTime}
                            onChange={date => hanldeEndTimeChange(date)}
                            showTimeSelect
                            showTimeSelectOnly                            
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="h:mm a"  
                            value={endTime}                          
                        />
                    </div>
                    <section className="titles">                        
                        <h1>Inicio dia:</h1>
                        <h1>Termina dia:</h1>
                    </section>
                    <div className= "container-date">                        
                        <DatePicker
                            selected={startDate}
                            onChange={date => hanldeStartDateChange(date)}                         
                            dateFormat="dd/MM/yyyy"  
                            value={startDate}                                                         
                        />                        
                        <DatePicker
                            selected={endDate}
                            onChange={date => hanldeEndDateChange(date)}
                            dateFormat="dd/MM/yyyy"
                            value={endDate}    
                        />
                    </div>                    
                    <button className="btnForm" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}