import React from "react";
type Props = { onRetry: () => void };

export const ErrorState = ({ onRetry }: Props) => {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <p className="text-red-500 text-lg">Failed to fetch exercises</p>
      <button
        onClick={onRetry}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Retry
      </button>
    </div>
  );
};
