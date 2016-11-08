import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './app/components/app/app.template.html',
    styleUrls:['./app/components/app/app.style.css']
})
export class AppComponent {
    constructor(private router:Router){

    }

    private homeClicked(){
this.router.navigate(['']);
    }
}
