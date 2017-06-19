import Ember from 'ember';
import { sortFeaturedCourses,getSubjects } from 'gooru-web/utils/sort-featured-courses';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['library', 'gru-browse-library'],

  /**
   * @property {Courses[]} courses to show
   */
  courses: null,

  /**
   * @property {Object[]} group courses by subject
   */
  formattedContent: Ember.computed('courses', function(){
    return getSubjects(this.get('courses')).map(
      (subjectBucket, index) => Ember.Object.create({
        'category': subjectBucket.subject.slice(subjectBucket.subject.indexOf('.')+1,subjectBucket.subject.lastIndexOf('.')),
        'subject': subjectBucket.taxonomySubject,
        'courses': sortFeaturedCourses(this.get('courses'))[index]
      })
    );
  })
});
