import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter , HashRouter } from 'react-router-dom';

// BrowserRouter ele adiciona a rota ex: /user /home , Porem pode eventualmente dar problema em produção.
// HashRouter ele adiciona ex #/user #/home, mais recomendado

import Routes from './Routes';
import Logo from './components/templates/logo/logo';
import Nav from './components/templates/nav/nav';
import Footer from './components/templates/footer/footer';

function App(){
  return(
    <HashRouter>
      <div className="app">
        <Logo />
        <Nav />
        <Routes />
        <Footer />
    </div>
    </HashRouter>
  );
}

export default App;
