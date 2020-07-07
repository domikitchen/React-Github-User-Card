import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: []
    }
  }

  componentDidMount() {
    axios.get(`https://api.github.com/users/domikitchen`)
      .then(response => {
        console.log(response);
        this.setState({
          user: response.data
        })
      })
  }

  render() {
    return(
      <div className = 'card'>
        <header>
          <img src = 'https://i0.wp.com/www.inferencelab.com/wp-content/uploads/github-bb449e0ffbacbcb7f9c703db85b1cf0b.png?fit=720%2C380' alt = "github logo" />
        </header>
        <section>
        <div className = 'avatar'>
          <img src = {this.state.user[`avatar_url`]} alt = "user avatar" />
        </div>
        <div className = 'info'>
          <h1>Name: <span className = 'nobold'>{this.state.user.name}</span></h1>
          <h3>Username: <span className = 'nobold'>{this.state.user.login}</span></h3>
          <h3>Followers: <span className = 'nobold'>{this.state.user.followers}</span></h3>
        </div>
        </section>
      </div>
    );
  }
}




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);