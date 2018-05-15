import Ember from 'ember';
import LessonSerializer from 'gooru-web/serializers/content/lesson';
import CollectionSerializer from 'gooru-web/serializers/content/collection';
import AssessmentSerializer from 'gooru-web/serializers/content/assessment';
import AlternatePathSerializer from 'gooru-web/serializers/content/alternate-path';
import CourseModel from 'gooru-web/models/content/course';
import UnitSerializer from 'gooru-web/serializers/content/unit';
import TaxonomySerializer from 'gooru-web/serializers/taxonomy/taxonomy';
import {
  DEFAULT_IMAGES,
  ASSESSMENT_SUB_TYPES,
  TAXONOMY_LEVELS
} from 'gooru-web/config/config';

/**
 * Serializer to support the Course Map operations
 *
 * @typedef {Object} CourseMapSerializer
 */
export default Ember.Object.extend({
  session: Ember.inject.service('session'),

  /**
   * @property {LessonSerializer} lessonSerializer
   */
  lessonSerializer: null,

  /**
   * @property {AssessmentSerializer} assessmentSerializer
   */
  assessmentSerializer: null,

  /**
   * @property {CollectionSerializer} collectionSerializer
   */
  collectionSerializer: null,

  init: function() {
    this._super(...arguments);
    this.set(
      'lessonSerializer',
      LessonSerializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'assessmentSerializer',
      AssessmentSerializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'collectionSerializer',
      CollectionSerializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'alternatePathSerializer',
      AlternatePathSerializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'unitSerializer',
      UnitSerializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'taxonomySerializer',
      TaxonomySerializer.create(Ember.getOwner(this).ownerInjection())
    );
  },

  /**
   * Normalize a lesson info response
   * @param data - The endpoint response in JSON format
   * @returns {Object} lesson and alternate paths
   */
  normalizeLessonInfo: function(data, isTeacher) {
    var serializer = this;
    let lesson = this.get('lessonSerializer').normalizeLesson(data.course_path);
    let lessonChildren = lesson.get('children');
    if (!isTeacher) {
      let suggestedPaths = serializer.normalizeAlternatePathContent(
        data.alternate_paths
      );
      suggestedPaths.map(suggestedPath => {
        let ctxCollectionIndex = lessonChildren.findIndex(
          child => child.id === suggestedPath.assessmentId
        );
        if (ctxCollectionIndex) {
          //Add suggested content, next to the context collection
          lessonChildren.splice(ctxCollectionIndex + 1, 0, suggestedPath);
        }
      });
    }
    return lesson;
  },

  /**
   * Normalize a Course response
   *
   * @param payload - The endpoint response in JSON format
   * @param {[]} owners owner details
   * @returns {Content/Course} Course Model
   */
  normalizeCourseInfo: function(payload, owners) {
    const serializer = this;
    payload = payload.course_path;
    const basePath = serializer.get('session.cdnUrls.content');
    const appRootPath = this.get('appRootPath'); //configuration appRootPath
    const thumbnailUrl = payload.thumbnail
      ? basePath + payload.thumbnail
      : appRootPath + DEFAULT_IMAGES.COURSE;
    const owner = owners ? owners.findBy('id', payload.owner_id) : null;
    const metadata = payload.metadata || {};

    return CourseModel.create(Ember.getOwner(serializer).ownerInjection(), {
      id: payload.id,
      collaborator: payload.collaborator ? payload.collaborator : [],
      creatorId: payload.creator_id,
      originalCourseId: payload.original_course_id,
      originalCreatorId: payload.original_creator_id,
      children: serializer
        .get('unitSerializer')
        .normalizeUnits(payload.unit_summary),
      description: payload.description,
      isPublished:
        payload.publish_status && payload.publish_status === 'published',
      isVisibleOnProfile:
        typeof payload.visible_on_profile !== 'undefined'
          ? payload.visible_on_profile
          : true,
      owner: owner ? owner : null,
      ownerId: payload.owner_id,
      subject: payload.subject_bucket,
      taxonomy: serializer
        .get('taxonomySerializer')
        .normalizeTaxonomyObject(payload.taxonomy, TAXONOMY_LEVELS.COURSE),
      thumbnailUrl: thumbnailUrl,
      title: payload.title,
      unitCount: payload.unit_count
        ? payload.unit_count
        : payload.unit_summary ? payload.unit_summary.length : 0,
      metadata: metadata,
      audience:
        metadata.audience && metadata.audience.length > 0
          ? metadata.audience
          : [],
      useCase: payload.use_case,
      version: payload.version
      // TODO More properties will be added here...
    });
  },

  /**
   * Get normalizeClassPerformanceByStudentId
   * @returns {Promise.<[]>}
   */
  normalizeClassPerformanceByStudentId: function(response) {
    response = Ember.A(response.content);
    return response;
  },

  /**
   * Normalize the alternate paths for a lesson
   * @param data - The alternate paths in JSON format
   * @returns {Collection[]} alternate paths list
   */
  normalizeAlternatePaths: function(data) {
    return Ember.isArray(data)
      ? data.map(path => {
        if (path.target_content_type === 'resource') {
          return this.get('alternatePathSerializer').normalizeAlternatePath(
            path
          );
        } else {
          let normalizedPath =
              path.target_content_type === 'collection'
                ? this.get('collectionSerializer').normalizeReadCollection(path)
                : this.get('assessmentSerializer').normalizeReadAssessment(
                  path
                );
          if (!normalizedPath.get('collectionSubType')) {
            normalizedPath.set(
              'collectionSubType',
              ASSESSMENT_SUB_TYPES.BACKFILL
            );
          }
          return normalizedPath;
        }
      })
      : [];
  },

  /**
   * @function normalizeAlternatePathContent
   * @param alternatePaths alternate_path object
   * Method to normalized suggested alternate path from the payload
   */
  normalizeAlternatePathContent(alternatePaths) {
    let serializer = this;
    let alternatePathContents = Ember.A([]);
    if (alternatePaths) {
      let systemSuggestions = alternatePaths.system_suggestions || null;
      let teacherSuggestions = alternatePaths.teacher_suggestions || null;
      let source = '';
      if (systemSuggestions) {
        source = 'system_suggestions';
        systemSuggestions.map(suggestedContent => {
          alternatePathContents.push(
            serializer.serializeCategorizedSuggestedContent(
              suggestedContent,
              source
            )
          );
        });
      }
      if (teacherSuggestions) {
        source = 'teacher_suggestions';
        teacherSuggestions.map(suggestedContent => {
          alternatePathContents.push(
            serializer.serializeCategorizedSuggestedContent(
              suggestedContent,
              source
            )
          );
        });
      }
    }
    return alternatePathContents;
  },

  /**
   * @function serializeCategorizedSuggestedContent
   * Method to serialize suggested content based on the content type
   */
  serializeCategorizedSuggestedContent(content, source) {
    let serializedData = [];
    const serializer = this;
    const alternatePathSerializer = serializer.get('alternatePathSerializer');
    if (content.suggested_content_type === 'resource') {
      serializedData = alternatePathSerializer.normalizeSuggestedResource(
        content,
        source
      );
    } else {
      serializedData = alternatePathSerializer.normalizeSuggestedCollection(
        content,
        source
      );
    }
    return serializedData;
  }
});
