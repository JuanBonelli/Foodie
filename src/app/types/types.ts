import { Type } from "@angular/core";

export type User = {
  id?: string;
  firstName: string;
  lastName: string;
};

export type Questionnaire = {
  id: number;
  name: string;
  isActive: boolean;
  questions: Question[];
};

export type Question = {
  id: number;
  questionType: string;
  statement: string;
  isActive: boolean;
  options: QuestionOption[];
};

export type QuestionOption = {
  id: number;
  product_id: number;
  product_category_id: number;
  label: string;
  isActive: boolean;
};

export type QuestionAnswer = {
  questionId: number;
  questionOptionsId: number[];
};

export type Product = {
  id: number;
  name: string;
  img: string;
  totalQuantity: number;
  categoryName: string;
  categoryId: number;
  unitType: string;
  items: ProductItem[];
};

export type ProductItem = {
  approximateDaysExpiration: number;
  entryDate: string;
  initialQuantity: number;
  currentQuantity: number;
  unitType: string;
};

export type InventoryProductResponse = {
  initialQuantity: number;
  currentQuantity: number;
  entryDate: Date;
  product: ProductResponse;
};

export type InventoryProductBody = {
  productID: number;
  packageId?: number;
  quantity: number;
  type: 'MASS' | 'UNITARY';
};

export type ProductResponse = {
  id: number;
  imageUrl: string;
  name: string;
  unitType: string;
  packages: APackage[];
  approximateDaysExpiration: number;
  productCategories: ProductCategory[];
};

export type Category = {
  id: number;
  name: string;
};

export type InventoryPreloadBatch = {
  id: number;
  status: string;
  items: InventoryPreloadBatchItem[];
};

export type InventoryPreloadBatchItem = {
  product: ProductResponse;
  img?: string;
  quantity: number;
  type?: 'MASS' | 'UNIT';
  apackage: APackage | null;
};

export type APackage = {
  id: number;
  productId: number;
  packageSize: number;
  isDefault: boolean;
}

export type ProductCategory = {
  category: Category;
  isPrincipal: boolean;
};

export type InventoryFilter = {
  orderBy: string;
  filterBy: {
    category: Category;
    isNearToExpirate: boolean;
    unitType: string;
  };
};

export type Unit = {
  id: number;
  name: string;
};


export type Recipe = {
  id: number;
  name: string;
  recipeType: RecipeType;
  recipeTime: RecipeTime;
  recipeDescription: string;
  estimatedTimeInMinutes: number;
  products: ProductInRecipe[];
  imageUrl: string;
}

export type ProductInRecipe = {
  productResponseDTO: ProductResponse;
  quantity: number;
}

export type Dish = {
  id: number;
  dishState: DishState;
  recipe: Recipe;
}

export type DishState = "NOT_MADE" | "COOKING" | "COOKED"


export type RecipeType = "BREAKFAST_SNACK" | "LUNCH_DINNER"

export type RecipeTime = "FAST" | "NORMAL" | "SLOW"

export type RecipeFilter = {
  orderBy: string;
  filterBy: {
    recipeType: RecipeType | '';
    recipeTime: RecipeTime | '';
  };
};

export type SimpleChart = {
  labels: string[];
  values: number[]
}
