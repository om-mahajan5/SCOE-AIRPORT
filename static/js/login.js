// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const analytics = getAnalytics(app);

var uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
          credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: '/tos',
        // Privacy policy url/callback.
        privacyPolicyUrl: function() {
          window.location.assign('/privacy');
        }
};
var ui = new firebaseui.auth.AuthUI(firebase.auth());

ui.start('#firebaseui-auth-container', uiConfig);