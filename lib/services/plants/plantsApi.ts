import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../supabase/supabaseClient';
import type { PlantDefinition } from '../../types/plants';

export const plantsApi = createApi({
    reducerPath: 'plantsApi',
    baseQuery: fetchBaseQuery(),
    tagTypes: ['Plants'],
    endpoints: (build) => ({
        getPlants: build.query<PlantDefinition[], void>({
            queryFn: async () => {
                try {
                    const { data: plants, error } = await supabase
                        .from('plants')
                        .select('*');

                    if (error) {
                        return { 
                            error: {
                                status: error.code ? parseInt(error.code) : 500,
                                data: error.message,
                            } 
                        };
                    }

                    return { data: plants };
                } catch (error) {
                    return {
                        error: {
                            status: 500,
                            data: 'Unknown error occurred',
                        }
                    }
                }
            },
        })
    })
})

export const { useGetPlantsQuery } = plantsApi