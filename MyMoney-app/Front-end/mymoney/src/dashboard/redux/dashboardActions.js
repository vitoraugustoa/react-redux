import axios from 'axios';

const BASE_URL = 'https://localhost:5001/api';

export const rdxGetSummary = () => {
   const request = axios.get(`${BASE_URL}/Cycles/Summary`)
   
   return { type: 'BILLING_SUMMARY_FETCHED' , payload: request }
}


