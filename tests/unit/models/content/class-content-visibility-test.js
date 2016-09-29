import { moduleFor, test } from 'ember-qunit';

moduleFor('model:content/class-content-visibility', 'Unit | Model | content/class content visibility', {
  unit: true
});

test("getAssessmentsVisiblity", function(assert) {
  let model = this.subject({
    course: {
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
        },{
          "id": "6354b8ad-2d32-48e8-9588-2883dbd97152test",
          "lessons": [{
            "id": "176a137d-22c8-4e71-826a-39c2592de889test",
            "assessments": [{
              "id": "59f7b7df-cef2-4f09-8012-1e58cb27b95atest",
              "visible": "on"
            }]
          }]
        }]
    }
  });
  let expectedResult = [{
    "id": "59f7b7df-cef2-4f09-8012-1e58cb27b95a",
    "visible": "on"
  },{
    "id": "59f7b7df-cef2-4f09-8012-1e58cb27b95atest",
    "visible": "on"
  }];
  assert.equal(model.getAssessmentsVisiblity().length,expectedResult.length, "Should return a list of assessments");

});
test("findAssessmentVisibilityById", function(assert) {
  let model = this.subject({
    course: {
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
      },{
        "id": "6354b8ad-2d32-48e8-9588-2883dbd97152test",
        "lessons": [{
          "id": "176a137d-22c8-4e71-826a-39c2592de889test",
          "assessments": [{
            "id": "59f7b7df-cef2-4f09-8012-1e58cb27b95atest",
            "visible": "on"
          }]
        }]
      }]
    }
  });
  let expectedResult = {
    "id": "59f7b7df-cef2-4f09-8012-1e58cb27b95a",
    "visible": "on"
  };
  assert.equal(model.findAssessmentVisibilityById('59f7b7df-cef2-4f09-8012-1e58cb27b95a')[0].id,expectedResult.id, "Wrong Id");
});
