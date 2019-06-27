import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getList, showUpdate, showDelete } from './redux/billingCycleActions';


class billingCycleList extends Component {
    constructor(props){
        super(props);

        this.state = {
            actualPage: 1,
            pageLimit: 20,
        }

        this.renderRows = this.renderRows.bind(this);
    }

    renderRows(){
        const list = this.props.list || [];

        return list.map(bc => (
           <tr key={bc.CycleID}>
               <td>{bc.Name}</td>
               <td>{bc.Month}</td>
               <td>{bc.Year}</td>
               <td>
                   <button className="btn btn-warning" onClick={() => this.props.showUpdate(bc)}>
                       <i className="fa fa-pencil"></i>
                   </button>
                   <button className="btn btn-danger" onClick={() => this.props.showDelete(bc)}>
                       <i className="fa fa-trash-o"></i>
                   </button>
               </td>
           </tr> 
        ));
    }

    componentWillMount(){
        this.props.getList(this.state.actualPage, this.state.pageLimit);
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Mês</th>
                            <th>Ano</th>
                            <th className="table-actions" >Ações</th>
                        </tr>
                    </thead>    
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    list: state.billingCycle.list,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getList, showUpdate, showDelete
} , dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(billingCycleList);