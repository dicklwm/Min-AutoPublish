/**
 * Created by Min on 2016-12-13.
 */
import * as TypeOfActions from '../constants/actions';

export function getInit(obj) {
    return{
        type:TypeOfActions.GET_INIT,
        info : obj.info,
        project:obj.project,
        users:obj.users
    }
}
