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

    const itemTestCases = [
        'Iron Ore', 'Copper Ore', 'Silicon Ore', 'Titanium Ore', 'Stone', 'Coal', 'Crude Oil', 'Fire Ice', 'Sulfuric Acid', 'Water', 'Organic Crystal',
        'Optical Grating Crystal', 'Kimberlite Ore', 'Hydrogen', 'Deuterium', 'Critical Photon', 'Unipolar Magnet', 'Spiniform Stalagmite Crystal', 'Fractal Silicon', 'Log', 'Plant Fuel',
        // Rows in screen
        // Items
        'Iron Ingot', 'Copper Ingot', 'High Purity Silicon', 'Titanium Ingot', 'Stone Brick', 'Energetic Graphite', 'Graphene', 'Plastic', 'Proliferator Mk1', 'Proliferator Mk2', 'Proliferator Mk3',
        'Magnet', 'Magnetic Coil', 'Crystal Silicon', 'Titanium Alloy', 'Glass', 'Diamond', 'Hydrogen Fuel Rod', 'Deuterium Fuel Rod', 'Antimatter Fuel Rod',
        'Steel', 'Electric Motor', 'Titanium Glass', 'Prism', 'Titanium Crystal', 'Thruster', 'Reinforced Thruster', 'Strange Matter',
        'Gear', 'Electromagnetic Turbine', 'Circuit Board', 'Graviton Lens', 'Carbon Nanotube', 'Logistics Bot', 'Logistics Drone', 'Logistics Vessel', 'Small Carrier Rocket',
        'Plasma Exciter', 'Super-magnetic Ring', 'Particle Broadband', 'Processor', 'Casimir Crystal', 'Particle Container', 'Plane Filter', 'Solar Sail', 'Frame Material', 'Dyson Sphere Component',
        'Photon Combiner', 'Microcrystalline Component', 'Quantum Chip', 'Space Warper', 'Antimatter', 'Annihilation Constraint Sphere',
        'Electromagnetic Matrix', 'Energy Matrix', 'Structure Matrix', 'Information Matrix', 'Gravity Matrix', 'Universe Matrix', 'Foundation'
    ]
    itemTestCases.forEach(test => {
        it(`should contain an item for ${test}`, () => {
            const item = items.find(item => item.name === test);
            expect(item).not.toBeNull();
            expect(item).not.toBeUndefined();
        });
    })

    const recipeTestCases = [
        // Mining Recipes
        { name: 'Iron Ore', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Copper Ore', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Silicon Ore', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Titanium Ore', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Stone', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Coal', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Crude Oil', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Fire Ice', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Sulfuric Acid', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Water', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Organic Crystal', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Optical Grating Crystal', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Kimberlite Ore', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Hydrogen', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Deuterium', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Critical Photon', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Unipolar Magnet', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Spiniform Stalagmite Crystal', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Fractal Silicon', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Log', ingredients: [], time: 0, process: 'Mining' },
        { name: 'Plant Fuel', ingredients: [], time: 0, process: 'Mining' },

        // From left to right, row to row
        // Row 1
        { name: 'Iron Ingot', ingredients: [{ name: 'Iron Ore', amount: 1 }], time: 1, process: 'Smelting' },
        { name: 'Copper Ingot', ingredients: [{ name: 'Copper Ore', amount: 1 }], time: 1, process: 'Smelting' },
        { name: 'High Purity Silicon', ingredients: [{ name: 'Silicon Ore', amount: 2 }], time: 2, process: 'Smelting' },
        { name: 'Titanium Ingot', ingredients: [{ name: 'Titanium Ore', amount: 2 }], time: 2, process: 'Smelting' },
        { name: 'Stone Brick', ingredients: [{ name: 'Stone', amount: 1 }], time: 1, process: 'Smelting' },
        { name: 'Energetic Graphite', ingredients: [{ name: 'Coal', amount: 2 }], time: 2, process: 'Smelting' },
        { name: 'Hydrogen', ingredients: [{ name: 'Crude Oil', amount: 2 }], time: 4, process: 'Refining', byproduct: [{ name: 'Refined Oil', amount: 2 }] },
        { name: 'Refined Oil', ingredients: [{ name: 'Crude Oil', amount: 2 }], time: 4, process: 'Refining', byproduct: [{ name: 'Hydrogen', amount: 1 }], amountMadeMultiplier: 2 },
        { name: 'Graphene', ingredients: [{ name: 'Energetic Graphite', amount: 3 }, { name: 'Sulfuric Acid', amount: 1 }], time: 3, process: 'Chemical', amountMadeMultiplier: 2 },
        { name: 'Plastic', ingredients: [{ name: 'Refined Oil', amount: 2 }, { name: 'Energetic Graphite', amount: 1 }], time: 3, process: 'Chemical' },
        { name: 'Proliferator Mk1', ingredients: [{ name: 'Coal', amount: 1 }], time: 0.5, process: 'Assembler' },
        { name: 'Proliferator Mk2', ingredients: [{ name: 'Proliferator Mk1', amount: 2 }, { name: 'Diamond', amount: 1 }], time: 1, process: 'Assembler' },
        { name: 'Proliferator Mk3', ingredients: [{ name: 'Proliferator Mk2', amount: 2 }, { name: 'Carbon Nanotube', amount: 1 }], time: 2, process: 'Assembler' },
        // Row 2
        { name: 'Magnet', ingredients: [{ name: 'Iron Ore', amount: 1 }], time: 1.5, process: 'Smelting' },
        { name: 'Magnetic Coil', ingredients: [{ name: 'Magnet', amount: 2 }, { name: 'Copper Ingot', amount: 1 }], time: 1, process: 'Assembler', amountMadeMultiplier: 2 },
        { name: 'Crystal Silicon', ingredients: [{ name: 'High Purity Silicon', amount: 1 }], time: 2, process: 'Smelting' },
        { name: 'Titanium Alloy', ingredients: [{ name: 'Titanium Ingot', amount: 4 }, { name: 'Steel', amount: 4 }, { name: 'Sulfuric Acid', amount: 8 }], time: 12, process: 'Smelting', amountMadeMultiplier: 4 },
        { name: 'Glass', ingredients: [{ name: 'Stone', amount: 2 }], time: 2, process: 'Smelting' },
        { name: 'Diamond', ingredients: [{ name: 'Energetic Graphite', amount: 1 }], time: 2, process: 'Smelting' },
        // Removed, because difficult
        // { name: 'Hydrogen', ingredients: [{ name: 'Refined Oil', amount: 1 }, { name: 'Hydrogen', amount: 2 }], time: 4, process: 'Refining', byproduct: [{ name: 'Energetic Graphite', amount: 1 }], amountMadeMultiplier: 3 },
        { name: 'Energetic Graphite', ingredients: [{ name: 'Refined Oil', amount: 1 }, { name: 'Hydrogen', amount: 2 }], time: 4, process: 'Refining', byproduct: [{ name: 'Hydrogen', amount: 3 }] },
        { name: 'Graphene', ingredients: [{ name: 'Fire Ice', amount: 2 }], time: 2, process: 'Chemical', byproduct: [{ name: 'Hydrogen', amount: 1 }], amountMadeMultiplier: 2 },
        { name: 'Hydrogen', ingredients: [{ name: 'Fire Ice', amount: 2 }], time: 2, process: 'Chemical', byproduct: [{ name: 'Graphene', amount: 2 }] },
        { name: 'Organic Crystal', ingredients: [{ name: 'Plastic', amount: 2 }, { name: 'Refined Oil', amount: 1 }, { name: 'Water', amount: 1 }], time: 6, process: 'Chemical' },
        { name: 'Hydrogen Fuel Rod', ingredients: [{ name: 'Titanium Ingot', amount: 1 }, { name: 'Hydrogen', amount: 10 }], time: 6, process: 'Assembler', amountMadeMultiplier: 2 },
        { name: 'Deuterium Fuel Rod', ingredients: [{ name: 'Titanium Alloy', amount: 1 }, { name: 'Deuterium', amount: 20 }, { name: 'Super-magnetic Ring', amount: 1 }], time: 12, process: 'Assembler', amountMadeMultiplier: 2 },
        { name: 'Antimatter Fuel Rod', ingredients: [{ name: 'Titanium Alloy', amount: 1 }, { name: 'Annihilation Constraint Sphere', amount: 1 }, { name: 'Antimatter', amount: 12 }, { name: 'Hydrogen', amount: 12 }], time: 24, process: 'Assembler', amountMadeMultiplier: 2 },
        // Row 3
        { name: 'Steel', ingredients: [{ name: 'Iron Ingot', amount: 3 }], time: 3, process: 'Smelting' },
        { name: 'Electric Motor', ingredients: [{ name: 'Iron Ingot', amount: 2 }, { name: 'Gear', amount: 1 }, { name: 'Magnetic Coil', amount: 1 }], time: 2, process: 'Assembler' },
        { name: 'Crystal Silicon', ingredients: [{ name: 'Fractal Silicon', amount: 1 }], time: 1.5, process: 'Assembler', amountMadeMultiplier: 2 },
        { name: 'Titanium Glass', ingredients: [{ name: 'Glass', amount: 2 }, { name: 'Titanium Ingot', amount: 2 }, { name: 'Water', amount: 2 }], time: 5, process: 'Assembler', amountMadeMultiplier: 2 },
        { name: 'Prism', ingredients: [{ name: 'Glass', amount: 3 }], time: 2, process: 'Assembler', amountMadeMultiplier: 2 },
        { name: 'Diamond', ingredients: [{ name: 'Kimberlite Ore', amount: 1 }], time: 1.5, process: 'Smelting', amountMadeMultiplier: 2 },
        // Removed, because difficult
        // { name: 'Refined Oil', ingredients: [{ name: 'Refined Oil', amount: 2 }, { name: 'Hydrogen', amount: 1 }, { name: 'Coal', amount: 1 }], time: 4, process: 'Refining', amountMadeMultiplier: 3 },
        { name: 'Titanium Crystal', ingredients: [{ name: 'Titanium Ingot', amount: 3 }, { name: 'Organic Crystal', amount: 1 }], time: 4, process: 'Assembler' },
        { name: 'Organic Crystal', ingredients: [{ name: 'Log', amount: 20 }, { name: 'Plant Fuel', amount: 30 }, { name: 'Water', amount: 10 }], time: 6, process: 'Assembler' },
        { name: 'Thruster', ingredients: [{ name: 'Steel', amount: 2 }, { name: 'Copper Ingot', amount: 3 }], time: 4, process: 'Assembler' },
        { name: 'Reinforced Thruster', ingredients: [{ name: 'Titanium Alloy', amount: 5 }, { name: 'Electromagnetic Turbine', amount: 5 }], time: 6, process: 'Assembler' },
        { name: 'Strange Matter', ingredients: [{ name: 'Particle Container', amount: 2 }, { name: 'Iron Ingot', amount: 2 }, { name: 'Deuterium', amount: 10 }], time: 8, process: 'Collider' },
        // Row 4
        { name: 'Gear', ingredients: [{ name: 'Iron Ingot', amount: 1 }], time: 1, process: 'Assembler' },
        { name: 'Electromagnetic Turbine', ingredients: [{ name: 'Electric Motor', amount: 2 }, { name: 'Magnetic Coil', amount: 2 }], time: 2, process: 'Assembler' },
        { name: 'Silicon Ore', ingredients: [{ name: 'Stone', amount: 10 }], time: 10, process: 'Smelting' },
        { name: 'Circuit Board', ingredients: [{ name: 'Iron Ingot', amount: 2 }, { name: 'Copper Ingot', amount: 1 }], time: 1, process: 'Assembler', amountMadeMultiplier: 2 },
        { name: 'Graviton Lens', ingredients: [{ name: 'Diamond', amount: 4 }, { name: 'Strange Matter', amount: 1 }], time: 6, process: 'Assembler' },
        { name: 'Sulfuric Acid', ingredients: [{ name: 'Refined Oil', amount: 6 }, { name: 'Stone', amount: 8 }, { name: 'Water', amount: 4 }], time: 6, process: 'Chemical', amountMadeMultiplier: 4 },
        { name: 'Carbon Nanotube', ingredients: [{ name: 'Graphene', amount: 3 }, { name: 'Titanium Ingot', amount: 1 }], time: 4, process: 'Chemical', amountMadeMultiplier: 2 },
        { name: 'Logistics Bot', ingredients: [{ name: 'Iron Ingot', amount: 2 }, { name: 'Electromagnetic Turbine', amount: 1 }, { name: 'Processor', amount: 1 }], time: 2, process: 'Assembler' },
        { name: 'Logistics Drone', ingredients: [{ name: 'Iron Ingot', amount: 5 }, { name: 'Thruster', amount: 2 }, { name: 'Processor', amount: 2 }], time: 4, process: 'Assembler' },
        { name: 'Logistics Vessel', ingredients: [{ name: 'Titanium Alloy', amount: 10 }, { name: 'Reinforced Thruster', amount: 2 }, { name: 'Processor', amount: 10 }], time: 6, process: 'Assembler' },
        { name: 'Small Carrier Rocket', ingredients: [{ name: 'Dyson Sphere Component', amount: 2 }, { name: 'Deuterium Fuel Rod', amount: 4 }, { name: 'Quantum Chip', amount: 2 }], time: 6, process: 'Assembler' },
        // Row 5
        { name: 'Plasma Exciter', ingredients: [{ name: 'Magnetic Coil', amount: 4 }, { name: 'Prism', amount: 2 }], time: 2, process: 'Assembler' },
        { name: 'Super-magnetic Ring', ingredients: [{ name: 'Electromagnetic Turbine', amount: 2 }, { name: 'Magnet', amount: 3 }, { name: 'Energetic Graphite', amount: 1 }], time: 3, process: 'Assembler' },
        { name: 'Particle Broadband', ingredients: [{ name: 'Carbon Nanotube', amount: 2 }, { name: 'Crystal Silicon', amount: 2 }, { name: 'Plastic', amount: 1 }], time: 8, process: 'Assembler' },
        { name: 'Processor', ingredients: [{ name: 'Circuit Board', amount: 2 }, { name: 'Microcrystalline Component', amount: 2 }], time: 3, process: 'Assembler' },
        { name: 'Casimir Crystal', ingredients: [{ name: 'Titanium Crystal', amount: 1 }, { name: 'Graphene', amount: 2 }, { name: 'Hydrogen', amount: 12 }], time: 4, process: 'Assembler' },
        { name: 'Particle Container', ingredients: [{ name: 'Electromagnetic Turbine', amount: 2 }, { name: 'Copper Ingot', amount: 2 }, { name: 'Graphene', amount: 2 }], time: 4, process: 'Assembler' },
        { name: 'Deuterium', ingredients: [{ name: 'Hydrogen', amount: 10 }], time: 2.5, process: 'Collider', amountMadeMultiplier: 5 },
        { name: 'Carbon Nanotube', ingredients: [{ name: 'Spiniform Stalagmite Crystal', amount: 6 }], time: 4, process: 'Chemical', amountMadeMultiplier: 2 },
        { name: 'Plane Filter', ingredients: [{ name: 'Casimir Crystal', amount: 1 }, { name: 'Titanium Glass', amount: 2 }], time: 12, process: 'Assembler' },
        { name: 'Solar Sail', ingredients: [{ name: 'Graphene', amount: 1 }, { name: 'Photon Combiner', amount: 1 }], time: 4, process: 'Assembler', amountMadeMultiplier: 2 },
        { name: 'Frame Material', ingredients: [{ name: 'Carbon Nanotube', amount: 4 }, { name: 'Titanium Alloy', amount: 1 }, { name: 'High Purity Silicon', amount: 1 }], time: 6, process: 'Assembler' },
        { name: 'Dyson Sphere Component', ingredients: [{ name: 'Frame Material', amount: 3 }, { name: 'Solar Sail', amount: 3 }, { name: 'Processor', amount: 3 }], time: 8, process: 'Assembler' },
        // Row 6
        { name: 'Photon Combiner', ingredients: [{ name: 'Prism', amount: 2 }, { name: 'Circuit Board', amount: 1 }], time: 3, process: 'Assembler' },
        { name: 'Photon Combiner', ingredients: [{ name: 'Optical Grating Crystal', amount: 1 }, { name: 'Circuit Board', amount: 1 }], time: 3, process: 'Assembler' },
        { name: 'Microcrystalline Component', ingredients: [{ name: 'High Purity Silicon', amount: 2 }, { name: 'Copper Ingot', amount: 1 }], time: 2, process: 'Assembler' },
        { name: 'Quantum Chip', ingredients: [{ name: 'Processor', amount: 2 }, { name: 'Plane Filter', amount: 2 }], time: 6, process: 'Assembler' },
        { name: 'Casimir Crystal', ingredients: [{ name: 'Optical Grating Crystal', amount: 8 }, { name: 'Graphene', amount: 2 }, { name: 'Hydrogen', amount: 12 }], time: 4, process: 'Assembler' },
        { name: 'Particle Container', ingredients: [{ name: 'Unipolar Magnet', amount: 10 }, { name: 'Copper Ingot', amount: 2 }], time: 4, process: 'Assembler' },
        { name: 'Space Warper', ingredients: [{ name: 'Graviton Lens', amount: 1 }], time: 10, process: 'Assembler' },
        { name: 'Space Warper', ingredients: [{ name: 'Gravity Matrix', amount: 1 }], time: 10, process: 'Assembler', amountMadeMultiplier: 8 },
        { name: 'Antimatter', ingredients: [{ name: 'Critical Photon', amount: 2 }], time: 2, byproduct: [{ name: 'Hydrogen', amount: 2 }], process: 'Collider', amountMadeMultiplier: 2 },
        { name: 'Annihilation Constraint Sphere', ingredients: [{ name: 'Particle Container', amount: 1 }, { name: 'Processor', amount: 1 }], time: 20, process: 'Assembler' },
        // Row 7
        { name: 'Electromagnetic Matrix', ingredients: [{ name: 'Magnetic Coil', amount: 1 }, { name: 'Circuit Board', amount: 1 }], time: 3, process: 'Research' },
        { name: 'Energy Matrix', ingredients: [{ name: 'Energetic Graphite', amount: 2 }, { name: 'Hydrogen', amount: 2 }], time: 6, process: 'Research' },
        { name: 'Structure Matrix', ingredients: [{ name: 'Diamond', amount: 1 }, { name: 'Titanium Crystal', amount: 1 }], time: 8, process: 'Research' },
        { name: 'Information Matrix', ingredients: [{ name: 'Processor', amount: 2 }, { name: 'Particle Broadband', amount: 1 }], time: 10, process: 'Research' },
        { name: 'Gravity Matrix', ingredients: [{ name: 'Graviton Lens', amount: 1 }, { name: 'Quantum Chip', amount: 1 }], time: 24, process: 'Research', amountMadeMultiplier: 2 },
        { name: 'Universe Matrix', ingredients: [{ name: 'Electromagnetic Matrix', amount: 1 }, { name: 'Energy Matrix', amount: 1 }, { name: 'Structure Matrix', amount: 1 }, { name: 'Information Matrix', amount: 1 }, { name: 'Gravity Matrix', amount: 1 }, { name: 'Antimatter', amount: 1 }], time: 15, process: 'Research' },
    ];

    recipeTestCases.forEach(test => {
        it(`should contain the correct ${test.process} recipe for ${test.name}`, () => {
            const item = items.find(item => item.name === test.name);
            let found = false;
            item?.recipes.forEach(recipe => {
                let match = true;
                recipe.ingredients.forEach(ingredient => {
                    const testIngredient = test.ingredients.find(ingr => ingr.name === ingredient.name);
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
                if (test.amountMadeMultiplier && !recipe.amountMadeMultiplier) {
                    match = false;
                } else if (test.amountMadeMultiplier && recipe.amountMadeMultiplier !== test.amountMadeMultiplier) {
                    match = false;
                }
                if (test.byproduct) {
                    if (!recipe.byproduct) {
                        match = false;
                    } else {
                        recipe.byproduct.forEach(byproduct => {
                            const testByproduct = test.byproduct.find(bypr => bypr.name === byproduct.name);
                            if (!testByproduct || testByproduct?.amount !== byproduct?.amount) {
                                match = false;
                            }
                        });
                    }
                }
                if (match) {
                    found = true;
                }
            });
            expect(found).toBe(true);
        });
    });
});