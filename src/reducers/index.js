/**
 * Created by Min on 2016-12-13.
 */
import {combineReducers} from 'redux';
import info from './info';
import users from './users';
import detail from './detail';
import loading from './loading';
import {routerReducer} from 'react-router-redux';

const reducers=combineReducers({
    info,
    users,
    detail,
    routing: routerReducer,
    loading
});

export default reducers;