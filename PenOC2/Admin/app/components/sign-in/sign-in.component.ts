import { Component, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
    moduleId: module.id,
    selector: 'sign-in',
    templateUrl: './sign-in.template.html',
    styleUrls: ['./sign-in.style.css']
})
export class SignInComponent {
    private authenticationFailed = false;
    @Output() public authenticated: EventEmitter<any> = new EventEmitter;

    public constructor(public apiService: ApiService) {

    }

    private signIn(userName: string, password: string) {
    this.authenticationFailed = false;
            this.apiService.signIn(userName, password).subscribe(authenticated => {
                if (authenticated) {
                    this.authenticated.emit(true);
                }
            },
            error => {
                this.authenticationFailed = true;
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
