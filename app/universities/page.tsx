import UniversityGrid from "@/components/universities/UniversityGrid";
import { UniversityService } from "@/services/universityService";

export default async function UniversitiesPage() {
  const universities = await UniversityService.getAllUniversities();
  return (
    <main className="px-4 md:px-6 lg:px-15 py-8 mt-5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Universities</h1>
          <p className="text-sm text-muted-foreground">
            Explore and review universities from around the world
          </p>
        </div>
        {universities.success ? (
          <UniversityGrid universities={universities} />
        ) : (
          <div>{universities.error}</div>
        )}
      </div>
    </main>
  );
}
