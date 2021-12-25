var firebaseConfig = {
    apiKey: "AIzaSyDIZvpXmeo60rflQukRSDI8AuffCWLkcms",
    authDomain: "scoe-airport.firebaseapp.com",
    projectId: "scoe-airport",
    storageBucket: "scoe-airport.appspot.com",
    messagingSenderId: "214515866881",
    appId: "1:214515866881:web:a5beec29bfade1fb80cf00",
    measurementId: "G-HNFBPLG66Y",
};

firebase.initializeApp(firebaseConfig);
$("#nav-user-account-actions").hide();
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var user = user;
        console.log(user.uid);
        $("#account-actions").show();
        $("#navbar-user-login-signup-actions").hide();
        $("#profile-photo").attr("src", user.photoURL);
        $("#user-name").text(user.displayName);
        $("#nav-user-account-actions").show();
    } else {
        $("#nav-user-account-actions").hide();
        console.log("No user login");
    }
});