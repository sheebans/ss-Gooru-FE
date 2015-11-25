import Ember from 'ember';
import StoreMixin from '../../mixins/store';

export default Ember.Service.extend(StoreMixin, {

  classes: Ember.A([
    Ember.Object.create({
      id: 'abcdef',
      name: 'Class A1',
      code: 'ABCDEF',
      grades: 'K',
      visibility: true,
      totalMembers: 10,
      teacher: Ember.Object.create({
        id: '12345-abcdef',
        username: 'Teacher01',
        avatarUrl: 'http://12345-abcdef.png'
      })
    }),
    Ember.Object.create({
      id: 'hijklm',
      name: 'Class A2',
      code: 'HIJKLM',
      grades: '1,2,3',
      visibility: true,
      totalMembers: 15,
      teacher: Ember.Object.create({
        id: '12345-abcdef',
        username: 'Teacher01',
        avatarUrl: 'http://12345-abcdef.png'
      })
    }),
    Ember.Object.create({
      id: 'nopqrs',
      name: 'Class A3',
      code: 'NOPQRS',
      grades: '4,5,6',
      visibility: true,
      totalMembers: 8,
      teacher: Ember.Object.create({
        id: '12345-abcdef',
        username: 'Teacher01',
        avatarUrl: 'http://12345-abcdef.png'
      })
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
