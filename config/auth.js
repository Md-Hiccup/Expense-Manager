/**
 * Created by hussain on 4/7/17.
 */
module.exports = {
    'googleAuth' : {
        'clientID' : process.env.CLIENT_ID,
        'clientSecret' : process.env.CLIENT_SECRET,
        'callbackURL' : 'http://localhost:3005/auth/google/callback'
    }
}