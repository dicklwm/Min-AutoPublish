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
            return {...state,...action.data};
        default:
            return state;
    }

}

