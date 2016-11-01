import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:configuration', 'Unit | Service | configuration', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});


test('loadConfiguration', function(assert) {
  const service = this.subject();
  assert.expect(4);

  service.set('configurationAdapter', Ember.Object.create({
    loadConfiguration: function(key, configBaseUrl) {
      assert.equal(key, "localhost", "loadConfiguration function was called" );
      assert.equal(configBaseUrl, null, "no config url was provided, it should ne null" );
      return Ember.RSVP.resolve({
        teams: {
          url: 'any'
        }
      });
    }
  }));

  var done = assert.async();
  service.loadConfiguration().then(function(configuration) {
    assert.equal(configuration.get("endpoint.url"), "http://localhost:7357", "endpoints.url should match config/env/test.js value");
    assert.equal(configuration.get("teams.url"), "any", "teams.url was not overridden");
    done();
  });
});

test('loadConfiguration with config url', function(assert) {
  const service = this.subject();
  assert.expect(4);

  service.set('configurationAdapter', Ember.Object.create({
    loadConfiguration: function(key, configBaseUrl) {
      assert.equal(key, "localhost", "loadConfiguration function was called" );
      assert.equal(configBaseUrl, "any-url", "wrong config url" );
      return Ember.RSVP.resolve({
        teams: {
          url: 'any'
        }
      });
    }
  }));

  var done = assert.async();
  service.loadConfiguration("any-url").then(function(configuration) {
    assert.equal(configuration.get("endpoint.url"), "http://localhost:7357", "endpoints.url should match config/env/test.js value");
    assert.equal(configuration.get("teams.url"), "any", "teams.url was not overridden");
    done();
  });
});
