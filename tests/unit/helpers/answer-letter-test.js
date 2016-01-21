import { answerLetter } from '../../../helpers/answer-letter';
import { module, test } from 'qunit';

module('Unit | Helper | answer letter');

test('Answer Letter', function(assert) {
  let result = answerLetter([3]);
  assert.equal(result, "D", "Wrong response");

});
