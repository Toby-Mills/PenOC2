import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';

@Injectable()
export class UploadService {
    constructor(private apiService: ApiService) {}

    uploadNewsImage(fileToUpload: any) {
        let input = new FormData();
        input.append('file', fileToUpload);

        return this.apiService.post('/newsItems/images', input);
    }
}
