var React = require ('react');

var invite = React.createClass({
  getInitialState: function(){
    return {
      passcode: ''
    };
  },

  handleChange: function(event){
    if (event.target.value.keyCode == 13) { // "Enter"
        this.handleClick;
    }

    this.setState({
      'passcode': event.target.value
    });
  },

  enterPressed: function(event) {
    if(event.keyCode === 13) {
      event.preventDefault();
      $.ajax({ // Post message
        type: 'POST',
        url: 'noToken',
        contentType: 'application/json',
        data: JSON.stringify({ "inviteCode": this.state.passcode }),
        success: function(d){
          console.log('POST successful: ', d);
          console.log('sign in request sent');
        }
      });
      this.setState({message: ''}); // Clear input box
      console.log(this.state);
    }
  },

  handleClick: function(event){
    event.preventDefault();
    $.ajax({ // Post message
      type: 'POST',
      url: 'noToken',
      contentType: 'application/json',
      // headers: {'Cookie' : document.cookie },
      data: JSON.stringify({
        "inviteCode": this.state.passcode
      }
      ),
      success: function(d){
        console.log('POST successful: ', d);
        console.log('sign in request sent');
      }
    });
    this.setState({message: ''}); // Clear input box
    console.log(this.state);
  },

  render: function(){
    return (
      <form action="">
        <input value={this.state.passcode} onChange={this.handleChange} type="text">
        <input class="submitButton" type="submit">
      </form>
    );
  }
});