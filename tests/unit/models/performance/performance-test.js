import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('performance/performance', 'Unit | Model | performance/performance', {
  // Specify the other units that are required for this test.
  needs: []
});



test('isNotCompleted test', function(assert) {
  assert.expect(1);

  let model = this.subject();

  Ember.run(function(){
    model.set('completionDone', 5);
    model.set('completionTotal', 10);
  });

  assert.equal(model.get('isNotCompleted'), true);

});

test('isNotCompleted test on Completed unit', function(assert) {
  assert.expect(1);

  let model = this.subject();

  Ember.run(function(){
    model.set('completionDone', 10);
    model.set('completionTotal', 10);
  });

  assert.equal(model.get('isNotCompleted'), false);

});

test('completionValue test', function(assert) {
  assert.expect(1);

  let model = this.subject();

  Ember.run(function(){
    model.set('completionDone', 5);
    model.set('completionTotal', 10);
  });
  assert.equal(model.get('completionValue'), 50);

});

test('hasStarted test', function(assert) {
  assert.expect(1);

  let model = this.subject();

  Ember.run(function(){
    model.set('timeSpent', 12);
  });
  assert.equal(model.get('hasStarted'), true);

});

test('hasStarted test on false', function(assert) {
  assert.expect(1);

  let model = this.subject();

  Ember.run(function(){
    model.set('timeSpent', 0);
  });
  assert.equal(model.get('hasStarted'), false);

});
