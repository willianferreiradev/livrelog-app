import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private storage: Storage,
    private router: Router
  ) {}

  logout() {
    this.storage.clear().then(() => this.router.navigate(['auth', 'login']));
  }

}
