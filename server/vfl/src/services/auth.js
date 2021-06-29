import axios from 'axios';
import { successHandler, errorHandler } from './helper'

export const login =( credentials ) =>{

   return axios.post( `/auth/login`, credentials, 
        {
            headers: {
                'Content-Type' : 'application/json'
            }
        }
    )
    .then( successHandler )
    .catch( errorHandler );
};

export const fetchUser = ( credentials ) => {
    return axios.post( `/auth/register`, credentials,
    {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    )
     .then( successHandler )
     .catch( errorHandler ); 
    
}
