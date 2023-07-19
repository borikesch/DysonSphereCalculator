import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientFormatterComponent } from './ingredient-formatter.component';

describe('IngredientFormatterComponent', () => {
  let component: IngredientFormatterComponent;
  let fixture: ComponentFixture<IngredientFormatterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngredientFormatterComponent]
    });
    fixture = TestBed.createComponent(IngredientFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
