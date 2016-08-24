import Env from 'gooru-web/config/environment';

const EnvironmentMap = Env['environment-map'] || {};
const GooruEndpoints = Env['gooru-endpoints'] || {};
const RealTimeConfig = Env['real-time'] || {};


export function getEndpointUrl() {
  const currentHostname = window.location.hostname;
  const protocol = `${window.location.protocol}//`;
  const envKey = EnvironmentMap[currentHostname];

  var hostname = undefined;
  var port = undefined;
  if (envKey) {
    hostname = GooruEndpoints[envKey].hostname;
    port = (protocol === 'http://') ? GooruEndpoints[envKey].port : GooruEndpoints[envKey].securePort;
  }
  hostname = hostname ? hostname : currentHostname;
  port = port ? `:${port}` : '';

  return `${protocol}${hostname}${port}`;
}

export function getEndpointSecureUrl() {
  const currentHostname = window.location.hostname;
  const envKey = EnvironmentMap[currentHostname];

  var protocol = undefined;
  var hostname = undefined;
  var port = undefined;
  if (envKey) {
    protocol = GooruEndpoints[envKey].secureProtocol;
    hostname = GooruEndpoints[envKey].hostname;
    port = GooruEndpoints[envKey].securePort;
  }
  protocol = protocol ? protocol : 'https://';
  hostname = hostname ? hostname : currentHostname;
  port = port ? `:${port}` : '';

  return `${protocol}${hostname}${port}`;
}

export function getRealTimeWebServiceUrl() {
  const currentHostname = window.location.hostname;
  const envKey = EnvironmentMap[currentHostname];
  const protocol = RealTimeConfig[envKey].webServiceProtocol;
  const hostname = RealTimeConfig[envKey].webServiceHostname;

  var port = RealTimeConfig[envKey].webServicePort;
  port = port ? `:${port}` : '';

  return `${protocol}${hostname}${port}`;
}

export function getRealTimeWebServiceUri() {
  const currentHostname = window.location.hostname;
  const envKey = EnvironmentMap[currentHostname];

  return RealTimeConfig[envKey].webServiceUri;
}

export function getRealTimeWebSocketUrl() {
  const currentHostname = window.location.hostname;
  const envKey = EnvironmentMap[currentHostname];
  const protocol = RealTimeConfig[envKey].webSocketProtocol;
  const hostname = RealTimeConfig[envKey].webSocketHostname;

  var port = RealTimeConfig[envKey].webSocketPort;
  port = port ? `:${port}` : '';

  return `${protocol}${hostname}${port}${RealTimeConfig[envKey].webSocketUri}`;
}

export function getRealTimeWebSocketUri() {
  const currentHostname = window.location.hostname;
  const envKey = EnvironmentMap[currentHostname];

  return RealTimeConfig[envKey].webSocketUri;
}
