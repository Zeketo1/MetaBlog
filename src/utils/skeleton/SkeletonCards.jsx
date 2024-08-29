import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonCards = ({ cards, base, highlightColor }) =>
  Array(cards)
    .fill(0)
    .map((_, i) => (
      <SkeletonTheme baseColor={base} highlightColor={highlightColor} key={i}>
        <div className="w-full p-4 xs:p-2 sm:p-4 border border-opacity-10 border-primary relative rounded-lg shadow-lg">
          {/* Skeleton for Title and Badge */}
          <Skeleton width={"100%"} height={220} />

          {/* Skeleton for Description */}
          <Skeleton width={78} height={28} className="mt-4 rounded-[4px]" />

          <Skeleton width={"100%"} height={47} className="mt-2" />
          <div className="flex items-center gap-2 mt-4">
            <Skeleton width={35} height={35} circle={true} />
            <div>
              <Skeleton width={60} height={20} />
            </div>
            <div>
            <Skeleton width={60} height={20} />

            </div>
          </div>
        </div>
      </SkeletonTheme>
    ));

export default SkeletonCards;

