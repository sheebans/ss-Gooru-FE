import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service('session'),
  i18n: Ember.inject.service(),
  profileService: Ember.inject.service('api-sdk/profile'),
  firebaseApp: Ember.inject.service(),
  
  actions: {
    setupTour: function(step){
      if(this.currentModel.tourSteps.indexOf(step)===0){
        $('.gru-class-navigation .class-info h4').addClass('active-for-tour');
      }else{
        $('.gru-class-navigation .class-info h4').removeClass('active-for-tour');
      }
    },
    closeTour: function(){
      if($('.gru-class-navigation .class-info h4').hasClass('active-for-tour')){
        $('.gru-class-navigation .class-info h4').removeClass('active-for-tour');
      }
    }
  },
  
  model: function () {
  const route = this;
  const currentClass = this.modelFor('class').class;  
  const db = this.get('firebaseApp').database();
  const auth = this.get('firebaseApp').auth();

  var channels = [];
  var messages = [];
  var userInfo = this.get('profileService').findByCurrentUser().then(function(value) {
        // fulfillment
        return value;
      });
  
  var coursesPromise = route.get('profileService')
      .readUserProfile(route.get("session.userId"))
        .then(function(profile) {
          const classId = currentClass.id;
          var channelRef = db.ref().child("channels/");
          channelRef.once('value').then(function(snapshot) {
            //create new channel in database for this class
            if (!snapshot.hasChild(classId)) {
              //console.log('currentClass',currentClass);
              var newKey = channelRef.child(classId).push().key;        
              var creator = currentClass.creatorId;
              //console.log('creator',creator);
              var fullName = profile.firstName + ' ' + profile.lastName;
              var postData = {
                creatorId: creator,
                channelName: "Channel",
                owners: {
                  [creator] : {
                    fullname: fullName
                  }
                },
                uuid: newKey
              };   
              //creating new channel
              db.ref().child("channels/"+classId + "/" + newKey).set(postData);
              var user = auth.currentUser;
              //console.log('current users uid',user.uid);
              db.ref().child("users/"+user.uid+"/channels/"+newKey).set({
                channelId:newKey
              });
              //Add members of class to the channel
              for (var i=0; i<currentClass.members.length; i++) {              
                db.ref().child("channels/"+classId+"/"+newKey+"/participants/"+currentClass.members[i].id).set({
                  user:"newuser"
                });
                db.ref().child("users/"+currentClass.members[i].id+"/channels/"+newKey).set({
                  channelId:newKey
                });                        
              }      
            }
          });
          //set listener for channels
          var dbChannelRef = channelRef.child(classId);
          dbChannelRef.on('value', function(snapshot) {
            snapshot.forEach(function(channelSnapshot) {
              var channelId = channelSnapshot.child("uuid").val();
              var messageRef = db.ref().child("messages/" + channelId);
              messageRef.on('value',function(snapshot) {
                messages.clear();
                snapshot.forEach(function(messageSnapshot) {
                  messages.pushObject(messageSnapshot.val());
                });
              });
              channels.pushObject(channelSnapshot.val());
              return true;
            });
          });
          return route.get('profileService').getCourses(profile);
        });
    
    const tourSteps = Ember.A([
        {
          elementSelector:'.menu-navbar .profile.dropdown-toggle',
          title: route.get('i18n').t('gru-tour.quick-start.stepOne.title'),
          description: route.get('i18n').t('gru-tour.quick-start.stepOne.description')
        },
        {
          elementSelector: '.quick-start-options .new-assessment.btn',
          title: route.get('i18n').t('gru-tour.quick-start.stepTwo.title'),
          description: route.get('i18n').t('gru-tour.quick-start.stepTwo.description')
        }
      ]);
  
    return Ember.RSVP.hash({
      courses:coursesPromise,
      class:currentClass,
      tourSteps:tourSteps,
      channels:channels,
      messages:messages,
      userInfo:userInfo
    });

  },
  
  setupController: function (controller, model) {
    controller.get('classController').selectMenuItem('overview');
    controller.set('class', {
      class: model.class,
      isQuickstart: true
    });
    controller.set('courses', model.courses);
    controller.set('tourSteps', model.tourSteps);
    controller.set('channels', model.channels);
    controller.set('messages', model.messages);
    controller.set('userInfo',model.userInfo)
  }

});
