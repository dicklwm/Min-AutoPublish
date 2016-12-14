/**
 * Created by Min on 2016-12-13.
 */
import * as TypeOfActions from '../constants/actions';

const InitState = {
    info:{},
    project:[]
}

export default function info(state=InitState, action) {
    console.log('info reducers',action);
    switch (action.type){
        case TypeOfActions.GET_INIT:
            return {...state,info:action.info,project:action.project}
            // return Object.assign({},state,{info:action.info,project:action.project});
        case TypeOfActions.CREATE_PROJECT:
            return
        default:
            return state;
    }

}
