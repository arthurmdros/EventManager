import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Select from 'react-select';

import './styles.css';
import logo from '../../assets/logo.png';
import api from '../../services/api';

export default function NewEvent(){ 

    const event_id = localStorage.getItem('event_id');    
    const navigation = useHistory();
    const typeoptions = [
        { value: 'Gratuito', label: 'Gratuito' },
        { value: 'Meia-Entrada', label: 'Meia-Entrada' },
        { value: 'Inteira', label: 'Inteira' },        
      ]          
    const [type, setType] = useState('');    
    const [value, setValue] = useState('');
    const [amount, setAmount] = useState('');
    const [limit, setLimit] = useState(0);

    async function createTicket(e){
        e.preventDefault();
        const data = { 
            type,
            value,
            amount,  
            event_id     
        };
        
       if(data.type === ''){
           alert('Um tipo de ingresso deve ser selecionado.');
       }else if(limit === 3){
           alert('Limite de ingressos adicionados atingido.');
           navigation.push('/page/user/profile');
       }
       else{                         
            try{
                await api.post('ticket/create', data);     
                setLimit(limit + 1);            
                alert('Ingresso adicionado com sucesso.');                            
            }catch(err){
                alert('Erro ao adicionar ingresso, tente novamente.');
            }
       }
    }

    function handleChange (e){
        setType(e.value);
        if(e.value === 'Gratuito'){
            setValue('0');
        }
    }    

    return(
        <div className="ticket-container">            
            <header>
            <img src={logo} alt="Event Manager"/>                             
                <button className = "btn-company" onClick={() => navigation.push('/page/user/newevent/company')} type="button">                    
                    Adicionar empresa                                               
                </button>

                <button onClick={() => navigation.push("/page/user/profile")} type="button">
                    <FiArrowLeft size={18} color="#FFF"/>     
                    Home                                               
                </button>           
            </header>
            
            <h1>Adicione ingressos para seu evento</h1>

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
                        type='number'
                        step="0.01" min="0"                                       
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <h1>Quantidade diponível:</h1>
                    <input  
                        type="number" 
                        min="0"                        
                        value={amount}
                        onChange={e => setAmount(e.target.value)}
                    />

                    <button className="btnForm" type="submit">Adicionar</button>
                </form>                
            </div>
        </div>
    );
}