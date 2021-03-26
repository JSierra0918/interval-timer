import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MaintimerComponent } from './maintimer.component';

describe('MaintimerComponent', () => {
  let component: MaintimerComponent;
  let fixture: ComponentFixture<MaintimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintimerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MaintimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
