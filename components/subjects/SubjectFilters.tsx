"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Faculty } from "@/types/university";
import { ChevronDown, X } from "lucide-react";

interface SubjectFiltersProps {
  universityName: string;
  faculties: Faculty[];
}

export function SubjectFilters({
  universityName,
  faculties,
}: SubjectFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [selectedFaculty, setSelectedFaculty] = useState(
    searchParams.get("faculty") || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );

  const categories = ["C1", "C2", "C3", "C4", "C5", "C6"];

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset to page 1 when filters change
    params.delete("page");

    router.push(`/universities/${universityName}?${params.toString()}`);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedFaculty("");
    setSelectedCategory("");
    router.push(`/universities/${universityName}`);
  };

  const hasActiveFilters = searchTerm || selectedFaculty || selectedCategory;

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <Input
            placeholder="Search subjects by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateFilters("search", searchTerm);
              }
            }}
            className="w-full"
          />
        </div>

        {/* Faculty Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[150px] justify-between">
              {selectedFaculty
                ? faculties.find((f) => f.id === selectedFaculty)?.short_name ||
                  "Faculty"
                : "All Faculties"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem
              onClick={() => {
                setSelectedFaculty("");
                updateFilters("faculty", "");
              }}
            >
              All Faculties
            </DropdownMenuItem>
            {faculties.map((faculty) => (
              <DropdownMenuItem
                key={faculty.id}
                onClick={() => {
                  setSelectedFaculty(faculty.id);
                  updateFilters("faculty", faculty.id);
                }}
              >
                {faculty.short_name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Category Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[120px] justify-between">
              {selectedCategory || "All Categories"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuItem
              onClick={() => {
                setSelectedCategory("");
                updateFilters("category", "");
              }}
            >
              All Categories
            </DropdownMenuItem>
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  updateFilters("category", category);
                }}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Button */}
        <Button
          onClick={() => updateFilters("search", searchTerm)}
          className="min-w-[80px]"
        >
          Search
        </Button>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="mr-1 h-3 w-3" />
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
