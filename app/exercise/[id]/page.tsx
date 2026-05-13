import { notFound } from "next/navigation";
import { Exercise } from "../../types/exercise";
import Navbar from "../../components/Navbar";
import ExerciseActions from "./ExerciseActions";

type Props = {
  params: Promise<{ id: string }>;
};

const ExerciseDetailPage = async ({ params }: Props) => {
  const { id } = await params;

  const res = await fetch(`https://wger.de/api/v2/exerciseinfo/${id}/`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) notFound();

  const exercise: Exercise = await res.json();

  const translation =
    exercise.translations.find((t) => t.name) ?? exercise.translations[0];
  const name = translation?.name ?? "Untitled exercise";
  const description = translation?.description ?? "";

  const rawImage = exercise.images?.[0]?.image;
  const imageUrl = rawImage
    ? rawImage.startsWith("http")
      ? rawImage
      : `https://wger.de${rawImage}`
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <div className="relative h-72 w-full bg-linear-to-br from-blue-50 to-indigo-100 md:h-96">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-6xl font-bold text-blue-200">
                {name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="absolute top-4 right-4 rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium text-gray-700 shadow-sm backdrop-blur">
              {exercise.category.name}
            </span>
          </div>

          <div className="space-y-6 p-6 md:p-10">
            <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
              {name}
            </h1>

            <section>
              <h2 className="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase">
                Nhóm cơ chính
              </h2>
              <div className="flex flex-wrap gap-2">
                {exercise.muscles.length > 0 ? (
                  exercise.muscles.map((m) => (
                    <span
                      key={m.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-100"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                      {m.name_en || m.name}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">
                    Không có dữ liệu
                  </span>
                )}
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase">
                Nhóm cơ phụ
              </h2>
              <div className="flex flex-wrap gap-2">
                {exercise.muscles_secondary?.length > 0 ? (
                  exercise.muscles_secondary.map((m) => (
                    <span
                      key={m.id}
                      className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                      {m.name_en || m.name}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-400">
                    Không có dữ liệu
                  </span>
                )}
              </div>
            </section>

            <section>
              <h2 className="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase">
                Mô tả
              </h2>
              {description ? (
                <div
                  className="prose max-w-none leading-relaxed text-gray-700 [&_p]:mb-3"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              ) : (
                <p className="text-sm text-gray-400">Chưa có mô tả</p>
              )}
            </section>

            <div className="border-t border-gray-100 pt-6">
              <ExerciseActions id={exercise.id} name={name} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExerciseDetailPage;
