import React from "react";
import { http } from '../utility/request';

export default class UserSearcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {uuid: '', data: []};
        this.findHandler = this.onFind.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    async onFind() {
        const response = await http.request(`/user/${this.state.uuid}`,'GET');
        if (response) this.props.onFind(response);
    }

    async onChangeHandler(event) {
        event.preventDefault();
        let suggestions = [];

        if (event.target.value.length > 1) {
            suggestions = await http.request(`/suggestions/${event.target.value}`, 'GET');
        }

        this.setState({uuid: event.target.value, data: suggestions})
    }

    render() {
        return (
            <React.Fragment>
                <label htmlFor="userId">Find user by (id/login): </label>
                <input type="text" name="text" list="option-list" id="userId" onChange={this.onChangeHandler} />
                <datalist id="option-list" >
                    {this.state.data.map((item, key) =>
                        <option key={key} value={item.login}/>
                    )}
                </datalist>
                <button onClick={this.findHandler}>Find</button>
            </React.Fragment>
        )
    }
}
