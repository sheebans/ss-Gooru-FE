import Ember from 'ember';
import StoreMixin from '../../mixins/store';

export default Ember.Service.extend(StoreMixin, {

  classes: Ember.A([
    Ember.Object.create({
      id: 'abcdef',
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
    }),
    Ember.Object.create({
      id: 'hijklm',
      name: 'Class A2',
      code: 'HIJKLM',
      greetings: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      startDate: '9.2.2015',
      endDate: '12.15.2015',
      grades: '1,2,3',
      visibility: true,
      totalMembers: 15,
      teachers: Ember.A([
        Ember.Object.create({
          id: '12345-abcdef',
          username: 'Teacher01',
          avatarUrl: 'http://12345-abcdef.png'
        })
      ])
    }),
    Ember.Object.create({
      id: 'nopqrs',
      name: 'Class A3',
      code: 'NOPQRS',
      greetings: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      startDate: '9.2.2015',
      endDate: '12.15.2015',
      grades: '4,5,6',
      visibility: true,
      totalMembers: 8,
      teachers: Ember.A([
          Ember.Object.create({
          id: '12345-abcdef',
          username: 'Teacher01',
          avatarUrl: 'http://12345-abcdef.png'
        })
      ])
    })
  ]),

  /**
   * Returns the list of the classes the user is joined (as student).
   * @returns {V}
   */
  findClassesIJoined: function() {
    return this.get('classes');
  },

  /**
   * Return the list of classes the user teach (as teacher)
   * @returns {V}
   */
  findClassesITeach: function() {
    return this.get('classes');
  }

});
