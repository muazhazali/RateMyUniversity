import Hero from "@/components/layout/hero";
import { BackgroundBeams } from "@/components/ui/shadcn-io/background-beams";

export default function Home() {
  return (
    <main className="relative px-4 md:px-6 lg:px-15">
      <BackgroundBeams className="absolute inset-0 -z-10" />
      <Hero />
    </main>
  );
}
