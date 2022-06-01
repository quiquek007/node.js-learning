import React from 'react';
import { http } from '../utility/request';

export default class Linker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentUserId: '', userIds: [], groupId: '' };
        this.addHandler = this.addHandler.bind(this);
        this.linkHandler = this.linkHandler.bind(this);
        this.onChangeUserIdHandler = this.onChangeUserIdHandler.bind(this);
        this.onChangeGroupIdHandler = this.onChangeGroupIdHandler.bind(this);
    }

    onChangeUserIdHandler(event) {
        this.setState({ currentUserId: event.target.value });
    }

    onChangeGroupIdHandler(event) {
        this.setState({ groupId: event.target.value });
    }

    async addHandler() {
        if (this.state.userIds.includes(this.state.currentUserId)) return;
        const userIds = [...this.state.userIds, this.state.currentUserId];
        this.setState({ userIds, currentUserId: '' });
    }

    async linkHandler() {
        await http.request(`/user-group`, 'POST', { groupId: this.state.groupId, userIds: this.state.userIds });
        this.setState({ currentUserId: '', userIds: [], groupId: '' });
    }

    render() {
        return (
            <React.Fragment>
                <div>Users id list:</div>
                {this.state.userIds.map(item => (
                    <div key={item}>{item}</div>
                ))}
                <label htmlFor="userId">User id: </label>
                <input type="text" id="userId" onChange={this.onChangeUserIdHandler} value={this.state.currentUserId} />
                <button onClick={this.addHandler}>Add</button>
                <br />
                <label htmlFor="groupId">Group id: </label>
                <input type="text" id="groupId" onChange={this.onChangeGroupIdHandler} value={this.state.groupId} />
                <button onClick={this.linkHandler}>Link</button>
            </React.Fragment>
        );
    }
}
