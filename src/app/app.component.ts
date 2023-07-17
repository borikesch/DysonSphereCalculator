import { Component, OnInit, SimpleChanges } from '@angular/core';
import { filter } from 'rxjs';
import { RecipeService } from 'src/services/recipe.service';
import { Ingredient, Item } from 'src/services/recipe.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public itemsCopy: Item[] = [];
  public amount: any;
  public itemId: any;
  public result: Ingredient[] = [];

  constructor(
    public recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
    this.recipeService.loaded$.pipe(filter(v => !!v)).subscribe(() => {
      this.itemsCopy = this.recipeService.getItems();
      this.itemsCopy.sort((left, right) => left.name < right.name ? -1 : 1);
      this.recipeService.filterRecipes();
    });
  }

  onClickCalculate(): void {
    this.result = this.recipeService.getTotalIngredients(parseInt(this.itemId), parseInt(this.amount))
  }
}
