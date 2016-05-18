import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Question from 'gooru-web/models/content/question';
import Ember from 'ember';

moduleForComponent('content/questions/gru-question-play', 'Integration | Component | content/questions/gru question play', {
  integration: true
});

test('it renders', function(assert) {
  var question = Question.create(Ember.getOwner(this).ownerInjection(), {
    title: 'Question Title'
  });

  this.set('question', question);

  this.render(hbs`{{content/questions/gru-question-play question=question}}`);

    var $container = this.$("article.content.questions.gru-question-play");
  assert.ok($container.length, "Component");

  const $header = $container.find('> header');
  assert.ok($header.length, "Header");
  assert.ok($header.find('h1').text(), 'Question Title', "Missing title");


});
