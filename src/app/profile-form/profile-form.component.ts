import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit {
  test = Array(5);
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async dismissModal() {
		console.log("DISMISS");
		this.modalController.dismiss({
			dismissed: true,
		});    
	}
}
