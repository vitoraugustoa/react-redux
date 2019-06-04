import Api from '../../services';
import baseUrl from '../../baseUrl';
import { toastr } from 'react-redux-toastr';
import { reset as resetForm } from 'redux-form';
import { showTabs, selectTab } from '../../common/tab/redux/tabActions';

export function  getList(pageNumber, pageLimit) {    
    const request = Api.get(`${baseUrl}/Getall?actualPage=${pageNumber}&pageLimit=${pageLimit}`);

    return { type: 'BILLING_CYCLES_FETCHED', payload: request }
}

export function create(values) {
    return dispatch => {
        Api.post(`${baseUrl}/CreateCycle`, values)
        .then(resp => {
            toastr.success("Sucesso", "Operação Realizada com sucesso!");

            // Só posso fazer um dispatch de um array porque utilizo um middleware redux-multi index.js
            dispatch([
                resetForm('billingCycleForm'),
                getList(1, 20),
                selectTab('tabList'),
                showTabs('tabList', 'tabCreate')
            ]); 
        })
        .catch(e => {
            toastr.error('Erro', 'Status: ' + e.response.status);
        });
    }
    

}