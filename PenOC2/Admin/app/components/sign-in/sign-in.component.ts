import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
    moduleId: module.id,
    selector: 'sign-in',
    templateUrl: './sign-in.template.html',
    styleUrls: ['./sign-in.style.css']
})
export class SignInComponent {
    private authenticationFailed = false;
    private authenticating = false;
    @Output() public authenticated: EventEmitter<any> = new EventEmitter;
    @ViewChild('userName') userName: any;

    public constructor(public apiService: ApiService) {

    }

    ngAfterViewInit() {
        this.userName.nativeElement.focus();
    }

    private signIn(userName: string, password: string) {
    this.authenticationFailed = false;
    this.authenticating = true;
            this.apiService.signIn(userName, password).subscribe(authenticated => {
                if (authenticated) {
                    this.authenticated.emit(true);
                    this.authenticating = false;
                }
            },
            error => {
                this.authenticationFailed = true;
                this.authenticating = false;
            });
    }

    public signInClicked(userName: string, password: string) {
       this.signIn(userName, password);
    }

    public passwordKeyPressed(event: any, userName: string, password: string){
        switch (event.key) {
            case 'Enter': this.signIn(userName, password);
        }
    }

}

