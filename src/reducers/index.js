/**
 * Created by Min on 2016-12-13.
 */
import {combineReducers} from 'redux';
import info from './info';
import users from './users';
import { routerReducer } from 'react-router-redux'

const reducers = combineReducers({
    info,
    users,
    routing:routerReducer
});

export default reducers;