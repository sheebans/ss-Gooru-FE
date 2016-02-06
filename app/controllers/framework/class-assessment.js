import Ember from 'ember';

export default Ember.Controller.extend({

  /**
   * @property {Collection} assessment
   */
  assessment: null,

  /**
   * @property {User[]} students
   */
  students: Ember.A([]),

  /**
   * @prop { UserQuestionsResult[] } userResults - Content feed to update the report data
   */
  userResults: null,

  /**
   * @property {boolean}
   */
  anonymous: false,


  actions: {
    setAnonymous: function(){
      this.set("anonymous", !this.get("anonymous"));
    }
  }
});
