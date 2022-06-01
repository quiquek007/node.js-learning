import React from 'react';
import { http } from '../utility/request';

export default class GroupSearcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = { id: '', data: [] };
        this.findHandler = this.onFind.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    async onFind() {
        const response = await http.request(`/group/${this.state.id}`, 'GET');
        if (response) this.props.onFind(response);
    }

    async onChangeHandler(event) {
        event.preventDefault();
        let suggestions = [];

        if (event.target.value.length > 1) {
            suggestions = await http.request(`/group/suggestions/${event.target.value}`, 'GET');
            this.setState({ data: suggestions });
        }

        this.setState({ id: event.target.value });
    }

    render() {
        return (
            <React.Fragment>
                <label htmlFor="userId">Find group by (id/login): </label>
                <input type="text" name="text" list="group-list" id="userId" onChange={this.onChangeHandler} />
                <datalist id="group-list">
                    {this.state.data.map((item, key) => (
                        <option key={key} value={item.name} />
                    ))}
                </datalist>
                <button onClick={this.findHandler}>Find</button>
            </React.Fragment>
        );
    }
}
