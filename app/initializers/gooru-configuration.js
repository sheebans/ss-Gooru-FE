import Env from 'gooru-web/config/environment';


export function initialize(application) {
  const configurationService = application.__container__.lookup("service:configuration");
  // Wait until all of the following promises are resolved
  application.deferReadiness();

  const awProps = Env.APP.awProps; //application widget properties
  const configBaseUrl = awProps ? awProps.appRootPath : undefined;
  configurationService.loadConfiguration(configBaseUrl).then(function(){
    // Continue the Application boot process, allowing other Initializers to run
    application.advanceReadiness();
  });
}

export default {
  name: 'gooru-configuration',
  initialize: initialize
};
