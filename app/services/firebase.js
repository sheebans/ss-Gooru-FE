import Ember from 'ember';
import { jwt_decode } from 'ember-cli-jwt-decode';

/**
 * @typedef {Object} FirebaseService
 */
export default Ember.Service.extend({

  session: Ember.inject.service("session"),

  firebaseApp: Ember.inject.service(),


  init: function () {
    this._super(...arguments);
  },

  /**
   * Submit a new message
   *
   * @param current user data, list of channels, and message to be sent
   *
   * @returns void
   */
  submitMessage: function(currentUser, channels, message) {
      const service = this;
      const db = this.get('firebaseApp').database();
      const channelId = channels[0].uuid;
      var user = this.get('firebaseApp').auth().currentUser;
      if (user) {
        var fullname = currentUser.firstName + ' ' + currentUser.lastName;
        var photo = currentUser.avatarUrl;
        var messageRef = db.ref().child("messages/" + channelId);
        var newKey = messageRef.push().key;
        db.ref("messages/" + channelId + "/" + newKey).set({
          message: message,
          username: this.get('session.userData.username'),
          userId: this.get('session.userData.gooruUId'),
          fullname: fullname,
          photo: photo,
          createdTime: firebase.database.ServerValue.TIMESTAMP,
          messageId: newKey
        });
        //Move the location in message pane to the bottom
        Ember.run.later((function() {
        $('.message-row-container').scrollTop($('.message-row-container-inner').height());
        }), 100);
        this.set("message", '');
      }
    },

  //submit a file to firebase storage
  submitFile: function(currentUser, channels, fileToSend){
    const db = this.get('firebaseApp').database();
      const storage =  this.get('firebaseApp').storage();
      const channelId = channels[0].uuid;
      var user = this.get('firebaseApp').auth().currentUser;
      //Only allow this functionality if the user is signed into firebase
      if (user) {
        //Gather document information
        let image = fileToSend;
        let file = image.files[0];
        var fullname = currentUser.firstName + ' ' + currentUser.lastName;
        var photo = currentUser.avatarUrl;
        //var currentUser = user;
        //Create a reference to the messages table for this particular channel
        var messageRef = db.ref().child("messages/" + channelId);
        var newKey = messageRef.push().key;
          //store the file onto firebase storage based on the current user's id
          storage.ref(currentUser.uid + '/' + Date.now() + '/' + file.name)
            .put(file, {contentType: file.type})
            .then(function(snapshot) {
            var filePath = snapshot.metadata.fullPath;

            //push a new message containing the file information
            db.ref().child("messages/" + channelId + "/" + newKey).set({
              username: this.get('session.userData.username'),
              userId: this.get('session.userData.gooruUId'),
              fullname: fullname,
              message: storage.ref(filePath).toString(),
              photoUrl: file,
              photo: photo,
              fileType: file.type,
              fileSize: file.size,
              fileName: file.name,
              messageId: newKey,
              createdTime: firebase.database.ServerValue.TIMESTAMP
            });
          }.bind(this));
        }
  },
  //remove a message from firebase
  removeMessage: function(message,channels){
    const auth = this.get('firebaseApp').auth();
    const db = this.get('firebaseApp').database();
    const channelId = channels[0].uuid;
    //Check user id against authenticated firebase id - if it's the same then we can remove the message
    if(message.userId === auth.currentUser.uid){
      db.ref().child("messages/" + channelId +"/"+message.messageId).remove();
      //return from this method since we are done
      return;
    }
    //Decode the JWT provided to firebase - need to look into the users role
    auth.currentUser.getToken().then(function(val){
     var decodedVal = jwt_decode(val);
     //if the user is a teacher, then we allow them to remove anyones message
     if(decodedVal.user_category === "teacher"){
      db.ref().child("messages/" + channelId+"/"+message.messageId).remove();
     }
   });
  },

  //generate the JWT needed by firebase
  generateJWT: function(options){
    //create objects for the authentication, and database services
    const auth = this.get('firebaseApp').auth();
    const db = this.get('firebaseApp').database();
    //Validating user and generating JWT
    Ember.$.ajax('http://localhost:8083/jwt/nile/v1/', options).then(function(val){
      var response = JSON.parse(val);
      const jwt = response.jwt; 
      /*
      * If the user is not logged in, then we log them into Firebase. First we setup the listener so that after
      * the user is logged into firebase, we then create a representation for the user in the user
      * table in the firebase database.
      */
      auth.onAuthStateChanged(function(user) {
      if (user) {
        //create user in database if not present
        var userRef = db.ref().child('users/');
        userRef.once('value').then(function(snapshot){
          var userID = user.uid;
          auth.currentUser.getToken().then(function(val){
             var decodedVal = jwt_decode(val);
             if (!(snapshot.hasChild(userID))){
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
        // User needs to be signed in using custom authentication - uses the uid set in the JWT
        auth.signInWithCustomToken(jwt);
        }
      });
    });
  }
});
