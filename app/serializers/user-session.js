import Ember from 'ember';

export default Ember.Object.extend({

  /**
   * Serializes a assessment result
   * @param {Context} context
   * @returns {*[]}
   */
  serializeSessionAssessments: function (payload) {
    let content = payload.content;
    return content.map(function(session){
      return session;
    });
  },

  serializeOpenAssessment: function (payload) {
    let content = payload.content && payload.content.length > 0 ? payload.content[0] : null;
    return content;
  }

});
