import { moduleForModel, test } from 'ember-qunit';

moduleForModel('session');

test('it exists', function(assert) {
  var session = this.subject({
    gooruUId: 'abc123',
    token: '9b60fef5-6427-41bc-8928-7a34ce42ca98',
    username: 'username',
    firstName: 'FirstName',
    lastName: 'LastName',
    usernameDisplay: 'DisplayName'
  });

  assert.equal(session.get('gooruUId'), 'abc123');
  assert.equal(session.get('token'), '9b60fef5-6427-41bc-8928-7a34ce42ca98');
  assert.equal(session.get('username'), 'username');
  assert.equal(session.get('firstName'), 'FirstName');
  assert.equal(session.get('lastName'), 'LastName');
  assert.equal(session.get('usernameDisplay'), 'DisplayName');
});
