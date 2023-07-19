import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ingredient, Item, Recipe } from './recipe.types';
import items from '../assets/items/items.json';

@Injectable({
    providedIn: 'root',
})
export class RecipeService {
    private items: Item[] = [];
    private filteredItems: Item[] = []
    public loaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor() {
        this.items = items;
        this.removeRefiningRecipes();
        this.filteredItems = JSON.parse(JSON.stringify(items));
        this.loaded$.next(true);
    }

    /** TODO
     * process byproducts somehow
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

    /**
     * Get Recipe outlay
     */
    public getRecipeOutlay(itemIndex: number, amount: number, level: number = 1): string {
        let result: string = '';
        const itemData = this.filteredItems.find(item => item.index === itemIndex);
        itemData?.recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                let newIngredient: Ingredient = JSON.parse(JSON.stringify(ingredient))
                newIngredient.amount *= recipe.amountMadeMultiplier ? amount / recipe.amountMadeMultiplier : amount;
                result += '\n'
                if (level) {
                    result += '-'.repeat(level);
                }
                result += newIngredient.amount + ' ' + newIngredient.name;
                result += this.getRecipeOutlay(newIngredient.index, newIngredient.amount, level + 1);
            });
        });
        return result;
    }

    public getMachinesNeeded(itemIndex: number, amount: number, modifier: number): number {
        let result = 1;
        const itemData = this.filteredItems.find(item => item.index === itemIndex);
        itemData?.recipes.forEach(recipe => {
            const recipeTime = recipe.time;
            const amountMade = recipe.amountMadeMultiplier ?? 1;
            const madePerMinute = amountMade * 60 * modifier / recipeTime;
            result = amount / madePerMinute;
        });
        return result;
    }

    public getProcess(itemIndex: number): string {
        let result = '';
        const itemData = this.filteredItems.find(item => item.index === itemIndex);
        itemData?.recipes.forEach(recipe => {
            result = recipe.process;
        });
        return result;
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

    /**
     * Removes all recipes that include an input in the output, because I don't know what to do with them
     */
    private removeRefiningRecipes() {
        this.items.forEach(item => {
            let recipesToKeep: Recipe[] = []
            item.recipes.forEach(recipe => {
                let keepRecipe = true;
                recipe.ingredients.forEach(ingredient => {
                    if (ingredient.index === item.index) {
                        keepRecipe = false;
                    }
                })
                if (keepRecipe) {
                    recipesToKeep.push(recipe);
                }
            })
            item.recipes = recipesToKeep;
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