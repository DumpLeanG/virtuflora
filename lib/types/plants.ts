export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
export type PlantStage = 'seed' | 'sprout' | 'flower';

export interface PlantBase {
  id: number;
  name: string;
  rarity: Rarity;
}

export interface GardenPlant extends PlantBase {
  stage: PlantStage;
}

export interface InventoryItem {
  id: number;
  userId: string;
  plantId: number;
  amount: number;
}

export interface PlantDefinition extends PlantBase {
  growthTime: number;
  price: number;
}