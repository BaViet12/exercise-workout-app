import Navbar from "./components/Navbar";

export default async function HomePage() {
  const response = await fetch(
    "https://wger.de/api/v2/exerciseinfo/?limit=20&offset=20"
  );
  const data = await response.json();
  console.log(data.results[0]);
  return (
    <div>
      <Navbar></Navbar>
    </div>
  );
}
