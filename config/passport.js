
//load bcrypt
var bCrypt = require('bcrypt-nodejs');
var configAuth = require('./auth');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = function(passport, users, google){

    var User = users;
    var Google = google;
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id).then(function(err, user) {
            if(user){
                done(null, user.get());
            }
            else{
                done(null, err);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            User.findOne({where: {email: email}}).then(function (user) {
                if (user) {
                    return done({status : 401 , message : 'email is already taken'});
                }
                else {
                    var userPassword = generateHash(password);
                    var data =
                    {
                        email: email,
                        password: userPassword,
                        name: req.body.name
                    };
                    User.create(data).then(function (newUser, created){
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done({status : 200 , id : newUser.id , name : newUser.name});
                        }
                    }).catch(function(error) {
                        return done({status : 401 ,message : 'Email is not valid'});
                    });
                }
            }).catch(function(error) {
                return done({status : 401 , message : 'Something went wrong with your Signup'});
            });
        }
    ));


    //LOCAL SIGNIN
    passport.use('local-login', new LocalStrategy(
        {
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {
           // var User = user;
            var isValidPassword = function(userpass,password){
                return bCrypt.compareSync(password, userpass);
            }
            User.findOne({ where : { email: email}}).then(function (user) {
                if (!user) {
                    return done({status: 401 , message :'Email does not exist' });
                }
                if (!isValidPassword(user.password,password)) {
                    return done({status : 401 , message : 'Incorrect password.'});
                }
                var userinfo = user.get();
                return done({status : 200 , id : userinfo.id , name : userinfo.name});
            }).catch(function(err){
                return done({status : 401 , message:'Something went wrong with your Login'});
            });
        }
    ));

    passport.use(new GoogleStrategy({
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL,
            passReqToCallback: true
        },
        function(req, accessToken, refreshToken, profile, done) {
            process.nextTick(function(){
                //user is not logged in yet
                if(!req.user) {
                    Google.findOne({where : {'id': profile.id}}).then(function (user) {
                        console.log(user);
                        if (user) {
                            //  Old User want to login
                            return done(null, user);
                        } else {
                            //  New User login
                            console.log('new user');
                            var data= {
                                id : profile.id,
                                token : accessToken,
                                name : profile.displayName,
                                email : profile.emails[0].value
                            }
                            Google.create(data).then(function ( newUser , err) {
                                if (!newUser) {
                                    return done(null, false);
                                }
                                if (newUser) {
                                    return done(null , newUser);
                                }
                            });
                        }
                    }).catch(function(err){
                        console.log('something went wrong with google login')
                        return done({status : 401 , message:'Something went wrong with your Login'});
                    });
                    //user is logged in already, and needs to be merged
                }
            });
        }
    ));
}

//module.exports = passport;
