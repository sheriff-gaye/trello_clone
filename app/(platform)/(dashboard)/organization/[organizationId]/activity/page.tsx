import React, { Suspense } from "react";
import { ActivityList } from "./_components/activity-list";
import { Info } from "../_components/Info";
import { Separator } from "@/components/ui/separator";
import { checkSubscription } from "@/lib/subscription";

const page = async () => {
  const isPro = await checkSubscription();
  return (
    <div className="w-full">
      <Info isPro={isPro} />
      <Separator />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default page;
