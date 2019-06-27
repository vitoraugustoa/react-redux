import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ContentHeader from '../common/template/contentHeader';
import Content from '../common/template/content';
import Tabs from '../common/tab/tabs';
import TabsHeader from '../common/tab/tabsHeader';
import TabsContent from '../common/tab/tabsContent';
import TabHeader from '../common/tab/tabHeader';
import TabContent from '../common/tab/tabContent';
import BillingCycleList from '../billingCycle/billingCycleList';
import { init, create, update, remove } from '../billingCycle/redux/billingCycleActions';
import Form from '../billingCycle/billingCycleForm';


class BillingCycle extends Component {
    
    componentWillMount() {
        this.props.init();
    }

  render() {
    return (
        <div>
            <ContentHeader title="Ciclos de Pagamentos" small="Cadastro"  />
            <Content>
                <Tabs>
                    <TabsHeader>
                        <TabHeader label="Listar" icon="bars" target="tabList" />
                        <TabHeader label="Incluir" icon="plus" target="tabCreate" />
                        <TabHeader label="Alterar" icon="pencil" target="tabUpdate" />
                        <TabHeader label="Excluir" icon="trash-o" target="tabDelete" />
                    </TabsHeader>
                    <TabsContent>
                        <TabContent id="tabList">
                            <BillingCycleList />
                        </TabContent>
                        <TabContent id="tabCreate">
                            <Form  onSubmit={this.props.create} buttonValue="Incluir" submitClass="primary" />
                        </TabContent>
                        <TabContent id="tabUpdate">
                            <Form onSubmit={this.props.update} buttonValue="Editar" submitClass="info"/>
                        </TabContent>
                        <TabContent id="tabDelete">
                            <Form onSubmit={this.props.remove} buttonValue="Remover" readOnly="true" submitClass="danger" />
                        </TabContent>
                    </TabsContent>
                </Tabs>
            </Content>
        </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators( {
     create, update, remove, init
  }, dispatch);

  export default connect(null, mapDispatchToProps)(BillingCycle);