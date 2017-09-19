import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
    private apiUrl: string;
    private token: any;
    public authenticated: false;

    public constructor(public http: Http) {
        if (location.host.toLowerCase().startsWith('localhost')) {
            this.apiUrl = 'http://localhost/penoc2/api';
        } else {
            this.apiUrl = 'http://www.penoc.org.za/api';
        }
    }

    public appendApiHeaders(options?: RequestOptionsArgs): RequestOptionsArgs {
        options = options || {};
        options.headers = options.headers || new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('API_KEY', 'Orienteering');
        options.headers.append('Authorization', 'Bearer ' + this.token);

        return options;
    }

    public get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.apiUrl + url;
        options = this.appendApiHeaders(options);
        return this.http.get(url, options);
    }

    public post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        url = this.apiUrl + url;
        options = this.appendApiHeaders(options);
        return this.http.post(url, body, options);
    }

    public put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        url = this.apiUrl + url;
        options = this.appendApiHeaders(options);
        return this.http.put(url, body, options);
    }

    public delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.apiUrl + url;
        options = this.appendApiHeaders(options);
        return this.http.delete(url, options);
    }

    public signIn(userName: String, password: String): Observable<boolean> {

          return this.post('/authenticate', {username: userName, password: password}).map(response => {
              if (response.status === 200) {
                  this.token = response.json(); this.authenticated = true;
                } else {
                    this.token = undefined; this.authenticated = false;
                }

                return this.authenticated;
            });
    }

    public signOut() {
        this.token = undefined;
        this.authenticated = false;
    }
}
