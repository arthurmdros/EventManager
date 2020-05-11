import React, { useState } from "react";
import {useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Select from 'react-select';

import './styles.css';
import logo from '../../assets/logo.png';


export default function NewEvent(){    
    const navigation = useHistory();
    const typeoptions = [
        { value: 'Gratuito', label: 'Gratuito' },
        { value: 'Meia-Entrada', label: 'Meia-Entrada' },
        { value: 'Inteira', label: 'Inteira' },        
      ]          
    const [type, setType] = useState('');    
    const [value, setValue] = useState('');
    const [amount, setAmount] = useState('');

    async function createTicket(e){
        e.preventDefault();
        const data = { 
            type,
            value,
            amount,       
        };
        
        console.log(data);
    }

    function handleChange (e){
        setType(e.value);
    }

    
    function navigateToBack(){
        navigation.push("/page/user/newevent");
    }

    return(
        <div className="ticket-container">            
            <header>
            <img src={logo} alt="Event Manager"/>
            <div>                    
                <button onClick={() => navigateToBack()} type="button">
                    <FiArrowLeft size={18} color="#FFF"/>     
                    Retornar                                               
                </button>
            </div>
            </header>
            
            <h1>Adicionar ingresso</h1>

            <div className="content">

                <form onSubmit={createTicket}>
                
                    <h1>Ingresso:</h1>
                    <Select                         
                        className="select-input" 
                        options={typeoptions}
                        value={typeoptions.filter(obj => obj.value === type)} 
                        onChange={handleChange}
                    />
                    <h1>Valor:</h1>
                    <input                         
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <h1>Quantidade diponível:</h1>
                    <input                         
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />

                    <button className="btnForm" type="submit">Adicionar</button>
                </form>                
            </div>
        </div>
    );
}