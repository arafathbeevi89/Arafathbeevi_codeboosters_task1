// authentication.js

import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

$(document).ready(function () {
    $('#signInForm').on('submit', function (event) {
        event.preventDefault();
        var username = $('#username').val();
        var password = $('#password').val();

        var authenticationData = {
            Username: username,
            Password: password
        };

        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

        var poolData = {
            UserPoolId: '*******', // Replace with your User Pool ID
            ClientId: '********' // Replace with your App Client ID
        };

        var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

        var userData = {
            Username: username,
            Pool: userPool
        };

        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                var accessToken = result.getAccessToken().getJwtToken();
                // Redirect user to your web app
                window.location.href = 'http://localhost:8080'; // Replace with your app's URL
            },
            onFailure: function (err) {
                alert(err.message || JSON.stringify(err));
            },
            newPasswordRequired: function (userAttributes, requiredAttributes) {
                // User was signed up by an admin and must provide a new password
                // Implement your logic here to set the new password
                // For example:
                var newPassword = 'newPassword123'; // Set the desired new password
                cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, this);
            }
        });
    });
});
