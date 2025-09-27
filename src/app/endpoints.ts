export class Endpoints {
  static host = window.location.hostname;
  static protocol = window.location.protocol;
  static port = window.location.port;
  static appApi = '/api/v1';
  static apiResultService = '10.0.1.30:8082'
  static apiLocalService = '10.0.1.31:8082'

  static apiUrl = 'iam/api/v1';
  static adminApi = Endpoints.apiUrl;

  static get mainUrl() {
    if (this.host.includes('localhost')) {
      return 'http://localhost:4200';
    }

    return '';
  }

  static get remoteUrl() {
    if (this.host.includes('api.manager.local')) {
      return 'http://api.manager.local';
    }

    return '';
  }


  static get fsDL() {
    return '/fs/dl';
  }

}
