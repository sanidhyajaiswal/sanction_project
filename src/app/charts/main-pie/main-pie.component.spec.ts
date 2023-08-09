import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPieComponent } from './main-pie.component';

describe('MainPieComponent', () => {
  let component: MainPieComponent;
  let fixture: ComponentFixture<MainPieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainPieComponent]
    });
    fixture = TestBed.createComponent(MainPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
