import { University, UniversityResponse } from "@/types/university";
import React from "react";
import UniversityCard from "./UniversityCard";

interface UniversityGridProps {
  universities: UniversityResponse;
}

const UniversityGrid = async ({ universities }: UniversityGridProps) => {
  if (!universities.success || universities.data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Nouniversities found.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {universities.data.map((university) => (
        <UniversityCard key={university.id} university={university} />
      ))}
    </div>
  );
};

export default UniversityGrid;
