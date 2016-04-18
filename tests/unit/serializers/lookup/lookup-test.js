import { moduleFor, test } from 'ember-qunit';

moduleFor('serializer:lookup/lookup', 'Unit | Serializer | lookup/lookup');

test('normalizeReadCountries', function (assert) {
  const serializer = this.subject();
  const countryData = {
    countries: [
      {
        "id": "1",
        "name": "Afghanistan",
        "code": "AF"
      },
      {
        "id": "2",
        "name": "Albania",
        "code": "AL"
      }
    ]
  };

  const countries = serializer.normalizeReadCountries(countryData);
  assert.equal(countries.length, 2, 'Wrong countries length');
  assert.equal(countries[0].get("id"), "1", 'Wrong id');
  assert.equal(countries[0].get("name"), "Afghanistan", 'Wrong name');
  assert.equal(countries[0].get("code"), "AF", 'Wrong code');
})
;

test('normalizeReadStates', function (assert) {
  const serializer = this.subject();
  const statesData = {
    states: [
      {
        "id": "1",
        "name": "A",
        "code": "AA"
      },
      {
        "id": "2",
        "name": "B",
        "code": "BB"
      }
    ]
  };

  const states = serializer.normalizeReadStates(statesData);
  assert.equal(states.length, 2, 'Wrong states length');
  assert.equal(states[0].get("id"), "1", 'Wrong id');
  assert.equal(states[0].get("name"), "A", 'Wrong name');
  assert.equal(states[0].get("code"), "AA", 'Wrong code');
});

test('normalizeReadDistricts', function (assert) {
  const serializer = this.subject();
  const districtsData = {
    'school-districts': [
      {
        "id": "1",
        "name": "A",
        "code": "AA"
      },
      {
        "id": "2",
        "name": "B",
        "code": "BB"
      }
    ]
  };

  const districts = serializer.normalizeReadDistricts(districtsData);
  assert.equal(districts.length, 2, 'Wrong districts length');
  assert.equal(districts[0].get("id"), "1", 'Wrong id');
  assert.equal(districts[0].get("name"), "A", 'Wrong name');
  assert.equal(districts[0].get("code"), "AA", 'Wrong code');
});
