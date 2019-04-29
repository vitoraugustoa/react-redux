import React from 'react';
import Filho from '../Filho/Filho';

export default props => {
    const notificarSaidaDoFilho = lugar => {
        alert(`Liberado para o(a) ${lugar}`);
        console.log(`Liberado para o(a) ${lugar}`);
    };

    return (
        <div>
            <Filho notificarSaida={notificarSaidaDoFilho}/>
        </div>
    );
}
