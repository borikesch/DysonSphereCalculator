import { TestBed } from '@angular/core/testing';
import { RecipeService } from './recipe.service';
import { Item } from './recipe.types';

describe('RecipeService', () => {
    let service: RecipeService;
    let items: Item[]

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: []
        });
        service = new RecipeService();
        items = service.getItems();
    });

    it('should be able to get items', () => {
        expect(items.length > 0).toBe(true);
    });

    it('should have unique ids for every item', () => {
        let counter = 0
        items.forEach(item => {
            const itemsWithSameId = items.filter(i => i.index === item.index);
            expect(itemsWithSameId.length).toBe(1);
            counter++;
        });
        expect(counter).toBe(items.length);
    });

    it('should have consistent ids for every item in every recipe', () => {
        let counter = 0;
        items.forEach(itemBeingChecked => {
            items.forEach(item => {
                item.recipes.forEach(recipe => {
                    recipe.ingredients.forEach(ingredient => {
                        if (ingredient.name === itemBeingChecked.name) {
                            if (ingredient.index !== itemBeingChecked.index) {
                                console.log('following item in json needs to be checked:', item.index);
                            }
                            expect(ingredient.index === itemBeingChecked.index).toBe(true);
                        } else if (ingredient.index === itemBeingChecked.index) {
                            if (ingredient.name !== itemBeingChecked.name) {
                                console.log('following item in json needs to be checked:', item.index);
                            }
                            expect(ingredient.name === itemBeingChecked.name).toBe(true);
                        }
                    });
                });
            });
            counter++;
        });
        expect(counter).toBe(items.length);
    });

    it('should have a mining recipe for all minable items in game', () => {
        const minableItems = ['Water']
        items.forEach(item => {
            if (minableItems.find(mineableItem => mineableItem === item.name) !== undefined) {
                expect(item.recipes.filter(recipe => recipe.process === 'Mining').length).toBe(1);
            }
        })
    });

    const testCases = [
        { name: 'Iron Ingot', ingredients: [{ name: 'Iron Ore', amount: 1 }], time: 1, process: 'Smelting' }
    ];

    testCases.forEach(test => {
        it(`should contain the correct recipe for ${test.name}`, () => {
            const item = items.find(item => item.name === test.name);
            let found = false;
            item?.recipes.forEach(recipe => {
                let match = true;
                recipe.ingredients.forEach(ingredient => {
                    const testIngredient = test.ingredients.find(ingr => ingr.name === ingredient.name)
                    if (!testIngredient || testIngredient?.amount !== ingredient?.amount) {
                        match = false;
                    }
                });
                if (recipe.time !== test.time) {
                    match = false;
                }
                if (recipe.process !== test.process) {
                    match = false;
                }
                if (match) {
                    found = true;
                }
            });
            expect(found).toBe(true);
        });
    });
});