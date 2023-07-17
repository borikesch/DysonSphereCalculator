export interface Item {
    name: string;
    index: number;
    recipes: Recipe[];
}

export interface Recipe {
    time: number;
    process: string; // TODO: enum
    ingredients: Ingredient[]
}

export interface Ingredient {
    name: string;
    index: number;
    amount: number;
}