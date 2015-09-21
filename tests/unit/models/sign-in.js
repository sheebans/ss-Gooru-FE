import { moduleForModel, test } from 'ember-qunit';

moduleForModel('sign-in');

test('it exists', function(assert) {
  var signIn = this.subject({ username: 'username', password: 'password' });

  assert.equal(signIn.get('username'), 'username');
  assert.equal(signIn.get('password'), 'password');
});




