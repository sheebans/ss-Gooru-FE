export const AUDIENCES = [
  {value: 1, label: 'common.audienceList.all'},
  {value: 2, label: 'common.audienceList.english-language-learners'},
  {value: 3, label: 'common.audienceList.above-grade-level'},
  {value: 4, label: 'common.audienceList.below-grade-level'},
  {value: 5, label: 'common.audienceList.special-needs'},
  {value: 6, label: 'common.audienceList.teachers'}
];
export const RESOURCE_COMPONENT_MAP = {
  'video/youtube' : 'player.resources.gru-youtube-resource',
  'resource/url'  : 'player.resources.gru-url-resource',
  'handouts'      : 'player.resources.gru-pdf-resource',
  'image'         : 'player.resources.gru-image-resource',
  'vimeo/video'   : 'player.resources.gru-vimeo-resource'
};

export const RESOURCE_TYPES = [
    "webpage",
    "video",
    "interactive",
    "audio",
    "image",
    "text"
  ];

export const DEFAULT_IMAGES = {
  USER_PROFILE: '/assets/gooru/profile.png',
  COURSE: '/assets/gooru/course-default.png',
  COLLECTION: '/assets/gooru/collection-default.png',
  ASSESSMENT: '/assets/gooru/assessment-default.png',
  QUESTION_PLACEHOLDER_IMAGE: '/assets/gooru/question-placeholder-image.png'
};

export const TAXONOMY_CATEGORIES = [
  {value: 1, label: 'common.categoryOptions.k12'},
  {value: 2, label: 'common.categoryOptions.higher-ed'},
  {value: 3, label: 'common.categoryOptions.professional-dev'}
];

export const CONTENT_TYPES = {
  COLLECTION: 'collection',
  ASSESSMENT: 'assessment',
  COURSE: 'course',
  UNIT: 'unit',
  LESSON: 'lesson',
  RESOURCE:'resource',
  QUESTION:'question'
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

export const EMOTION_VALUES = [
  {value: 5, unicode: '1f601'},
  {value: 4, unicode: '1f642'},
  {value: 3, unicode: '1f610'},
  {value: 2, unicode: '1f641'},
  {value: 1, unicode: '1f625'}
];

export const SCORES = {
  REGULAR: 60,
  GOOD: 70,
  VERY_GOOD: 80,
  EXCELLENT: 90

};

export const GRADING_SCALE = [
  {LOWER_LIMIT: 0, COLOR: '#F46360'}, //red-400
  {LOWER_LIMIT: 60, COLOR: '#ED8E36'}, //orange-400
  {LOWER_LIMIT: 70, COLOR: '#F8BA41'}, //yellow-400
  {LOWER_LIMIT: 80, COLOR: '#A3CA9F'}, //green-200
  {LOWER_LIMIT: 90, COLOR: '#4B9741'} //green-400
];

export const CORRECT_COLOR = GRADING_SCALE[GRADING_SCALE.length - 1].COLOR; //green-400

export const INCORRECT_COLOR = GRADING_SCALE[0].COLOR;//red-400

export const ANONYMOUS_COLOR = '#0072BC';//blue-400

export const NO_ANSWER_COLOR = '#FFFFFF';//white

// Height of the application header in pixels
export const HEADER_HEIGHT = 50;

export const REAL_TIME_CLIENT = {
  CONNECTION_ATTEMPT_DELAY: 3000,
  OUTGOING_HEARTBEAT: 5000,
  INCOMING_HEARTBEAT: 5000
};

export const ENTITY_TYPE = {
  CONTENT: 'content',
  USER: 'user'
};

export const NETWORK_TYPE = {
  FOLLOWING: 'followings',
  FOLLOWERS: 'followers'
};

export const COUNTRY_CODES = {
  US: 'US'
};
