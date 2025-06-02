import { createApi, fetchBaseQuery, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
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
                    const { data, error } = await supabase
                        .from('plants')
                        .select('*');

                    if (error) {
                        const rtkError: FetchBaseQueryError = {
                            status: error.code ? parseInt(error.code) : 500,
                            data: error.message,
                        };
                        return { error: rtkError };
                    }

                    return { data: data };
                } catch (error) {
                    const rtkError: FetchBaseQueryError = {
                        status: 500,
                        data: 'Unknown error occurred',
                    };
                    return { error: rtkError };
                }
            },
        })
    })
})

export const { useGetPlantsQuery } = plantsApi