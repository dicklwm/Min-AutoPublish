/**
 * Created by Min on 2016-12-16.
 */
import React from 'react';
import {Card, Badge} from 'antd';
import './index.css';
import {Link} from 'react-router';

const ProjectCard=React.createClass({

    render(){
        const {obj} = this.props;
        return (
            <Link to={"home/repo/" + obj.id}>
                <Card
                    className="project-card"
                    title={obj.name}
                    bordered={true}
                    extra={
                        <Badge count={obj.id} style={{backgroundColor: '#fff', color: '#999', borderColor: '#d9d9d9'}}
                               overflowCount={99999}/>
                    }
                >

                    <h4 className="work-braek">{obj.description}</h4>
                    <p className="work-braek"><strong>URL:</strong>{obj.url}</p>

                </Card>
            </Link>
        )
    }

});


export default ProjectCard;