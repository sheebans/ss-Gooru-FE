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

test('search-filter', function(assert) {
  const subjects = Ember.A();
  subjects.addObject(Ember.Object.create({ libraryId: 1, library:"library", label: "Math", subjectCode: "10001" }));
  subjects.addObject(Ember.Object.create({ libraryId: 2, library:"library", label: "Science", subjectCode: "10002" }));
  subjects.addObject(Ember.Object.create({ libraryId: 3, library:"library", label: "History", subjectCode: "10003" }));
  subjects.addObject(Ember.Object.create({ libraryId: 4, library:"library", label: "Language", subjectCode: "10004" }));

  this.set('subjects', subjects);

  this.render(hbs`{{search-filter subjects=subjects}}`); //render the component
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

      const $autorLabel = $component.find('.autor-label');
      assert.equal(T.text($autorLabel.find("p")), "Autor", "Incorrect autor label");

      const $autorInput = $component.find('.autor');
      T.exists(assert, $autorInput, "Missing autor input");

      const $imgQuestion = $component.find('.img-question');
      T.exists(assert, $imgQuestion, "Missing image question");

      const $gradeDropdown = $component.find('.grade');
      T.exists(assert, $gradeDropdown, "Missing grade dropdown");

      const $subjectDropdown = $component.find('.subject');
      T.exists(assert, $subjectDropdown, "Missing subject dropdown");

      const $standardDropdown = $component.find('.standard');
      T.exists(assert, $standardDropdown, "Missing standard dropdown");
});
