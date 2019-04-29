import React from 'react';

let isLegal = true;

export default (props) => 
    <div>
        <h1>{props.valor}</h1>
        <h2>{props.aBcD}</h2>
        <p>Legal ? { isLegal ? 'Sim' : 'Não'}</p>
        <p>{Math.random()}</p>
    </div>


// export default () => 
//     <div>
//         <h1>First Component (Arrow)</h1>
//     </div>



// export default function() {
//     return (
//         <h1>First Component</h1>
//     );
// }

// function primeiro() {
//     return (
//         <h1>First Component</h1>
//     );
// }
// export default primeiro;


