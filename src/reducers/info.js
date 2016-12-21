/**
 * Created by Min on 2016-12-13.
 */
import * as TypeOfActions from '../constants/actions';

const InitState = {
    info:{},
    project:[],
    noLogin:true
}

export default function info(state=InitState, action) {
    switch (action.type){
        case TypeOfActions.GET_INIT:
            return {...state,info:action.info,project:action.project,noLogin:false}
            // return Object.assign({},state,{info:action.info,project:action.project});
        case TypeOfActions.CREATE_PROJECT:
            return
        default:
            return state;
    }

}
