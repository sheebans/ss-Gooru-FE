import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';
import TaxonomyRoot from 'gooru-web/models/taxonomy/taxonomy-root';

moduleForService('service:taxonomy', 'Unit | Service | taxonomy', {
  // needs: ['serializer:foo']
});

test('getSubjects', function(assert) {
  const service = this.subject();

  assert.expect(3); // Just the first time the taxonomy data should be loaded for every category.

  service.set('apiTaxonomyService', Ember.Object.create({
    fetchSubjects: function() {
      assert.ok(true);  // This assert should be evaluated for every subject category
      var result = Ember.A([
        TaxonomyRoot.create(Ember.getOwner(service).ownerInjection(), {
          id: 'GDF.K12.VPA',
          frameworkId: 'GDF',
          title: 'Visual & Performing Arts',
          subjectTitle: 'Visual & Performing Arts',
          code: 'GDF.K12.VPA',
          frameworks:  Ember.A([
            TaxonomyRoot.create(Ember.getOwner(service).ownerInjection(), {
              id: 'TEKS.K12.FA',
              frameworkId: 'TEKS',
              title: 'Texas Essential Knowledge and Skills',
              subjectTitle: 'TEKS Visual & Performing Arts'
            })
          ])
        }),
        TaxonomyRoot.create(Ember.getOwner(service).ownerInjection(), {
          id: 'GDF.K12.CS',
          frameworkId: 'GDF',
          title: 'Computer Science',
          subjectTitle: 'Computer Science',
          code: 'GDF.K12.CS'
        })
      ]);
      return Ember.RSVP.resolve(result);
    }
  }));

  var done = assert.async();
  service.getSubjects('k_12')
    .then(function() {
      service.getSubjects('higher_education') // The second call should not be calling the API fetchSubject method. The taxonomy subjects should be already loaded.
        .then(function() {
          done();
        });
    });
});

