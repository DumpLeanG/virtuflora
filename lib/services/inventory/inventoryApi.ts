import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../supabase/supabaseClient';
import type { InventoryItem } from '../../types/plants';

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
    })
})

export const { useGetInventoryQuery } = inventoryApi