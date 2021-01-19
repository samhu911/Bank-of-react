import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import AccountBalance from './AccountBalance';
import PropTypes from 'prop-types';

class Debits extends Component {
    constructor () {
        super();
        this.state = {
            debits: [],
            totalDebit: 0,
            description: "",
            amount: 0,
            date: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios
        .get("https://moj-api.herokuapp.com/debits")
        .then((response) => {
            const data = response.data;
            console.log(data);
            this.setState({debits: data});
            let total = 0;
            data.forEach((debit) => (total += debit.amount));
            this.setState({totalDebit: total})
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        let newDebit = {
            description: this.state.description,
            amount: Number(this.state.amount),
            date: new Date().toISOString()
        }
        let DebitArray = [...this.state.debits, newDebit];
        this.setState({debits: DebitArray});
        let result = 0;
        DebitArray.forEach((debit) => (result += debit.amount));
        let total = result.toFixed(2);
        this.setState({totalDebit: total});
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        let display = (
            this.state.debits.map((debit) => {
                return (
                <>
                <div>Description: {debit.description}</div>
                <div>Amount: {debit.amount}</div>
                <div>Date: {debit.date}</div>
                <br />
                </>
                )
            })
        )
        return (
        <div className="App">
        <h1>Debits</h1>
        <Link to="/">Home</Link>
        <br /><br />
        <form onSubmit={this.handleSubmit}>
            <label htmlFor="description">Description: </label>
            <input type="text" 
                   name="description"
                   onChange={this.handleChange} />
                   <br />
            <label htmlFor="amount">Amount: </label>
            <input type="number"
                    min="0"
                    step="0.01"
                    required
                    name="amount"
                   onChange={this.handleChange} />
                   <br />
            <button>Add Debit</button>
        </form>
        <br />
        <AccountBalance />
        <div>Total Debits: {this.state.totalDebit}</div>
        <div>{display}</div>
        </div>
        )
    }
}

Debits.propTypes = {
    totalDebit: PropTypes.number,
    description: PropTypes.string,
    amount: PropTypes.number,
    date: PropTypes.string
};

export default Debits