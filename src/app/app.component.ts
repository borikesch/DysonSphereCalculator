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
  public recipeResult: string = '';
  public alternativeRecipeIndex: string[] = [];
  public proliferatorResult: Ingredient[] = []
  public assemblerModifier: string = '0.75';
  public smelterModifier: string = '1';
  public proliferatorModifier: string = '0';

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
    this.resetValues();
    this.result = this.recipeService.getTotalIngredients(parseInt(this.itemId), parseInt(this.amount));
    this.result.sort((left, right) => left.name < right.name ? -1 : 1);
    this.getProliferatorResult();
  }

  onClickGetRecipe(): void {
    this.resetValues();
    this.recipeResult = this.recipeService.getRecipeOutlay(parseInt(this.itemId), parseInt(this.amount));
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
        this.alternativeRecipeIndex.push('0');
      }
    })
  }

  private getProliferatorResult() {
    let sprayNeeded = 0;
    const proliferatorMk1Item = this.itemsCopy.find(i => i.name === 'Proliferator Mk1')
    const proliferatorMk2Item = this.itemsCopy.find(i => i.name === 'Proliferator Mk2')
    const proliferatorMk3Item = this.itemsCopy.find(i => i.name === 'Proliferator Mk3')

    if (!proliferatorMk1Item || !proliferatorMk2Item || !proliferatorMk3Item) {
      return;
    }

    this.result.forEach(ingredient => {
      sprayNeeded += ingredient.amount;
    })

    switch (this.proliferatorModifier) {
      case '60':
        this.proliferatorResult = this.recipeService.getTotalIngredients(proliferatorMk3Item.index, parseFloat((sprayNeeded / 60).toFixed(2)));
        break;
      case '12':
        this.proliferatorResult = this.recipeService.getTotalIngredients(proliferatorMk1Item.index, parseFloat((sprayNeeded / 12).toFixed(2)));
        break;
      case '24':
        this.proliferatorResult = this.recipeService.getTotalIngredients(proliferatorMk2Item.index, parseFloat((sprayNeeded / 24).toFixed(2)));
        break;
      default:
        this.proliferatorResult = [];
    }
  }

  private resetValues() {
    this.proliferatorResult = [];
    this.result = [];
    this.recipeResult = '';
  }
}
