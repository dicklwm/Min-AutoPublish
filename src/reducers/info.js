/**
 * Created by Min on 2016-12-13.
 */
import * as TypeOfActions from '../constants/actions';

const InitState={
    info: {},
    project: [],
    noLogin: true
}

export default function info(state=InitState, action) {
    switch (action.type) {
        case TypeOfActions.GET_INIT:
            return {...state, info: action.info, project: action.project, noLogin: false};
        case TypeOfActions.CREATE_PROJECT:
            var project=state.info.project;
            project.push(
                {
                    url: action.data.url,
                    logo:action.data.logo,
                    description:action.data.description,
                    id:action.data.id,
                    name:action.data.name
                });
            return {
                ...state,
                info: {...state.info, project: project},
                project: project
            };
        case TypeOfActions.LOGOUT:
            return InitState;
        default:
            return state;
    }

}
