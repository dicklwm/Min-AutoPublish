/**
 * Created by Min on 2016-12-18.
 */

import {LOCATION_CHANGE} from 'react-router-redux';

export default  function loading(state=true, action) {
    switch (action.type) {
        case LOCATION_CHANGE:
            //路由改变会触发两次reducers，第一次action是先PUSH的，第二次是action是POP
            if (!!action.payload)
                if(action.payload.action==='PUSH'){
                    return true;
                }else{
                    return false;
                }
                break;
        default:
            return state;
    }

}

