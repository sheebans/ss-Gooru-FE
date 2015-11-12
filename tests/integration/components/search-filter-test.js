import { moduleForComponent, test } from 'ember-qunit';
import T from 'gooru-web/tests/helpers/assert';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('search-filter', 'Integration | Component | search filter', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('search-filter-default', function(assert) {
  const subjects = Ember.A();
  subjects.addObject(Ember.Object.create({ libraryId: 1, library:"library", label: "Math", subjectCode: "10001" }));
  subjects.addObject(Ember.Object.create({ libraryId: 2, library:"library", label: "Science", subjectCode: "10002" }));
  subjects.addObject(Ember.Object.create({ libraryId: 3, library:"library", label: "History", subjectCode: "10003" }));
  subjects.addObject(Ember.Object.create({ libraryId: 4, library:"library", label: "Language", subjectCode: "10004" }));

  const  grades = Ember.A();
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "Pre-K", levels: [] }));
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "Elementary", levels: ["K", "1", "2", "3", "4", "5"] }));
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "Middle School", levels: ["6", "7", "8"] }));
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "High School", levels: ["9", "10", "11", "12"] }));
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "Higher Ed", levels: [] }));

  const standards = Ember.A();
  standards.addObject(Ember.Object.create({ libraryId: 1, name: "CCSS", title: "Common Core State Standard"}));
  standards.addObject(Ember.Object.create({ libraryId: 2, name: "CA SS", title: "California State Standard"}));
  standards.addObject(Ember.Object.create({ libraryId: 2, name: "NGSS", title: "Next Generation State Standard"}));

  this.set('subjects', subjects);
  this.set('grades', grades);
  this.set('standards', standards);

  this.render(hbs`{{search-filter subjects=subjects grades=grades standards=standards}}`); //render the component
  var $component = this.$(); //component dom element

      assert.expect(13); //making sure all asserts are called

      const $collectionsDropdown = $component.find(".collections-select");
      T.exists(assert, $collectionsDropdown, "Missing collections dropdown");

      const $collectionButton =$component.find('.collections');
      T.exists(assert, $collectionButton, "Missing collections button");
      assert.equal(T.text($collectionButton), "Collections", "Incorrect collections button text");

      const $imgCollectionButton =$component.find('.img-collections');
      T.exists(assert, $imgCollectionButton, "Missing image collections button");

      const $assessmentsButton =$component.find('.assessments');
      T.exists(assert, $assessmentsButton, "Missing assessments button");
      assert.equal(T.text($assessmentsButton), "Assessments", "Incorrect assessments button text");

      const $imgAssessmentsButton =$component.find('.img-assessments');
      T.exists(assert, $imgAssessmentsButton, "Missing image assessments button");

      const $authorLabel = $component.find('.author-label');
      assert.equal(T.text($authorLabel.find("p")), "Author", "Incorrect author label");

      const $authorInput = $component.find('.author');
      T.exists(assert, $authorInput, "Missing author input");

      const $imgQuestion = $component.find('.img-question');
      T.exists(assert, $imgQuestion, "Missing image question");

      const $gradeDropdown = $component.find('.grade');
      T.exists(assert, $gradeDropdown, "Missing grade dropdown");

      const $subjectDropdown = $component.find('.subject');
      T.exists(assert, $subjectDropdown, "Missing subject dropdown");

      const $standardDropdown = $component.find('.standard');
      T.exists(assert, $standardDropdown, "Missing standard dropdown");
});
test('search-filter-onResourceClick', function(assert) {
  assert.expect(1); //making sure all asserts are called
  const subjects = Ember.A();
  subjects.addObject(Ember.Object.create({ libraryId: 1, library:"library", label: "Math", subjectCode: "10001" }));
  subjects.addObject(Ember.Object.create({ libraryId: 2, library:"library", label: "Science", subjectCode: "10002" }));
  subjects.addObject(Ember.Object.create({ libraryId: 3, library:"library", label: "History", subjectCode: "10003" }));
  subjects.addObject(Ember.Object.create({ libraryId: 4, library:"library", label: "Language", subjectCode: "10004" }));

  const  grades = Ember.A();
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "Pre-K", levels: [] }));
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "Elementary", levels: ["K", "1", "2", "3", "4", "5"] }));
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "Middle School", levels: ["6", "7", "8"] }));
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "High School", levels: ["9", "10", "11", "12"] }));
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "Higher Ed", levels: [] }));

  const standards = Ember.A();
  standards.addObject(Ember.Object.create({ libraryId: 1, name: "CCSS", title: "Common Core State Standard"}));
  standards.addObject(Ember.Object.create({ libraryId: 2, name: "CA SS", title: "California State Standard"}));
  standards.addObject(Ember.Object.create({ libraryId: 2, name: "NGSS", title: "Next Generation State Standard"}));

  this.set('subjects', subjects);
  this.set('grades', grades);
  this.set('standards', standards);

  this.render(hbs`{{search-filter subjects=subjects grades=grades standards=standards}}`); //render the component
  var $component = this.$(); //component dom element
  const $collectionsDropdown = $component.find(".collections-select .dropdown button");
  $collectionsDropdown.click();
  const $resourceOption = $component.find(".collections-select .dropdown .dropdown-menu .resource");
  $resourceOption.click();
  const $ratingStars = $component.find(".rating-stars");
  T.exists(assert, $ratingStars, "Missing rating stars section");
});

test('search-filter-onCollectionFilterClick', function(assert) {
  assert.expect(2); //making sure all asserts are called
  const subjects = Ember.A();
  subjects.addObject(Ember.Object.create({ libraryId: 1, library:"library", label: "Math", subjectCode: "10001" }));
  subjects.addObject(Ember.Object.create({ libraryId: 2, library:"library", label: "Science", subjectCode: "10002" }));
  subjects.addObject(Ember.Object.create({ libraryId: 3, library:"library", label: "History", subjectCode: "10003" }));
  subjects.addObject(Ember.Object.create({ libraryId: 4, library:"library", label: "Language", subjectCode: "10004" }));

  const  grades = Ember.A();
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "Pre-K", levels: [] }));
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "Elementary", levels: ["K", "1", "2", "3", "4", "5"] }));
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "Middle School", levels: ["6", "7", "8"] }));
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "High School", levels: ["9", "10", "11", "12"] }));
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "Higher Ed", levels: [] }));

  const standards = Ember.A();
  standards.addObject(Ember.Object.create({ libraryId: 1, name: "CCSS", title: "Common Core State Standard"}));
  standards.addObject(Ember.Object.create({ libraryId: 2, name: "CA SS", title: "California State Standard"}));
  standards.addObject(Ember.Object.create({ libraryId: 2, name: "NGSS", title: "Next Generation State Standard"}));

  this.set('subjects', subjects);
  this.set('grades', grades);
  this.set('standards', standards);

  this.on('filterType', function(term, filterType) {
    assert.equal(filterType, 'collection', "Incorrect assessment filter type");
  });

  this.render(hbs`{{search-filter subjects=subjects grades=grades standards=standards onFilterType='filterType'}}`);

  var $component = this.$(); //component dom element
  const $collectionsFilter = $component.find(".collections.btn-search-filter");
  $collectionsFilter.click();
  const $collectionsFilterSelected = $component.find(".collections.btn-search-filter.selected");
  T.exists(assert, $collectionsFilterSelected, "Missing collection filter selected");
});

test('search-filter-onAssessmentFilterClick', function(assert) {
  assert.expect(2); //making sure all asserts are called
  const subjects = Ember.A();
  subjects.addObject(Ember.Object.create({ libraryId: 1, library:"library", label: "Math", subjectCode: "10001" }));
  subjects.addObject(Ember.Object.create({ libraryId: 2, library:"library", label: "Science", subjectCode: "10002" }));
  subjects.addObject(Ember.Object.create({ libraryId: 3, library:"library", label: "History", subjectCode: "10003" }));
  subjects.addObject(Ember.Object.create({ libraryId: 4, library:"library", label: "Language", subjectCode: "10004" }));

  const  grades = Ember.A();
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "Pre-K", levels: [] }));
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "Elementary", levels: ["K", "1", "2", "3", "4", "5"] }));
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "Middle School", levels: ["6", "7", "8"] }));
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "High School", levels: ["9", "10", "11", "12"] }));
  grades.addObject(Ember.Object.create({ libraryId: 1, name: "Higher Ed", levels: [] }));

  const standards = Ember.A();
  standards.addObject(Ember.Object.create({ libraryId: 1, name: "CCSS", title: "Common Core State Standard"}));
  standards.addObject(Ember.Object.create({ libraryId: 2, name: "CA SS", title: "California State Standard"}));
  standards.addObject(Ember.Object.create({ libraryId: 2, name: "NGSS", title: "Next Generation State Standard"}));

  this.set('subjects', subjects);
  this.set('grades', grades);
  this.set('standards', standards);

  this.on('filterType', function(term, filterType) {
    assert.equal(filterType, 'assessment', "Incorrect assessment filter type");
  });

  this.render(hbs`{{search-filter subjects=subjects grades=grades standards=standards onFilterType='filterType'}}`);

  var $component = this.$(); //component dom element
  const $assessmentsFilter = $component.find(".assessments.btn-search-filter");

  $assessmentsFilter.click();
  const $assessmentsFilterSelected = $component.find(".assessments.btn-search-filter.selected");
  T.exists(assert, $assessmentsFilterSelected, "Missing assessment filter selected");

});

