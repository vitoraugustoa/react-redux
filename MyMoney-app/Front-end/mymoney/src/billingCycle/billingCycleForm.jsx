import React, { Component } from 'react';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LabelAndInput from '../common/form/labelAndInput';
import { init } from './redux/billingCycleActions';
import CreditList from '../credit/creditList';

class billingCycleForm extends Component {

    render() {
        const { handleSubmit, buttonValue, readOnly, submitClass, credits } = this.props;
        
        return (
            <form role="form" onSubmit={handleSubmit} >
                <div className="box-body">
                    <Field name="cycleId" component={LabelAndInput} type="hidden"  />
                    <Field name="name" component={LabelAndInput} label="Nome" cols="12 4" placeholder="Informe o nome" readOnly={readOnly} />
                    <Field name="month" component={LabelAndInput} label="Mês" cols="12 4" placeholder="Informe o mês" readOnly={readOnly} />
                    <Field name="year" component={LabelAndInput} label="Ano" cols="12 4" placeholder="Informe o ano" readOnly={readOnly} />
                    <CreditList cols="12 6" list={credits} readOnly={readOnly} />
                </div>
                <div className="box-footer">
                    <button type="submit" className={`btn btn-${submitClass}`}>{buttonValue}</button>
                    <button type="button" className="btn btn-default" onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        );
    }
}

billingCycleForm = reduxForm({ form: 'billingCycleForm', destroyOnUnmount: false })(billingCycleForm);
const selector = formValueSelector('billingCycleForm'); // Pegando informação do formulário especificado por ID. controlado pelo redux-form

const mapStateToProps = state => ({
  credits: selector(state,'credits'), // buscando o atributo do formulário controlado pelo redux-form
});
const mapDispatchToProps = dispatch => bindActionCreators({
    init 
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(billingCycleForm)