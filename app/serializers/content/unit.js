import Ember from 'ember';
import { CREATOR_SYSTEM } from 'gooru-web/config/config';

/**
 * Serializer to support the Unit CRUD operations
 *
 * @typedef {Object} UnitSerializer
 */
export default Ember.Object.extend({

  /**
   * Serialize a Content/Unit object into a JSON representation required by the Create Unit endpoint
   *
   * @param unitModel - The unit model to be serialized
   * @returns {Object} JSON Object representation of the unit model
   */
  serializeCreateUnit: function (unitModel) {
    return {
      title: unitModel.get('title'),
      big_ideas: unitModel.get('description'),
      essential_questions: unitModel.get('thumbnailUrl'),
      taxonomy: [],   // TODO: pending
      creator_system: CREATOR_SYSTEM
    };
  }

});
