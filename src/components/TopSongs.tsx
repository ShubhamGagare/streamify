"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import React from "react"
import { useFetch } from "@/hooks/useFetch"
import { AnalyticsData, createChartConfig, createChartData } from "@/lib/chartUtils"

export const description = "A bar chart"

// const chartData = [
//     { dataType: "Song 1", views: 275, fill: "var(--color-Song 1)" },
//     { dataType: "Song 2", views: 200, fill: "var(--color-Song 2)" },
//     { dataType: "Song 3", views: 187, fill: "var(--color-Song 3)" },
//     { dataType: "Song 4", views: 173, fill: "var(--color-Song 4)" },
//     { dataType: "Song 5", views: 90, fill: "var(--color-Song 5)" },
//   ]
  
//   const chartConfig = {
//     views: {
//       label: "views",
//     },
//     Song 1: {
//       label: "Song 1",
//       color: "hsl(var(--chart-1))",
//     },
//     Song 2: {
//       label: "Song 2",
//       color: "hsl(var(--chart-2))",
//     },
//     Song 3: {
//       label: "Song 3",
//       color: "hsl(var(--chart-3))",
//     },
//     Song 4: {
//       label: "Song 4",
//       color: "hsl(var(--chart-4))",
//     },
//     Song 5: {
//       label: "Song 5",
//       color: "hsl(var(--chart-5))",
//     },
//   } satisfies ChartConfig


export function TopSongs() {
    const { data, loading } = useFetch<AnalyticsData>('http://localhost:3001/topSongs')
    const chartData = data ? createChartData(data,"views") : [];
    const chartConfig = createChartConfig(data?.labels || [],"views");
    console.log("Data---"+JSON.stringify(chartData))
    console.log("chartConfig---"+JSON.stringify(chartConfig))
    return (
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart - Mixed</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  left: 0,
                }}
              >
                <YAxis
                  dataKey="dataType"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  hide
                />
                <XAxis dataKey="views" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="views" layout="vertical" radius={5} >
                <LabelList
                dataKey="dataType"
                position="insideLeft"
                offset={8}
                className="fill-secondary font-semibold text-md"
                fontSize={12}
              />
              <LabelList
                dataKey="desktop"
                position="right"
                offset={8}
                className="fill-primary "
                fontSize={12}
              />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total views for the last 6 months
            </div>
          </CardFooter>
        </Card>
      )
}
