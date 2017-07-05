import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UploadService {
    constructor(private http: Http) {}

    uploadNewsImage(fileToUpload: any) {
        let input = new FormData();
        input.append('file', fileToUpload);

        return this.http
            .post('/penoc2/api/newsItems/images', input);
    }
}
