import { moduleFor, test } from 'ember-qunit';

moduleFor(
  'controller:student-independent-learning/student-bookmarks',
  'Unit | Controller | student independent learning/student bookmarks', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  }
);

test('Show more togglePanel', function(assert) {
  assert.expect(1);
  let controller = this.subject();
  assert.equal(
    controller.get('showMoreToggle'),
    false,
    'Show More should be Disabled by default'
  );
});
