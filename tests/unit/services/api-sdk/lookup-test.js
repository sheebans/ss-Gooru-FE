import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:api-sdk/lookup', 'Unit | Service | api-sdk/lookup', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});


test('readCountries', function(assert) {
  const service = this.subject();
  assert.expect(2);

  service.set('lookupAdapter', Ember.Object.create({
    readCountries: function(keyworkd) {
      assert.equal(keyworkd, "any", "readCountries(1) function was called" );
      return Ember.RSVP.resolve({});
    }
  }));

  service.set('lookupSerializer', Ember.Object.create({
    normalizeReadCountries: function(response) {
      assert.deepEqual(response, {}, "normalizeReadCountries() function was called" );
      return [];
    }
  }));

  var done = assert.async();
  service.readCountries("any").then(function() { done(); });
});

test('readStates', function(assert) {
  const service = this.subject();
  assert.expect(3);

  service.set('lookupAdapter', Ember.Object.create({
    readStates: function(countryId, keyword) {
      assert.equal(countryId, 1, "Wrong country id" );
      assert.equal(keyword, "any", "Wrong keyword" );
      return Ember.RSVP.resolve({});
    }
  }));

  service.set('lookupSerializer', Ember.Object.create({
    normalizeReadStates: function(response) {
      assert.deepEqual(response, {}, "normalizeReadStates() function was called" );
      return [];
    }
  }));

  var done = assert.async();
  service.readStates(1, "any").then(function() { done(); });
});
