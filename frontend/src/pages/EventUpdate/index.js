import React, { useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

import api from '../../services/api';
import './styles.css';
import logo from '../../assets/logo.png';


export default function NewEvent(){    
    const navigation = useHistory();    
    const route = useLocation();
    const item = route.state;      
    const user_id = item.user_id; 
    
    var auxTicket = 0;
    var auxCompany = 0;
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


    async function updateEvent(e){             
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
                const response = await api.put(`event/update/${item.id}`, data, {
                    headers:{
                        Authorization: user_id,
                    }
                })                                
                if(auxTicket === 1){
                    alert('Evento atualizado com sucesso, indo para ingressos adicionados.');
                    localStorage.setItem('event_id', response.data.id);
                    navigation.push('/page/user/event/tickets');
                }else if(auxCompany === 1){
                    alert('Evento atualizado com sucesso, indo para empresas contratadas.');
                    localStorage.setItem('event_id', response.data.id);
                    navigation.push('/page/user/event/companies');
                }else{
                    alert('Atualizado com sucesso!');
                    localStorage.setItem('event_id', response.data.id);
                    navigation.push('/page/user/profile');   
                }                
            }catch(err){
                alert('Erro ao atualizar, tente novamente.');
            }         
    }

    function navigateToDetail(item){
        navigation.push('/page/user/event/detail', item);
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

    function navigateToTicket(e){
        auxTicket += 1;
        updateEvent(e);        
    }

    function navigateToCompany(e){
        auxCompany += 1;
        updateEvent(e);        
    }

    return(
        <div className="eventupdate-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Event Manager"/>
                    <h1>Atualizar informações</h1>  
                    <button className="detail-link" onClick={() => navigateToDetail(item)} type="button">
                        <FiArrowLeft size={16} color="#FFF"/>
                        Voltar
                    </button>   
                </section>

                <form onSubmit={updateEvent}>
                    <h1>Evento:</h1>
                    <input                         
                        value={item.title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <h1>Descrição:</h1>
                    <textarea                         
                        value={item.description}
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
                    <div className='actions'>
                        <button className='btn-ticket' onClick={navigateToTicket} type="button">Ingressos adicionados</button>             
                        <button className='btn-company' onClick={navigateToCompany} type="button">Empresas contratadas</button>                                     
                    </div>               
                    <button className="btnForm" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}