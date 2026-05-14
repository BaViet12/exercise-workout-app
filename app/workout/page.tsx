"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ExerciseCard from "../components/ExerciseCard";
import Link from "next/link";

type WorkoutItem = {
  id: number;
  name: string;
  image: string;
  muscle: string;
};
const STORAGE_KEY = "workout";
const Workoutpage = () => {
  const [workouts, setWorkouts] = useState<WorkoutItem[]>([]);
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      const list: WorkoutItem[] = JSON.parse(raw);
      setWorkouts(list);
    }
  }, []);
  const handleDelete = (id: number) => {
    const update = workouts.filter((item) => item.id !== id);
    setWorkouts(update);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(update));
  };
  return (
    <div>
      <Navbar></Navbar>
      <main className="max-w-7xl mx-auto px-8 flex flex-col gap-5 pt-8">
        {/* <h1 className="text-3xl font-bold pt-5">Workout của tôi</h1> */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Workout của tôi</h1>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {workouts.length} bài tập
          </span>
        </div>

        {workouts.length === 0 ? (
          <div className="flex justify-center items-center flex-col min-h-[500] ">
            <h2 className="font-bold text-gray-800 text-3xl">
              Chưa có bài tập nào
            </h2>
            <p className="mt-3 text-gray-500">Hãy khám phá các bài tập</p>
            <Link
              href="/"
              className="mt-3 p-3 border rounded-full bg-blue-900 text-white hover:bg-white hover:text-blue-900"
            >
              Khám phá bài tập
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts?.map((item) => (
              <Link
                href={`/exercise/${item.id}`}
                key={item.id}
                className=" group flex flex-col relative w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl "
              >
                <div className="relative h-60 w-full overflow-hidden bg-linear-to-br from-blue-50 to-indigo-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex w-full h-full items-center justify-center text-8xl font-bold text-blue-200">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <h2 className="flex-1 line-clamp-2 text-lg font-semibold text-gray-900">
                    {item.name}
                  </h2>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="hover:bg-amber-400 shrink-0 bg-red-600 rounded-full px-4 py-2 text-white"
                  >
                    Xóa
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Workoutpage;
