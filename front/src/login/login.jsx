import './login.css';
import React from 'react';
import { http } from '../utility/request';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { login: '', password: '' };
        this.loginHandler = this.loginHandler.bind(this);
        this.onChangeLoginHandler = this.onChangeLoginHandler.bind(this);
        this.onChangePasswordHandler = this.onChangePasswordHandler.bind(this);
    }

    onChangePasswordHandler(event) {
        this.setState({ password: event.target.value });
    }

    onChangeLoginHandler(event) {
        this.setState({ login: event.target.value });
    }

    async loginHandler() {
        const response = await http.request(`/login`, 'POST', { login: this.state.login, password: this.state.password });
        sessionStorage.setItem('token', response.token);
        alert('you are loged in!');
    }

    render() {
        return (
            <section className="login-section">
                <label htmlFor="login">Login: </label>
                <input type="text" name="login" id="login" onChange={this.onChangeLoginHandler} value={this.state.login} />
                <label htmlFor="password">Password: </label>
                <input type="password" name="password" id="password" onChange={this.onChangePasswordHandler} value={this.state.password} />
                <button onClick={this.loginHandler}>Login</button>
            </section>
        );
    }
}
