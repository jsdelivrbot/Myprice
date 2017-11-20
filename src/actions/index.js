import axios from 'axios'

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const AJUST_MODEL = 'AJUST_MODEL';
const ROOT_URL = 'http://localhost:8081/';
export function fetchProducts(){
	const request = axios.get(ROOT_URL+'check');
	return {
		type:FETCH_PRODUCTS,
		payload: request
	};
}
export function adjustModel(data){
	console.log(data);
	const request = axios.put(ROOT_URL+'adjustModel',data);
	return {
		type:AJUST_MODEL,
		payload: request
	};
}