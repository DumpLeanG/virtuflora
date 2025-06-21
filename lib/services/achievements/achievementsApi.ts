import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { supabase } from '../../supabase/supabaseClient';

export interface Achievement {
    id: number,
    name: string,
    target: number,
    reward: number,
    actionId: number,
    progress: number,
    isCompleted?: boolean, 
    isCollected?: boolean,
    ruName: string,
}

interface GetAchievementsRequest {
    userId: string;
}

interface UpdateProgressRequest {
    userId: string;
    action: string;
}

interface CollectAchievementRequest {
    userId: string;
    achievementId: number;
}

export const achievementsApi = createApi({
    reducerPath: 'achievementsApi',
    baseQuery: fetchBaseQuery(),
    tagTypes: ['Achievements'],
    endpoints: (build) => ({
        getAchievements: build.query<Achievement[], GetAchievementsRequest>({
            async queryFn(userId) {
                try {
                    if (!userId) return { data: [] };

                    const { data, error } = await supabase
                        .from('achievements')
                        .select('id, name, target, reward, action_id, ru_name, user_achievements!left (progress, is_completed, is_collected)')
                        .eq('user_achievements.user_id', userId);

                    if (error) {
                        return { 
                            error: {
                                status: error.code ? parseInt(error.code) : 500,
                                data: error.message,
                            } 
                        };
                    }


                    const achievements: Achievement[] = data.map(item => ({
                        id: item.id,
                        name: item.name,
                        target: item.target,
                        reward: item.reward,
                        actionId: item.action_id,
                        progress: item.user_achievements[0]?.progress || 0,
                        isCompleted: item.user_achievements[0]?.is_completed || false,
                        isCollected: item.user_achievements[0]?.is_collected || false,
                        ruName: item.ru_name
                    }));

                    return { data: achievements };
                } catch (error) {
                    return {
                        error: {
                            status: 500,
                            data: 'Unknown error occurred',
                        }
                    }
                }
            },
            providesTags: ['Achievements'],
        }),
        updateProgress: build.mutation<null, UpdateProgressRequest>({
            async queryFn(args) {
                try {
                    const { userId, action } = args;
                    if (!userId) throw new Error("User ID required!");

                    const { data: actionData, error: actionError } = await supabase
                        .from('actions')
                        .select('id')
                        .eq('name', action)
                        .single();

                    if (actionError) {
                        return {
                            error: {
                                status: actionError.code ? parseInt(actionError.code) : 500,
                                data: actionError.message || 'Failed to fetch action',
                            }
                        };
                    }

                    const { data: achievements, error: achievementsError } = await supabase
                        .from('achievements')
                        .select('id, target')
                        .eq('action_id', actionData.id);

                    if (achievementsError) {
                        return {
                            error: {
                                status: achievementsError.code ? parseInt(achievementsError.code) : 500,
                                data: achievementsError.message || 'Failed to fetch achievement',
                            }
                        };
                    }

                    if (!achievements || achievements.length === 0) {
                        return { data: null };
                    }

                    for (const achievement of achievements) {
                        const { data: existingItems, error: fetchError } = await supabase
                            .from('user_achievements')
                            .select('progress, is_completed')
                            .eq('user_id', userId)
                            .eq('achievement_id', achievement.id)

                        if (fetchError) {
                            return {
                                error: {
                                    status: fetchError.code ? parseInt(fetchError.code) : 500,
                                    data: fetchError.message || 'Failed to fetch achievement',
                                }
                            };
                        }

                        const existingItem = existingItems && existingItems.length > 0 ? existingItems[0] : null;
                        const currentProgress = existingItem?.progress || 0;
                        const isCompleted = existingItem?.is_completed || false;

                        if (isCompleted) return { data: null };

                        const newProgress = currentProgress + 1;
                        const nowCompleted = newProgress >= achievement.target;

                        const { error: upsertError } = await supabase
                            .from('user_achievements')
                            .upsert({
                                user_id: userId,
                                achievement_id: achievement.id,
                                progress: newProgress,
                                is_completed: nowCompleted,
                            }, {
                                onConflict: 'user_id, achievement_id'
                            });

                        if (upsertError) {
                            return {
                                error: {
                                    status: upsertError.code ? parseInt(upsertError.code) : 500,
                                    data: upsertError.message || 'Failed to update progress',
                                }
                            };
                        }
                    }

                    return { data: null };
                } catch (error) {
                    return {
                        error: {
                            status: 500,
                            data: 'Unknown error occurred'
                        }
                    }
                }
            },
            invalidatesTags: ['Achievements'],
        }),
        collectReward: build.mutation<null, CollectAchievementRequest>({
            async queryFn(args) {
                try {
                    const { userId, achievementId } = args;
                    if (!userId) throw new Error("User ID required!");

                    const { data, error } = await supabase
                        .from('user_achievements')
                        .update({
                            is_collected: true,
                        })
                        .eq('user_id', userId)
                        .eq('achievement_id', achievementId)
                        .select()
                        .single();

                    if (error) {
                        return {
                            error: {
                                status: error.code ? parseInt(error.code) : 500,
                                data: error.message || 'Failed to collect reward',
                            }
                        };
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
            invalidatesTags: ['Achievements'],
        }),
    })
})

export const { useGetAchievementsQuery, useUpdateProgressMutation, useCollectRewardMutation } = achievementsApi;