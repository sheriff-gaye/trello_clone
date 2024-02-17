import React, { Suspense } from "react";
import { ActivityList } from "./_components/activity-list";

const page = () => {
  return (
    <div className="w-full">
      <Suspense fallback={<ActivityList.Skeleton/>}>
        <ActivityList />
      </Suspense>
    </div>
  );
};

export default page;
