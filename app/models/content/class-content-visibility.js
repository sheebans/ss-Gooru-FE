import Ember from 'ember';
import Class from 'gooru-web/models/content/class';
/**
 * ClassContentVisibility model
 * typedef {Object} ClassContentVisibility
 */
const ClassContentVisibility = Ember.Object.extend({

  /**
   * @property {string}
   */
  contentVisibility: null,

  /**
   * Sample:
   {
    "content_visibility": "visible_collections",
     "course": {
        "id": "2a121dd9-2acd-4db7-8d15-a8e694a95c5a",
        "units": [{
            "id": "6354b8ad-2d32-48e8-9588-2883dbd97152",
            "lessons": [{
                "id": "176a137d-22c8-4e71-826a-39c2592de889",
                "assessments": [{
                    "id": "59f7b7df-cef2-4f09-8012-1e58cb27b95a",
                    "visible": "on"
                }],
                "collections": [{
                    "id": "781b8add-31a4-4186-912a-31f735180805",
                    "visible": "off"
                    }, {
                    "id": "86e5e705-66b0-470a-9ff0-f00472adeb0b",
                    "visible": "on"
                }]
          }]
     }]
  }
}

   * @property { id: number, units: [] }
   */
  course: null,

  /**
   * Indicates if all content within this class is visible
   * @property {boolean}
   */
  isAllContentVisible: Ember.computed("contentVisibility", function(){
    return this.get("contentVisibility") === Class.VISIBLE_ALL;
  }),

  /**
   * Indicates if all collections within this class is visible
   * @property {boolean}
   */
  areCollectionsVisible: Ember.computed("contentVisibility", function() {
    return this.get("contentVisibility") === Class.VISIBLE_COLLECTIONS || this.get("isAllContentVisible");
  }),

  /**
   * Return a list of visible or non visible assessments
   */
  getAssessmentsVisibility: function(){
    let units = this.get('course.units') || Ember.A([]);
    let assessments = Ember.A([]);
    let lessons = Ember.A([]);
    units.forEach(function(unit){
      lessons.addObjects(unit.lessons);
      lessons.forEach(function(lesson){
        if (lesson.assessments){
          assessments.addObjects(lesson.assessments);
        }
      });
    });
    return assessments;
  },
  /**
   * Find assessment visibility by assessment id
   */
  findAssessmentVisibilityById: function(assessmentId){
    let assessments = this.getAssessmentsVisibility();
    return assessments.findBy("id", assessmentId);
  },
  /**
   * Return true if the content is visible
   */
  isVisible:function(contentId){
    let isAllVisible = this.get("isAllContentVisible");
    let assessment = this.findAssessmentVisibilityById(contentId);
    if (!assessment) {
      Ember.Logger.warn(`No content visibility found for id: ${contentId}`);
    }
    let enabled = assessment && assessment.visible === "on";
    let disabled = !assessment || assessment.visible === "off";

    return (isAllVisible && !disabled) ||
      (isAllVisible && !assessment) ||
      (!isAllVisible && enabled)||
      (!isAllVisible && !disabled);

  }
});

export default ClassContentVisibility;
