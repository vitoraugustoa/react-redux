import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import { rdxGetSummary } from './redux/dashboardActions';
import ContentHeader from '../common/template/contentHeader';
import Content from '../common/template/content';
import ValueBox from '../common/widget/valueBox';
import Row from '../common/layout/row';

 class Dashboard extends Component {

    componentWillMount() {
        this.props.rdxGetSummary();
    }

    render() {

        return (
            <div>
                <ContentHeader title="Dashboard" small="Versão 1.0" />
                <Content>
                    <Row>
                        <ValueBox cols="12 4" color="green" icon="bank"
                            value={`R$ ${this.props.credit}`} text="Total de Créditos" />     

                        <ValueBox cols="12 4" color="red" icon="credit-card"
                            value={`R$ ${this.props.debt}`} text="Total de Débitos" />  

                        <ValueBox cols="12 4" color="blue" icon="money"
                            value={`R$ ${this.props.credit - this.props.debt}`} text="Valor Consolidado" />  
                    </Row>
                </Content>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  credit: state.dashboard.credit,  
  debt: state.dashboard.debt
});

 const mapDispathToProps = dispatch => bindActionCreators(
     { rdxGetSummary } 
     , dispatch);

export default connect(mapStateToProps, mapDispathToProps)(Dashboard);

