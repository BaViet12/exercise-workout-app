"use client";

import React, { useEffect, useState } from "react";

import { Exercise } from "./types/exercise";

import ExerciseCard from "./components/ExerciseCard";
import Navbar from "./components/Navbar";

const LIMIT = 20;

const HomePage = () => {
  const [exercise, setExercise] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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
    <main className="max-w">
      <Navbar></Navbar>
      <h1 className="text-3xl font-bold mb-2 pt-2">Exercise Tracker</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mx-3">
        {exercise.map((item) => (
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
              : "bg-black text-white"
          }`}
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-black text-white"
          }`}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default HomePage;
