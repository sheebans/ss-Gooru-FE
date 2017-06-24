import Ember from 'ember';
import { formatDate } from 'gooru-web/utils/utils';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {Service} session service
   */
  session: Ember.inject.service('session'),
  /**
   * @requires service:api-sdk/class-activity
   */
  classActivityService: Ember.inject.service('api-sdk/class-activity'),

  // -------------------------------------------------------------------------
  // Attributes

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Launch an assessment on-air
     *
     * @function actions:goLive
     */
    goLive: function(collectionId) {
      const currentClass = this.modelFor('teacher.class').class;
      const classId = currentClass.get('id');
      this.transitionTo('reports.collection', classId, collectionId);
    }
  },

  // -------------------------------------------------------------------------
  // Methods


  model: function() {
    const route = this;
    const currentClass = route.modelFor('teacher.class').class;
    const today = new Date();
    const yesterday = (d => new Date(d.setDate(d.getDate()-1)))(new Date);

    return Ember.RSVP.hash({
      todayActivities: route.get('classActivityService').findClassActivities(currentClass.get('id')),
      yesterdayActivities: route.get('classActivityService').findClassActivities(currentClass.get('id'), undefined, yesterday, yesterday)
    }).then(function(hash) {
      return [
        {
          classActivities: hash.todayActivities,
          date: formatDate(today, 'MMMM Do, YYYY')
        },
        {
          classActivities: hash.yesterdayActivities,
          date: formatDate(yesterday, 'MMMM Do, YYYY')
        }
      ];
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.get('classController').selectMenuItem('class-activities');
    const date = new Date();
    controller.set('month', date.getMonth());
    controller.set('year', date.getFullYear());
    controller.set('classActivities', model);
  }
});
