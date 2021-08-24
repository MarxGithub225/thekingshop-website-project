import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesbarComponent } from './categoriesbar.component';

describe('CategoriesbarComponent', () => {
  let component: CategoriesbarComponent;
  let fixture: ComponentFixture<CategoriesbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
