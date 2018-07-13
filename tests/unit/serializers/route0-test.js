import { moduleForModel, test } from 'ember-qunit';

moduleForModel('route0', 'Unit | Serializer | route0', {
  // Specify the other units that are required for this test.
  needs: ['serializer:route0']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
