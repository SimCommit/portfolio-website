import { Component } from '@angular/core';
import { ColleagueQuoteComponent } from './colleague-quote/colleague-quote.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-references',
  imports: [ColleagueQuoteComponent, TranslateModule],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss'
})
export class ReferencesComponent {


  
}
