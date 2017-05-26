import { isEven } from '../../../helpers/is-even';
import { module, test } from 'qunit';

module('Unit | Helper | is-even');

test('Is Even Helper', function(assert) {
  let result = isEven(0);
  assert.equal(result, true);

  let result = isEven(1);
  assert.equal(result, false);
});
