import Ember from 'ember';

/**
 * Study Player Controller
 *
 * @module
 * @augments ember/PlayerController
 */
export default Ember.Controller.extend({
  queryParams: [
    'collectionUrl',
    'unitId',
    'lessonId',
    'collectionId',
    'pathId',
    'source',
    'collectionType'
  ],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Shows the breadcrumbs info of the collection
   * @property {Array[]}
   */
  breadcrumbs: Ember.computed('collection', 'lesson', 'unit', function() {
    let unit = this.get('unit');
    let lesson = this.get('lesson');
    let collection = this.get('collection');
    let lessonChildren = lesson.children;
    let titles = Ember.A([]);

    let isChild = lessonChildren.findBy('id', collection.id);

    if (unit) {
      titles.push(
        Ember.Object.create({
          shortTitle: `U${unit.get('sequence')}`,
          actualTitle: unit.get('title')
        })
      );
    }
    if (lesson) {
      titles.push(
        Ember.Object.create({
          shortTitle: `L${lesson.get('sequence')}`,
          actualTitle: lesson.get('title')
        })
      );
    }
    if (collection && isChild) {
      if (collection.isCollection) {
        let collections = lessonChildren.filter(
          collection => collection.format === 'collection'
        );
        collections.forEach((child, index) => {
          if (child.id === collection.id) {
            let collectionSequence = index + 1;
            titles.push(
              Ember.Object.create({
                shortTitle: `C${collectionSequence}`,
                actualTitle: collection.get('title')
              })
            );
          }
        });
      } else {
        let assessments = lessonChildren.filter(
          assessment => assessment.format === 'assessment'
        );
        assessments.forEach((child, index) => {
          if (child.id === collection.id) {
            let assessmentSequence = index + 1;
            titles.push(
              Ember.Object.create({
                shortTitle: `A${assessmentSequence}`,
                actualTitle: collection.get('title')
              })
            );
          }
        });
      }
    } else {
      titles.push(
        Ember.Object.create({
          actualTitle: collection.get('title')
        })
      );
    }
    return titles;
  }),

  /**
   * @property {boolean}
   */
  isDone: false,

  /**
   * Show the next button and send events
   * @property {Boolean} sendEvents
   */
  sendEvents: Ember.computed.not('collectionUrl'),

  /**
   * Extracted the course version from course object
   * @property {String}
   */
  courseVersion: Ember.computed.alias('course.version')
});
