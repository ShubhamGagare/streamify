"use client"; // Ensures this file is treated as a client component

import React from "react";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useFetch } from "@/hooks/useFetch";

export const description = "A stacked area chart";

interface UserGrowthData {
  labels: string[];
  datasets: {month:string,total:number,active:number }[];
}

const mapToOutput = (arr: string[]) =>
  arr.reduce((acc, key, index) => {
    acc[key] = {
      label: key, // Capitalizes the first letter of the key
      color: `hsl(var(--chart-${index + 1}))`, // Generates the color dynamically
    };
    return acc;
  }, {});

export function UserGrowth() {
  const { data, loading } = useFetch<UserGrowthData>(
    "http://localhost:3001/userGrowth"
  );

  // Safely access and map data, ensuring default values if undefined
  const chartConfig = mapToOutput(data?.labels || []);
  console.log(JSON.stringify(chartConfig))
  const chartData = data?.datasets || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Stacked</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
              <Area
              dataKey="active"
              type="natural"
              fill="hsl(var(--chart-2)"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-2)"
              stackId="a"
            />
            <Area
              dataKey="total"
              type="natural"
              fill="hsl(var(--chart-1)"
              fillOpacity={0.4}
              stroke="hsl(var(--chart-1)"
              stackId="a"
            />
          
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
