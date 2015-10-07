import Ember from 'ember';
import SessionMixin from '../../../mixins/session';
import { module, test } from 'qunit';

module('Unit | Mixin | session');

// Replace this with your real tests.
test('it works', function(assert) {
  assert.expect(1); //making sure all asserts are called

  var SessionMixinObject = Ember.Object.extend(SessionMixin);

  var sessionService = Ember.Object.create({
    currentUser: { id: 1 },
    isAuthenticated: true
  });

  var subject = SessionMixinObject.create( { session: sessionService });

  //assert.ok(subject.get("me"), "Missing current user");
  //assert.equal(subject.get("me.id"), 1, "Wrong id");
  assert.ok(subject.get("isAuthenticated"), "Wrong isAuthenticated");
});
