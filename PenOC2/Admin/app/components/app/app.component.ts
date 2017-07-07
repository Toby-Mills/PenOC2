import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.template.html',
    styleUrls: ['./app.style.css']
})
export class AppComponent {
private isAuthenticated = false;
private authenticationFailed = false;
    constructor(public router: Router, private apiService: ApiService) {
    }

    public signInClicked(userName: string, password: string) {
        this.apiService.signIn(userName, password).subscribe(authenticated => {
            this.isAuthenticated = authenticated;
            if (authenticated) {
                this.authenticationFailed = false;
                setTimeout(function(auth, theRouter ){
                theRouter.navigate(['events']);
                },
                0,
                authenticated,
                this.router);
            }
        },
        error => {
            this.authenticationFailed = true;
        });
    }

    public signOutClicked(event: Event) {
        event.preventDefault();
        this.apiService.signOut();
        this.isAuthenticated = false;
        this.router.navigate(['']);
    }

    public homeClicked() {
        this.router.navigate(['']);
    }
}
