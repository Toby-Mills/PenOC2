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

    constructor(public router: Router, private apiService: ApiService) {
    }

    public authenticated() {
        this.isAuthenticated = true;
        setTimeout(function(router){
            router.navigate(['/events']);
        }, 0, this.router);
    }

    public signOutClicked(event: Event) {
        event.preventDefault();
        this.apiService.signOut();
        this.isAuthenticated = false;
        this.router.navigate(['']);
    }

    public homeClicked() {
        if (this.isAuthenticated){
            this.router.navigate(['/events']);
        } else {
            this.router.navigate(['']);
        }
    }
}
