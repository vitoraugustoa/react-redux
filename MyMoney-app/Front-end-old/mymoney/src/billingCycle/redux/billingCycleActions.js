import Api from '../../services';
import baseUrl from '../../baseUrl';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm, initialize } from 'redux-form';
import { showTabs, selectTab } from '../../common/tab/redux/tabActions';


const INITIAL_VALUS = {
    name: '',
    month: '',
    year: '',
    credits: [{}], 
    debts: [{}]   
};

export function  getList(pageNumber, pageLimit) {    
    const request = Api.get(`${baseUrl}/Getall?actualPage=${pageNumber}&pageLimit=${pageLimit}`);

    return { type: 'BILLING_CYCLES_FETCHED', payload: request }
}

export function create(values) {
    return dispatch => {
        Api.post(`${baseUrl}/CreateCycle`, values)
        .then(resp => {
            toastr.success("Sucesso", "Operação Realizada com sucesso!");

            dispatch(init()); 
        })
        .catch(e => {
            toastr.error('Erro', 'Status: ' + e.response.status);
        });
    }
}

export function update(values) {
    return dispatch => {
        Api.put(`${baseUrl}/UpdateCyclo`, values)
        .then(resp => {
            toastr.success("Sucesso", "Operação Realizada com sucesso!");

            dispatch(init()); 
        })
        .catch(e => {
            toastr.error('Erro', 'Status: ' + e.response.status);
        });
    }
}

export function remove(values) {
    return dispatch => {
        Api.delete(`${baseUrl}/DeleteCycle/${values.cycleId}`)
        .then(resp => {
            toastr.success("Sucesso", "Operação Realizada com sucesso!");

            dispatch(init()); 
        })
        .catch(e => {
            toastr.error('Erro', 'Status: ' + e.response.status);
        });
    }
}


export function showUpdate(billingCycle) {
    const data = {
        cycleId: billingCycle.CycleID,
        name: billingCycle.Name,
        month: billingCycle.Month,
        year: billingCycle.Year,
        credits: billingCycle.Credits
    }

    // Só posso fazer um dispatch de um array porque utilizo um middleware redux-multi index.js
    return [
        showTabs("tabUpdate"),
        selectTab("tabUpdate"),
        initialize('billingCycleForm', data)
    ]
}


export function showDelete(billingCycle) {

    const data = {
        cycleId: billingCycle.CycleID,
        name: billingCycle.Name,
        month: billingCycle.Month,
        year: billingCycle.Year,
        credits: billingCycle.Credits
    }

    // Só posso fazer um dispatch de um array porque utilizo um middleware redux-multi index.js
    return [
        showTabs("tabDelete"),
        selectTab("tabDelete"),
        initialize('billingCycleForm', data)
    ]
}

export function init() {
    return [
        showTabs("tabList", "tabCreate"),
        selectTab("tabList"),
        getList(1, 20),
        initialize('billingCycleForm', INITIAL_VALUS)
    ]
}