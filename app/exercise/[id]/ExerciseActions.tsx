"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type WorkoutItem = {
  id: number;
  name: string;
};

type Props = {
  id: number;
  name: string;
};

const STORAGE_KEY = "workout";

const ExerciseActions = ({ id, name }: Props) => {
  const router = useRouter();
  const [added, setAdded] = useState(false);
  // Tải lại khi dữ liệu được thêm
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const list: WorkoutItem[] = JSON.parse(raw);
    setAdded(list.some((item) => item.id === id));
  }, [id]);
  // thêm dữ liệu bài tập
  const handleAdd = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: WorkoutItem[] = raw ? JSON.parse(raw) : [];
    if (list.some((item) => item.id === id)) return;
    list.push({ id, name });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setAdded(true);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        onClick={() => router.back()}
        className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      >
        Quay lại
      </button>
      <button
        onClick={handleAdd}
        disabled={added}
        className={`rounded-full px-5 py-2.5 text-sm font-semibold text-white transition ${
          added
            ? "cursor-not-allowed bg-green-500"
            : "bg-blue-900 hover:bg-blue-800"
        }`}
      >
        {added ? "✓ Đã thêm vào Workout" : "+ Thêm vào Workout"}
      </button>
    </div>
  );
};

export default ExerciseActions;
