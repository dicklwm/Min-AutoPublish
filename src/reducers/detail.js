/**
 * Created by Min on 2016-12-18.
 */
import * as TypeOfActions from '../constants/actions'

const InitState={
    admin: {},
    commit_info: [],
    description: '',
    folders: [],
    local_branches: [],
    active_branch: '',
    logo: '',
    name: '',
    remote_branches: [],
    url: '',
    deploy: '',
}

export default  function detail(state=InitState, action) {
    switch (action.type) {
        case TypeOfActions.GET_DETAIL:
        case TypeOfActions.CREATE_PROJECT:
            return {...state, ...action.data};
        case TypeOfActions.LOGOUT:
        case TypeOfActions.CLEAR_DETAIL:
            return InitState;
        default:
            return state;
    }

}

