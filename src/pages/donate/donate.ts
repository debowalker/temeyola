import { Component } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// import { Settings } from '../../providers/providers';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'donate',
  templateUrl: 'donate.html'
})
export class DonatePage {
  // Our local settings object


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public translate: TranslateService) {
  }

  ngOnChanges() {
    console.log('Ng All Changes');
  }
}
