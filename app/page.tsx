"use client";

import React, { useEffect, useState } from "react";

import { Exercise } from "./types/exercise";

import ExerciseCard from "./components/ExerciseCard";
import Navbar from "./components/Navbar";
import FilterBar from "./components/FilterBar";

const LIMIT = 20;

const HomePage = () => {
  const [exercise, setExercise] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("");

  const fetchExercises = async () => {
    try {
      setLoading(true);
      setError(false);
      const offset = (currentPage - 1) * LIMIT;
      const response = await fetch(
        `https://wger.de/api/v2/exerciseinfo/?limit=${LIMIT}&offset=${offset}`
      );
      if (!response.ok) {
        throw new Error("Failed");
      }
      const data = await response.json();
      setExercise(data.results);
      setTotalPages(Math.ceil(data.count / LIMIT));
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchExercises();
  }, [currentPage]);

  const muscles = [
    ...new Set(exercise.map((item) => item.muscles[0]?.name_en || "Unknown")),
  ];

  const filteredExercises = exercise.filter((item) => {
    const exerciseName = item.translations[0]?.name.toLowerCase() || "";

    const muscle = item.muscles[0]?.name_en || "";

    const matchSearch = exerciseName.includes(search.toLowerCase());

    const matchMuscle =
      selectedMuscle === "" ? true : muscle === selectedMuscle;

    return matchSearch && matchMuscle;
  });

  if (loading) {
    return <h1 className="text-center text-2xl">Loading...</h1>;
  }

  if (error) {
    return (
      <h1 className="text-center text-red-500 text-2xl">
        Failed to fetch data
      </h1>
    );
  }

  return (
    <main className="max-w ">
      <Navbar></Navbar>
      <div className="flex items-center justify-between m-3 ">
        <h1 className="text-3xl font-bold">Exercise Tracker</h1>
        <FilterBar
          search={search}
          setSearch={setSearch}
          selectedMuscle={selectedMuscle}
          setSelectedMuscle={setSelectedMuscle}
          muscles={muscles}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mx-3">
        {filteredExercises.map((item) => (
          <ExerciseCard key={item.id} exercise={item} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-10 pb-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-900 text-white"
          }`}
        >
          Prev
        </button>

        <span className="font-semibold">
          {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-900 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default HomePage;
