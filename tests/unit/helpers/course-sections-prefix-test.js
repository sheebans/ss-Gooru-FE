//import courseSectionsPrefix from '../../../helpers/course-sections-prefix';
//import { module, test } from 'qunit';
//
//module('Unit | Helper | course sections prefix');
//
//
//test('Course sections prefix Unit', function(assert) {
//  let helper = courseSectionsPrefix.create();
//  let result = helper.compute({}, {title:"My Unit",index:1,type:"unit"});
//  assert.equal(result, "U1 My Unit");
//});
//
//test('Course sections prefix Lesson', function(assert) {
//  let result = courseSectionsPrefix({}, {title:"My Lesson",index:1,type:"lesson"});
//  assert.equal(result, "L1 My Lesson");
//});
//
//test('Course sections prefix Assessment', function(assert) {
//  let result = courseSectionsPrefix({}, {title:"My Assessment",index:2,type:"assessment"});
//  assert.equal(result, "A2 My Assessment");
//});
//
//test('Course sections prefix Collection', function(assert) {
//  let result = courseSectionsPrefix({}, {title:"My Collection",index:2,type:"collection"});
//  assert.equal(result, "C2 My Collection");
//});
