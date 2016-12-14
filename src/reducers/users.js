/**
 * Created by Min on 2016-12-13.
 */
import * as TypeOfActions from '../constants/actions'

export default  function users(state=[],action) {
    console.log('user',action);
    switch (action.type){
        case TypeOfActions.GET_INIT:
            return action.users;
        default:
            return state;
    }

}

