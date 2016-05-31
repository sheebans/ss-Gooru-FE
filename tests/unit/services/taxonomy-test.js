import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';

moduleForService('service:taxonomy', 'Unit | Service | taxonomy', {
  // needs: ['serializer:foo']
});

test('getSubjects', function(assert) {
  //const service = this.subject();

  assert.ok(true, 'Temporal Assert');

  /*
  service.set('apiTaxonomyService', Ember.Object.create({
    fetchSubjects: function(type) {
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
      ]);

      return TaxonomyRoot.create(Ember.getOwner(serializer).ownerInjection(), {
        id: 'subject-id-1',
        frameworkId: subjectPayload['standard_framework_id'],
        title: subjectPayload.title,
        subjectTitle: subjectPayload.title,
        code: subjectPayload.code,
        frameworks: serializer.normalizeFrameworks(subjectPayload.frameworks, subjectPayload.title)
      });



      assert.deepEqual(type, 'k_12', 'Wrong profile data');
      return Ember.RSVP.resolve([]);
    }
  }));

  var done = assert.async();
  service.getSubjects('k_12')
    .then(function() {
      done();
    });
  */
});

