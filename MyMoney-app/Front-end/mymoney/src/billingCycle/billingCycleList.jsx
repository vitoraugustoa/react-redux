import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getList } from './redux/billingCycleActions';


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
           </tr> 
        ));
    }

    componentWillMount(){
        this.props.getList(this.state.actualPage, this.state.pageLimit);
    }

    render() {
        console.log(this.props.list);
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Mês</th>
                            <th>Ano</th>
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
    getList, 
} , dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(billingCycleList);