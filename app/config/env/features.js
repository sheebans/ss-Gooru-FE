/**
 Default application features setup
 @see services/configuration.js
 */
export default {
  features: {
    header: {
      enabled: true
    },
    collections: {
      player: {
        showReactionBar: true,
        showQuestions: true,
        showReportLink: true,
        showCollectionName: true
      }
    },
    resources: {
      player: {
        showResourceHeader: true
      }
    }
  }
};
