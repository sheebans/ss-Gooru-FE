import Ember from 'ember';
import { test } from 'ember-qunit';
import moduleForService from 'gooru-web/tests/helpers/module-for-service';
import TaxonomyRoot from 'gooru-web/models/taxonomy/taxonomy-root';
import TaxonomyItem from 'gooru-web/models/taxonomy/taxonomy-item';

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
            subjectTitle: 'TEKS Visual & Performing Arts',
            courses:  Ember.A([
              TaxonomyItem.create(Ember.getOwner(this).ownerInjection(), {
                id: 'TEKS.K12.PE-K',
                code: 'TEKS.K12.PE-K',
                title: 'Kindergarten',
                children: Ember.A([
                  TaxonomyItem.create(Ember.getOwner(this).ownerInjection(), {
                    id: 'TEKS.K12.PE-K-MOV',
                    code: 'TEKS.K12.PE-K-MOV',
                    title: 'Movement'
                  }),
                  TaxonomyItem.create(Ember.getOwner(this).ownerInjection(), {
                    id: 'TEKS.K12.PE-K-PAH',
                    code: 'TEKS.K12.PE-K-PAH',
                    title: 'Physical activity and health'
                  })
                ])
              }),
              TaxonomyItem.create(Ember.getOwner(this).ownerInjection(), {
                id: 'TEKS.K12.PE-1',
                code: 'TEKS.K12.PE-1',
                title: 'Grade 1'
              })
            ])
          })
        ])
      }),
      TaxonomyRoot.create(Ember.getOwner(this).ownerInjection(), {
        id: 'GDF.K12.CS',
        frameworkId: 'GDF',
        title: 'Computer Science',
        subjectTitle: 'Computer Science',
        code: 'GDF.K12.CS',
        courses: []
      })
    ]);
  }
});

test('getSubjects when taxonomy container has not been loaded', function(assert) {
  const test = this;
  const service = this.subject();
  assert.expect(3); // Just the first time the taxonomy data should be loaded for every category.
  service.set('taxonomyContainer', {});
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

test('getCourses when taxonomy courses does not exist for subject', function(assert) {
  const test = this;
  const service = this.subject();
  service.set('apiTaxonomyService', Ember.Object.create({
    fetchCourses: function() {
      const courses = [
        TaxonomyItem.create(Ember.getOwner(test).ownerInjection(), {
          id: 'TEKS.K12.PE-2',
          code: 'TEKS.K12.PE-2',
          title: 'Grade 2'
        }),
        TaxonomyItem.create(Ember.getOwner(test).ownerInjection(), {
          id: 'TEKS.K12.PE-3',
          code: 'TEKS.K12.PE-3',
          title: 'Grade 3'
        })
      ];
      return Ember.RSVP.resolve(courses);
    }
  }));
  var done = assert.async();
  const subject = TaxonomyRoot.create(Ember.getOwner(test).ownerInjection(), {
    id: 'GDF.K12.CS',
    frameworkId: 'GDF',
    courses: []
  });
  service.getCourses(subject)
    .then(function(courses) {
      assert.equal(courses.length, 2, 'Wrong number of courses');
      assert.equal(courses.objectAt(0).get('id'), 'TEKS.K12.PE-2', 'Wrong course id');
      done();
    });
});

test('getCourses when taxonomy courses exist for subject', function(assert) {
  const test = this;
  const service = this.subject();
  service.set('apiTaxonomyService', Ember.Object.create({
    fetchCourses: function() {
      assert.ok(false, 'Method fetchCourses() should not be called.');
      return Ember.RSVP.resolve([]);
    }
  }));
  var done = assert.async();
  const subject = TaxonomyRoot.create(Ember.getOwner(test).ownerInjection(), {
    id: 'TEKS.K12.FA',
    frameworkId: 'TEKS',
    courses: [
      TaxonomyItem.create(Ember.getOwner(this).ownerInjection(), {
        id: 'TEKS.K12.PE-K',
        code: 'TEKS.K12.PE-K',
        title: 'Kindergarten'
      }),
      TaxonomyItem.create(Ember.getOwner(this).ownerInjection(), {
        id: 'TEKS.K12.PE-1',
        code: 'TEKS.K12.PE-1',
        title: 'Grade 1'
      })
    ]
  });
  service.getCourses(subject)
    .then(function(courses) {
      assert.equal(courses.length, 2, 'Wrong number of courses');
      assert.equal(courses.objectAt(0).get('id'), 'TEKS.K12.PE-K', 'Wrong course id');
      done();
    });
});

test('getDomains when taxonomy domains does not exist for course', function(assert) {
  const test = this;
  const service = this.subject();
  service.set('apiTaxonomyService', Ember.Object.create({
    fetchDomains: function() {
      const domains = [
        TaxonomyItem.create(Ember.getOwner(test).ownerInjection(), {
          id: 'TEKS.K12.PE-K-MOV',
          code: 'TEKS.K12.PE-K-MOV',
          title: 'Movement'
        }),
        TaxonomyItem.create(Ember.getOwner(test).ownerInjection(), {
          id: 'TEKS.K12.PE-K-PAH',
          code: 'TEKS.K12.PE-K-PAH',
          title: 'Physical activity and health'
        })
      ];
      return Ember.RSVP.resolve(domains);
    }
  }));
  var done = assert.async();
  const subject = TaxonomyRoot.create(Ember.getOwner(test).ownerInjection(), {
    id: 'GDF.K12.CS',
    frameworkId: 'GDF',
    courses: []
  });
  const course = TaxonomyItem.create(Ember.getOwner(test).ownerInjection(), {
    id: 'TEKS.K12.PE-K',
    code: 'TEKS.K12.PE-K',
    children: []
  });
  service.getDomains(subject, course)
    .then(function(domains) {
      assert.equal(domains.length, 2, 'Wrong number of courses');
      assert.equal(domains.objectAt(0).get('id'), 'TEKS.K12.PE-K-MOV', 'Wrong domain id');
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
