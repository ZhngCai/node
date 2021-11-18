

export const nodeEnvApp: CFEnvApp = {
  getParams(): CFQueryParams {
    return {
      sid: '9jR3TYAK'
    } as CFQueryParams;
  },
  gotoStartPage(params: CFQueryParams): void {
    // switchRoute(ROUTE_NAME.START, params);
  },
  gotoSurveyPage(params: CFQueryParams): void {
    // switchRoute(ROUTE_NAME.SURVEY, params);
  },
  getRewardUrl(params: CFQueryParams): string {
    return '';
  },
  openWebLink(url): void {
    location.replace(url);
  },
  reload(): void {
  },
};