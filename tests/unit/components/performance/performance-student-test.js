import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('class/analytics/performance/gru-performance-summary', 'Unit | Component | class/analytics/performance/gru-performance-summary', {
  integration: false
});

test('getRotationValues', function (assert) {
  assert.expect(4);

  var component = this.subject();

  //with no words
  var rotations = component.getRotationValues(50,50);
  assert.equal(rotations.scoreRotation, 90, "Wrong number of items");
  assert.equal(rotations.scoreFixRotation, 180, "Wrong number of items");
  assert.equal(rotations.completionRotation, 90, "Wrong number of items");
  assert.equal(rotations.completionFixRotation, 180, "Wrong number of items");

});
