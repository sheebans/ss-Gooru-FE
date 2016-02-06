import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('reports/class-assessment/gru-questions-detail', 'Integration | Component | reports/class assessment/gru questions detail', {
  integration: true
});

test('Layout', function(assert) {
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

  var reportData = { //all questions skipped
    "56983a9060a68052c1ed934c": {
      "56a120483b6e7b090501d3e7": {},
      "56a1204886b2e565e1b2c230": {},
      "56a12048ddee2022a741356a": {}
    },
    "56983a90fb01fecc328e2388": {
      "56a120483b6e7b090501d3e7": {},
      "56a1204886b2e565e1b2c230": {},
      "56a12048ddee2022a741356a": {}
    },
    "56983a906596902edadedc7c": {
      "56a120483b6e7b090501d3e7": {},
      "56a1204886b2e565e1b2c230": {},
      "56a12048ddee2022a741356a": {}
    }
  };

  this.set("assessment", assessment);
  this.set("students", students);
  this.set("reportData", reportData);

  this.render(hbs`{{reports/class-assessment/gru-questions-detail
    assessment=assessment
    students=students
    reportData=reportData}}`);

  const $component = this.$();
  T.exists(assert, $component.find(".navigation"), "Missing navigation");
  T.exists(assert, $component.find(".question-info"), "Missing question information panel");
  T.exists(assert, $component.find(".question-metrics"), "Missing question metrics panel");
});
