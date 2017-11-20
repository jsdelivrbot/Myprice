import {FETCH_PRODUCTS,AJUST_MODEL} from '../actions/index';

const INITIAL_STATE = {data:[]};

export default function(state = INITIAL_STATE, action){
	switch(action.type){
		case FETCH_PRODUCTS :
			console.log(action.payload.data);
			return {...state,data:action.payload.data};
		/*case AJUST_MODEL :
			return {...state,data:action.payload.data}*/
		default:
			return state;
	}
}