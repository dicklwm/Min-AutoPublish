/**
 * Created by Min on 2016-12-21.
 */
import React from 'react';
import {Tabs, Card, Icon, Table,Button} from 'antd';
import './index.css';

const TabPane=Tabs.TabPane;

const RepoDetail=({detail,editDeploy,checkout,branch,pull,reset}) => {

    //生成文件夹的Card
    function makeFoldersCard() {
        if (!!detail.folders) {
            return detail.folders.map(function (value, index) {
                return <FoldersCard
                    folderName={value}
                    key={index}
                    isActive={value===detail.deploy}
                    editDeploy={editDeploy}
                />
            })
        }
    }

    //生成Branch
    function makeBranch(branches, type) {
        var node=[];
        for (let i in branches) {
            if (type==='local')
                node.push(<span className={"branches" + (i===detail.active_branch ? ' active' : '')}
                                key={i}
                                onClick={e => checkout(branches[i])}>
                    {i}</span>)
            else
                node.push(<span className={"branches" + (i===detail.active_branch ? ' active' : '')}
                                key={i}
                                onClick={e => branch(branches[i])}>
                    {i}</span>)
        }
        return node;
    }

    //生成Filter过滤字段
    function makeRawFilter() {
        var arr =[];
        const {commit_info}  = detail;
        for(let i in commit_info){
            const raw= commit_info[i].committer.raw;
            arr.includes(raw)?'':arr.push({text:raw,value:raw});
        }
        return arr;
    }

    //因为Table的展开需要有key，先给commit信息加上key值，再处理一下时间戳
    const commit_info = detail.commit_info.map(function (value, index) {
        return {...value,key:index,localTime:new Date(value.time*1000).toLocaleString()};
    });

    //表头信息，过滤的filters需要先生成
    const columns = [
        { title: '提交信息', dataIndex: 'message', key: 'message' },
        { title: '提交人', dataIndex: 'committer.raw', key: 'committer.raw',
            filters: makeRawFilter(),
            onFilter: (value, record) => record.committer.raw.indexOf(value) === 0,
            sorter: (a, b) => a.committer.raw.charCodeAt() - b.committer.raw.charCodeAt(), },
        { title: '时间', dataIndex: 'localTime', key: 'localTime' ,
            sorter: (a, b) => a.time-b.time },
        { title:'操作',key:'action',
            render:(text, record, index)=>(
                <div>
                   <Button type="primary" onClick={e=>reset(text.sha)}>reset</Button>
                </div>
            )
        }
    ];

    return (
        <Tabs tabPosition="top">

            <TabPane tab="基本信息" key="info" className="infoPane">

                <div>
                    <Button type="primary" onClick={e=>pull()}>Pull</Button>
                </div>
                <h4>项目拥有人：{detail.admin.name}</h4>
                <h4>项目描述：</h4><span>{detail.description}</span>
                <h4>项目目录结构：（点击目录可切换发布的目录）</h4>

                {makeFoldersCard()}

                <h4 className="clearFix">发布的目录：{detail.deploy}</h4>

                <h4>url:</h4><span>{detail.url}</span>

            </TabPane>

            <TabPane tab="分支信息" key="branches" className="branchesPane">
                <h4>当前激活分支：</h4><span className="active-branch">{detail.active_branch}</span>

                <h4>所有本地分支(local_branches)：</h4>
                <div>
                    {makeBranch(detail.local_branches, 'local')}
                </div>
                <h4 className="clearFix">所有远程分支(remote_branches)：</h4>
                <div>
                    {makeBranch(detail.remote_branches, 'remote')}
                </div>
            </TabPane>

            <TabPane tab="commit信息" key="commit">
                <Table
                    columns={columns}
                    expandedRowRender={record => <p><strong>sha: </strong>{record.sha}</p>}
                    dataSource={commit_info}
                />
            </TabPane>

        </Tabs>
    )

}


const FoldersCard=({folderName, isActive,editDeploy}) => {
    return (
        <Card className="folderCard" onClick={e=>editDeploy(folderName)}>
            <Icon type={isActive ? "folder-open" : "folder"} className={"folderIcon" + (isActive ? ' active' : '')}/>
            <h4 className={"folderName" + (isActive ? ' active' : '')}>{folderName}</h4>
        </Card>
    )
}

export default RepoDetail;