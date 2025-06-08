import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { PrivacyPolicyEnComponent } from './privacy-policy/privacy-policy-en/privacy-policy-en.component';
import { PrivacyPolicyDeComponent } from './privacy-policy/privacy-policy-de/privacy-policy-de.component';
import { LegalNoticeEnComponent } from './legal-notice/legal-notice-en/legal-notice-en.component';
import { LegalNoticeDeComponent } from './legal-notice/legal-notice-de/legal-notice-de.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  {
    path: 'legal-notice',
    component: LegalNoticeComponent,
    children: [
      { path: 'de', component: LegalNoticeDeComponent },
      { path: 'en', component: LegalNoticeEnComponent },
      { path: '', redirectTo: 'de', pathMatch: 'full' },
    ],
  },

  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    children: [
      { path: 'de', component: PrivacyPolicyDeComponent },
      { path: 'en', component: PrivacyPolicyEnComponent },
      { path: '', redirectTo: 'de', pathMatch: 'full' },
    ],
  },
];
