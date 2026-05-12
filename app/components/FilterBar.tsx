type Props = {
  search: string;
  setSearch: (value: string) => void;

  selectedMuscle: string;
  setSelectedMuscle: (value: string) => void;

  muscles: string[];
};

const FilterBar = ({
  search,
  setSearch,
  selectedMuscle,
  setSelectedMuscle,
  muscles,
}: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <input
        type="text"
        placeholder="Search exercise..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <select
        value={selectedMuscle}
        onChange={(e) => setSelectedMuscle(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All Muscles</option>

        {muscles.map((muscle) => (
          <option key={muscle} value={muscle}>
            {muscle}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
