import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class CheckTutorial implements CanLoad {
  constructor(private storage: Storage, private router: Router) {}

  async canLoad() {
    try {
      const res = await this.storage.get('ion_did_tutorial');
      if (!res) { return true; }
      this.router.navigate(['/app', 'tabs', 'scheulde']);
      return false;
    } catch (e) {
      return false;
    }
  }

}
