'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Pie, PieChart, Cell } from "recharts";
import axios from "axios";

const pastelColors = [
  "#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF", "#FFB3FF"
];

// RGB 값을 기반으로 색상을 어둡게 만드는 함수
const darkenColor = (hexColor: string, amount: number): string => {
  const num = parseInt(hexColor.replace("#", ""), 16);
  const r = Math.max((num >> 16) - amount, 0);
  const g = Math.max(((num >> 8) & 0x00ff) - amount, 0);
  const b = Math.max((num & 0x0000ff) - amount, 0);
  return `rgb(${r}, ${g}, ${b})`;
};

const fetchCategoryDistribution = async (token: string): Promise<{ category: string; entry_number: number }[]> => {
  try {
    const response = await axios.post(
      "https://api.look-back.site/api/v1/calendar/dashboard-category-dist",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!response.data.success) {
      throw new Error("올바르지 않은 API 응답 형식입니다.");
    }

    return response.data.categories;
  } catch (error) {
    console.error("Category Distribution API 호출 중 오류:", error);
    throw new Error("API 호출 중 오류가 발생했습니다.");
  }
};

export function CategoryDistributionCard() {
  const [categories, setCategories] = useState<{ category: string; entry_number: number }[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("access_token");
        const userName = localStorage.getItem("userName");
        setUserName(userName || "사용자");


        if (!token) {
          window.location.href = "/login";
          return;
        }


        const data = await fetchCategoryDistribution(token);
        setCategories(data);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 오류가 발생했습니다.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error || !categories) {
    return <p>{error || "데이터를 불러올 수 없습니다."}</p>;
  }

  return (
    <Card className="flex-1 h-[400px]">
      <CardHeader>
        <CardTitle>안녕하세요, {userName}님!</CardTitle>
        <CardDescription>내가 가장 많이 수행한 일정 카테고리는?</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-0 overflow-hidden">
        <div className="w-full h-full max-h-[80%] flex items-center justify-center translate-y-[-5%]">
          <PieChart width={400} height={400}>
            <Pie
              data={categories}
              dataKey="entry_number"
              nameKey="category"
              cx="50%"
              cy="35%"
              outerRadius={110}
              label={({ name, x, y, index }) => {
                const baseColor = pastelColors[index % pastelColors.length];
                const darkColor = darkenColor(baseColor, 70);
                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={darkColor}
                    style={{ fontWeight: "bold" }}
                  >
                    {name}
                  </text>
                );
              }}
            >
              {categories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pastelColors[index % pastelColors.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </CardContent>
    </Card>
  );
}
