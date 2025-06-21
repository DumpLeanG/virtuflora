import Button from "../layout/button/Button";
import Image from "next/image";
import { useCollectRewardMutation, type Achievement } from "@/lib/services/achievements/achievementsApi";
import { useAppSelector } from "@/lib/hooks/hooks";
import { selectCurrentUserBalance, selectCurrentUserId, useUpdateBalanceMutation } from "@/lib/services/user/userApi";

interface AchievementProps {
  achievement: Achievement;
}

export default function Achievement( props : AchievementProps ) {
  const userId = useAppSelector(selectCurrentUserId);
  const balance = useAppSelector(selectCurrentUserBalance)
  const [collectReward, {isLoading: isCollectRewardLoading}] = useCollectRewardMutation();
  const [updateBalance, {isLoading: isUpdateBalanceLoading}] = useUpdateBalanceMutation();
  const progress = props.achievement.progress / props.achievement.target * 100;
  const isLoading = isCollectRewardLoading || isUpdateBalanceLoading;

  const handleCollect = async () => {
    try {
      await collectReward({userId, achievementId: props.achievement.id}).unwrap();
      await updateBalance({amount: -props.achievement.reward, balance}).unwrap();
    } catch (error) {
      console.error("Collecting failed:", error);
    }
  }

  return (
    <div className="flex flex-wrap gap-4 md:gap-6 p-4 md:p-6 bg-dark-beige border-2 md:border-3 border-black rounded-sm">
        <div className="p-3 md:p-4 rounded-sm bg-background">
            <Image
            className="size-6 md:size-8"
            src="potato.svg"
            alt="achievement-icon"
            width={32}
            height={32}/>
        </div>
        <div className="flex flex-col justify-between flex-1">
          <h3>{props.achievement.name}</h3>
          <div className="flex gap-4 md:gap-6 items-center relative">
            <div className="bg-background border-2 md:border-3 border-black rounded-sm w-full">
              <span className="h-4 md:h-6 bg-green block" style={{ width: `${progress}%` }}></span>
            </div>
            <span className="absolute md:static left-1/2 -translate-x-1/2 md:translate-0">{props.achievement.progress}/{props.achievement.target}</span>
          </div>
        </div>
        <div className="w-full p-4 md:p-6 flex bg-background rounded-sm justify-between items-center">
          <div className="flex gap-4 md:gap-6">
            <span>{props.achievement.reward}$</span>
          </div>
          <Button onClick={handleCollect} type="claim" completed={props.achievement.isCollected} disabled={!props.achievement.isCompleted || isLoading}/>
        </div>
    </div>
  );
};
