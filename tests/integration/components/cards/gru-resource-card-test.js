import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('cards/gru-resource-card', 'Integration | Component | cards/gru resource card', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale", "en");
    this.inject.service('i18n');
  }
});

test('Resource card that is not a question and it has not been started', function (assert) {
  assert.expect(7);


  const mockResource = Ember.Object.create({
    resourceType: "video/youtube",
    title:"Learn the MEAN Stack."
  });

  this.set('mockResource', mockResource);

  this.render(hbs`{{cards/gru-resource-card item=mockResource}}`);

  const $component = this.$('.gru-resource-card');
  assert.ok($component, 'Component does not have the component class');

  const $detailsContainer = $component.find('.resource-details');
  assert.ok($detailsContainer, 'Details container not found');

  const $resourceIcon = $detailsContainer.find('.card-icon i.resource-icon');
  assert.ok($resourceIcon, 'Icon not found');

  const $resourceTitle = $detailsContainer.find('.resource-description span.title');

  assert.equal(T.text($resourceTitle), mockResource.title, "Incorrect title");

  const $resourceType = $detailsContainer.find('.resource-description p.type');

  assert.equal(T.text($resourceType), this.get('i18n').t('common.resource-type.'+mockResource.resourceType).toString(), 'Wrong resource type text');

  const $resultContainer = $component.find('.result-details');
  assert.ok($resultContainer, 'Result container not found');

  const $resultStatus = $resultContainer.find('p.status');
  assert.equal(T.text($resultStatus), this.get('i18n').t('cards.gru-resource-card.skipped').toString(), 'Wrong result status text');


});

test('Resource card that is not a question and it has been viewed but not reacted to', function (assert) {
  assert.expect(3);


  const mockResource = Ember.Object.create({
    resourceType: "video/youtube",
    title: "Learn the MEAN Stack.",
    timeSpent: 12345
  });

  this.set('mockResource', mockResource);

  this.render(hbs`{{cards/gru-resource-card item=mockResource}}`);

  const $component = this.$('.gru-resource-card');
  assert.ok($component, 'Component does not have the component class');

  const $resultContainer = $component.find('.result-details');
  assert.ok($resultContainer, 'Result container not found');

  const $timeSpentParagraph = $resultContainer.find('div.time-spent p');
  assert.ok($timeSpentParagraph, 'Result container not found');



});

test('Resource card that is not a question and it has been viewed but not reacted to', function (assert) {
  assert.expect(4);


  const mockResource = Ember.Object.create({
    resourceType: "video/youtube",
    isQuestion:false,
    title: "Learn the MEAN Stack.",
    timeSpent: 12345,
    reaction: 3
  });

  this.set('mockResource', mockResource);

  this.render(hbs`{{cards/gru-resource-card item=mockResource}}`);

  const $component = this.$('.gru-resource-card');
  assert.ok($component, 'Component does not have the component class');

  const $resultContainer = $component.find('.result-details');
  assert.ok($resultContainer, 'Result container not found');

  const $timeSpentParagraph = $resultContainer.find('div.time-spent p');
  assert.ok($timeSpentParagraph, 'Result container not found');

  const $reactionIcon = $resultContainer.find('div.resource-reaction i');
  assert.ok($reactionIcon, 'Reaction not found');

});

test('Resource card that is not a question and it has been viewed but not reacted to', function (assert) {
  assert.expect(4);

  const mockResource = Ember.Object.create({
    resourceType: "question",
    question: {
      questionType: "FIB",
    },
    title:"Learn the MEAN Stack."
  });

  this.set('mockResource', mockResource);

  this.render(hbs`{{cards/gru-resource-card item=mockResource}}`);

  const $component = this.$('.gru-resource-card');
  assert.ok($component, 'Component does not have the component class');

  const $detailsContainer = $component.find('.resource-details');
  assert.ok($detailsContainer, 'Details container not found');

  const $questionIcon = $detailsContainer.find('.card-icon i.question-icon');
  assert.ok($questionIcon, 'Icon not found');

  const $questionType = $detailsContainer.find('.resource-description p.type');
  assert.equal(T.text($questionType), this.get('i18n').t('common.question-type.' + mockResource.question.questionType).toString(), 'Wrong question type text');
});
