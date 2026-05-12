"use client";

import React from "react";
import { Exercise } from "../types/exercise";

type Props = {
  exercise: Exercise;
  //   onAddWorkout: (id: number) => void;
  //   added: boolean;
};
const ExerciseCard = ({ exercise }: Props) => {
  const imageUrl = exercise.images?.[0]?.image
    ? `https://wger.de${exercise.images[0].image}`
    : "/no-image.png";
  return (
    <div className="border rounded-2xl">
      <img
        className="w-full h-60 object-cover rounded-t-2xl"
        src={imageUrl}
        alt={exercise.translations[0]?.name}
      />
      <div className="bg-gray-400 p-4 rounded-b-2xl">
        <h2 className="font-bold pt-1">{exercise.translations[0]?.name}</h2>
        <p>Muscle: {exercise.muscles[0]?.name_en || "Unknown"}</p>
        <p>Category: {exercise.category.name}</p>
      </div>
    </div>
  );
};

export default ExerciseCard;
