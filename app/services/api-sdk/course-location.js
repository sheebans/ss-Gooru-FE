import Ember from 'ember';
import StoreMixin from '../../mixins/store';

export default Ember.Service.extend(StoreMixin, {

  /**
   * Returns the current user course location.
   * @param user the user id
   * @returns {Location}
   */
  findOneByUser: function(user) {
    return Ember.Object.create({
      unit: 'unit-1',
      lesson: 'lesson-1',
      collection: 'collection-1',
      locationUsers: Ember.A([Ember.Object.create({
        isActive: true,
        user: Ember.Object.create({
          id: user,
          firstName: 'firstname-1',
          lastName: 'lastname-1',
          email: 'user_1@test.com',
          username: 'username-1'
        })
      })])
    });
  },

  /**
   * Returns all the locations for a specific course.
   * @param course the course id
   * @returns {Location[]}
   */
  findByCourse: function(course) {
    Ember.Logger.debug(course);
    return Ember.A([
      Ember.Object.create({
        unit: 'unit-1',
        locationUsers: Ember.A([
          Ember.Object.create({
            isActive: true,
            user: Ember.Object.create({
              id: 'id-1',
              firstName: 'firstname-1',
              lastName: 'lastname-1',
              email: 'user_1@test.com',
              username: 'username-1'
            })
          }),
          Ember.Object.create({
            isActive: false,
            user: Ember.Object.create({
              id: 'id-2',
              firstName: 'firstname-2',
              lastName: 'lastname-2',
              email: 'user_2@test.com',
              username: 'username-2'
            })
          })
        ])
      }),
      Ember.Object.create({
        unit: 'unit-2',
        locationUsers: Ember.A([
          Ember.Object.create({
            isActive: false,
            user: Ember.Object.create({
              id: 'id-3',
              firstName: 'firstname-3',
              lastName: 'lastname-3',
              email: 'user_3@test.com',
              username: 'username-3'
            })
          }),
          Ember.Object.create({
            isActive: false,
            user: Ember.Object.create({
              id: 'id-4',
              firstName: 'firstname-4',
              lastName: 'lastname-4',
              email: 'user_4@test.com',
              username: 'username-4'
            })
          })
        ])
      }),
      Ember.Object.create({
        unit: 'unit-3',
        locationUsers: Ember.A([
          Ember.Object.create({
            isActive: true,
            user: Ember.Object.create({
              id: 'id-5',
              firstName: 'firstname-5',
              lastName: 'lastname-5',
              email: 'user_5@test.com',
              username: 'username-5'
            })
          }),
          Ember.Object.create({
            isActive: true,
            user: Ember.Object.create({
              id: 'id-6',
              firstName: 'firstname-6',
              lastName: 'lastname-6',
              email: 'user_6@test.com',
              username: 'username-6'
            })
          })
        ])
      })
    ]);
  },

  /**
   * Returns all the locations for a specific course and unit.
   * @param course the course id
   * @param unit the unit id
   * @returns {Location[]}
   */
  findByCourseAndUnit: function(course, unit) {
    Ember.Logger.debug(course);
    return Ember.A([
      Ember.Object.create({
        unit: unit,
        lesson: 'lesson-1',
        locationUsers: Ember.A([
          Ember.Object.create({
            isActive: true,
            user: Ember.Object.create({
              id: 'id-1',
              firstName: 'firstname-1',
              lastName: 'lastname-1',
              email: 'user_1@test.com',
              username: 'username-1'
            })
          }),
          Ember.Object.create({
            isActive: false,
            user: Ember.Object.create({
              id: 'id-2',
              firstName: 'firstname-2',
              lastName: 'lastname-2',
              email: 'user_2@test.com',
              username: 'username-2'
            })
          })
        ])
      }),
      Ember.Object.create({
        unit: unit,
        lesson: 'lesson-2',
        locationUsers: Ember.A([
          Ember.Object.create({
            isActive: false,
            user: Ember.Object.create({
              id: 'id-3',
              firstName: 'firstname-3',
              lastName: 'lastname-3',
              email: 'user_3@test.com',
              username: 'username-3'
            })
          }),
          Ember.Object.create({
            isActive: false,
            user: Ember.Object.create({
              id: 'id-4',
              firstName: 'firstname-4',
              lastName: 'lastname-4',
              email: 'user_4@test.com',
              username: 'username-4'
            })
          })
        ])
      }),
      Ember.Object.create({
        unit: unit,
        lesson: 'lesson-3',
        locationUsers: Ember.A([
          Ember.Object.create({
            isActive: true,
            user: Ember.Object.create({
              id: 'id-5',
              firstName: 'firstname-5',
              lastName: 'lastname-5',
              email: 'user_5@test.com',
              username: 'username-5'
            })
          }),
          Ember.Object.create({
            isActive: true,
            user: Ember.Object.create({
              id: 'id-6',
              firstName: 'firstname-6',
              lastName: 'lastname-6',
              email: 'user_6@test.com',
              username: 'username-6'
            })
          })
        ])
      })
    ]);
  },

  /**
   * Returns all the locations for a specific course, unit and lesson.
   * @param course the course id
   * @param unit the unit id
   * @param lesson the lesson id
   * @returns {UserLocation[]}
   */
  findByCourseAndUnitAndLesson: function(course, unit, lesson) {
    Ember.Logger.debug(course);
    return Ember.A([
      Ember.Object.create({
        unit: unit,
        lesson: lesson,
        collection: 'collection-1',
        locationUsers: Ember.A([
          Ember.Object.create({
            isActive: true,
            user: Ember.Object.create({
              id: 'id-1',
              firstName: 'firstname-1',
              lastName: 'lastname-1',
              email: 'user_1@test.com',
              username: 'username-1'
            })
          }),
          Ember.Object.create({
            isActive: false,
            user: Ember.Object.create({
              id: 'id-2',
              firstName: 'firstname-2',
              lastName: 'lastname-2',
              email: 'user_2@test.com',
              username: 'username-2'
            })
          })
        ])
      }),
      Ember.Object.create({
        unit: unit,
        lesson: lesson,
        collection: 'collection-2',
        locationUsers: Ember.A([
          Ember.Object.create({
            isActive: false,
            user: Ember.Object.create({
              id: 'id-3',
              firstName: 'firstname-3',
              lastName: 'lastname-3',
              email: 'user_3@test.com',
              username: 'username-3'
            })
          }),
          Ember.Object.create({
            isActive: false,
            user: Ember.Object.create({
              id: 'id-4',
              firstName: 'firstname-4',
              lastName: 'lastname-4',
              email: 'user_4@test.com',
              username: 'username-4'
            })
          })
        ])
      }),
      Ember.Object.create({
        unit: unit,
        lesson: lesson,
        collection: 'collection-3',
        locationUsers: Ember.A([
          Ember.Object.create({
            isActive: true,
            user: Ember.Object.create({
              id: 'id-5',
              firstName: 'firstname-5',
              lastName: 'lastname-5',
              email: 'user_5@test.com',
              username: 'username-5'
            })
          }),
          Ember.Object.create({
            isActive: true,
            user: Ember.Object.create({
              id: 'id-6',
              firstName: 'firstname-6',
              lastName: 'lastname-6',
              email: 'user_6@test.com',
              username: 'username-6'
            })
          })
        ])
      })
    ]);
  }

});
