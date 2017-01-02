import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  classService: Ember.inject.service('api-sdk/class'),

  session: Ember.inject.service('session'),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @property {Service} Notifications service
   */
  notifications: Ember.inject.service(),

  firebaseApp: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Join class event
     * @param {string} code
     */
    joinClass: function(code){
      const controller = this;
      controller.set("allowedCode", true);
      controller.set("validCode", true);
      controller.set("notMember", true);
      console.log('code',code);
      console.log('controller',controller);

      controller.get("classService")
        .joinClass(code)
        .then(function (classId) {
          if (!classId){ //no class is provided when is already joined to that class
            controller.set('isLoading', false);
            controller.set("notMember", null);
          } else {
            controller.send('updateUserClasses'); // Triggers the refresh of user classes in top header
            controller.transitionToRoute('class.overview', classId);
            //generate firebase information
            var userId = controller.get("session.userId")
            const db = controller.get('firebaseApp').database();
            const auth = controller.get('firebaseApp').auth();
            var channelUserRef = db.ref().child("channels/"+classId);
            channelUserRef.once("value").then(function(snapshot){
              console.log('snapshot',snapshot);
              var user = auth.currentUser;
              snapshot.forEach(function(channelSnapshot) {
                db.ref().child("channels/"+classId+"/"+channelSnapshot.val().uuid+"/participants/"+userId).set({
                  user:"newuser"
                });
                console.log('Adding channel to user profile');
                db.ref().child("users/"+user.uid+"/channels/"+channelSnapshot.val().uuid).set({
                  channelId:channelSnapshot.val().uuid
                });
                console.log('finished adding channel');
              });
            });
          }

        }, function (error) {
          controller.set('isLoading', false);
          if (error.code === 'restricted') {
            controller.set("allowedCode", null);
          }
          else if (error.code === 'not-found') {
            controller.set("validCode", null);
          }
          else {
            let message = controller.get('i18n').t('common.errors.can-not-join-class').string;
            controller.get('notifications').error(message);
          }
        });
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Indicates if the code is valid, false when the class is not found
   * @property {boolean}
   */
  validCode: true,

  /**
   * Indicates if the code is allowed, false if the user can't join that class
   * @property {boolean}
   */
  allowedCode: true,

  /**
   * Indicates if user is not a member of this class
   * @property {boolean}
   */
  notMember: true,

  /**
   * Indicate if it's waiting for join class callback
   */
  isLoading:false

});
