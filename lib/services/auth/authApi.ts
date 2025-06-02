import { createApi, fetchBaseQuery, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../supabase/supabaseClient';
import { User, Session } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  session: Session | null;
}

export interface RegisterRequest {
    nickname: string,
    email: string,
    password: string,
    confirmPassword: string,
}

async function checkUserExists(email: string): Promise<boolean> {
    const { data, error } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', email)
        .maybeSingle();

    if (error) {
        throw error;
    }

    return data !== null;
}


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery(),
    tagTypes: ['Auth'],
    endpoints: (build) => ({
        register: build.mutation<AuthResponse, RegisterRequest>({
            queryFn: async (userData) => {
                try{
                    if (userData.password !== userData.confirmPassword) {
                        const validationError: FetchBaseQueryError = {
                            status: 400,
                            data: 'Passwords do not match',
                        };
                        return { error: validationError };
                    }
                
                    if (userData.password.length < 8) {
                        const validationError: FetchBaseQueryError = {
                            status: 400,
                            data: 'Password must be at least 8 characters long',
                        };
                        return { error: validationError };
                    }

                    const userExists = await checkUserExists(userData.email);
                    if (userExists) {
                        const validationError: FetchBaseQueryError = {
                            status: 400,
                            data: 'User with this email already exists',
                        };
                        return { error: validationError };
                    }

                    const { data, error: authError } = await supabase.auth.signUp({
                        email: userData.email,
                        password: userData.password,
                        options: {
                            data: {
                                nickname: userData.nickname,
                            }
                        }
                    });

                    if (authError) {
                        const rtkError: FetchBaseQueryError = {
                            status: authError.status || 500,
                            data: authError.message || 'Authentication error',
                        };
                        return { error: rtkError };
                    }

                    if (!data.user) {
                        const rtkError: FetchBaseQueryError = {
                            status: 500,
                            data: 'User creation failed',
                        };
                        return { error: rtkError };
                    }

                    return { data: data };
                } catch (error) {
                    const rtkError: FetchBaseQueryError = {
                        status: 500,
                        data: 'Unknown error occured'
                    };
                    return { error: rtkError };
                }
            }
        })
    })
})

export const { useRegisterMutation } = authApi;