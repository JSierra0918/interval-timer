import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { TimerContainerComponent } from '../timer-container/timer-container.component';
import { SubtimerComponent } from '../subtimer/subtimer.component';
import { MaintimerComponent } from '../maintimer/maintimer.component';
import { ProfileFormComponent } from '../profile-form/profile-form.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [Tab1Page, TimerContainerComponent, SubtimerComponent, MaintimerComponent, ProfileFormComponent]
})
export class Tab1PageModule {}
