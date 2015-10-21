import Ember from "ember";
import StoreMixin from "../../mixins/store";
import SessionMixin from "../../mixins/session";

export default Ember.Service.extend(StoreMixin, SessionMixin, {

  findByCurrentUser: function() {
    var currentProfileId = this.get("sessionUserId");
    return this.findById(currentProfileId);
  },

  findById: function(profileId) {
    return this.get("store").findRecord("profile", profileId);
  }

});
