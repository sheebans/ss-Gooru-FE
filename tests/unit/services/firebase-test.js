import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:firebase', 'Unit | Service | firebase', {
  // Specify the other units that are required for this test.
  //needs: ['service:firebaseApp: Ember.inject.service()']
  needs: ['service:']
});

test('firebase sendMessage', function(assert) {
  const service = this.subject();

  let currentUser = Ember.Object.create();
  let message = 'test';
  let channels = [];

  assert.expect(1);
  //submit message should not allow an empty message
  assert.notOk(service.submitMessage(currentUser,channels,""),'empty message should return without any action taken');
  //assert.notOk(service.submitMessage(currentUser,channels,message));
});

test('firebase sendFile', function(assert) {
  const service = this.subject();
  let currentUser = Ember.Object.create();
  let message = [];
  let channels = [];

  assert.expect(1);
  //submit file shoudl not allow an empty file or null value
  assert.notOk(service.submitFile(currentUser,channels, null),'empty file should return without any action taken');
});

test('firebase removeMessage', function(assert) {
  const service = this.subject();
  let currentUser = Ember.Object.create();
  let message = [];
  let channels = [];

  assert.expect(1);
  //removal of message requires a valid message
  assert.notOk(service.removeMessage(null,channels),'empty message cannot be removed');
});

test('firebase authentication', function(assert){
	const service = this.subject();
	var hold = this.get('firebaseApp').auth().signInWithEmailAndPassword(email, password);
	assert.expect(1);
	assert.ok(hold,'hold has a value');
});