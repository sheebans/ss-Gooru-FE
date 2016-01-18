import { courseSectionsPrefix } from '../../../helpers/course-sections-prefix';
import { module, test } from 'qunit';

module('Unit | Helper | course sections prefix');

test('Fractional Helper', function(assert) {
  let result = courseSectionsPrefix({}, {title:"My Assessment",index:2,type:"assessment"});
  assert.equal(result, "A2 My Assessment");
});
