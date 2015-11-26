import Ember from 'ember';
import StoreMixin from '../../mixins/store';

/**
 * @typedef {Object} ClassService
 */
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
  },

  /**
   * Returns a class by id
   * @param {string} id
   */
  findById: function(id){
    return Ember.Object.create({
      id: id,
      name: 'Class A1',
      code: 'ABCDEF',
      greetings: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      startDate: '9.2.2015',
      endDate: '12.15.2015',
      grades: 'K',
      visibility: true,
      totalMembers: 10,
      teachers: Ember.A([
        Ember.Object.create({
          id: '12345-abcdef',
          username: 'Teacher01',
          avatarUrl: 'http://12345-abcdef.png'
        })
      ])
    });
  }

});
