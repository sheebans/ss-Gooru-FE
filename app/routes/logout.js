import Ember from "ember";

export default Ember.Route.extend({

  /**
   * @property {Service} session
   */
  session: Ember.inject.service(),


  beforeModel: function(){
    this.get("session").invalidate();
    //this.refresh();
  }

});
