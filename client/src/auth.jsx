var React = require('react');
// var url = 'http://0.0.0.0:3000/';

var AuthBox = React.createClass({
  getInitialState: function() {
    return {
      email: '',
      password: '',
      url: 'signin',
      button: 'create an account'
    };
  },

  handleChange1: function(event){  
    this.setState({
      email: event.target.value
    });
  },

  handleChange2: function(event){
    this.setState({
      password: event.target.value
    });
  },

  enterPressed: function(event) {
    if(event.keyCode === 13) {
      event.preventDefault();
      $.ajax({ // Post message
        type: 'POST',
        url: '/' + this.state.url,
        contentType: 'application/json',
        data: JSON.stringify({ "email": this.state.email, "password": this.state.password }),
        success: function(d){
          console.log('POST successful: ', d);
        }
      });
      this.setState({ email: '', password: ''}); // Clear input box
      console.log(this.state);
      console.log(this.state.url);
    }
  },

  handleClick: function(event){
    event.preventDefault();
    $.ajax({ // Post message
      type: 'POST',
      url: '/' + this.state.url,
      contentType: 'application/json',
      data: JSON.stringify({ "email": this.state.email, "password": this.state.password }),
      success: function(d){
        console.log('POST successful: ', d);
      }
    });
    this.setState({ email: '', password: ''}); // Clear input box
    console.log(this.state);
  },

  toggleAuth: function(event){
    event.preventDefault();
    // console.log("running")
    if(this.state.url==="signin") {
      this.setState({
        button: "already have an account?",
        url: "signup"
      });
    } else {
      this.setState({
        button: "create an account",
        url: "signin"
      });
    }
    console.log(this.state.button, this.state.url)
  },

  render: function() {
    return (
      <div className="input-group" style = {{padding: '15px'}}>
        <h1>{this.state.url}</h1>
        <input value={this.state.email} onChange={this.handleChange1} onKeyDown={this.enterPressed} type="text" className="form-control"  placeholder="Enter e-mail address" />
        <input value={this.state.password} onChange={this.handleChange2} onKeyDown={this.enterPressed} type="text" className="form-control"  placeholder="Enter password" />
        <span className="input-group-btn">
          <button onClick={this.handleClick} className="btn btn-success" type="button"> Submit </button>
        </span>
        <span className="input-group-btn">
          <input type="button" onClick={this.toggleAuth} className="btn btn-success" value={this.state.button} />
        </span>        
      </div>
    )
  }
});

module.exports = AuthBox;

// var element = React.createElement(AuthBox);
// React.render(element, document.querySelector('.container'));