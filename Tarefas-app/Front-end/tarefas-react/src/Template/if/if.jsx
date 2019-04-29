import React from 'react';


export default props => {
    if(props.test) {
        return <div></div>
    }else{
        return props.children;
    }
}