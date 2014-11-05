.constant('supplementalApiUri', (function() {
  return 'url';
})())

$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    $rootScope.$broadcast("app-ctrl:closeAllModals"); 
    if(toState.data.loginRequired && !UserService.isLoggedIn()) { //if login required but not logged in
      event.preventDefault();
      $state.go('login');
    }

    if(toState.data.adminRequired && !UserService.isAdmin()) {
      event.preventDefault();
      $state.go('login');
    }
  });