angular.module('services.local-storage', []).factory('LocalStorage', function($window) {

  var rememberMe = "rememberMe";
  var session = "session";

  var ls = {
    rememberMeGet: function() {
      return JSON.parse($window.localStorage.getItem(rememberMe));
    },
    rememberMeSet: function(username, token, passwordLength, admin) {
      $window.localStorage.setItem(rememberMe, JSON.stringify({
        username: username,
        token: token,
        passwordLength: passwordLength,
        admin: admin
      }));
    },
    rememberMeClear: function() {
      $window.localStorage.removeItem(rememberMe);
    },
    sessionGet: function() {
      return JSON.parse($window.localStorage.getItem(session));
    },
    sessionSet: function(username, admin, token, userID) {
      $window.localStorage.setItem(session, JSON.stringify({
        username: username,
        token: token,
        admin: admin,
        userID: userID
      }));
    },
    sessionClear: function() {
      $window.localStorage.removeItem(session);
    },
    setSelectedUser: function(user_id) {
      $window.localStorage.setItem('selectedUserID', user_id);
    },
    getSelectedUser: function() {
      return $window.localStorage.getItem('selectedUserID');
    }
  };

  return ls;
});