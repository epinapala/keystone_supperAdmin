/**
 * This file contains the common middleware used by your routes.
 * 
 * Extend or replace these functions as your application requires.
 * 
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore');


/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;
	
	locals.navLinks = [
		{ label: 'Home',		key: 'home',		href: '/' }
	];
	
	locals.user = req.user;

	// console.log("req.user = " + req.user);
	// if(req.path == "/keystone/users" || req.path == "/keystone/users/"){
	// 	if(req.user.isSupperAdmin){
	// 		next();
	// 	}else{
	// 		var err = new Error('need supper user');
	// 		next(err);
	// 	}
	// }else{
	// 	next();
	// }


	var indexOfUsersURL = req.path.indexOf("/keystone/users");
	//solution for :  blocking common users accessing all user management pages including list and item pages.
	// if(indexOfUsersURL == 0){
	// 	if(req.user.isSupperAdmin){
	// 		next();
	// 	}else{
	// 		var err = new Error('A supper admin account is needed!');
	// 		next(err);
	// 	}
	// }else{
	// 	next();
	// }

	//solution for : non super user can only change her/his account.
	if(indexOfUsersURL == 0 && req.path.length > "/keystone/users/".length){
		if(req.user.isSupperAdmin){ //super user  
			next();
		}else if(req.path == "/keystone/users/" + req.user._id){// for current user
			next();
		}else{
			var err = new Error('You can only manage your account. To manage other accounts you need a supper admin account.');
			next(err);
		}
	}else{
		next();
	}
};
/**
    Inits the error handler functions into `res`
*/
exports.initErrorHandlers = function(req, res, next) {
    
    res.err = function(err, title, message) {
        res.status(500).render('errors/500', {
            err: err,
            errorTitle: title,
            errorMsg: message
        });
    }
    
    res.notfound = function(title, message) {
        res.status(404).render('errors/404', {
            errorTitle: title,
            errorMsg: message
        });
    }
    
    next();
    
};

/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;
	
	next();
	
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
	
};
