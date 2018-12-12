import React from 'react'
import { Button } from '@material-ui/core'

class Facebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  loadFbLoginApi = () => {

        window.fbAsyncInit = function() {
            window.FB.init({
                appId      : '321414201787330',
                cookie     : true,  // enable cookies to allow the server to access
                // the session
                xfbml      : true,  // parse social plugins on this page
                version    : 'v3.2' // use version 2.1
            });
        };

        console.log("Loading fb api");
          // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
  }

    componentDidMount = () => {
      this.loadFbLoginApi();
    }

    testAPI = () => {
      console.log('Welcome!  Fetching your information.... ');
      window.FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      });
    }

    statusChangeCallback = (response) => {
      console.log('statusChangeCallback');
      console.log(response);
      if (response.status === 'connected') {
        this.testAPI();
      } else if (response.status === 'not_authorized') {
        console.log("Please log into this app.");
      } else {
        console.log("Please log into this facebook.");
      }
    }

    checkLoginState = () => {
      window.FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));
    }

    handleFBLogin = () => {
      window.FB.login(this.checkLoginState());
    }

    render() {
        return (
                <div>
{/*                     
                    <Button
                    id="btn-social-login"
                    onClick={this.handleFBLogin}
                    >
                      Facebook
                    </Button> */}
                </div>
               );
    }
}

export default Facebook;