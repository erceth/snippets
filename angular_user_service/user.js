angular.module('services.user-service', []).factory('UserService', function($http, supplementalApiUri, LocalStorage, $state, APIService) {
	var isLoggedIn = false;
	var username = "";
	var userID = "";
	var isAdmin = false;
	var token = false;
	var searchResults = [];
	var selectedUserID = "";

	var us = {
		getUsername: function() {
			return username;
		},
		getUserID: function() {
			return userID;
		},
		getSelectedUserID: function() {
			return selectedUserID;
		},
		hasSelectedUser: function() {
			return (selectedUserID != us.getUserID());
		},
		resetSelectedUser: function() {
			selectedUserID = userID;
			LocalStorage.setSelectedUser(userID);
		},
		isLoggedIn: function() {
			return isLoggedIn;
		},
		getToken: function() {
			return token;
		},
		isAdmin: function() {
			return isAdmin;
		},
		verifyCredentials: function(email, pass, cb) {
			if (email.length <= 0 || pass.length <= 0) {
				cb({id: null, message: "Please supply username/password combination", loginDateTime: null});
			} else {
				$http.post(supplementalApiUri + "user/signin", {email: email, password: pass}).success(function(data, status, headers, config) {
					cb(data);
				}).error(function(data, status, headers, config) {
					console.error("Connection Error");
				});
			}
		},
		logInNewUser: function(newUserName, admin, newToken, newUserID) {
			isAdmin = (admin === true)? true : false;
			isLoggedIn = true;
			token = newToken;
			username = newUserName;
			userID = newUserID;
			if(us.isAdmin()) {
				selectedUserID = LocalStorage.getSelectedUser();
			} else {
				selectedUserID = newUserID;
			}
			LocalStorage.sessionSet(newUserName, admin, newToken, newUserID);
		},
		searchUsers: function(term, cb) {
			APIService.api_get('searchParticipant/'+term+'/'+us.getToken()+'/'+us.getUserID(), 'Search Users', function(data) {
				searchResults = data.list;
				cb(data);
			});
		},
		selectUser: function(user_id, cb) {
			selectedUserID = user_id;
			LocalStorage.setSelectedUser(user_id);
		},
		fetchProfile: function(user_id, cb) {
			APIService.api_get('user/profile/'+user_id+'/'+us.getToken()+'/'+us.getUserID(), 'Profile API', function(data) {
				for(var attr in data.goals) {
					data.goals[attr] = (data.goals[attr] === null)? 0 : data.goals[attr];
				}
				cb(data);
			});
		},
		calculateStats: function(intake, goals) {
			stats = {};
			stats.calories = us.individualStat(intake.calories, goals.goalCalories);
			stats.fat = us.individualStat(intake.fat, goals.goalFat);
			stats.sugar = us.individualStat(intake.sugar, goals.goalSugar);
			stats.sodium = us.individualStat(intake.sodium, goals.goalSodium);
			stats.protein = us.individualStat(intake.protein, goals.goalProtein);
			stats.carbs = us.individualStat(intake.totalCarbs, goals.goalTotalCarbs);
			stats.netCarbs = us.individualStat(intake.netCarbs, goals.goalNetCarbs);
			return stats;
		},
		individualStat: function(intake, goal) {
			stat = (goal <= 0)? 0 : parseInt((intake / goal) * 100, 10);
			return (stat > 100)? 100 : stat;
		},
		post_user_details: function(user, coach_id, cb) {
			APIService.api_post('saveprofile/', {apiToken: us.getToken(), apiTokenUserID: us.getUserID(), user_id: user.profile.user_id, modifyinguser_id: us.getUserID(), fullname: user.profile.fullname, email: user.profile.email, startdate: user.profile.startdate, active: user.profile.active, metric: user.profile.metric, coach: user.profile.coach, coach_id: coach_id, sendpswdreset: user.password_email, sendwelcomeltr: user.welcome_email, calories: user.profile.goals.goalCalories, totCarbs: user.profile.goals.goalTotalCarbs, netCarbs: user.profile.goals.goalNetCarbs, fiber: user.profile.goals.goalFiber, fat: user.profile.goals.goalFat, sodium: user.profile.goals.goalSodium, sugar: user.profile.goals.goalSugar, protein: user.profile.goals.goalProtein}, 'Post Profile', function(data) {
				cb(data);
			});
		},
		reset_token: function() {
			$http.get(supplementalApiUri+'refreshToken/'+us.getToken()+'/'+us.getUserID()).success(function(data, status, headers, config) {
				token = data.apiToken;
				LocalStorage.sessionSet(us.getUsername(), us.isAdmin(), data.apiToken, us.getUserID());
			});
		},
		send_reset_email: function(email, cb) {
			APIService.api_get('requestPswdReset/'+email, 'Send Reset Email', function(data) {
				cb(data);
			});
		},
		reset_password: function(email,token, password, password_confirmation, cb) {
			APIService.api_post('passwordreset', {email: email, token: token, password: password, password_confirmation: password_confirmation}, 'Post Password Reset', function(data) {
				cb(data);
			});
		}
	};

	var session = LocalStorage.sessionGet();  //if still logged in
	if (session) {
		us.logInNewUser(session.username, session.admin, session.token, session.userID);
	}

	return us;
});