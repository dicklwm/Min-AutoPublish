/** Created by Min on 2016-12-27.  */
import React from 'react';
import {Table, Button} from 'antd';


const CommitTable=({commit_info, reset}) => {
    window.commit_info=commit_info;
    //表头信息，过滤的filters需要先生成
    const columns=[
        {title: '提交信息', dataIndex: 'message', key: 'message'},
        {
            title: '提交人', dataIndex: 'committer.raw', key: 'committer.raw',
            filters: makeRawFilter(),
            onFilter: (value, record) => record.committer.raw.indexOf(value)===0,
            sorter: (a, b) => a.committer.raw.charCodeAt() - b.committer.raw.charCodeAt(),
        },
        {
            title: '时间', dataIndex: 'localTime', key: 'localTime',
            sorter: (a, b) => a.time - b.time
        },
        {
            title: '操作', key: 'action',
            render: (text, record, index) => (
                <div>
                    <Button type="primary" onClick={() => reset(text.sha)}>reset</Button>
                </div>
            )
        }
    ];

    //生成Filter过滤字段，**********需要优化*********
    function makeRawFilter() {
        var arr=[];
        for (let i in commit_info) {
            //使用for in 的时候需要先检查是不是有属性i
            if (commit_info.hasOwnProperty(i)) {
                console.log('make', commit_info[i]);
                var isHas=false;
                const raw=commit_info[i].committer.raw,
                    obj={text: raw, value: raw};
                //如果有相同值
                arr.forEach(obj => {
                    if (obj.value===raw) {
                        isHas=true;
                        return true;
                    }
                })
                if (!isHas)
                    arr.push(obj);
            }
        }
        return arr;
    }


    return (
        <Table
            columns={columns}
            expandedRowRender={record => <p><strong>sha: </strong>{record.sha}</p>}
            dataSource={commit_info}
        />
    )
}

export default CommitTable;