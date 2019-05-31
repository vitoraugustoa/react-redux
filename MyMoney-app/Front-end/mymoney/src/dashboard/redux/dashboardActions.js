import axios from 'axios';
import baseUrl from '../../baseUrl';


export const rdxGetSummary = () => {
   const request = axios.get(`${baseUrl}/Cycles/Summary`)
   
   return { type: 'BILLING_SUMMARY_FETCHED' , payload: request }
}


