import { Component, ViewChild, Input } from '@angular/core';
import { UploadService } from '../../services/upload.service';

@Component({
    selector: 'file-upload',
    templateUrl: './app/components/fileUpload/fileUpload.template.html',
    styleUrls: ['./app/components/fileUpload/fileUpload.style.css']
})
export class FileUploadComponent {
    @ViewChild("fileInput") fileInput;
    @ViewChild("tagLabel") tagLabel;
    public fileUrl: string;
    public fi;
    public tag: string;
    @Input() tagStyle: string = "image";

    constructor(private uploadService: UploadService) {
    }

    copy() {
        console.log(this.tagLabel.nativeElement.textContent);

        var range = document.createRange();
        var label = document.querySelector('#tagLabel');

        window.getSelection().removeAllRanges();
        range.selectNode(label);
        window.getSelection().addRange(range);

        try {
            // Now that we've selected the anchor text, execute the copy command  
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copy command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy');
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
                    if (this.tagStyle == 'image') {
                        this.tag = '<img src="' + this.fileUrl + '" />';
                    }
                });
        }
    }
}