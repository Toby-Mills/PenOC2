import { Component, ViewChild, Input } from '@angular/core';
import { UploadService } from '../../services/upload.service';

@Component({
    moduleId: module.id,
    selector: 'file-upload',
    templateUrl: './file-upload.template.html',
    styleUrls: ['./file-upload.style.css']
})
export class FileUploadComponent {
    @ViewChild('fileInput') fileInput: any;
    @ViewChild('tagLabel') tagLabel: any;
    public fileUrl: string;
    public fi: any;
    public tag: string;
    @Input() tagStyle: string = 'image';

    constructor(private uploadService: UploadService) {
    }

    copy() {
        let range = document.createRange();
        let label = document.querySelector('#tagLabel');

        window.getSelection().removeAllRanges();
        range.selectNode(label);
        window.getSelection().addRange(range);

        try {
            // Now that we've selected the anchor text, execute the copy command  
            let successful = document.execCommand('copy');
            let msg = successful ? 'successful' : 'unsuccessful';
        } catch (err) {
        }

        // Remove the selections - NOTE: Should use
        // removeRange(range) when it is supported  
        window.getSelection().removeAllRanges();

    }
    addFile(): void {
        this.fi = this.fileInput.nativeElement;
        if (this.fi.files && this.fi.files[0]) {
            let fileToUpload = this.fi.files[0];
            this.uploadService
                .uploadNewsImage(fileToUpload)
                .subscribe(res => {
                    this.fileUrl = JSON.parse(res.text()).Url;
                    this.fi.value = '';
                    if (this.tagStyle === 'image') {
                        this.tag = '<img src="' + this.fileUrl + '" />';
                    }
                });
        }
    }
}
