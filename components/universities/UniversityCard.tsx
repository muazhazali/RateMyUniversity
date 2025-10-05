import { University } from "@/types/university";
import Link from "next/link";
import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
interface UniversityCardProps {
  university: University;
}

const UniversityCard = ({ university }: UniversityCardProps) => {
  const isUKM = university.short_name === "UKM";

  const CardContent = (
    <Card className="h-full hover:scale-[1.03] transition-transform cursor-pointer shadow-sm hover:shadow-md relative">
      {/* Card Main Content */}
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold line-clamp-2">
              {university.short_name}
            </CardTitle>
            {university.name && (
              <CardDescription className="mt-1">
                {university.name}
              </CardDescription>
            )}
            {/* <Badge
              className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
              variant="outline"
            >
              {university.review_count || 0}
            </Badge> */}
          </div>
        </div>
      </CardHeader>

      {/* Coming Soon Overlay */}
      {!isUKM && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 text-white text-sm font-semibold rounded-xl">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Coming Soon
          </h4>
        </div>
      )}
    </Card>
  );

  return isUKM ? (
    <Link href={`universities/${university.short_name}`}>{CardContent}</Link>
  ) : (
    <div>{CardContent}</div>
  );
};

export default UniversityCard;
