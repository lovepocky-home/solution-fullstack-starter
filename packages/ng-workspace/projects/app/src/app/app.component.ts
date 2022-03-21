import { Component } from '@angular/core';
import { ExampleGQL } from 'gql-api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app';

  constructor(e: ExampleGQL) { }
}
