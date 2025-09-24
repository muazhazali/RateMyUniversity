"use client";

import { ReviewStats } from "@/types/university";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Rating, RatingButton } from "@/components/ui/shadcn-io/rating";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { BorderBeam } from "../ui/border-beam";

interface ReviewStatsProps {
  stats: ReviewStats;
}

export function ReviewStatsComponent({ stats }: ReviewStatsProps) {
  if (stats.totalReviews === 0) {
    return (
      <Card className="mb-6 shadow-none rounded-none border-none">
        <CardContent className="p-4">
          <p className="text-muted-foreground text-center">No reviews yet</p>
        </CardContent>
      </Card>
    );
  }

  // Prepare data for the horizontal bar chart
  const chartData = [5, 4, 3, 2, 1].map((rating) => ({
    rating: rating,
    ratingLabel: rating,
    count: stats.ratingDistribution.overall[rating] || 0,
    fill: "var(--color-count)",
  }));

  const chartConfig = {
    count: {
      label: "Reviews",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="relative shadow-accent w-full overflow-hidden">
      <CardHeader>
        <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Rating Overview
        </h4>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Average Ratings */}
        <div className="space-y-4">
          <div className="text-center">
            <div className="flex flex-row items-start gap-3 ">
              <Rating
                value={stats.averageRatings.overall}
                readOnly
                className="text-yellow-500 pt-1"
              >
                {Array.from({ length: 5 }).map((_, index) => (
                  <RatingButton key={index} size={20} />
                ))}
              </Rating>
              <span className="text-2xl font-bold">
                {stats.averageRatings.overall.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                Difficulty
              </h4>
              <div className="flex items-center gap-2">
                <Rating
                  value={stats.averageRatings.difficulty}
                  readOnly
                  className="text-yellow-500"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <RatingButton key={index} size={12} />
                  ))}
                </Rating>
                <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                  {stats.averageRatings.difficulty.toFixed(1)}
                </h4>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                Workload
              </h4>
              <div className="flex items-center gap-2">
                <Rating
                  value={stats.averageRatings.workload}
                  readOnly
                  className="text-yellow-500"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <RatingButton key={index} size={12} />
                  ))}
                </Rating>
                <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                  {stats.averageRatings.workload.toFixed(1)}
                </h4>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                Teaching Quality
              </h4>
              <div className="flex items-center gap-2">
                <Rating
                  value={stats.averageRatings.teachingQuality}
                  readOnly
                  className="text-yellow-500"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <RatingButton key={index} size={12} />
                  ))}
                </Rating>
                <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                  {stats.averageRatings.teachingQuality.toFixed(1)}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Distribution Chart */}
        <div>
          <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
            Rating Distribution
          </h4>
          <ChartContainer config={chartConfig} className="h-[120px] w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 10,
                right: 10,
                top: 5,
                bottom: 5,
              }}
            >
              <YAxis
                dataKey="ratingLabel"
                type="category"
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                width={20}
                fontSize={12}
                interval={0}
              />
              <XAxis dataKey="count" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="count" layout="vertical" radius={5} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <BorderBeam duration={5} size={150} />
    </Card>
  );
}
