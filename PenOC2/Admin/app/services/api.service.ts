import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

@Injectable()
export class ApiService {
    apiUrl(): string {
        if (location.host.toLowerCase().startsWith('localhost')) {
            return 'http://localhost/penoc2/api'
        } else {
            return 'http://www.penoc.org.za/api'
        }
    }

    apiHeaders(): Headers {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('API_KEY', 'Orienteering');

        return headers;
    }
}
