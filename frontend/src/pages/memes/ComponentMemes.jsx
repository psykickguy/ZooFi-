"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../components/ui/chart";

import "./Component.css";

export default function ComponentMemes() {
  const [topMemes, setMemes] = useState([]);

  useEffect(() => {
    const fetchTopMemes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/memes/leaderboard`
        );
        const data = await response.json();

        const sorted = data.topMemes
          .slice(0, 3)
          .sort((a, b) => b.score - a.score);

        const transformed = sorted.map((meme, index) => ({
          title: meme.title || `Meme ${index + 1}`,
          score: meme.score,
        }));

        // Ensure center (index 1) is top scorer
        if (transformed[1] && transformed[0].score < transformed[1].score) {
          const temp = transformed[0];
          transformed[0] = transformed[1];
          transformed[1] = temp;
        }

        setMemes(transformed);
      } catch (error) {
        console.error("Error fetching top memes:", error);
      }
    };

    fetchTopMemes();
  }, []);

  const vibrantColors = ["#A66DD4", "#F28585", "#FFC75F"];

  const chartConfig = {
    score: {
      label: "Score",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <h3>Top 3 Memes 🧠</h3>
        <CardDescription>By Popularity</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={topMemes.map((meme, idx) => ({
              name: meme.title,
              score: meme.score,
              fill: vibrantColors[idx] || "#ccc",
            }))}
            margin={{ top: 20 }}
            barCategoryGap={50}
            barGap={8}
            width={400}
            height={300}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="score">
              <LabelList dataKey="name" position="top" className="text-sm" />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 8.9% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Based on meme minting score
        </div> */}
      </CardFooter>
    </Card>
  );
}
