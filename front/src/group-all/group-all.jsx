import React from 'react';
import { http } from '../utility/request';

export default class GroupAll extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.findHandler = this.findHandler.bind(this);
        this.clearHandler = this.clearHandler.bind(this);
    }

    async findHandler() {
        const response = await http.request(`/group/all`, 'GET');
        if (response) this.setState({ data: response });
    }

    async clearHandler() {
        this.setState({ data: [] });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.data.map(item => (
                    <div key={item.id}>
                        <div>Id: {item.id}</div>
                        <div>Name: {item.name}</div>
                        <div>Permissions: [{item.permissions.map(item => `'${item}', `)}]</div>
                        <br />
                    </div>
                ))}
                <button onClick={this.findHandler}>Find all</button>
                <button onClick={this.clearHandler}>Clear</button>
            </React.Fragment>
        );
    }
}
