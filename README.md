This example demonstrates how to use [Express](http://expressjs.com/) 4.x and
[Passport](http://passportjs.org/) to authenticate users using Facebook.  Use
this example as a starting point for your own web applications.

## Instructions

To install this example on your computer, clone the repository and install
dependencies.

```bash
$ git clone git@github.com:passport/express-4.x-facebook-example.git
$ cd express-4.x-facebook-example
$ npm install
```

The example uses environment variables to configure the consumer key and
consumer secret needed to access Facebook's API.  Start the server with those
variables set to the appropriate credentials.

```bash
$ CLIENT_ID=__FACEBOOK_CLIENT_ID__ CLIENT_SECRET=__FACEBOOK_CLIENT_SECRET__ node server.js
```

Open a web browser and navigate to [http://localhost:3000/](http://localhost:3000/)
to see the example in action.

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/vK9dyjRnnWsMzzJTQ57fRJpH/passport/express-4.x-facebook-example'>  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/vK9dyjRnnWsMzzJTQ57fRJpH/passport/express-4.x-facebook-example.svg' /></a>


You need to put your app's URL in a few places and it should be an https. I'll assume you're in development and using localhost as I was:

go here: https://developers.facebook.com/apps/__YOUR_APP_ID__/settings/basic/

Click Add Platform, Website and add https://localhost:8443 (or whichever port you're running your app on)
In App Domains add https://localhost
go here: https://developers.facebook.com/apps/__YOUR_APP_ID__/fb-login/settings/

Add the full path of your callback URL here: Valid OAuth Redirect URIs
At that point facebook should at least send you back to your callback as long as you're trying to authenticate as a developer on the app. If you want to test with other users you'll need to add them as test users on the app.

Good luck... these directions will probably become irrelevant within a few months :(# gplace_list
