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
        if(data.title === ""){
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
        createEvent(e);        
    }

    function navigateToCompany(e){
        auxCompany += 1;
        createEvent(e);        
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
                
                <fieldset>
                    <legend>
                        <h2>Informações</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Evento:</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="name">Descrição</label>
                        <textarea                         
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="name">Tipo de evento</label>
                        <Select                                                    
                            className="select-input" 
                            options={eventoptions}
                            value={eventoptions.filter(obj => obj.value === selectedValue)} 
                            onChange={handleChange}
                        />
                    </div>  
                    
                    <legend>
                        <h2>Horários do evento</h2>
                    </legend>                 
                    
                    <div className="field-group">´
                        <div className="field">
                            <label htmlFor="startTime">Inicio ás:</label>
                            <DatePicker  
                                className="select-datepicker"                          
                                selected={startTime}
                                onChange={date => hanldeStartTimeChange(date)}
                                showTimeSelect
                                showTimeSelectOnly                               
                                timeIntervals={30}
                                timeCaption="Time"
                                dateFormat="h:mm a"                                
                                value={startTime}
                                
                            /> 
                        </div>
                        <div className="field">
                            <label htmlFor="endTime">Termina ás:</label>
                            <DatePicker
                                className="select-datepicker"                          
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
                    </div>

                    <legend>
                        <h2>Datas do evento</h2>
                    </legend>  

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="startDate">Inicio dia:</label>
                            <DatePicker
                                className="select-datepicker"                          
                                selected={startDate}
                                onChange={date => hanldeStartDateChange(date)}                         
                                dateFormat="dd/MM/yyyy"  
                                value={startDate}                                                         
                            />  
                        </div>
                        <div className="field">
                            <label htmlFor="startTime">Termina dia:</label>
                            <DatePicker
                                className="select-datepicker"                          
                                selected={endDate}
                                onChange={date => hanldeEndDateChange(date)}
                                dateFormat="dd/MM/yyyy"
                                value={endDate}    
                            />
                        </div>                         
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <button className='btn-ticket' onClick={navigateToTicket} type="button">Adicionar ingresso</button>             
                        </div>
                        <div className="field">
                            <button className='btn-company' onClick={navigateToCompany} type="button">Adicionar empresa</button>                                     
                        </div>
                    </div>
                    </fieldset>                      
                    <button className="btnForm" type="submit">Cadastrar</button>
                </form>                
            </div>        
    );
}