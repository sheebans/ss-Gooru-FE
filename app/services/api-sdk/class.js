import Ember from 'ember';
import StoreMixin from '../../mixins/store';

export default Ember.Service.extend(StoreMixin, {

  /**
   * Returns the list of the classes the user is joined (as student).
   * @returns {Class[]}
   */
  findClassesIJoined: function(params) {
    return this.get('store').queryRecord('class/class', {
      isStudent: true,
      limit: (params && params.limit ? params.limit : 10),
      offset: (params && params.offset ? params.offset : 0)
    }).then(function(response) {
      return response;
    }, function (error) {
      Ember.Logger.error('Error querying Classes I Joined... %s', error);
      return Ember.A([]);
    });
  },

  /**
   * Return the list of classes the user teach (as teacher)
   * @returns {Class[]}
   */
  findClassesITeach: function(params) {
    return this.get('store').queryRecord('class/class', {
      limit: (params && params.limit ? params.limit : 10),
      offset: (params && params.offset ? params.offset : 0),
      'flt.exclude.empty.course':  (params && params['flt.exclude.empty.course'] ? params['flt.exclude.empty.course'] : false)
    }).then(function(response) {
      return response;
    }, function (error) {
      Ember.Logger.error('Error querying Classes I Teach... %s', error);
      return Ember.A([]);
    });
  }

});
