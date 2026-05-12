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
    ? `http://wger.de${exercise.images[0].image}`
    : "/no-image.png";
  return (
    <div className="border rounded-xl p-4 shadow">
      <img
        className="w-full h-60"
        src={imageUrl}
        alt={exercise.translations[0]?.name}
      />

      <h2 className="font-bold pt-1">{exercise.translations[0]?.name}</h2>
      <p>Muscle: {exercise.muscles[0]?.name_en || "Unknown"}</p>
      <p>Category: {exercise.category.name}</p>
    </div>
  );
};

export default ExerciseCard;
