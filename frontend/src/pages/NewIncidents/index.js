import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

function NewIncidents() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [value, setValue] = useState();

    const ong_id = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(event) {
        event.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
            const response = await api.post('incidents', data, {
                headers: { ong_id }
            });
            alert("Caso cadastrado com sucesso!");
            history.push('/profile');
        } catch(err) {
            alert("Falha ao cadastrar caso. Tente novamente");
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={ logoImg } alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={ handleNewIncident }>
                    <input type="text" placeholder="Título do caso" value={title} onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="Descrição" onChange={e => setDescription(e.currentTarget.value)}>
                        {description}
                    </textarea>
                    <input type="text" placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)} />
                    <button className="button-red" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default NewIncidents;