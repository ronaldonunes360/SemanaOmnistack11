import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

function Profile() {
    const ongName = localStorage.getItem('ongName');
    const ong_id = localStorage.getItem('ongId');

    const [incidents, setIncidents] = useState([]);
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers:{ ong_id }
        }).then(response => {
            setIncidents(response.data);
        });
    }, [ong_id]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers:{ ong_id }
            });
            alert("Caso deletado com sucesso!");
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch(err) {
            alert("Erro ao deletar caso, tente novamente.");
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={ logoImg } alt="Be The Hero"/>
                <span>Bem vinda, { ongName }</span>

                <Link className="button-red" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={ handleLogout }>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                { incidents.map(incident => (
                    <li key={incident.id} >
                        <strong>CASO:</strong>
                        <p>{ incident.title }</p>

                        <strong>DEESCRIÇÃO:</strong>
                        <p>{ incident.description }</p>

                        <strong>VALOR:</strong>
                        <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value) }</p>

                        <button type="button" onClick={ () => handleDeleteIncident(incident.id) }>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                )) }
            </ul>
        </div>
    );
}

export default Profile;