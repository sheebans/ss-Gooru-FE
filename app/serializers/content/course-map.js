import Ember from 'ember';

// import Lesson from 'gooru-web/models/content/lesson';
// import LessonItem from 'gooru-web/models/content/lessonItem';
// import { DEFAULT_IMAGES } from "gooru-web/config/config";
import ConfigurationMixin from 'gooru-web/mixins/configuration';

/**
 * Serializer to support the Collection CRUD operations for API 3.0
 *
 * @typedef {Object} CollectionSerializer
 */
export default Ember.Object.extend(ConfigurationMixin, {

  /**
   * Normalize a lesson info response
   * @param lessonData - The endpoint response in JSON format
   * @returns {Content/Lesson} lesson model
   */
  normalizeLessonInfo: function (lessonData) {
    return lessonData;
  }
});
