import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { TimerContainerComponent } from '../timer-container/timer-container.component';
import { SubtimerComponent } from '../subtimer/subtimer.component';
import { MaintimerComponent } from '../maintimer/maintimer.component';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { ProfileListComponent } from '../profile-list/profile-list.component';

@NgModule({
	imports: [IonicModule, CommonModule, ReactiveFormsModule, Tab1PageRoutingModule],
	declarations: [Tab1Page, TimerContainerComponent, SubtimerComponent, MaintimerComponent, ProfileFormComponent, ProfileListComponent],
})
export class Tab1PageModule {}
