import Ember from 'ember';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
import { parseDate } from 'gooru-web/utils/utils';
import { CONTENT_TYPES } from 'gooru-web/config/config';
import LocationModel from 'gooru-web/models/learner/location';

/**
 * Serializer to support the Learner CRUD operations for API 3.0
 *
 * @typedef {Object} LearnerSerializer
 */
export default Ember.Object.extend(ConfigurationMixin, {

  session: Ember.inject.service('session'),

  /**
   * Normalize the Fetch Locations endpoint's response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Location[]} an array of learner locations
   */
  normalizeLocations: function(payload) {
    var result = [];
    const serializer = this;
    const locations = payload.usageData;
    if (Ember.isArray(locations)) {
      result = locations.map(location => serializer.normalizeLocation(location));
    }
    return result;
  },

  /**
   * Normalize the one Location from the endpoint's response
   *
   * @param payload is part of the response in JSON format
   * @returns {Location}
   */
  normalizeLocation: function(payload) {
    var serializer = this;
    return LocationModel.create(Ember.getOwner(serializer).ownerInjection(), {
      collectionId: payload.collectionId,
      courseId: payload.courseId,
      lessonId: payload.lessonId,
      unitId: payload.unitId,
      type: payload.type || CONTENT_TYPES.COURSE,
      title: payload.type ? payload.collectionTitle : payload.courseTitle,
      lastAccessed: parseDate(payload.lastAccessed, 'YYYY-MM-DD'),
      status: payload.status
    });
  }
});
