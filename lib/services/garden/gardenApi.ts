import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../supabase/supabaseClient';
import type { GardenPlant } from '../../types/plants';

interface PlantInBedRequest {
    userId: string;
    gardenBed: number;
    plantId: number;
}

interface UpdateGrowthStageRequest {
    id: number;
    growthStage: "sprout" | "plant";
}

export const gardenApi = createApi({
    reducerPath: 'gardenApi',
    baseQuery: fetchBaseQuery(),
    tagTypes: ['Garden'],
    endpoints: (build) => ({
        getGarden: build.query<GardenPlant[], string | null>({
            async queryFn(userId) {
                try {
                    if (!userId) return { data: [] };

                    const { data, error } = await supabase
                        .from('garden')
                        .select('id, garden_bed, plant_id, growth_stage, planted_at')
                        .eq('user_id', userId);

                    if (error) {
                        return {
                            error: {
                                status: 500,
                                data: error.message,
                            }
                        };
                    }

                    const gardenPlants: GardenPlant[] = data.map(item => ({
                        id: item.id,
                        userId: userId,
                        gardenBed: item.garden_bed,
                        plantId: item.plant_id,
                        growthStage: item.growth_stage,
                        plantedAt: item.planted_at
                    }));

                    return { data: gardenPlants };
                } catch (error) {
                    return { 
                        error: { 
                            status: 500, 
                            data: 'Failed to fetch garden' 
                        } 
                    };
                }
            },
            providesTags: ['Garden'],
        }),
        plantInBed: build.mutation<GardenPlant, PlantInBedRequest>({
            async queryFn(args) {
                try {
                    const { userId, gardenBed, plantId } = args;
                    if (!userId) throw new Error("User ID required!");

                    const { data: existingItem, error: bedError } = await supabase
                        .from('garden')
                        .select('id')
                        .eq('user_id', userId)
                        .eq('garden_bed', gardenBed)

                    if (bedError) {
                        return {
                            error: {
                                status: 500,
                                data: bedError.message,
                            }
                        };
                    }

                    if (existingItem && existingItem.length > 0) {
                        return {
                            error: {
                                status: 409,
                                data: 'Bed is already occupied',
                            }
                        };
                    }

                    const { data, error } = await supabase
                        .from('garden')
                        .insert({
                            user_id: userId,
                            garden_bed: gardenBed,
                            plant_id: plantId,
                            growth_stage: "seed",
                            planted_at: new Date().toISOString(),
                        })
                        .select()
                        .single();

                    if (error) {
                        return {
                            error: {
                                status: error.code ? parseInt(error.code) : 500,
                                data: error.message || 'Failed to plant in the bed', 
                            }
                        };
                    }

                    return { 
                        data: {
                            id: data.id,
                            userId,
                            gardenBed,
                            plantId: data.plant_id,
                            growthStage: data.growth_stage,
                            plantedAt: data.planted_at,
                            lastWatered: data.last_watered
                        } 
                    };
                } catch (error) {
                    throw {
                        error: {
                            status: 500,
                            data: 'Unknown error occurred'
                        }
                    }
                }
            },
            invalidatesTags: ['Garden'],
        }),
        updateGrowthStage: build.mutation<GardenPlant, UpdateGrowthStageRequest>({
            async queryFn(args) {
                try {
                    const { id, growthStage } = args;

                    const {data, error} = await supabase
                        .from('garden')
                        .update({
                            growth_stage: growthStage,
                        })
                        .eq('id', id)
                        .select()
                        .single();

                    if(error) {
                        return {
                            error: {
                                status: error.code ? parseInt(error.code) : 500,
                                data: error.message || 'Failed to update growth stage'
                            }
                        }
                    }

                    return { data: data};
                } catch (error) {
                    return {
                        error: {
                            status: 500,
                            data: 'Unknown error occurred'
                        }
                    };
                }
            },
            invalidatesTags: ['Garden'],
        })
    })
})

export const { useGetGardenQuery, usePlantInBedMutation, useUpdateGrowthStageMutation } = gardenApi