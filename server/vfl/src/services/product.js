import axios from 'axios';
import { successHandler, errorHandler } from './helper';

export const postProduct =( productDetails ) =>{

    return axios.post( `http://localhost:3000/product`, productDetails, 
         {
             headers: {
                 'Content-Type' : 'application/json'
             }
         },
         { withCredentials: true }
     )
     .then( successHandler )
     .catch( errorHandler );
 };
 export const getProduct =( ) =>{

    return axios.get( `http://localhost:3000/product`, 
         {
             headers: {
                 'Content-Type' : 'application/json',
                 
             }
         }
     )
     .then( successHandler )
     .catch( errorHandler );
 };
 export const getProductbyId =( id ) =>{

    return axios.get( `http://localhost:3000/product/${id}`, 
         {
             headers: {
                 'Content-Type' : 'application/json'
             }
         },
             { withCredentials: true }
     )
     .then( successHandler )
     .catch( errorHandler );
 };
 export const removeProductbyId =( id ) =>{

    return axios.delete( `http://localhost:3000/product/${id}`, 
         {
             headers: {
                 'Content-Type' : 'application/json'
             }
         }
     )
     .then( successHandler )
     .catch( errorHandler );
 };

 export const updateProduct =( productDetails,id ) =>{

    return axios.delete( `http://localhost:3000/product/${id}`,productDetails, 
         {
             headers: {
                 'Content-Type' : 'application/json'
             }
         }
     )
     .then( successHandler )
     .catch( errorHandler );
 };