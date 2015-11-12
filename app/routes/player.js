import Ember from 'ember';

export default Ember.Route.extend({
  actions: {

    /**
     * Action triggered when the user change the emotion
     * @see gru-emotion-picker
     */
    changeEmotion: function(emotion) {
      //TODO remove when implement the content player
      console.log(emotion);
    }

  }
});
