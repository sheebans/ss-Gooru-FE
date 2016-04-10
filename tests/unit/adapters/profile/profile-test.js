import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForAdapter from 'gooru-web/tests/helpers/module-for-adapter';

moduleForAdapter('adapter:profile/profile', 'Unit | Adapter | profile/profile', {
  // needs: []
});

test('createProfile', function(assert) {
  const adapter = this.subject();
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  const data = {
    body: {}
  };
  const routes = function() {
    this.post('/api/nucleus-auth/v1/users', function() {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  };

  this.pretender.map(routes);
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  adapter.createProfile(data)
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});

test('updateMyProfile', function(assert) {
  const adapter = this.subject();
  const profile = Ember.Object.create({
    id: "user-id"
  });
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  const data = {
    body: profile
  };
  const routes = function() {
    this.put('/api/nucleus-auth/v1/users/me', function() {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  };

  this.pretender.map(routes);
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  adapter.updateMyProfile(data)
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});

test('readUserProfile', function(assert) {
  const adapter = this.subject();
  const userId = "user-id";
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  const routes = function() {
    this.get('/api/nucleus/v1/profiles/user-id/demographics', function() {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  };

  this.pretender.map(routes);
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  adapter.readUserProfile(userId)
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});

test('followUserProfile', function(assert) {
  const adapter = this.subject();
  const userId = "user-id";
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  const routes = function() {
    this.post('/api/nucleus/v1/profiles/follow', function(request) {
      let requestBodyJson = JSON.parse(request.requestBody);
      assert.equal('user-id', requestBodyJson['user_id']);
      return [200, {'Content-Type': 'application/json'}, {}];
    }, false);
  };

  this.pretender.map(routes);
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  adapter.followUserProfile(userId)
    .then(function(response) {
      console.log(response);
      assert.deepEqual({}, response, 'Wrong response');
    });
});

test('unfollowUserProfile', function(assert) {
  const adapter = this.subject();
  const userId = "user-id";
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  const routes = function() {
    this.delete('/api/nucleus/v1/profiles/user-id/unfollow', function() {
      return [200, {'Content-Type': 'text/plain'}, ""];
    }, false);
  };

  this.pretender.map(routes);
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  adapter.unfollowUserProfile(userId)
    .then(function(response) {
      assert.equal("", response, 'Wrong response');
    });
});


test('readResources', function(assert) {
  const adapter = this.subject();
  const userId = "user-id";
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  const routes = function() {
    this.get('/api/nucleus/v1/profiles/user-id/resources', function() {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  };

  this.pretender.map(routes);
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  adapter.readResources(userId)
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});

test('readQuestions', function(assert) {
  const adapter = this.subject();
  const userId = "user-id";
  adapter.set('session', Ember.Object.create({
    'token-api3': 'token-api-3'
  }));
  const routes = function() {
    this.get('/api/nucleus/v1/profiles/user-id/questions', function() {
      return [200, {'Content-Type': 'application/json'}, JSON.stringify({})];
    }, false);
  };

  this.pretender.map(routes);
  this.pretender.unhandledRequest = function(verb, path) {
    assert.ok(false, `Wrong request [${verb}] url: ${path}`);
  };

  adapter.readQuestions(userId)
    .then(function(response) {
      assert.deepEqual({}, response, 'Wrong response');
    });
});
