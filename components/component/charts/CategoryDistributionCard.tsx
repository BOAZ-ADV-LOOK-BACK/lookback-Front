'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Pie, PieChart, Cell } from "recharts";
import axios from "axios";

const pastelColors = [
  "#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF", "#FFB3FF"
];

const textStyle = {
  fontWeight: "bold",  // 진한 글자
  fill: "#333333",     // 진한 회색 (다른 색으로 변경 가능)
};

const fetchCategoryDistribution = async (): Promise<{ category: string; entry_number: number }[]> => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    window.location.href = "/login"; // 로그인 페이지로 이동
  }

  try {
    const response = await axios.post(
      "https://api.look-back.site/api/v1/calendar/dashboard-category-dist",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )

    // 상태 코드가 200 범위 내에 있는지 확인
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`HTTP 상태 코드 오류: ${response.status}`);
    }

    const data = response.data;
    if (!data.success) {
      throw new Error("올바르지 않은 API 응답 형식입니다.");
    }

    return data.categories; // 최대 6개만 반환
  } catch (error) {
    console.error("Category Distribution API 호출 중 오류:", error);
    throw new Error("API 호출 중 오류가 발생했습니다.");
  }
};


const exampleCategoryDistribution = {
  "success": true,
  "categories": [
    { "category": "Work", "entry_number": 35 },
    { "category": "Exercise", "entry_number": 20 },
    { "category": "Study", "entry_number": 15 },
    { "category": "Leisure", "entry_number": 10 },
    { "category": "Social", "entry_number": 8 },
    { "category": "Other", "entry_number": 5 }
  ]
}

export function CategoryDistributionCard() {
  const [categories, setCategories] = useState<{ category: string; entry_number: number }[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCategoryDistribution();
        // const data = exampleCategoryDistribution.categories;
        setCategories(data);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);  // Error 객체일 경우 메시지로 처리
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
        <CardTitle>내가 가장 많이 수행한 카테고리는?</CardTitle>
        <CardDescription>일정 카테고리 비율</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-0 overflow-hidden">
        <div className="w-full h-full max-h-[100%] flex items-center justify-center translate-y-[-5%]">
          <PieChart width={400} height={400}>
            <Pie
              data={categories}
              dataKey="entry_number"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ summary, x, y }) => (
                <text x={x} y={y} textAnchor="middle" dominantBaseline="central" style={textStyle}>
                  {summary}
                </text>
              )}
            >
              {/* 각 파이에 다른 색상 적용 */}
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
