import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubtimerComponent } from './subtimer.component';

describe('SubtimerComponent', () => {
  let component: SubtimerComponent;
  let fixture: ComponentFixture<SubtimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtimerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubtimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
