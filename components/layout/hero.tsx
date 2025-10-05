"use client";
import {
  SiApple,
  SiFacebook,
  SiGithub,
  SiGoogle,
  SiInstagram,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "@/components/ui/shadcn-io/announcement";
import { BackgroundBeams } from "../ui/shadcn-io/background-beams";
import { Button } from "@/components/ui/button";
import { FlipWords } from "@/components/ui/shadcn-io/flip-words";

import Link from "next/link";
const logos = [
  {
    name: "GitHub",
    icon: SiGithub,
    url: "https://github.com",
  },
  {
    name: "Facebook",
    icon: SiFacebook,
    url: "https://facebook.com",
  },
  {
    name: "Google",
    icon: SiGoogle,
    url: "https://google.com",
  },
  {
    name: "X",
    icon: SiX,
    url: "https://x.com",
  },
  {
    name: "Apple",
    icon: SiApple,
    url: "https://apple.com",
  },
  {
    name: "Instagram",
    icon: SiInstagram,
    url: "https://instagram.com",
  },
  {
    name: "YouTube",
    icon: SiYoutube,
    url: "https://youtube.com",
  },
];

const words = ["anonymously", "honestly", "truthfully"];

const Hero = () => (
  <div className="flex flex-col gap-16 px-8 py-24 text-center">
    <div className="flex flex-col items-center justify-center gap-8">
      <Link href="#">
        <Announcement>
          <AnnouncementTag>Latest</AnnouncementTag>
          <AnnouncementTitle>UKM now available</AnnouncementTitle>
        </Announcement>
      </Link>
      <h1 className="mb-0 text-balance font-medium text-6xl md:text-7xl xl:text-[5.25rem]">
        Rate your university<br></br>
        <FlipWords
          words={words}
          duration={2500}
          className="text-blue-500 font-semibold"
        />{" "}
      </h1>
      {/* <p className="text-muted-foreground text-md">
        Read and write reviews from real students.
      </p> */}
      <div className="flex items-center gap-2">
        <Button
          asChild
          className="cursor-pointer rounded-full h-11 px-6 text-base shadow-md hover:shadow-lg hover:scale-[1.02] transition-transform bg-gradient-to-r from-primary to-blue-600 text-primary-foreground"
        >
          <Link href="/universities">Explore universities</Link>
        </Button>
        {/* <Button asChild variant="outline">
          <Link className="no-underline" href="#">
            Learn more
          </Link>
        </Button> */}
      </div>
    </div>
    {/* <section className="flex flex-col items-center justify-center gap-8 rounded-xl bg-secondary py-8 pb-18">
      <p className="mb-0 text-balance font-medium text-muted-foreground">
        Trusted by developers from leading companies
      </p>
      <div className="flex size-full items-center justify-center">
        <Marquee>
          <MarqueeFade className="from-secondary" side="left" />
          <MarqueeFade className="from-secondary" side="right" />
          <MarqueeContent pauseOnHover={false}>
            {logos.map((logo) => (
              <MarqueeItem className="mx-16 size-12" key={logo.name}>
                <Link href={logo.url}>
                  <logo.icon className="size-full" />
                </Link>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>
    </section> */}
  </div>
);
export default Hero;
