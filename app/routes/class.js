import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";

export default Ember.Route.extend(PrivateRouteMixin, {

  queryParams: {
    refresh: {
      refreshModel: true
    }
  },
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Session} current session
   */
  session: Ember.inject.service("session"),

  profileService: Ember.inject.service('api-sdk/profile'),

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service("api-sdk/class"),

  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {UnitService} Service to retrieve unit information
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  /**
  * @type {FirebaseService} Service to utilize firebase features
  */
  firebaseApp: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get model for the controller
   */
  model: function(params) {
  const route = this;
  const classId = params.classId;
  const classPromise = route.get('classService').readClassInfo(classId);
  const membersPromise = route.get('classService').readClassMembers(classId);

  var channels = [];
  var messages = [];
  //Create objects for firebase services
  const db = this.get('firebaseApp').database();
  const auth = this.get('firebaseApp').auth();
  const userInfo = this.get('profileService').findByCurrentUser();

    return Ember.RSVP.hash({
      class: classPromise,
      members: membersPromise
    }).then(function(hash) {
      const aClass = hash.class;
      const members = hash.members;
      const courseId = aClass.get('courseId');
      let visibilityPromise = Ember.RSVP.resolve([]);
      let coursePromise = Ember.RSVP.resolve(Ember.Object.create({}));

      if (courseId) {
        visibilityPromise = route.get('classService').readClassContentVisibility(classId);
        coursePromise = route.get('courseService').fetchById(courseId);
      }
      //Retrieve the current representation of the user logged into firebase
      const user = auth.currentUser;
      if(user){
      //Create a reference to the channel table in firebase for this particular class
      var channelRef = db.ref().child("channels/");
      //We will grab all existing channels once to perform a simple check
      channelRef.once('value').then(function(snapshot) {
      //Check to see if a representation for the class exist in the channel table - if not, we create a new channel (default)
      if (!snapshot.hasChild(classId)) {
            var newKey = db.ref("channels/"+classId).push().key;
            var creator = aClass.creatorId;
            const classId = aClass.id;
            var fullName = userInfo.firstName + ' ' + userInfo.lastName;
            var postData = {
              creatorId: creator,
              channelName: aClass.title,
              owners: {
                [creator] : {
                  fullname: fullName
                }
              },
              uuid: newKey
            };
            //Creating the new channel in firebase DB
            db.ref().child("channels/"+classId + "/" + newKey).set(postData);
            for (var i=0; i<aClass.members.length; i++) {
              db.ref().child("channels/"+classId).once("value").then(function(snapshot){
                snapshot.forEach(function(channelSnapshot) {
                  db.ref().child("channels/"+classId+"/"+channelSnapshot.val().uuid+"/participants/"+aClass.members[i].id).set({
                    user:"newuser"
                  });
                });
              });
            }
            //Add new channel to user's list of enrolled channels in users table
            db.ref().child("users/"+auth.currentUser.uid+"/channels/"+newKey).set({
                channelId:newKey
              });
            //Add members of class to the channel
            for (var q=0; q<aClass.members.length; i++) {
              db.ref().child("channels/"+classId+"/"+newKey+"/participants/"+aClass.members[q].id).set({
                user:"newuser"
              });
              //Add the channel to the class member's enrolled channels in users table
              db.ref().child("users/"+aClass.members[q].id+"/channels/"+newKey).set({
                channelId:newKey
              });
            }
          }
        });
        //Now creating a listener to the classes' channel table; we will be notified if a new channel is added.
        var dbChannelRef = channelRef.child(classId);
        dbChannelRef.on('value', function(snapshot) {
          //Iterating through each channel in the class channel table (currently only the default exist).
          snapshot.forEach(function(channelSnapshot) {
            var channelId = channelSnapshot.child("uuid").val();
            var messageRef = db.ref().child("messages/" + channelId);
            const storage = route.get('firebaseApp').storage();
            /*
            * Create a reference to the messages table for a particular channel (currently only one default channel)
            * We then, only once, retrieve all messages for the particular channel and display them on the UI.
            */
            messageRef.once('value').then(function(snapshot) {
              messages.clear();
              snapshot.forEach(function(messageSnapshot) {
                var mes = messageSnapshot.val().message;
                var tmp = messageSnapshot.val();
                //If the message pertains to a file, then we need to generate the downloadable URL for the file.
                if (mes.startsWith('gs://')) {
                  messages.pushObject(tmp);
                  storage.refFromURL(mes).getMetadata().then(function(metadata) {
                    mes = metadata.downloadURLs[0];
                      Ember.set(tmp,'imageURL',mes);
                        Ember.set(tmp,'message',mes);
                  });
                }else{
                  messages.pushObject(messageSnapshot.val());
                }
              });
            });
            //Generate a listener that will add a new message to the existing messages array
            messageRef.on('child_added',function(snapshot) {
              var mes = snapshot.val().message;
              var tmp = snapshot.val();
                if (mes.startsWith('gs://')) {
                  messages.pushObject(tmp);
                  storage.refFromURL(mes).getMetadata().then(function(metadata) {
                    mes = metadata.downloadURLs[0];
                    Ember.set(tmp,'imageURL',mes);
                    Ember.set(tmp,'message',mes);
                  });
                }else{
                  messages.pushObject(snapshot.val());
                }
              Ember.run.later((function() {
                $('.message-row-container').scrollTop($('.message-row-container-inner').height());
              }), 100);
            });

            //Generate a listener that will listen for removed messages in the database and remove them from the message array
            messageRef.on('child_removed',function(snapshot) {
              for (var i=0; i<messages.length; i++){
                if(messages[i].messageId === snapshot.key){
                  messages.removeAt(i);
                }
              }
            });
            channels.pushObject(channelSnapshot.val());
            return true;
          });
        });
      }
      return Ember.RSVP.hash({
        contentVisibility: visibilityPromise,
        course: coursePromise
      }).then(function (hash) {
        const contentVisibility = hash.contentVisibility;
        const course = hash.course;
        aClass.set('owner', members.get('owner'));
        aClass.set('collaborators', members.get('collaborators'));
        aClass.set('members', members.get('members'));
        return Ember.RSVP.hash({
          class: aClass,
          course: course,
          members: members,
          units: course.get('children') || [],
          contentVisibility: contentVisibility,
      channels:channels,
      messages:messages,
      userInfo:userInfo
        });
      });
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set("class", model.class);
    controller.set("course", model.course);
    controller.set("units", model.units);
    controller.set("contentVisibility", model.contentVisibility);
    controller.set('channels', model.channels);
    controller.set('messages', model.messages);
    controller.set('userInfo', model.userInfo);
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Triggered when a class menu item is selected
     * @param {string} item
     */
    selectMenuItem: function(item){
      const route = this;
      const controller = route.get("controller");
      const currentItem = controller.get("menuItem");


      if (item !== currentItem) {
        const aClass = controller.get('class');
        const isTeacher = aClass.isTeacher(this.get("session.userId"));
        controller.selectMenuItem(item);
        const queryParams = {
          queryParams: {
            filterBy: 'assessment'
          }
        };

        if ((item === "analytics.performance") && isTeacher){
          route.transitionTo('class.analytics.performance.teacher.course', queryParams);
        } else if ((item === "analytics.performance") && !isTeacher) {
          route.transitionTo('class.analytics.performance.student', queryParams);
        } else {
          route.transitionTo('class.' + item);
        }
      }

    },
    /**
     * Gets a refreshed list of content visible
     */
    updateContentVisible: function(contentId, visible) {
      const route = this;
      const controller = route.get("controller");
      let contentVisibility = controller.get('contentVisibility');
      contentVisibility.setAssessmentVisibility(contentId,visible ? 'on' :'off');
    }
  },

  // -------------------------------------------------------------------------
  // Events
  /**
   * This event handlers reset some class properties when leaving the route
   */
  handleDeactivate: function() {
    this.get("controller").exitFullScreen();
  }.on('deactivate')

});
