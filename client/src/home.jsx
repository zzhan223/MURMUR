var React = require('react');
// var url = 'http://0.0.0.0:3000/';


var Homebox = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: false,
      roomname: '',
      email: '',
      password: '',
      url: 'signin',
      button: 'create an account',
      EMAIL: ''
    };
  },

  handleChange: function(event) {
    this.setState({
      roomname: event.target.value
    })
  },

  handleChange2: function(event){
    this.setState({
      password: event.target.value
    })
  },

  handleChange3: function(event){
    this.setState({
      email: event.target.value
    })
  },

  enterPressed: function(event) {
    if(event.keyCode === 13 && this.state.loggedIn) {
      var that = this;
      event.preventDefault();
      $.ajax({ // Post message
        type: 'POST',
        url: '/create',
        contentType: 'application/json',
        data: JSON.stringify({
          roomname: this.state.roomname,
          email: this.state.EMAIL
        }),
        success: function(d){
          console.log('POST successful: ', d);
          window.location.pathname = '/r/' + d;
        }
      });
      this.setState({ roomname: '' }); // Clear input box
      console.log(this.state);
      console.log(this.state.url);
    }


    if(event.keyCode === 13 && !this.state.loggedIn) {
      var that = this;
      event.preventDefault();
      $.ajax({ // Post message
        type: 'POST',
        url: '/' + this.state.url,
        contentType: 'application/json',
        data: JSON.stringify({ "email": this.state.email, "password": this.state.password }),
        success: function(d){
          console.log('POST successful: ', d.loginSuccessful);
          if (d.loginSuccessful) {
            that.setState({
              loggedIn : true,
              EMAIL : that.state.email
            })
          }
        }
      });
      this.setState({ email: '', password: ''}); // Clear input box
      console.log(this.state);
      console.log(this.state.url);
    }
  },

  handleClick: function(event){
    var that = this;
    event.preventDefault();
    $.ajax({ // Post message
      type: 'POST',
      url: '/create',
      contentType: 'application/json',
      data: JSON.stringify({
        roomname: this.state.roomname,
        email: this.state.EMAIL
      }),
      success: function(d){
        console.log('POST successful: ', d);
        window.location.pathname = '/r/' + d;
      }
    });
    this.setState({ roomname: '' }); // Clear input box
    console.log(this.state);
  },

  Create: function() { 
    return (
      <div className="input-group" style = {{padding: '15px'}}>
        <h1>create a room</h1>
        <input value={this.state.roomname} onChange={this.handleChange} onKeyDown={this.enterPressed} type="text" className="form-control"  placeholder="Enter your room's name" />
        <span className="input-group-btn">
          <button onClick={this.handleClick} className="btn btn-success" type="button"> Submit </button>
        </span>      
      </div>
      )
  },

  handleClick2: function(event){
    event.preventDefault();
    var that = this;
    $.ajax({ // Post message
      type: 'POST',
      url: '/' + this.state.url,
      contentType: 'application/json',
      data: JSON.stringify({ "email": this.state.email, "password": this.state.password }),
      success: function(d){
        console.log('POST successful: ', d);
        if (d.loginSuccessful) {
          that.setState({
            loggedIn : true,
            EMAIL : that.state.email
          })
          console.log(that.state.loggedIn)
        }
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

  Auth: function(){
    return (
    <div className="input-group" style = {{padding: '15px'}}>
      <h1>{this.state.url}</h1>
      <input value={this.state.email} onChange={this.handleChange3} onKeyDown={this.enterPressed} type="text" className="form-control"  placeholder="Enter e-mail address" />
      <input value={this.state.password} onChange={this.handleChange2} onKeyDown={this.enterPressed} type="text" className="form-control"  placeholder="Enter password" />
      <span className="input-group-btn">
        <button onClick={this.handleClick2} className="btn btn-success" type="button"> Submit </button>
      </span>
      <span className="input-group-btn">
        <input type="button" onClick={this.toggleAuth} className="btn btn-success" value={this.state.button} />
      </span>        
    </div>
    )
  },

  render: function(){
    return (
      <div>
        { !this.state.loggedIn ? this.Auth() : null }
        { this.state.loggedIn ? this.Create() : null }
      </div>
    )
  }
});

module.exports = Homebox;

// var element = React.createElement(AuthBox);
// React.render(element, document.querySelector('.container'));