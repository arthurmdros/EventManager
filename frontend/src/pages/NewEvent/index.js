import React, { useRef, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "@unform/web";

import './styles.css';
import logo from '../../assets/logo.png';
import Input from '../component/input';

export default function NewEvent(){    
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [starTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    
    const formRef = useRef();
    const navigation = useHistory();

    function handleSubmit(data, {reset}){
        console.log(data);
        reset();
        navigation.push('/page/user/profile');        
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

                <Form ref={formRef} onSubmit={handleSubmit}> 
                    <h1>Evento:</h1> 
                    <Input 
                        name="title"
                        type="title"
                    />
                    <h1>Descrição:</h1>
                    <Input 
                        name="description"
                        type="description"
                    />
                    <section className="titles">
                        <h1>Inicio ás:</h1>
                        <h1>Termina ás:</h1>
                    </section>
                    <div className = "container-time">                        
                        <DatePicker
                            selected={starTime}
                            onChange={date => setStartTime(date)}
                            showTimeSelect
                            showTimeSelectOnly                            
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="h:mm a"                                
                            
                        />                        
                        <DatePicker
                            selected={endTime}
                            onChange={date => setEndTime(date)}
                            showTimeSelect
                            showTimeSelectOnly                            
                            timeIntervals={30}
                            timeCaption="Time"
                            dateFormat="h:mm a"                            
                        />
                    </div>
                    <section className="titles">                        
                        <h1>Inicio dia:</h1>
                        <h1>Termina dia:</h1>
                    </section>
                    <div className= "container-date">                        
                        <DatePicker
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"                                                        
                        />                        
                        <DatePicker
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                    <h1>Tipo de evento:</h1>
                    <Input 
                        name="event"
                        type="event"
                    />
                    <button className="btnForm" onPress={() => formRef.current.submitForm()}>
                        Salvar
                    </button>

                </Form>
            </div>
        </div>
    );
}