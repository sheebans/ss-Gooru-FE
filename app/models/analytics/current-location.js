import Ember from 'ember';

/**
 * Current Location model
 * typedef {Object} CurrectLocation
 */
const CurrentLocation = Ember.Object.extend({

  /**
   * @property {String} classId - The current class ID
   */
  classId: null,

  /**
   * @property {String} courseId - The current course ID
   */
  courseId: null,

  /**
   * @property {String} unitId - The current unit ID
   */
  unitId: null,

  /**
   * @property {String} lessonId - The current lesson ID
   */
  lessonId: null,

  /**
   * @property {String} collectionId - The current collection ID
   */
  collectionId: null,

  /**
   * @property {course} course - The current collection Course
   */
  course: null,

  /**
   * @property {unit} unit - The current collection Unit
   */
  unit: null,

  /**
   * @property {lesson} lesson - The current collection Lesson
   */
  lesson: null,

  /**
   * @property {collection} collection - The current collection
   */
  collection: null,

  /**
   * @property {Number} unitIndex - The current collection Unit Index
   */
  unitIndex: Ember.computed("course", "unit", function(){
    const course = this.get("course");
    const unit = this.get("unit");
    let index = null;

    if(course && unit){
     index = course.getChildUnitIndex(unit);
    }

    return index;
  }),

  /**
   * @property {Number} lessonIndex - The current collection Lesson Index
   */
  lessonIndex: Ember.computed("course", "unit", "lesson", function(){
    const course = this.get("course");
    const unit = this.get("unit");
    const lesson = this.get("lesson");
    let index = null;

    if(course && unit && lesson){
      index = unit.getChildLessonIndex(lesson);
    }

    return index;
  }),

  /**
   * @property {String} collectionType - The current collection Type
   */
  collectionType: null

});

export default CurrentLocation;
