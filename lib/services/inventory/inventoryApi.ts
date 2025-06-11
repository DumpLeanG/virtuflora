import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../supabase/supabaseClient';
import type { InventoryItem } from '../../types/plants';

interface AddPlantRequest {
    userId: string;
    plantId: number;
    amount: number
}  

interface removePlantRequest {
    userId: string;
    plantId: number;
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
            async queryFn(args) {
                try {
                    const { userId, plantId, amount } = args;
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
                    return {
                        error: {
                            status: 500,
                            data: 'Unknown error occurred'
                        }
                    }
                }
            },
            invalidatesTags: ['Inventory'],
        }),
        removePlant: build.mutation<InventoryItem | null, removePlantRequest>({
            async queryFn(args) {
                try {
                    const { userId, plantId } = args;

                    const { data: item, error: fetchError } = await supabase
                        .from('inventory')
                        .select('id, amount')
                        .eq('user_id', userId)
                        .eq('plant_id', plantId)
                        .single();

                    if (fetchError) {
                        return {
                            error: {
                                status: fetchError.code ? parseInt(fetchError.code) : 500,
                                data: fetchError.message || 'Plant not found',
                            }
                        };
                    }

                    if(item.amount > 1) {
                        const newAmount = item.amount - 1;
                        const { data, error } = await supabase
                            .from('inventory')
                            .update({amount: newAmount})
                            .eq('id', item.id)
                            .select()
                            .single();
                        
                        if (error) {
                            return {
                                error: {
                                    status: error.code ? parseInt(error.code) : 500,
                                    data: error.message || 'Decrement failed',
                                }
                            };
                        }

                        return { data: data };
                    } else {
                        const { error } = await supabase
                            .from('inventory')
                            .delete()
                            .eq('id', item.id);

                        if (error) {
                            return {
                                error: {
                                    status: error.code ? parseInt(error.code) : 500,
                                    data: error.message || 'Delete failed',
                                }
                            };
                        }
                        return { data: null };
                    }


                } catch (error) {
                    return {
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

export const { useGetInventoryQuery, useAddPlantMutation, useRemovePlantMutation } = inventoryApi