import { Component, Input } from '@angular/core';
import { RecipeService } from 'src/services/recipe.service';
import { Ingredient } from 'src/services/recipe.types';

@Component({
  selector: 'app-ingredient-formatter',
  templateUrl: './ingredient-formatter.component.html',
  styleUrls: ['./ingredient-formatter.component.css']
})
export class IngredientFormatterComponent {
  @Input() ingredients: Ingredient[] = [];
  @Input() title = 'Hi';
  @Input() modifiers: any;

  constructor(
    public recipeService: RecipeService,
  ) { }

  getMachinesNeeded(itemIndex: number, amount: number): string {
    const process = this.recipeService.getProcess(itemIndex).toLowerCase();
    const machineUsed = this.getMachineUsed(process);
    if (process === 'mining') {
      return machineUsed;
    }
    return this.recipeService.getMachinesNeeded(itemIndex, amount, this.modifiers[process]).toFixed(2) + ' ' + machineUsed;
  }

  getMachineUsed(process: string): string {
    switch (process) {
      case 'mining': return 'from mining';
      case 'assembler': return 'assemblers';
      case 'chemical': return 'chemical facilities';
      case 'smelting': return 'smelters';
      case 'collider': return 'particle colliders';
      case 'research': return 'Matrix labs';
      case 'refining': return 'Refiners';
      default: return 'unknown process'
    }
  }

}
