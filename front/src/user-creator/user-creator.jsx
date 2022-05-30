import React from 'react';
import { http } from '../utility/request';

export default class UserCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {login: props.user.login, password: props.user.password, age: props.user.age, id: props.user.id};
        this.onCreateHandler = this.onCreate.bind(this);
        this.onUpdateHandler = this.onUpdate.bind(this);
        this.onRemoveHandler= this.onRemove.bind(this);
        this.onClearHandler = this.onClear.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onAgeChange = this.onAgeChange.bind(this);
    }

    onLoginChange(e) {
        this.props.user.login = e.target.value;
        this.setState({ login: e.target.value });
    }
    onPasswordChange(e) {
        this.props.user.password = e.target.value;
        this.setState({ password: e.target.value });
    }
    onAgeChange(e) {
        this.props.user.age = e.target.value;
        this.setState({ age: e.target.value });
    }    

    async onCreate() {
        const id = await http.request('/new-user', 'POST', {
            login: this.state.login,
            password: this.state.password,
            age: this.state.age
        });
        this.props.user.id = id;
        this.setState({ id });
    }

    async onUpdate() {
        await http.request('/update-user', 'PUT', {
            id: this.state.id,
            login: this.state.login,
            password: this.state.password,
            age: this.state.age
        });
    }

    async onRemove() {
        if (!this.props.user.id) return;
        await http.request(`/user/${this.props.user.id}`,'DELETE');
        this.onClear();
    }
    
    onClear() {
        this.props.user.id = '';
        this.props.user.login = '';
        this.props.user.password = '';
        this.props.user.age = 10;
        this.setState({login: '', password: '', age: 0, id: ''});
    }

    render() {
        return (
            <div className="user-creator">
                <div>Id: {this.props.user.id}</div>
                <div>
                    <label htmlFor="userLogin">Login: </label>
                    <input type="text" name="userLogin" id="userLogin" onChange={this.onLoginChange} value={this.props.user.login}/>
                </div>
                <div>
                    <label htmlFor="userPassword">Password: </label>
                    <input type="password" name="userPassword" id="userPassword" onChange={this.onPasswordChange} value={this.props.user.password}/>
                </div>
                <div>
                    <label htmlFor="userAge">Age: </label>
                    <input type="number" name="userAge" id="userAge" onChange={this.onAgeChange} value={this.props.user.age}/>
                </div>
                <button onClick={this.onUpdateHandler}>Update</button>
                <button onClick={this.onCreateHandler}>Create</button>
                <button onClick={this.onClearHandler}>Clear</button>
                <button onClick={this.onRemoveHandler}>Remove</button>
            </div>
        )
    }
}
