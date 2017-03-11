import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('content/rubric/gru-rubric-creation', 'Unit | Component | content/rubric/gru rubric creation', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('addURL', function(assert) {
  let component = this.subject();
  component.send('addURL', 'url');
  assert.equal(component.get('resource.url'), 'url', 'Incorrect URL');
});
