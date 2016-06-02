import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';
import TaxonomyRoot from 'gooru-web/models/taxonomy/taxonomy-root';

moduleForService('service:taxonomy', 'Unit | Service | taxonomy', {
  beforeEach: function() {
    this.taxonomySubjects = Ember.A([
      TaxonomyRoot.create(Ember.getOwner(this).ownerInjection(), {
        id: 'GDF.K12.VPA',
        frameworkId: 'GDF',
        title: 'Visual & Performing Arts',
        subjectTitle: 'Visual & Performing Arts',
        code: 'GDF.K12.VPA',
        frameworks:  Ember.A([
          TaxonomyRoot.create(Ember.getOwner(this).ownerInjection(), {
            id: 'TEKS.K12.FA',
            frameworkId: 'TEKS',
            title: 'Texas Essential Knowledge and Skills',
            subjectTitle: 'TEKS Visual & Performing Arts'
          })
        ])
      }),
      TaxonomyRoot.create(Ember.getOwner(this).ownerInjection(), {
        id: 'GDF.K12.CS',
        frameworkId: 'GDF',
        title: 'Computer Science',
        subjectTitle: 'Computer Science',
        code: 'GDF.K12.CS'
      })
    ]);
  }
});

test('getSubjects when taxonomy container has not been loaded', function(assert) {
  const test = this;
  const service = this.subject();

  assert.expect(3); // Just the first time the taxonomy data should be loaded for every category.

  service.set('apiTaxonomyService', Ember.Object.create({
    fetchSubjects: function() {
      assert.ok(true);  // This assert should be evaluated for every subject category
      return Ember.RSVP.resolve(test.taxonomySubjects);
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

test('getSubjects when taxonomy is already loaded', function(assert) {
  const service = this.subject();
  const taxonomyContainer = {
    'k_12': this.taxonomySubjects
  };

  service.set('taxonomyContainer', taxonomyContainer);

  service.set('apiTaxonomyService', Ember.Object.create({
    fetchSubjects: function() {
      assert.ok(false, 'Method fetchSubjects() should not be called.');
      return Ember.RSVP.resolve([]);
    }
  }));

  var done = assert.async();
  service.getSubjects('k_12')
    .then(function(subjects) {
      assert.equal(subjects.length, 2, 'Wrong number of subject elements');
      done();
    });
});

test('findSubjectById for a loaded category and subject', function(assert) {
  const service = this.subject();
  const taxonomyContainer = {
    'k_12': this.taxonomySubjects
  };

  service.set('taxonomyContainer', taxonomyContainer);

  var done = assert.async();
  service.findSubjectById('GDF.K12.VPA')
    .then(function(subject) {
      assert.equal(subject.get('id'), 'GDF.K12.VPA', 'Invalid subject id');
      assert.equal(subject.get('frameworkId'), 'GDF', 'Invalid subject frameworkId');
      service.findSubjectById('TEKS.K12.FA')
        .then(function(framework) {
          assert.equal(framework.get('id'), 'TEKS.K12.FA', 'Invalid framework id');
          assert.equal(framework.get('frameworkId'), 'TEKS', 'Invalid framework frameworkId');
          done();
        });
    });
});

test('findSubjectById for a loaded category and non-loaded subject', function(assert) {
  const service = this.subject();
  const taxonomyContainer = {
    'k_12': this.taxonomySubjects
  };

  service.set('taxonomyContainer', taxonomyContainer);

  service.findSubjectById('non-existing-subject-id')
    .then(function(subject) {
      assert.equal(subject, null, 'Invalid subject. Should be null');
    });
});

// TODO Fix this!!
/*
test('findSubjectById for a non-loaded category', function(assert) {
  const test = this;
  const service = this.subject();
  const taxonomyContainer = {};

  service.set('taxonomyContainer', taxonomyContainer);
  service.set('apiTaxonomyService', Ember.Object.create({
    fetchSubjects: function() {
      return Ember.RSVP.resolve(test.taxonomySubjects);
    }
  }));

  var subject = service.findSubjectById('GDF.K12.VPA')
    .then(function(subject) {
      assert.equal(subject.get('id'), 'GDF.K12.VPA', 'Invalid subject id');
      assert.equal(subject.get('frameworkId'), 'GDF', 'Invalid subject frameworkId');
    });
});
*/
