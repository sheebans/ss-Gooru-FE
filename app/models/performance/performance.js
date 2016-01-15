import Ember from 'ember';
import DS from 'ember-data';
import { formatTime } from '../../utils/utils';

/**
 * Model that contains the performance information
 * @typedef {Object} Performance
 */
export default DS.Model.extend({

  /**
   * @property {String} Title for the performance
   */
  title: DS.attr('string'),
  /**
   * @property {String} Student performance type (e.g. unit, lesson, collection, assessment)
   */
  type: DS.attr('string'),
  /**
   * @property {Boolean} Value that tells whether the performance data belongs to an assessment
   */
  isAssessment : Ember.computed.equal('type', 'assessment'),
  /**
   * @property {Boolean} Value that tells whether the performance data belongs to a collection
   */
  isCollection : Ember.computed.equal('type', 'collection'),

  isCollectionOrAssessment: Ember.computed.or('collection','assessment'),
  /**
   * @property {Boolean} Value that tells whether the performance data belongs to a lesson
   */
  isLesson : Ember.computed.equal('type', 'lesson'),
  /**
   * @property {Number} The performance score (in percentages e.g. 80%, 100%, 95%, etc)
   */
  score: DS.attr('number'),
  /**
   * @property {Number} The completion done in the unit, class or collection/assessment, e.g. It is the top number of the fraction 5/10
   */
  completionDone:  DS.attr('number'),
  /**
   * @property {Number} The total of completionin the unit, class or collection/assessment, e.g. It is the bottom number of the fraction 5/10
   */
  completionTotal: DS.attr('number'),
  /**
   * @property {Number} The registered time spent in the unit, class or collection/assessment
   */
  timeSpent: DS.attr('number'),
  /**
   *  @property {Number} The average rating score set for set for the unit, class or collection/assessment
   */
  ratingScore: DS.attr('number'),
  /**
   *  @property {Number} The number of attempts registered for the unit, class or collection/assessment
   */
  attempts: DS.attr('number'),

  /**
   *  @property {boolean} Whether the performance is completed or not.
   */
  isCompleted: Ember.computed('completionDone', 'completionTotal', function() {
    return (this.get('completionDone') === this.get('completionTotal'));
  }),

  completionValue: Ember.computed('completionDone', 'completionTotal', function() {
    return (this.get('completionDone') * 100 / this.get('completionTotal'));
  }),

  hasStarted: Ember.computed('timeSpent', function () {
    return (this.get('timeSpent')>0);
  }),

  displayableTimeSpent: Ember.computed('timeSpent', function() {
    return formatTime(this.get('timeSpent'));
  }),

  /**
   * TODO: This is a temporal computed property. This will be removed soon.
   *  @property {String} Removes the dash from the id property in case it has one.
   */
  realId: Ember.computed('id', function() {
    var id = this.get('id');
    if (id.indexOf('@') > 0) {
      return id.split('@')[1];
    } else {
      return id;
    }
  })

});
