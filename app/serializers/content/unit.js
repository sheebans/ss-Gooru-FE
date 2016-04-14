import Ember from 'ember';
import Lesson from 'gooru-web/models/content/lesson';
import Unit from 'gooru-web/models/content/unit';
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
      big_ideas: unitModel.get('bigIdeas'),
      essential_questions: unitModel.get('essentialQuestions'),
      taxonomy: [],   // TODO: pending
      creator_system: CREATOR_SYSTEM
    };
  },

  /**
   * Normalize a unit response
   * @param unitData - The endpoint response in JSON format
   * @returns {Content/Unit} unit model
   */
  normalizeUnit: function (unitData) {
    var serializer = this;

    return Unit.create(Ember.getOwner(this).ownerInjection(), {
      children: function () {
        var lessons = [];
        if (unitData.lesson_summary) {
          lessons = unitData.lesson_summary.map(function (lessonData) {
            return Lesson.create(Ember.getOwner(serializer).ownerInjection(), {
              assessmentCount: lessonData.assessment_count ? lessonData.assessment_count : 0,
              collectionCount: lessonData.collection_count ? lessonData.collection_count : 0,
              id: lessonData.lesson_id,
              sequence: lessonData.sequence_id,
              title: lessonData.title
            });
          });
        }
        return lessons;
      }(),
      bigIdeas: unitData.big_ideas,
      essentialQuestions: unitData.essential_questions,
      id: unitData.unit_id,
      lessonCount: unitData.lesson_summary ? unitData.lesson_summary.length : 0,
      sequence: unitData.sequence_id,
      title: unitData.title,
      taxonomy: unitData.taxonomy.slice(0)
    });
  }

});
