import React from 'react';

// Solução 01. Mais usuada!
export default props =>
    <div>
        <h1>Parte 1</h1>
        <h1>Parte 2</h1>
    </div>
        

// Para este erro:
// export default props =>
//         <h1>Parte 1</h1>
//         <h1>Parte 2</h1>
    
// Temos as soluções: 

// Solução 01. Mais usuada!
// export default props =>
//     <div>
//         <h1>Parte 1</h1>
//         <h1>Parte 2</h1>
//     </div>


// Solução 02
// export default props =>
//     <React.Fragment>
//         <h1>Parte 1</h1>
//         <h1>Parte 2</h1>
//     </React.Fragment>


// Solução 03
// export default props => [
//     <h1>Parte 1</h1>,
//     <h1>Parte 2</h1>
// ]