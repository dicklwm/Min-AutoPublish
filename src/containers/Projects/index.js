/**
 * Created by Min on 2016-12-14.
 */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions';

const Projects = ({info,actions})=>(
    <div>
        {info.info.name}
    </div>
)


const mapStateToProps=state => ({
    info:state.info
});

const mapDispatchToProps=dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(Projects);