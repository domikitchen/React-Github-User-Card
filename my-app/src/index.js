import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      usertext: "domikitchen",
      user: [],
      followerUsers: []
    }
  }

  componentDidMount() {
    axios.get(`https://api.github.com/users/domikitchen`)
      .then(response => {
        console.log(response.data);
        this.setState({
          user: response.data
        })
        axios.get(`https://api.github.com/users/domikitchen/followers`)
          .then(res => {
            this.setState({
              followerUsers: res.data.map(follower => {
                  return follower;
                })
            })
          })
      })
  }

  onChange = evt => {
    this.setState({
      usertext: evt.target.value
    })
  }

  submit = evt => {
    evt.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.usertext}`)
      .then(response => {
        this.setState({
          user: response.data
        })
        axios.get(`https://api.github.com/users/${this.state.usertext}/followers`)
          .then(res => {
            console.log(res.data)
            this.setState({
              followerUsers: res.data.map(follower => {
                  return follower;
                })
            })
          })
      })
  }

  render() {
    console.log(this.state.followerUsers);
    return(
      <div>
        <div>
          <form onSubmit = {this.submit}>
              <p>Username</p>
              <input
                type = 'text'
                value = {this.state.usertext}
                onChange = {this.onChange}
                placeholder = 'username'
              />
              <br/>
              <button onClick = {this.submit}>submit</button>
          </form>
        </div>
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
          <div className = 'followers'>
            {this.state.followerUsers.map((follower, index) => {
              return (
                <div key = {index} className = 'follower'>
                  <div className = 'avatar'>
                   <img src = {follower['avatar_url']} alt = "user avatar" />
                  </div>
                  <a href = {follower[`html_url`]} target = '_blank'><p>{follower.login}</p></a>
                </div>
              )
            })}
          </div>
          </section>
        </div>
      </div>
    );
  }
}




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);