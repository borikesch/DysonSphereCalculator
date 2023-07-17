import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ingredient, Item } from './recipe.types';
import items from '../assets/items/items.json';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    private _jsonURL = 'assets/items/items.json';
    private items: Item[] = [];
    private filteredItems: Item[] = []
    public loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
        this.items = items;
        this.filteredItems = items;
        this.loaded$.next(true);
    }

    /** TODO
     * check amounts made are correct with amount multiplier (plasma refining)
     * process byproducts somehow
     * FUCKING OIL
     * Time restraints
     */
    public getTotalIngredients(itemIndex: number, amount: number): Ingredient[] {
        let result: Ingredient[] = [];
        const itemData = this.filteredItems.find(item => item.index === itemIndex);
        itemData?.recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                let newIngredient: Ingredient = JSON.parse(JSON.stringify(ingredient))
                newIngredient.amount *= recipe.amountMadeMultiplier ? amount / recipe.amountMadeMultiplier : amount;
                result.push(newIngredient);
                result = result.concat(this.getTotalIngredients(newIngredient.index, newIngredient.amount))
            });
        })
        return this.addSimilarIngredients(result);
    }

    public getItems(): Item[] {
        return JSON.parse(JSON.stringify(this.items))
    }

    public filterRecipes(itemIndex?: number, recipeIndex?: number): void {
        if (itemIndex !== undefined && recipeIndex !== undefined) {
            this.filterRecipeByIndex(itemIndex, recipeIndex);
        } else {
            this.filterAllRecipes();
        }
    }

    private filterRecipeByIndex(itemIndex: number, recipeIndex: number): void {
        this.filteredItems[itemIndex].recipes = [this.items[itemIndex].recipes[recipeIndex]];
    }

    private filterAllRecipes() {
        this.filteredItems.forEach(item => {
            item.recipes = [this.items[item.index].recipes[0]];
        })
    }

    private addSimilarIngredients(ingredients: Ingredient[]): Ingredient[] {
        const result: Ingredient[] = []
        ingredients.forEach(ingredient => {
            const ingredientInResult = result.find(i => i.index === ingredient.index)
            if (!ingredientInResult) {
                result.push(JSON.parse(JSON.stringify(ingredient)))
            } else {
                ingredientInResult.amount += ingredient.amount;
            }
        });
        return result;
    }
}