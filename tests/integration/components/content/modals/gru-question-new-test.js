import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
//import QuestionModel from 'gooru-web/models/content/question';
//import Collection from 'gooru-web/models/content/collection';
//import wait from 'ember-test-helpers/wait';

const collectionServiceMock = Ember.Service.extend({
  addQuestion: function(collectionId, questionId) {
    if (collectionId && questionId) {
      return Ember.RSVP.resolve('');
    } else {
      return Ember.RSVP.reject('Adding question to collection failed');
    }
  }
});

const questionServiceMock = Ember.Service.extend({
  createQuestion: function(questionData) {
    if (questionData) {
      return Ember.RSVP.resolve(Ember.Object.create({
        id: 'question-id'
      }));
    } else {
      return Ember.RSVP.reject('Question copy failed');
    }
  }
});

moduleForComponent('content/modals/gru-question-new', 'Integration | Component | content/modals/gru question new', {
  integration: true,
  beforeEach: function () {
    this.inject.service('i18n');

    this.register('service:api-sdk/collection', collectionServiceMock);
    this.register('service:api-sdk/question', questionServiceMock);

    this.inject.service('api-sdk/collection');
    this.inject.service('api-sdk/question');
  }
});

test('Question New Layout', function(assert) {

  this.render(hbs`{{content/modals/gru-question-new}}`);

  const $component = this.$(".gru-question-new");
  assert.ok($component, 'Missing Component');
  assert.ok($component.find('h4.modal-title'), 'Missing Title');
  assert.equal($component.find('h4.modal-title').text(), this.get('i18n').t('common.add-new-question').string, 'Incorrect Title');
  assert.equal($component.find('label.type span.required').text(), this.get('i18n').t('common.add-type-question').string, 'Incorrect Question Type Label');
  assert.equal($component.find('.question-types .panel').length, 9, 'Incorrect Number of Question Types');
  assert.ok($component.find('.question-type-MC'), 'Missing Multiple Choice Type');
  assert.ok($component.find('.question-type-MA'), 'Missing Multiple Answer Type');
  assert.ok($component.find('.question-type-OE'), 'Missing Open Ended Type');
  assert.ok($component.find('.question-type-HT_TO'), 'Missing Order List Type');
  assert.ok($component.find('.question-type-T_F'), 'Missing True/False Type');
  assert.ok($component.find('.question-type-HT_HL'), 'Missing Hot Text Highlight Type');
  assert.ok($component.find('.question-type-FIB'), 'Missing Fill in the blanks Type');
  assert.ok($component.find('.question-type-HS_IMG'), 'Missing Hot Spot Image Type');
  assert.ok($component.find('.question-type-HS_TXT'), 'Missing Hot Spot Text Type');
  assert.ok($component.find('actions .cancel'), 'Missing Cancel Button');
  assert.ok($component.find('actions .add'), 'Missing Add Button');
});

test('Select question type', function(assert) {

  this.render(hbs`{{content/modals/gru-question-new}}`);

  const $component = this.$(".gru-question-new");
  assert.ok($component, 'Missing Component');
  assert.equal($component.find('.panel.question-type-MC.active').length,1, 'Multiple choice should be active');
  const $multipleAnswer =$component.find('.panel.question-type-MA');
  $multipleAnswer.click();
  assert.equal($component.find('.panel.question-type-MA.active').length,1, 'Multiple answer should be active');
  assert.equal($component.find('.panel.active').length,1, 'Only one type should be active');
});

//test('show spinner button component while the server response, after clicking on the add to button', function(assert) {
//
//  this.set('router', {
//    transitionTo(route, resourceId, queryParams) {
//      return {
//        route: route,
//        resource: resourceId,
//        queryParams:queryParams
//      };
//    }
//  });
//
//  var question = QuestionModel.create({
//    title: "Question Title",
//    format:"question",
//    type:"MC",
//    text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//    owner:Ember.Object.create({
//      firstName:"Publisher"
//    }),
//    standards:Ember.A([Ember.Object.create({
//      description:"Use proportional relationships to solve multistep ratio and percent problems. Examples: simple interest, tax, markups and markdowns, gratuities and commissions, fees, percent increase and decrease, percent error.",
//      code:"CCSS.Math.Content.7.RP.A.3"
//    }),Ember.Object.create({
//      description:"Explain patterns in the number of zeros of the product when multiplying a number by powers of 10, and explain patterns in the placement of the decimal point when a decimal is multiplied or divided by a power of 10. Use whole-number exponents to denote powers of 10.",
//      code:"CCSS.Math.Content.5.NBT.A.2"
//    })])
//  });
//
//
//
//  this.set('collection', Collection.create(Ember.getOwner(this).ownerInjection(), {
//    id: 'collection-id'
//  }));
//
//  this.on('closeModal', function () {
//    assert.ok(true, 'closeModal action triggered');
//  });
//
//  this.render(hbs`{{content/modals/gru-question-new model=collection router=router}}`);
//
//  const $component = this.$('.gru-question-new');
//
//  $component.find(".add").click();
//
//  return wait().then(function () {
//    assert.ok($component.find('.actions .gru-spinner-button .has-spinner.add-loading').length, 'Missing gru-spinner-button component');
//    assert.ok(!$component.find(".actions .gru-spinner-button .add").length, 'Create button should not be visible');
//  });
//});

