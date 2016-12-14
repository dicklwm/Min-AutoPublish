/**
 * Created by Min on 2016-12-13.
 */
import {combineReducers} from 'redux';
import info from './info'
import users from './users';

const reducers = combineReducers({
    info,
    users
});

export default reducers;