import { moduleFor,test} from 'ember-qunit';

moduleFor('controller:content/courses/edit', 'Unit | Controller | controllers/content/courses/edit');

test('Approve Request', function (assert) {
  assert.expect(4);

  const ctrl = this.subject();

  assert.equal(ctrl.get('isRequestApproved'), false, 'isRequestApproved should be false');
  assert.equal(ctrl.get('wasRequestSent'), false, 'wasRequestSent should be false');


  ctrl.set('wasRequestSent', true);
  ctrl.set('isRequestApproved', true);

  assert.equal(ctrl.get('wasRequestSent'), true, 'wasRequestSent updated');
  assert.equal(ctrl.get('isRequestApproved'), true, 'isRequestApproved updated');
});
