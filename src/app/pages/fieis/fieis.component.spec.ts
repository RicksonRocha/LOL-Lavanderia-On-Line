import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieisComponent } from './fieis.component';

describe('FieisComponent', () => {
  let component: FieisComponent;
  let fixture: ComponentFixture<FieisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
