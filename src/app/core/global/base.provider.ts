// core imports
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseProvider {
  protected baseUrl: string;

  /**
   * Constructor
   */
  constructor() {
    this.baseUrl = environment.apiUrl;
  }

  /**
   * Compute full path to server resource
   *
   * @param uri string
   * @param substitutions any
   */
  public getFullUrl(uri: string, substitutions?: any): string {
    let fullUrl = this.baseUrl + uri;

    if (null !== substitutions && undefined !== substitutions) {
      const keys: Array<string> = Object.keys(substitutions);

      for (const k of keys) {
        fullUrl = fullUrl.split(`{${k}}`).join(substitutions[k]);
      }
    }

    return fullUrl;
  }
}
