import Ember from "ember";
import StoreMixin from "../../mixins/store";

export default Ember.Service.extend(StoreMixin, {

  session: Ember.inject.service("session"),

  findByCurrentUser: function() {
    var currentProfileId = this.get("session.userId");
    return this.findById(currentProfileId);
  },

  findById: function(profileId) {
    return this.get("store").findRecord("profile", profileId);
  }

});
