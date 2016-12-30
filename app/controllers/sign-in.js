import Ember from 'ember';
import User from 'gooru-web/models/sign-in/sign-in';
import Env from 'gooru-web/config/environment';
import { jwt_decode } from 'ember-cli-jwt-decode';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  queryParams: ['sessionEnds'],

  /**
   * @property {Service} Session
   */
  session: Ember.inject.service(),

  /**
   * @property {Service} Session service
   */
  sessionService: Ember.inject.service("api-sdk/session"),

  /**
   * @property {Service} Notifications service
   */
  notifications: Ember.inject.service(),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  firebaseApp: Ember.inject.service(),

  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    authenticate: function() {
      const controller = this;
      const user = controller.get('user');
      const errorMessage = controller.get('i18n').t('common.errors.sign-in-credentials-not-valid').string;

      controller.get("notifications").clear();
      controller.get("notifications").setOptions({
        positionClass: 'toast-top-full-width sign-in'
      });

      // TODO needs to be revisited, this is a quick fix
      controller.get('sessionService').authorize().then(function(){
        if(controller.get('didValidate') === false) {
          var username = Ember.$('.gru-input.username input').val();
          var password = Ember.$('.gru-input.password input').val();
          user.set('username',username);
          user.set('password',password);
        }
        user.validate().then(function ({ validations }) {
          if (validations.get('isValid')) {
            controller.get("sessionService")
              .signInWithUser(user, true)
              .then(function() {
                controller.set('didValidate', true);
                // Trigger action in parent
                controller.send('signIn');
                //need to send this token to the backend right in order to generate the JWT
                var token = {
                  'Authorization': 'Token ' + controller.get("session.token-api3")
                };
                const options = {
                  type: 'GET',
                  headers: token
                };
                //Validating user and generating JWT
                var hold = Ember.$.ajax('http://ec2-54-153-96-115.us-west-1.compute.amazonaws.com:8083/jwt/nile/v1/', options).then(function(val){
                  var response = JSON.parse(val);
                  var jwt = response.jwt;
                  const auth = controller.get('firebaseApp').auth();
                  const firebase = controller.get('firebaseApp');
                  const db = firebase.database();
                  auth.onAuthStateChanged(function(user) {
                  if (user) {
                    // User is signed in.
                    //create user in database if not present
                    var userRef = db.ref().child('users/');
                    userRef.once('value').then(function(snapshot){
                      var userID = user.uid;
                      auth.currentUser.getToken().then(function(val){
                         var decodedVal = jwt_decode(val);
                         if (snapshot.hasChild(userID)) {
                          }else{
                              var postData = {
                                  uuid: user.uid,
                                  fullname : decodedVal.firstname + ' ' + decodedVal.lastname,
                                  user_category: decodedVal.user_category
                              };                  
                            db.ref('users/' + user.uid).set(postData);
                          } 
                       });
                        
                    });
                  } else {
                    // No user is signed in               
                    auth.signInWithCustomToken(jwt).catch(function(error) {
                        // Handle Errors here.
                      });

                  }
                });
                
              });

              }, function() {
                controller.get("notifications").warning(errorMessage);
                // Authenticate as anonymous if it fails to mantain session
                controller.get('session').authenticateAsAnonymous();
              });
          }
        });
      });
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  /**
   * init and reset all the properties for the validations
   */

  resetProperties(){
    var controller = this;
    var user = User.create(Ember.getOwner(this).ownerInjection(), {username: null, password: null});

    controller.set('user', user);
    const url = `${window.location.protocol}//${window.location.host}${Env['google-sign-in'].url}`;
    controller.set('googleSignInUrl', url);
    controller.set('didValidate', false);
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {User} user
   */
  user: null,

  target: null,

  /**
   * @param {Boolean } didValidate - value used to check if input has been validated or not
   */
  didValidate: false,

  /**
   * Query param
   * @property {Boolean} sessionEnds
   */
  sessionEnds: false

});
