import { moduleForComponent, test } from 'ember-qunit';
import Question from 'gooru-web/models/content/question';

moduleForComponent('content/questions/gru-questions-edit', 'Unit | Component | content/questions/gru-questions-edit', {
  integration: false
});

test('defineFIBAnswers in middle answers', function(assert) {
  const component = this.subject();
  const question = Question.create({ text: 'Fill [in] the [blank]...'});
  const fibAnswers = component.defineFIBAnswers(question);

  assert.equal(fibAnswers.length, 2, 'Wrong number of answers');
  const answer1 = fibAnswers[0];
  assert.equal(answer1.get('sequence'), 1, 'Wrong sequence');
  assert.equal(answer1.get('text'), 'in', 'Wrong text');
  assert.equal(answer1.get('isCorrect'), true, 'Wrong isCorrect');
  assert.equal(answer1.get('type'), 'text', 'Wrong type');
  const answer2 = fibAnswers[1];
  assert.equal(answer2.get('sequence'), 2, 'Wrong sequence');
  assert.equal(answer2.get('text'), 'blank', 'Wrong text');
  assert.equal(answer2.get('isCorrect'), true, 'Wrong isCorrect');
  assert.equal(answer2.get('type'), 'text', 'Wrong type');
});

test('defineFIBAnswers start and end answers', function(assert) {
  const component = this.subject();
  const question = Question.create({ text: '[Fill] in the [blank]'});
  const fibAnswers = component.defineFIBAnswers(question);

  assert.equal(fibAnswers.length, 2, 'Wrong number of answers');
  const answer1 = fibAnswers[0];
  assert.equal(answer1.get('sequence'), 1, 'Wrong sequence');
  assert.equal(answer1.get('text'), 'Fill', 'Wrong text');
  assert.equal(answer1.get('isCorrect'), true, 'Wrong isCorrect');
  assert.equal(answer1.get('type'), 'text', 'Wrong type');
  const answer2 = fibAnswers[1];
  assert.equal(answer2.get('sequence'), 2, 'Wrong sequence');
  assert.equal(answer2.get('text'), 'blank', 'Wrong text');
  assert.equal(answer2.get('isCorrect'), true, 'Wrong isCorrect');
  assert.equal(answer2.get('type'), 'text', 'Wrong type');
});

test('defineFIBAnswers just answer', function(assert) {
  const component = this.subject();
  const question = Question.create({ text: '[Fill]'});
  const fibAnswers = component.defineFIBAnswers(question);

  assert.equal(fibAnswers.length, 1, 'Wrong number of answers');
  const answer1 = fibAnswers[0];
  assert.equal(answer1.get('sequence'), 1, 'Wrong sequence');
  assert.equal(answer1.get('text'), 'Fill', 'Wrong text');
  assert.equal(answer1.get('isCorrect'), true, 'Wrong isCorrect');
  assert.equal(answer1.get('type'), 'text', 'Wrong type');
});

test('defineFIBAnswers no answers', function(assert) {
  const component = this.subject();
  const question = Question.create({ text: 'Fill in the blank...'});
  const fibAnswers = component.defineFIBAnswers(question);

  assert.equal(fibAnswers.length, 0, 'Wrong number of answers');
});
