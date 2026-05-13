import React from "react";
import Link from "next/link";
import { Exercise } from "../types/exercise";

type Props = {
  exercise: Exercise;
};

const ExerciseCard = ({ exercise }: Props) => {
  const rawImage = exercise.images?.[0]?.image;
  const imageUrl = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `https://wger.de${rawImage}`
    : null;
  const name = exercise.translations[0]?.name ?? "Untitled exercise";
  const muscle = exercise.muscles[0]?.name_en || "Unknown";
  const category = exercise.category.name;
  return (
    <Link
      href={`/exercise/${exercise.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-60 w-full overflow-hidden bg-linear-to-br from-blue-50 to-indigo-100">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-8xl font-bold text-blue-200">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="inline-flex items-center gap-1.5 absolute top-3 right-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          {category}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h2 className="line-clamp-2 text-lg font-semibold text-gray-900">
          {name}
        </h2>

        <div className="mt-auto flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-100">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            {muscle}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ExerciseCard;
