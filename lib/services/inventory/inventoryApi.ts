import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../supabase/supabaseClient';
import type { InventoryItem } from '../../types/plants';

interface AddPlantRequest {
    userId: string;
    plantId: number;
    amount: number
}  

export const inventoryApi = createApi({
    reducerPath: 'inventoryApi',
    baseQuery: fetchBaseQuery(),
    tagTypes: ['Inventory'],
    endpoints: (build) => ({
        getInventory: build.query<InventoryItem[], string | null>({
            async queryFn(userId) {
                try {
                    if (!userId) return { data: [] };

                    const { data, error } = await supabase
                        .from('inventory')
                        .select('id, plant_id, amount')
                        .eq('user_id', userId);

                    if (error) {
                        return {
                            error: {
                                status: 500,
                                data: error.message,
                            }
                        };
                    }

                    const inventoryItems: InventoryItem[] = data.map(item => ({
                        id: item.id,
                        plantId: item.plant_id,
                        userId: userId,
                        amount: item.amount,
                    }));

                    return { data: inventoryItems };
                } catch (error) {
                    return { 
                        error: { 
                            status: 500, 
                            data: 'Failed to fetch inventory' 
                        } 
                    };
                }
            },
            providesTags: ['Inventory'],
        }),
        addPlant: build.mutation<InventoryItem, AddPlantRequest>({
            async queryFn(arg) {
                try {
                    const { userId, plantId, amount } = arg;
                    if (!userId) throw new Error("User ID required!");

                    const { data: existingItem } = await supabase
                        .from('inventory')
                        .select('amount')
                        .eq('user_id', userId)
                        .eq('plant_id', plantId)
                        .single();

                    const newAmount = (existingItem?.amount || 0) + amount;

                    const { data, error } = await supabase
                        .from('inventory')
                        .upsert({
                            user_id: userId,
                            plant_id: plantId,
                            amount: newAmount
                        },
                        { 
                            onConflict: 'user_id, plant_id', 
                            ignoreDuplicates: false 
                        })
                        .select()
                        .single();

                    if (error) {
                        return {
                            error: {
                                status: error.code ? parseInt(error.code) : 500,
                                data: error.message || 'Failed to add plant to inventory', 
                            }
                        }
                    }

                    return { data: data };
                } catch (error) {
                    throw {
                        error: {
                            status: 500,
                            data: 'Unknown error occurred'
                        }
                    }
                }
            },
            invalidatesTags: ['Inventory'],
        })
    })
})

export const { useGetInventoryQuery, useAddPlantMutation } = inventoryApi