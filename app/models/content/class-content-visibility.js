import Ember from 'ember';
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
   * Return a list of visible or non visible assessments
   *
   */
  getAssessmentsVisiblity: function(){
    let units = this.get('course.units');
    let assessments = Ember.A([]);
    units.map(function(unit){
      unit.get('lessons').map(function(lesson){
        assessments.addObjects(lesson.get('assessments'));
      });
    });
    return assessments;
  },
  



});

export default ClassContentVisibility;
