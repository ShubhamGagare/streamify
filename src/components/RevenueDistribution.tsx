"use client"; // Ensures this file is treated as a client component

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useFetch } from "@/hooks/useFetch";
import { AnalyticsData, createChartConfig, createChartData } from "@/lib/chartUtils";

export const description = "A donut chart with text";




export function RevenueDistribution() {
  const { data, loading } = useFetch<AnalyticsData>('http://localhost:3001/revenueDistribution');
  
  // Ensure data is available before processing
  const chartData = data ? createChartData(data,"revenue") : [];
  const totaldistribution = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.revenue, 0);
  }, [chartData]);
  
  const chartConfig = createChartConfig(data?.labels || [] , "distribution");

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Revenue Distribution</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="revenue"
              nameKey="revenueType"
              innerRadius={85}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totaldistribution.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          distribution
                        </tspan>
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total distribution for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
