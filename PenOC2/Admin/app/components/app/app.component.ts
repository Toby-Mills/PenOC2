import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: './app.template.html',
    styleUrls: ['./app.style.css']
})
export class AppComponent {
    constructor(private router:Router){

    }

    private homeClicked(){
this.router.navigate(['']);
    }
}
