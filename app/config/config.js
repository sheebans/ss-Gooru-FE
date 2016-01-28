export const RESOURCE_COMPONENT_MAP = {
  'video/youtube' : 'player.resources.gru-youtube-resource',
  'resource/url'  : 'player.resources.gru-url-resource',
  'handouts'      : 'player.resources.gru-pdf-resource',
  'image'         : 'player.resources.gru-image-resource',
  'vimeo/video'   : 'player.resources.gru-vimeo-resource'
};

export const DEFAULT_IMAGES = {
  USER_PROFILE: '/assets/gooru/profile.png',
  QUESTION_PLACEHOLDER_IMAGE: '/assets/gooru/question-placeholder-image.png'
};

export const CONTENT_TYPES = {
  COLLECTION: 'collection',
  ASSESSMENT: 'assessment'
};

export const KEY_CODES = {
  DOWN: 40,
  ENTER: 13,
  ESCAPE: 27,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32,
  UP: 38
};
export const VIEW_LAYOUT_PICKER_OPTIONS = {
  LIST:'list',
  THUMBNAILS:'thumbnails'
};

export const EMOTION_VALUES = [1, 2, 3, 4, 5];

export const SCORES = {
  REGULAR: 60,
  GOOD: 70,
  VERY_GOOD: 80,
  EXCELLENT: 90

};

export const GRADING_SCALE = [
  {LOWER_LIMIT: 0, COLOR: '#E08282'},
  {LOWER_LIMIT: 60, COLOR: '#FEC956'},
  {LOWER_LIMIT: 70, COLOR: '#EDF167'},
  {LOWER_LIMIT: 80, COLOR: '#A2DE81'},
  {LOWER_LIMIT: 90, COLOR: '#3FC380'}
];
