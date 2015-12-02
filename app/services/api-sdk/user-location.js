import Ember from 'ember';
import StoreMixin from '../../mixins/store';

export default Ember.Service.extend(StoreMixin, {

  /**
   * Returns the user's current location.
   * @param user the user id
   * @returns {UserLocation}
   */
  findOneByUser: function(user) {
    console.log(user);
    return Ember.Object.create({
      unit: 'unit-1',
      lesson: 'lesson-1',
      collection: 'collection-1',
      users: Ember.A([Ember.Object.create({
        id: 'id-1',
        firstName: 'firstname-1',
        lastName: 'lastname-1',
        email: 'user_1@test.com',
        username: 'username-1'
      })])
    });
  },

  /**
   * Returns the locations of all the users of a specific course.
   * @param course the course id
   * @returns {UserLocation[]}
   */
  findByCourse: function(course) {
    console.log(course);
    return Ember.A([
      Ember.Object.create({
        unit: 'unit-1',
        users: Ember.A([
          Ember.Object.create({
            id: 'id-1',
            firstName: 'firstname-1',
            lastName: 'lastname-1',
            email: 'user_1@test.com',
            username: 'username-1'
          }),
          Ember.Object.create({
            id: 'id-2',
            firstName: 'firstname-2',
            lastName: 'lastname-2',
            email: 'user_2@test.com',
            username: 'username-2'
          })
        ])
      }),
      Ember.Object.create({
        unit: 'unit-2',
        users: Ember.A([
          Ember.Object.create({
            id: 'id-3',
            firstName: 'firstname-3',
            lastName: 'lastname-3',
            email: 'user_3@test.com',
            username: 'username-3'
          }),
          Ember.Object.create({
            id: 'id-4',
            firstName: 'firstname-4',
            lastName: 'lastname-4',
            email: 'user_4@test.com',
            username: 'username-4'
          })
        ])
      }),
      Ember.Object.create({
        unit: 'unit-3',
        users: Ember.A([
          Ember.Object.create({
            id: 'id-5',
            firstName: 'firstname-5',
            lastName: 'lastname-5',
            email: 'user_5@test.com',
            username: 'username-5'
          }),
          Ember.Object.create({
            id: 'id-6',
            firstName: 'firstname-6',
            lastName: 'lastname-6',
            email: 'user_6@test.com',
            username: 'username-6'
          })
        ])
      })
    ]);
  },

  /**
   * Returns the locations of all the users of a specific course and unit.
   * @param course the course id
   * @param unit the unit id
   * @returns {UserLocation[]}
   */
  findByCourseAndUnit: function(course, unit) {
    console.log(course);
    console.log(unit);
    return Ember.A([
      Ember.Object.create({
        unit: 'unit-1',
        lesson: 'lesson-1',
        users: Ember.A([
          Ember.Object.create({
            id: 'id-1',
            firstName: 'firstname-1',
            lastName: 'lastname-1',
            email: 'user_1@test.com',
            username: 'username-1'
          }),
          Ember.Object.create({
            id: 'id-2',
            firstName: 'firstname-2',
            lastName: 'lastname-2',
            email: 'user_2@test.com',
            username: 'username-2'
          })
        ])
      }),
      Ember.Object.create({
        unit: 'unit-2',
        lesson: 'lesson-2',
        users: Ember.A([
          Ember.Object.create({
            id: 'id-3',
            firstName: 'firstname-3',
            lastName: 'lastname-3',
            email: 'user_3@test.com',
            username: 'username-3'
          }),
          Ember.Object.create({
            id: 'id-4',
            firstName: 'firstname-4',
            lastName: 'lastname-4',
            email: 'user_4@test.com',
            username: 'username-4'
          })
        ])
      }),
      Ember.Object.create({
        unit: 'unit-3',
        lesson: 'lesson-3',
        users: Ember.A([
          Ember.Object.create({
            id: 'id-5',
            firstName: 'firstname-5',
            lastName: 'lastname-5',
            email: 'user_5@test.com',
            username: 'username-5'
          }),
          Ember.Object.create({
            id: 'id-6',
            firstName: 'firstname-6',
            lastName: 'lastname-6',
            email: 'user_6@test.com',
            username: 'username-6'
          })
        ])
      })
    ]);
  },

  /**
   * Returns the locations of all the users of a specific course, unit and lesson.
   * @param course the course id
   * @param unit the unit id
   * @param lesson the lesson id
   * @returns {UserLocation[]}
   */
  findByCourseAndUnitAndLesson: function(course, unit, lesson) {
    console.log(course);
    console.log(unit);
    console.log(lesson);
    return Ember.A([
      Ember.Object.create({
        unit: 'unit-1',
        lesson: 'lesson-1',
        collection: 'collection-1',
        users: Ember.A([
          Ember.Object.create({
            id: 'id-1',
            firstName: 'firstname-1',
            lastName: 'lastname-1',
            email: 'user_1@test.com',
            username: 'username-1'
          }),
          Ember.Object.create({
            id: 'id-2',
            firstName: 'firstname-2',
            lastName: 'lastname-2',
            email: 'user_2@test.com',
            username: 'username-2'
          })
        ])
      }),
      Ember.Object.create({
        unit: 'unit-2',
        lesson: 'lesson-2',
        collection: 'collection-2',
        users: Ember.A([
          Ember.Object.create({
            id: 'id-3',
            firstName: 'firstname-3',
            lastName: 'lastname-3',
            email: 'user_3@test.com',
            username: 'username-3'
          }),
          Ember.Object.create({
            id: 'id-4',
            firstName: 'firstname-4',
            lastName: 'lastname-4',
            email: 'user_4@test.com',
            username: 'username-4'
          })
        ])
      }),
      Ember.Object.create({
        unit: 'unit-3',
        lesson: 'lesson-3',
        collection: 'collection-3',
        users: Ember.A([
          Ember.Object.create({
            id: 'id-5',
            firstName: 'firstname-5',
            lastName: 'lastname-5',
            email: 'user_5@test.com',
            username: 'username-5'
          }),
          Ember.Object.create({
            id: 'id-6',
            firstName: 'firstname-6',
            lastName: 'lastname-6',
            email: 'user_6@test.com',
            username: 'username-6'
          })
        ])
      })
    ]);
  }

});
