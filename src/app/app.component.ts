import { Component, OnInit, SimpleChanges } from '@angular/core';
import { filter } from 'rxjs';
import { RecipeService } from 'src/services/recipe.service';
import { Ingredient, Item, Recipe } from 'src/services/recipe.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public itemsCopy: Item[] = [];
  public duplicateRecipeItems: Item[] = [];
  public amount: any;
  public itemId: any;
  public result: Ingredient[] = [];
  public alternativeRecipeIndex: string[] = [];

  constructor(
    public recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
    this.recipeService.loaded$.pipe(filter(v => !!v)).subscribe(() => {
      this.itemsCopy = this.recipeService.getItems();
      this.itemsCopy.sort((left, right) => left.name < right.name ? -1 : 1);
      this.recipeService.filterRecipes();
      this.getDuplicateRecipes();
    });
  }

  onClickCalculate(): void {
    this.result = this.recipeService.getTotalIngredients(parseInt(this.itemId), parseInt(this.amount));
    this.result.sort((left, right) => left.name < right.name ? -1 : 1);
  }

  onChangeAlternateRecipe(indexInHtml: number, indexInList: number) {
    this.recipeService.filterRecipes(indexInList, parseInt(this.alternativeRecipeIndex[indexInHtml], 10));
  }

  getOptionText(recipe: Recipe): string {
    let result = recipe.process + ': ';
    recipe.ingredients.forEach(ingredient => {
      result += ingredient.amount + ' ' + ingredient.name + ' ';
    });
    result += 'turned into ' + (recipe.amountMadeMultiplier ?? 1);
    return result;
  }

  private getDuplicateRecipes() {
    this.itemsCopy.forEach(item => {
      if (item.recipes.length > 1) {
        this.duplicateRecipeItems.push(item);
      }
    })
  }
}
