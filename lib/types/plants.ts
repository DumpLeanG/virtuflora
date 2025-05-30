export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
export type PlantStage = 'seed' | 'sprout' | 'flower';

export interface PlantBase {
  name: string;
  rarity: Rarity;
}

export interface GrowingPlant extends PlantBase {
  stage: PlantStage;
}

export interface InventoryItem extends PlantBase {
  amount: number;
}

export interface ShopItem extends PlantBase {
  price: number;
}