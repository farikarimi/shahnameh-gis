import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoobjectsComponent } from './geoobjects.component';

describe('GeoobjectsComponent', () => {
  let component: GeoobjectsComponent;
  let fixture: ComponentFixture<GeoobjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoobjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoobjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
