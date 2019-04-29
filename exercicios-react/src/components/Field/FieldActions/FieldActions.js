export function changeValue(e) {
    console.log("ChangeValue");

    return { 
        type: 'VALUE_CHANGED', // Deve ter um atributo chamado type
        payload: e.target.value  // payload = DADOS   
    }
}