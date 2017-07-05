import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
    private apiUrl: string;

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

    public signIn(userName: String, password: String): Observable<Response> {
        return this.post(this.apiUrl + '/authenticate', {username: userName, password: password});
    }
}
