import { Subject } from "@/types/university";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface SubjectCardProps {
  subject: Subject;
  universityShortName: string;
}

export function SubjectCard({
  subject,
  universityShortName,
}: SubjectCardProps) {
  return (
    <Link href={`/universities/${universityShortName}/${subject.code}`}>
      <Card className="hover:scale-103 shadow-none rounded-none cursor-pointer">
        <CardHeader>
          <CardTitle className="scroll-m-20 text-left text-xl font-extrabold tracking-tight text-balance">
            {subject.code}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="font-medium mb-2 truncate whitespace-nowrap overflow-hidden">
            {subject.name}
          </h3>
          {subject.faculties && (
            <p className="text-sm text-muted-foreground mb-2 truncate whitespace-nowrap overflow-hidden">
              {subject.faculties.name}
            </p>
          )}
          {subject.category_code && (
            <Badge className="text-xs text-muted-foreground mt-1 rounded-full text-white">
              {subject.category_code}
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
