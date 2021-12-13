/** @format */

import User from "../user";

export const nodeEnvApp: CFEnvApp = {
  getParams(): CFQueryParams {
    return User.info;
  },
  gotoStartPage(params: CFQueryParams): void {},
  gotoSurveyPage(params: CFQueryParams): void {},
};
