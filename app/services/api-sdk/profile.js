import Ember from 'ember';
import StoreMixin from '../../mixins/store';
import SessionMixin from '../../mixins/session';

export default Ember.Service.extend(StoreMixin, SessionMixin, {

  findByCurrentUser: function() {
    if (!this.get('session.isAnonymous')) {
      var currentProfileId = this.get('session.userId');
      return this.findById(currentProfileId);
    }
    return null;
  },

  findById: function(profileId) {
    return this.get('store').findRecord('profile', profileId);
  }

});
