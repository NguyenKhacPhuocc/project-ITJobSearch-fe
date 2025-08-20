export const JobCardSkeleton = () => {
  return (
    <div className="border border-[#DEDEDE] rounded-[8px] flex flex-col relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #F6F6F6 2.38%, #FFFFFF 70.43%)"
      }}
    >
      {/* Background image skeleton */}
      <div className="absolute top-[0px] left-[0px] w-[100%] h-[100px] bg-gray-200 animate-pulse" />

      {/* Logo skeleton */}
      <div className="relative mt-[20px] w-[116px] h-[116px] bg-gray-300 mx-auto rounded-[8px] p-[10px] animate-pulse"
        style={{
          boxShadow: "0px 4px 24px 0px #0000001F"
        }}
      />

      {/* Title skeleton */}
      <div className="mt-[20px] mx-[16px] h-[24px] bg-gray-200 rounded animate-pulse w-3/4 " />
      <div className="mt-[10px] mx-[16px] h-[20px] bg-gray-200 rounded animate-pulse w-1/2" />

      {/* Salary skeleton */}
      <div className="mt-[12px] h-[20px] bg-gray-200 rounded animate-pulse w-2/3 mx-auto" />

      {/* Details skeleton */}
      <div className="mt-[6px] h-[16px] bg-gray-200 rounded animate-pulse w-1/2 mx-auto" />
      <div className="mt-[6px] h-[16px] bg-gray-200 rounded animate-pulse w-1/2 mx-auto" />
      <div className="mt-[6px] h-[16px] bg-gray-200 rounded animate-pulse w-1/2 mx-auto" />
      <div className="mt-[6px] h-[16px] bg-gray-200 rounded animate-pulse w-1/2 mx-auto" />

      {/* Skills skeleton */}
      <div className="mt-[12px] mb-[20px] mx-[16px] flex flex-wrap justify-center gap-[8px]">
        <div className="h-[34px] w-[72px] bg-gray-200 rounded-[20px] animate-pulse" />
        <div className="h-[36px] w-[78px] bg-gray-200 rounded-[20px] animate-pulse" />
        <div className="h-[36px] w-[78px] bg-gray-200 rounded-[20px] animate-pulse" />
        <div className="h-[36px] w-[78px] bg-gray-200 rounded-[20px] animate-pulse" />
      </div>
    </div>
  );
};