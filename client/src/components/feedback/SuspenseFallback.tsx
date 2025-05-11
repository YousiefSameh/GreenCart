import { Suspense } from "react";
import Loading from "./Loading";

const SuspenseFallback = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<Loading />}>
      {children}
    </Suspense>
  );
};

export default SuspenseFallback;
