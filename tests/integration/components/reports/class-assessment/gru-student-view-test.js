import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import QuestionResult from 'gooru-web/models/result/question';

moduleForComponent('reports/class-assessment/gru-student-view', 'Integration | Component | reports/class assessment/gru student view', {
  integration: true
});

test('Layout', function (assert) {

  var assessment = Ember.Object.create({
    resources: [
      Ember.Object.create({
        "id": "56a120483b6e7b090501d3e7",
        "order": 1
      }),
      Ember.Object.create({
        "id": "56a1204886b2e565e1b2c230",
        "order": 3
      }),
      Ember.Object.create({
        "id": "56a12048ddee2022a741356a",
        "order": 2
      })
    ]
  });

  var students = Ember.A([
    Ember.Object.create({"id": "56983a9060a68052c1ed934c"}),
    Ember.Object.create({"id": "56983a90fb01fecc328e2388"}),
    Ember.Object.create({"id": "56983a906596902edadedc7c"})
  ]);

  var reportData = { //all questions not started
    "56983a9060a68052c1ed934c": {
      "56a120483b6e7b090501d3e7": QuestionResult.create(),
      "56a1204886b2e565e1b2c230": QuestionResult.create(),
      "56a12048ddee2022a741356a": QuestionResult.create()
    },
    "56983a90fb01fecc328e2388": {
      "56a120483b6e7b090501d3e7": QuestionResult.create(),
      "56a1204886b2e565e1b2c230": QuestionResult.create(),
      "56a12048ddee2022a741356a": QuestionResult.create()
    },
    "56983a906596902edadedc7c": {
      "56a120483b6e7b090501d3e7": QuestionResult.create(),
      "56a1204886b2e565e1b2c230": QuestionResult.create(),
      "56a12048ddee2022a741356a": QuestionResult.create()
    }
  };

  this.set("assessment", assessment);
  this.set("students", students);
  this.set("reportData", reportData);

  this.render(hbs`{{reports/class-assessment/gru-student-view assessment=assessment students=students reportData=reportData}}`);

  const $component = this.$();
  assert.equal($component.find(".gru-student-performance-box").length, 3, "It should displayed 3 boxes");
});
