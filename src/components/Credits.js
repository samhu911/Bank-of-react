import React, {Component} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom';
import AccountBalance from "./AccountBalance";
import PropTypes from 'prop-types';

class Credits extends Component {
    constructor () {
        super();
        this.state = {
            credits: [],
            totalCredit: 0,
            description: "",
            amount: 0,
            date: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        axios
        .get("https://moj-api.herokuapp.com/credits")
        .then((response) => {
            const data = response.data;
            console.log(data);
            this.setState({credits: data});
            let total = 0;
            data.forEach((credit) => (total += credit.amount));
            this.setState({totalCredit: total});
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
        let newCredit = {
            description: this.state.description,
            amount: Number(this.state.amount),
            date: new Date().toISOString()
        }
        let CreditArray = [...this.state.credits, newCredit];
        this.setState({credits: CreditArray});
        let result = 0;
        CreditArray.forEach((credit) => (result += credit.amount));
        let total = result.toFixed(2);
        this.setState({totalCredit: total});
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
   
    render() {
        let display= (
            this.state.credits.map((credit) => {
                return (
                <>
                <div>Description: {credit.description}</div>
                <div>Amount: {credit.amount}</div>
                <div>Date: {credit.date}</div>
                <br />
                </>
                )
            })
        )
        return (
            <div className="App">
            <h1>Credits</h1>
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
            <button>Add Credit</button>
        </form>
        <br />
        <AccountBalance />
        <div>Total Credit: {this.state.totalCredit}</div>
        <div>{display}</div>
        </div>
        )
    }
}
Credits.propTypes = {
    totalCredit: PropTypes.number,
    description: PropTypes.string,
    amount: PropTypes.number,
    date: PropTypes.string
};

export default Credits