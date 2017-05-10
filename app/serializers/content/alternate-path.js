import Ember from 'ember';
import AlternatePathModel from 'gooru-web/models/content/alternate-path';
import ConfigurationMixin from 'gooru-web/mixins/configuration';

/**
 * Serializer for Alternate Path data
 *
 * @typedef {Object} AlternatePathSerializer
 */
export default Ember.Object.extend(ConfigurationMixin, {

  /**
   * Normalize the Alternate Path data
   * @param payload
   * @returns {AlternatePathModel}
   */
  normalizeAlternatePath: function(payload) {
    const serializer = this;
    return AlternatePathModel.create(Ember.getOwner(serializer).ownerInjection(), {
      pathId: payload.id,
      title: payload.title,
      thumbnail: payload.thumbnail,
      contextCourseId: payload.ctx_course_id,
      contextUnitId: payload.ctx_unit_id,
      contextLessonId: payload.ctx_lesson_id,
      contextCollectionId: payload.ctx_collection_id,
      targetCourseId: payload.target_course_id,
      targetUnitId: payload.target_unit_id,
      targetLessonId: payload.target_lesson_id,
      targetCollectionId: payload.target_collection_id,
      targetResourceId: payload.target_resource_id,
      targetContentType: payload.target_content_type,
      targetContentSubtype: payload.target_content_subtype,
      questionCount: payload.question_count,
      openEndedQuestionCount: payload.oe_question_count,
      resourceCount: payload.resource_count
    });
  }

});
