import { Routes } from "@angular/router";
import { RecipesComponent } from "./recipes-main/recipes.component";
import { ingredientDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesHistoryComponent } from "./recipes-history/recipes-history.component";
import { RecipesFiltersComponent } from "./recipes-filters/recipe-filters.component";
import { RecipeStepByStepComponent } from "./recipe-step-by-step/recipe-step-by-step.component";

export const RECIPES_ROUTES: Routes = [
    {
        path : '',
        component: RecipesComponent,
    },
    {
        path : 'details/:id',
        component: ingredientDetailComponent,
    },
    {
        path: 'history',
        component: RecipesHistoryComponent
    },
    {
        path: 'filters',
        component: RecipesFiltersComponent,
     },
     {
        path: 'step-by-step/:id',
        component: RecipeStepByStepComponent,
     },
]