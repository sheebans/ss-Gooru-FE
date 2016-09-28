import Ember from 'ember';
/**
 * ClassContentVisibility model
 * typedef {Object} ClassContentVisibility
 */
const ClassContentVisibility = Ember.Object.extend({

  /**
   * @property {string}
   */
  contentVisibility: 0,

  /**
   * Sample:
      {
        "content_visibility": "visible_collections",
        "course": {
          "id": "2a121dd9-2acd-4db7-8d15-a8e694a95c5a",
          "units": [
            {
              "id": "6354b8ad-2d32-48e8-9588-2883dbd97152",
              "lessons": [
                {
                  "id": "176a137d-22c8-4e71-826a-39c2592de889",
                  "assessments": [
                    "99fbdd37-dafc-4e70-9bd6-a1cd6e2aa233",
                    "5263b490-3052-4561-9d06-d0de0b45cc45",
                    "54c7ee3c-00f3-4ac3-b5f1-5eff1d025af4",
                    "173dca68-3d45-4c6c-baed-0bfd3d40070c"
                  ]
                }
              ]
            }
          ]
        }
      }
   * @property { id: number, units: [] }
   */
  course: null

});

export default ClassContentVisibility;
