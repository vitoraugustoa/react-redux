import React from 'react';

// import { Container } from './styles';

export default props => {
  return (
    <div className="tab-content">
        {props.children}
    </div>
  );
}
