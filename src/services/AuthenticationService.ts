import "cross-fetch/polyfill";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import type { AuthCredentials, AuthSettings } from "../types/Auth";
import { UnauthorizedError } from "../utils/constants";

export default class AuthenticationService {
  _settings: AuthSettings;
  constructor(settings: AuthSettings) {
    this._settings = settings;
  }

  async login(credentials: AuthCredentials) {
    const { username, password } = credentials;
    const { _settings } = this;

    const authenticationDetails =
      new AmazonCognitoIdentity.AuthenticationDetails({
        Username: username,
        Password: password,
      });

    const userPool = new AmazonCognitoIdentity.CognitoUserPool({
      UserPoolId: _settings.userPoolId,
      ClientId: _settings.clientId,
    });

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: username,
      Pool: userPool,
    });
    return new Promise((resolve, reject) =>
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          const accessToken = result.getIdToken().getJwtToken();
          if (!accessToken) {
            reject(new UnauthorizedError("Invalid JWT"));
          }
          resolve(accessToken);
        },

        onFailure: function (err) {
          reject(err);
        },
      })
    );
  }

  dispose() {}
}
