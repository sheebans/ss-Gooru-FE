/**
 * Creates queryParams object to be utitilized in study player by parsing the context object
 * @param {Promise.<MapLocation>}
 * @returns {queryParams}
 */
export function createStudyPlayerQueryParams(context, options) {
  let queryParams = { role: options.role, source: options.source };
  Object.assign(queryParams, context);
  return queryParams;
}

/**
 * Parse mapconxt for suggestions
 * @param {Promise.<MapLocation>}
 * @returns {boolean}
 */
export function hasSuggestions(context) {
  return context.suggestions && context.suggestions.length > 0;
}

/**
 * Maps properties of location to navigateMap
 * @param {object} locationdatModeldata
 */
export function currentLocationToMapContext(locationdatModeldata) {
  let data = locationdatModeldata;
  console.log('currentLocationToMapContext', data); //eslint-disable-line
  let retModel = {
    courseId: data.courseId,
    classId: data.classId,
    unitId: data.unitId,
    lessonId: data.lessonId,
    collectionId: data.collectionId,
    pathId: data.pathId,
    pathType: data.pathType,
    collectionType: data.collectionType, // inferred in current_location model on presence of collectionId or assessmentId
    collectionSubType:
      data.pathType === 'system'
        ? data.collectionType === 'collection'
          ? 'signature-collection'
          : 'signature-assesment'
        : null, // inference based on pathType & collectionType
    itemId: data.collectionId,
    status: data.status,
    score: data.scoreInPercentage || 0,
    contextData: data.contextData
  };
  retModel.itemType = retModel.collectionType;
  retModel.itemSubType = retModel.collectionSubType;
  delete retModel.collectionType;
  delete retModel.collectionSubType;
  return retModel;
}
