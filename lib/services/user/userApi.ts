import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../supabase/supabaseClient';
import { User, Session } from '@supabase/supabase-js';
import { createSelector } from '@reduxjs/toolkit';

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

export interface LoginRequest {
    email: string;
    password: string;
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

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery(),
    tagTypes: ['User'],
    endpoints: (build) => ({
        register: build.mutation<AuthResponse, RegisterRequest>({
            queryFn: async (userData) => {
                try{
                    if (userData.password !== userData.confirmPassword) {
                        const validationError = {
                            status: 400,
                            data: 'Passwords do not match',
                        };
                        return { error: validationError };
                    }
                
                    if (userData.password.length < 8) {
                        const validationError = {
                            status: 400,
                            data: 'Password must be at least 8 characters long',
                        };
                        return { error: validationError };
                    }

                    const userExists = await checkUserExists(userData.email);
                    if (userExists) {
                        const validationError = {
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
                                balance: 4,
                            }
                        }
                    });

                    if (authError || !data.user) {
                        const rtkError = {
                            status: authError?.status || 500,
                            data: authError?.message || 'Authentication error',
                        };
                        return { error: rtkError };
                    }

                    return { data: data };
                } catch (error) {
                    const rtkError = {
                        status: 500,
                        data: 'Registration failed'
                    };
                    return { error: rtkError };
                }
            }
        }),
        login: build.mutation<AuthResponse, LoginRequest>({
            queryFn: async (userData) => {
                try {
                    const { data, error: authError } = await supabase.auth.signInWithPassword({
                        email: userData.email,
                        password: userData.password,
                    });

                    if (authError) {
                        const rtkError = {
                            status: authError.status || 401,
                            data: authError.message || 'Authentication error',
                        };
                        return { error: rtkError };
                    }

                    if (!data.session || !data.user) {
                        const rtkError = {
                            status: 401,
                            data: 'Invalid email or password',
                        };
                        return { error: rtkError };
                    }

                    return { data };
                } catch (error) {
                    const rtkError = {
                        status: 500,
                        data: 'Login failed'
                    };
                    return { error: rtkError };
                }
            }
        }),
        getCurrentUser: build.query<User | null, void>({
            queryFn: async () => {
                try {
                    const { data: { user }, error } = await supabase.auth.getUser();
                    if (error) {
                        if (error.status === 401) {
                            return { data: null };
                        }
                        return { error: { status: 500, data: error.message } };
                    }
                    return { data: user };
                } catch (error) {
                    return { error: { status: 500, data: 'Failed to fetch user' } };
                }
            },
            providesTags: ['User'],
        }),
        logout: build.mutation<boolean, void>({
            queryFn: async () => {
                try {
                    const { error } = await supabase.auth.signOut();
                    if (error) {
                        return { error: { status: 500, data: error.message } };
                    }
                    return { data: true };
                } catch (error) {
                    return { error: { status: 500, data: 'Logout failed' } };
                }
            },
        }),
        updateBalance: build.mutation<{ balance: number}, { balance: number}>({
            queryFn: async (payload) => {
                try {
                    const { data: { user }, error} = await supabase.auth.updateUser({
                        data: {
                            balance: payload.balance,
                        }
                    })

                    if(error || !user) {
                        return {
                            error: {
                                status: error?.status || 500,
                                data: error?.message || 'Balance update failed',
                            }
                        }
                    }

                    return { data: { balance: user.user_metadata.balance } };
                } catch (error) {
                    return {
                        error: {
                            status: 500,
                            data: 'Failed to update balance'
                        }
                    }
                }
            },
            invalidatesTags: ['User'],
        })
    })
})

const selectCurrentUserResult = userApi.endpoints.getCurrentUser.select();

export const selectCurrentUserId = createSelector(
  selectCurrentUserResult,
  (userResult: any) => userResult.data?.id || null
);

export const { useRegisterMutation, useLoginMutation, useGetCurrentUserQuery, useLogoutMutation } = userApi;