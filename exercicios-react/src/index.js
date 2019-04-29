import React from 'react';
import  ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

// import Primeiro from './components/PrimeiroComponente/PrimeiroComponente';
// import CompA , { CompB as B} from './components/DoisComponentes/DoisComponentes';
// import Multi from './components/MultiElementos/MultiElementos';
// import FamiliaLopes from './components/FamiliaLopes/FamiliaLopes';
// import Familia from './components/Familia/Familia';
// import Membro from './components/Membro/Membro';
// import ComponenteComFuncao from './components/ComponenteComFuncao/ComponenteComFuncao';
// import Pai from './components/Pai/Pai';
// import ComponentClasse from './components/ComponenteClasse/ComponenteClasse';
import contador from './components/Contador/Redux/ContadorReducer';
import Contador from './components/Contador/Contador';
// import Hook from './components/Hook/Hook';
// import Field from './components/Field/Field';
// import fieldReducer from './components/Redux/FieldReducer';


// const reducers = combineReducers({
//     field: fieldReducer,
// });

var reducers = combineReducers({
    contador,
});

export default createStore(reducers)

ReactDOM.render(
    <div>
    
        <Provider store={createStore(reducers)}>
            <Contador/>
        </Provider>
        {/* <Hook/> */}
        
        {/* <ComponentClasse valor="Sou um componente de classe!"/>
        <ComponentClasse /> */}
        {/* <Pai/> */}
        {/* <ComponenteComFuncao/> */}
        {/* <Familia sobrenome="Augusto">
            <Membro nome="Vitor" />
            <Membro nome="Weslley" />
        </Familia>
        <Familia sobrenome="Pereira">
            <Membro nome="Vinicius" />
            <Membro nome="Mariane" />
        </Familia> */}
        {/* <FamiliaLopes/> */}
        {/* <Primeiro valor='First Component (Arrow)' aBcD={123} /> */}
        {/* <CompA valor="Olá eu sou A!"/> */}
        {/* <B valor="B na área"/> */}
        {/* <Multi/> */}
    </div>
    
   
    , document.getElementById('root'));