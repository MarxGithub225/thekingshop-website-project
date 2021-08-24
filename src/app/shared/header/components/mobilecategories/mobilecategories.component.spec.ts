import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilecategoriesComponent } from './mobilecategories.component';

describe('MobilecategoriesComponent', () => {
  let component: MobilecategoriesComponent;
  let fixture: ComponentFixture<MobilecategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilecategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilecategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
