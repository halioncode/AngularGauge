import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalogueGaugeComponent } from './analogue-gauge.component';

describe('AnalogueGaugeComponent', () => {
  let component: AnalogueGaugeComponent;
  let fixture: ComponentFixture<AnalogueGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalogueGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalogueGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
