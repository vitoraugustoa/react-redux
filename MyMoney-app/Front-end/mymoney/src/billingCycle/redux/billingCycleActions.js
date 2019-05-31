import Api from '../../services';

export function  getList(pageNumber, pageLimit) {    
    const request = Api.get(`https://localhost:5001/api/cycles/Getall?actualPage=${pageNumber}&pageLimit=${pageLimit}`);

    return { type: 'BILLING_CYCLES_FETCHED', payload: request }
}