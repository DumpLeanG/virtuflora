export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
export type GrowthStage = 'seed' | 'sprout' | 'plant';

export interface PlantBase {
  id: number;
  name: string;
  rarity: Rarity;
}

export interface GardenPlant {
  id: number;
  userId: string;
  gardenBed: number;
  plantId: number;
  growthStage: GrowthStage;
  plantedAt: Date;
  lastWatered?: Date;
  waterCount?: number;
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