var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../models/user');
var config=require('../config/database');

module.exports = function(passport)
{
	var opts={};
	opts.jwtFromRequest =  ExtractJwt.fromAuthHeaderWithScheme('jwt');
	opts.secretOrKey = config.secret;
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
		
			User.findOne({_id: jwt_payload.data._id}, function(err, user) {

				if(err){
					// console.log("test1");
					return done(err,false);
				}
				if(user){
					// console.log("test2");
					return done(null , user);
				}
				else{
					// console.log("test3");
					return done(null, false);
				}
			});
	}));
}