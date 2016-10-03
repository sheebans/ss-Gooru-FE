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
  assert.equal(model.getAssessmentsVisibility().length, expectedResult.length, "Should return a list of assessments");

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
  assert.equal(model.findAssessmentVisibilityById('59f7b7df-cef2-4f09-8012-1e58cb27b95a').id, expectedResult.id, "Wrong Id");
});

test("isVisible when content visibility is not all visible and the assessment is on", function(assert) {
  let model = this.subject({
    contentVisibility: "visible_collections",
    course: {
      "id": "2a121dd9-2acd-4db7-8d15-a8e694a95c5a",
      "units": [{
        "id": "6354b8ad-2d32-48e8-9588-2883dbd97152",
        "lessons": [{
          "id": "176a137d-22c8-4e71-826a-39c2592de889",
          "assessments": [{
            "id": "59f7b7df-cef2-4f09-8012-1e58cb27b95a",
            "visible": "off"
          }]
        }]
      },{
        "id": "6354b8ad-2d32-48e8-9588-2883dbd97152test",
        "lessons": [{
          "id": "176a137d-22c8-4e71-826a-39c2592de889test",
          "assessments": [{
            "id": "59f7b7df-cef2-4f09-8012-1e58cb27bbbbb",
            "visible": "on"
          }]
        }]
      }]
    }
  });
  assert.equal(model.isVisible('59f7b7df-cef2-4f09-8012-1e58cb27bbbbb'),true, "The assessment should  be visible");
});
test("isVisible when content visibility is not all visible and the assessment is off", function(assert) {
  let model = this.subject({
    contentVisibility: "visible_collections",
    course: {
      "id": "2a121dd9-2acd-4db7-8d15-a8e694a95c5a",
      "units": [{
        "id": "6354b8ad-2d32-48e8-9588-2883dbd97152",
        "lessons": [{
          "id": "176a137d-22c8-4e71-826a-39c2592de889",
          "assessments": [{
            "id": "59f7b7df-cef2-4f09-8012-1e58cb27b95a",
            "visible": "off"
          }]
        }]
      },{
        "id": "6354b8ad-2d32-48e8-9588-2883dbd97152test",
        "lessons": [{
          "id": "176a137d-22c8-4e71-826a-39c2592de889test",
          "assessments": [{
            "id": "59f7b7df-cef2-4f09-8012-1e58cb27bbbbb",
            "visible": "on"
          }]
        }]
      }]
    }
  });
  assert.equal(model.isVisible('59f7b7df-cef2-4f09-8012-1e58cb27b95a'),false, "The assessment should not be visible");
});
test("isVisible when content visibility is not all visible and the assessment is not on the course visibility", function(assert) {
  let model = this.subject({
    contentVisibility: "visible_collections"
  });
  assert.equal(model.isVisible('59f7b7df-cef2-4f09-8012-1e58cb27b95a'), false, "The assessment should not be visible");
});
test("isVisible when content visibility is all visible and the assessment is on", function(assert) {
  let model = this.subject({
    contentVisibility: "visible_all",
    course: {
      "id": "2a121dd9-2acd-4db7-8d15-a8e694a95c5a",
      "units": [{
        "id": "6354b8ad-2d32-48e8-9588-2883dbd97152",
        "lessons": [{
          "id": "176a137d-22c8-4e71-826a-39c2592de889",
          "assessments": [{
            "id": "59f7b7df-cef2-4f09-8012-1e58cb27b95a",
            "visible": "off"
          }]
        }]
      },{
        "id": "6354b8ad-2d32-48e8-9588-2883dbd97152test",
        "lessons": [{
          "id": "176a137d-22c8-4e71-826a-39c2592de889test",
          "assessments": [{
            "id": "59f7b7df-cef2-4f09-8012-1e58cb27bbbbb",
            "visible": "on"
          }]
        }]
      }]
    }
  });
  assert.equal(model.isVisible('59f7b7df-cef2-4f09-8012-1e58cb27bbbbb'),true, "The assessment should  be visible");
});
test("isVisible when content visibility is all visible and the assessment is off", function(assert) {
  let model = this.subject({
    contentVisibility: "visible_all",
    course: {
      "id": "2a121dd9-2acd-4db7-8d15-a8e694a95c5a",
      "units": [{
        "id": "6354b8ad-2d32-48e8-9588-2883dbd97152",
        "lessons": [{
          "id": "176a137d-22c8-4e71-826a-39c2592de889",
          "assessments": [{
            "id": "59f7b7df-cef2-4f09-8012-1e58cb27b95a",
            "visible": "off"
          }]
        }]
      },{
        "id": "6354b8ad-2d32-48e8-9588-2883dbd97152test",
        "lessons": [{
          "id": "176a137d-22c8-4e71-826a-39c2592de889test",
          "assessments": [{
            "id": "59f7b7df-cef2-4f09-8012-1e58cb27bbbbb",
            "visible": "on"
          }]
        }]
      }]
    }
  });
  assert.equal(model.isVisible('59f7b7df-cef2-4f09-8012-1e58cb27b95a'),false, "The assessment should not be visible");
});

test("isVisible when content visibility is all visible and the assessment is not on the course visibility", function(assert) {
  let model = this.subject({
    contentVisibility: "visible_all"
  });
  assert.equal(model.isVisible('59f7b7df-cef2-4f09-8012-1e58cb27b95a'), true, "The assessment should be visible");
});
