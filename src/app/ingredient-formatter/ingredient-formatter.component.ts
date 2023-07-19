import { Component, Input } from '@angular/core';
import { Ingredient } from 'src/services/recipe.types';

@Component({
  selector: 'app-ingredient-formatter',
  templateUrl: './ingredient-formatter.component.html',
  styleUrls: ['./ingredient-formatter.component.css']
})
export class IngredientFormatterComponent {
  @Input() ingredients: Ingredient[] = [];
  @Input() title = 'Hi';
}
