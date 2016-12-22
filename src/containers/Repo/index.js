/**
 * Created by Min on 2016-12-14.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators}from 'redux';
import * as actions from '../../actions';
import RepoDetail from '../../components/RepoDetail';

const Repo=React.createClass({

    componentDidMount() {
        const {params}=this.props,
            {getDetail}=this.props.actions;
        getDetail({repo_id: params.id});
    },

    render() {
        return (
            <div>
                <h2>Repo</h2>
                <RepoDetail
                    detail={this.props.detail}
                />
            </div>
        )
    },

    checkout(branchId) {
        const {params, actions} = this.props,
            {id} = params,
            {checkout}=actions;
        checkout({repo_id: id, branch: branchId});
    },

    branch(branchId) {
        const {params, actions} = this.props,
            {id} = params,
            {branch}=actions;
        branch({repo_id: id, branch: branchId});
    },

    editDeploy(folder){
        const {params, actions} = this.props,
            {id} = params,
            {editDeploy}=actions;
        editDeploy({repo_id: id, deploy: folder});
    },

    reset(sha){
        const {params, actions} = this.props,
            {id} = params,
            {reset}=actions;
        reset({repo_id: id, sha: sha});
    },

    pull(){
        const {params, actions} = this.props,
            {id} = params,
            {pull} =actions;
        pull({repo_id: id});
    },

    deploy(){
        const {params, actions} = this.props,
            {id} = params,
            {deploy}=actions;
        deploy({repo_id: id});
    }
})


const mapStateToProps=state => ({
    MeInfo: state.info.info,
    detail: state.detail
});

const mapDispatchToProps=dispatch => ({
    actions: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Repo);