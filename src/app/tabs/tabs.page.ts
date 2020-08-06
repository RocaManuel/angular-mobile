import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from 'src/store/actions/auth.actions';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private store: Store
  ) {}

  ngOnInit() {
    const data = { email: 'rocamanuelignacio@gmail.com', password: 'asd123' };
    this.store.dispatch(login(data));
  }

}
