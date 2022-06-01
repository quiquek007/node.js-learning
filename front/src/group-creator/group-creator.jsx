import React from 'react';
import { http } from '../utility/request';

export default class GroupCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: props.group.login,
            password: props.group.password,
            age: props.group.age,
            id: props.group.id,
            permissions: props.group.permissions
        };
        this.allPermissions = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];
        this.onCreateHandler = this.onCreate.bind(this);
        this.onUpdateHandler = this.onUpdate.bind(this);
        this.onRemoveHandler = this.onRemove.bind(this);
        this.onClearHandler = this.onClear.bind(this);
        this.onAddPermissionHandler = this.onAddPermissionHandler.bind(this);
        this.onRemovePermissionHandler = this.onRemovePermissionHandler.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
    }

    onNameChange(e) {
        this.props.group.name = e.target.value;
        this.setState({ login: e.target.value });
    }

    async onCreate() {
        const id = await http.request('/group', 'POST', {
            name: this.state.login,
            permissions: this.state.permissions
        });
        this.props.group.id = id;
        this.setState({ id });
    }

    async onUpdate() {
        await http.request('/group', 'PUT', {
            id: this.props.group.id,
            name: this.props.group.name,
            permissions: this.props.group.permissions
        });
    }

    async onRemove() {
        if (!this.props.group.id) return;
        await http.request(`/group/${this.props.group.id}`, 'DELETE');
        this.onClear();
    }

    onClear() {
        this.props.group.id = '';
        this.props.group.name = '';
        this.props.group.permissions = [];
        this.setState({ name: '', permissions: [], id: '' });
    }

    onAddPermissionHandler() {
        const option = document.querySelector('#permissions-select').value;
        if (!this.state.permissions.includes(option)) {
            const permissions = [...this.state.permissions, option];
            this.props.group.permissions = permissions;
            this.setState({ permissions });
        }
    }

    onRemovePermissionHandler() {
        const option = document.querySelector('#permissions-select').value;
        if (this.state.permissions.includes(option)) {
            const permissions = this.state.permissions.filter(p => p !== option);
            this.props.group.permissions = permissions;
            this.setState({ permissions });
        }
    }

    render() {
        return (
            <div className="group-creator">
                <div>Id: {this.props.group.id}</div>
                <div>
                    <label htmlFor="groupName">Name: </label>
                    <input type="text" name="groupName" id="groupName" onChange={this.onNameChange} value={this.props.group.name} />
                </div>
                <div>
                    <div>Permissions: [{this.props.group.permissions.map(item => `'${item}', `)}]</div>
                    <select id="permissions-select">
                        {this.allPermissions.map((item, key) => (
                            <option key={key} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                    <button onClick={this.onAddPermissionHandler}>Add</button>
                    <button onClick={this.onRemovePermissionHandler}>Remove</button>
                </div>
                <button onClick={this.onUpdateHandler}>Update</button>
                <button onClick={this.onCreateHandler}>Create</button>
                <button onClick={this.onClearHandler}>Clear</button>
                <button onClick={this.onRemoveHandler}>Remove</button>
            </div>
        );
    }
}
