
import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Home extends Component {
    render() {
        return (
            <div className="App">
                <img src="https://s17026.pcdn.co/wp-content/uploads/sites/9/2018/08/Business-bank-account-e1534519443766.jpeg" 
                alt="bank" />
                <h1>Please dont take money out, Only deposit!!!!!</h1>
                
                <Link to="/login"><b>Login</b></Link>{" "}
                <Link to="/userProfile"><b>User Profile</b></Link>{" "}
                <Link to="/debits"><b>Debits</b></Link>{" "}
                <Link to="/credits"><b>Credits</b></Link>{" "}

                <AccountBalance accountBalance={this.props.accountBalance}/>
            </div>
        );
    }
}

export default Home;