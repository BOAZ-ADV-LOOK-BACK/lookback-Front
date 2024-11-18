"use client";

import { useState } from 'react'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Pie, PieChart, CartesianGrid, XAxis, Line,  Bar, BarChart } from "recharts"
import { ChartTooltipContent, ChartTooltip, ChartContainer } from "@/components/ui/chart"
import { ResponsiveLine } from "@nivo/line"
import UpcomingSchedule from "@/components/component/Upcoming_schedule"
import { GodLifeIndex } from "@/components/component/GodLifeIndex"
import { CalendarEventVisualization } from "@/components/component/active-time"
import { ChronotypeAnalysis } from "@/components/component/chronotype-analysis"
import { useRouter } from "next/compat/router";
import DashboardCalendar from "@/components/component/dashboard-calendar"
export function lookbackDashboardAfterlogin() {
    const [godlifeprogress, setProgress] = useState<number | null>(null)

    const handleProgress = (godlifeprogress: number | null) => {
        setProgress(godlifeprogress)
    }
    const router = useRouter();

    return (
      <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 lg:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b px-6">
                <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                <CalendarClockIcon className="h-6 w-6" />
                <span className="">Look Back your history</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-2">
                <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                    href="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    prefetch={false}
                >
                    <HomeIcon className="h-4 w-4" />
                    Dashboard
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    prefetch={false}
                >
                    <CalendarIcon className="h-4 w-4" />
                    Goals
                </Link>
                <Link
                    href="#"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    prefetch={false}
                >
                    <BarChartIcon className="h-4 w-4" />
                    Performance
                </Link>
                <Link
                    href="/userprofile"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    prefetch={false}
                >
                    <SettingsIcon className="h-4 w-4" />
                    Settings
                </Link>
                </nav>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
            <Link href="#" className="lg:hidden" prefetch={false}>
                <CalendarClockIcon className="h-6 w-6" />
                <span className="sr-only">Home</span>
            </Link>
            <div className="w-full flex-1">
                <form>
                <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                    type="search"
                    placeholder="Search"
                    className="w-full bg-background shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3"
                    />
                </div>
                </form>
            </div>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <BellIcon className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full border w-8 h-8">
                    <img
                    src="/placeholder.svg"
                    width="32"
                    height="32"
                    className="rounded-full"
                    alt="Avatar"
                    style={{ aspectRatio: "32/32", objectFit: "cover" }}
                    />
                    <span className="sr-only">Toggle user menu</span>
                </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem><Link href="/userprofile">Settings</Link></DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="flex items-center gap-4">
                    <h1 className="font-semibold text-lg md:text-xl">Dashboard</h1>
                    <div className="ml-auto flex items-center gap-2">
                        {/* 동적 요소 매핑 필요 */}
                        <Button variant="outline" className="hidden sm:flex">
                            Yesterday
                        </Button>
                        <Button variant="outline" className="hidden md:flex">
                            Last Week
                        </Button>
                        <Button variant="outline" className="hidden md:flex">
                            Last Month
                        </Button>
                        <Button variant="outline" className="hidden md:flex">
                            Last Year
                        </Button>
                        <Popover>
                            <PopoverTrigger asChild>
                            <Button id="date" variant="outline" className="w-[280px] justify-start text-left font-normal">
                                <CalendarClockIcon className="mr-2 h-4 w-4" />
                                June 01, 2023 - June 30, 2023
                            </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                            <Calendar initialFocus mode="range" numberOfMonths={2} />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="grid gap-6 w-full max-w-screen-xl mx-auto">
                  <div className="grid gap-6 w-full"
                       style={{ display: "grid",
                        gridTemplateColumns: "minmax(200px, 3fr) 2fr",
                       }}> {/* 열 gap = 6, 행 gap = 4 */}
                    <DashboardCalendar />
                    <GodLifeIndex onProgress={handleProgress} />
                    <div className="flex flex-col gap-4 h-[600px]"> {/* 세로로 두 개의 카드 배치, 총 높이 400px */}
                      <Card className="flex-1 h-[200px]"> {/* 첫 번째 카드가 높이의 절반을 차지 */}
                        <CardHeader>
                            <CardDescription>지난 주 보다 14.8시간 더 활동했어요! <br></br> 책 5권을 읽은 것 만큼 성장했어요!</CardDescription>
                            <CardTitle>{godlifeprogress !== null ? `${godlifeprogress}%` : 'Loading...'}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Progress value={godlifeprogress !== null ? godlifeprogress : 0} aria-label={`${godlifeprogress}% progress 향상`} />
                        </CardContent>
                      </Card>
                      <Card className="flex-1 h-[400px]"> {/* 두 번째 카드가 높이의 절반을 차지 */}
                        <CardHeader>
                            <CardTitle>내가 가장 많이 수행한 카테고리는?</CardTitle>
                            <CardDescription>일정 카테고리 비율</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center p-0 overflow-hidden">
                          <div className="w-full h-full max-h-[100%] flex items-center justify-center translate-y-[-5%]"> {/* 차트 크기 제어 */}
                            <PiechartcustomChart className="aspect-[4/3] w-[100%] h-auto" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                          <CardTitle>이번 주 이하윤님의 활동</CardTitle>
                          <CardDescription>Tasks Completed</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center h-full p-1">
                            <LinechartChart className="w-full h-full" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardDescription>Event Types</CardDescription>
                            <CardTitle>
                            <div className="flex gap-2">
                                <div className="bg-primary rounded-full w-3 h-3" />
                                <div className="bg-secondary rounded-full w-3 h-3" />
                                <div className="bg-muted rounded-full w-3 h-3" />
                            </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center h-full p-4">
                            <BarchartCustomChart className="w-full h-full" />
                        </CardContent>
                    </Card>
                  </div>
                  <div className="grid grid-cols-[3fr_2fr] gap-6">
                    <CalendarEventVisualization /> {/* CalendarEventVisualization를 컴포넌트로 사용 */}
                    <ChronotypeAnalysis/> {/* chronotype-analysis를 컴포넌트로 사용 */}
                  </div>
                  <UpcomingSchedule />
                </div>
          </main>
        </div>
      </div>
    )
  }

  function LinechartChart(props) {
    return (
      <div {...props}>
        <ChartContainer
          config={{
            desktop: {
              label: "Desktop",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <LineChart
            accessibilityLayer
            data={[
              { month: "January", desktop: 186 },
              { month: "February", desktop: 305 },
              { month: "March", desktop: 237 },
              { month: "April", desktop: 73 },
              { month: "May", desktop: 209 },
              { month: "June", desktop: 214 },
            ]}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Line dataKey="desktop" type="natural" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </div>
    )
  }

  function LineChart(props) {
    return (
      <div {...props}>
        <ResponsiveLine
          data={[
            {
              id: "이번 주",
              data: [
                { x: "Mon", y: 43 },
                { x: "Tue", y: 137 },
                { x: "Wed", y: 61 },
                { x: "Thu", y: 145 },
                { x: "Fri", y: 26 },
                { x: "Sat", y: 154 },
                { x: "Sun", y: 104 }
              ],
            },
            {
              id: "지난 주",
              data: [
                { x: "Mon", y: 60 },
                { x: "Tue", y: 48 },
                { x: "Wed", y: 177 },
                { x: "Thu", y: 78 },
                { x: "Fri", y: 96 },
                { x: "Sat", y: 204 },
                { x: "Sun", y: 30 }
              ],
            },
          ]}
          margin={{ top: 10, right: 10, bottom: 60, left: 40 }}
          xScale={{
            type: "point",
          }}
          yScale={{
            type: "linear",
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 16,
          }}
          axisLeft={{
            tickSize: 0,
            tickValues: 5,
            tickPadding: 16,
          }}
          colors={["#2563eb", "#e11d48"]}
          pointSize={6}
          useMesh={true}
          gridYValues={6}
          theme={{
            tooltip: {
              chip: {
                borderRadius: "9999px",
              },
              container: {
                fontSize: "12px",
                textTransform: "capitalize",
                borderRadius: "6px",
              },
            },
            grid: {
              line: {
                stroke: "#f3f4f6",
              },
            },
          }}
          legends={[
            {
              anchor: "bottom", // 범례 위치 (하단)
            direction: "row", // 범례 방향 (가로)
            justify: false,
            translateX: 0, // X축 이동량
            translateY: 60, // Y축 이동량
            itemsSpacing: 10, // 범례 항목 간 간격
            itemWidth: 80, // 범례 항목 너비
            itemHeight: 20, // 범례 항목 높이
            itemDirection: "left-to-right", // 아이콘과 텍스트의 정렬 방향
            symbolSize: 12, // 범례 아이콘 크기
            symbolShape: "circle", // 범례 아이콘 모양
            itemTextColor: "#000", // 텍스트 색상
            effects: [
              {
                on: "hover", // 호버 효과
                style: {
                  itemTextColor: "#555", // 호버 시 텍스트 색상
                },
              },
            ],
            }
          ]}
          role="application"
        />
      </div>
    )
  }

  function PiechartcustomChart(props) {
    return (
      <div {...props}>
        <ChartContainer
          config={{
            visitors: {
              label: "Visitors",
            },
            chrome: {
              label: "Chrome",
              color: "hsl(var(--chart-1))",
            },
            safari: {
              label: "Safari",
              color: "hsl(var(--chart-2))",
            },
            firefox: {
              label: "Firefox",
              color: "hsl(var(--chart-3))",
            },
            edge: {
              label: "Edge",
              color: "hsl(var(--chart-4))",
            },
            other: {
              label: "Other",
              color: "hsl(var(--chart-5))",
            },
          }}
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={[
                { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
                { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
                { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
                { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
                { browser: "other", visitors: 90, fill: "var(--color-other)" },
              ]}
              dataKey="visitors"
              nameKey="browser"
            />
          </PieChart>
        </ChartContainer>
      </div>
    )
  }

function BarchartCustomChart(props) {
  return (
    <div {...props}>
      <ChartContainer
        config={{
          desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
          },
        }}
        className="min-h-[300px]"
      >
        <BarChart
          accessibilityLayer
          data={[
            { month: "January", desktop: 186 },
            { month: "February", desktop: 305 },
            { month: "March", desktop: 237 },
            { month: "April", desktop: 73 },
            { month: "May", desktop: 209 },
            { month: "June", desktop: 214 },
          ]}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

  function CalendarClockIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
        <path d="M16 2v4" />
        <path d="M8 2v4" />
        <path d="M3 10h5" />
        <path d="M17.5 17.5 16 16.3V14" />
        <circle cx="16" cy="16" r="6" />
      </svg>
    )
  }

  function BarChartIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="12" x2="12" y1="20" y2="10" />
        <line x1="18" x2="18" y1="20" y2="4" />
        <line x1="6" x2="6" y1="20" y2="16" />
      </svg>
    )
  }
  function BellIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    )
  }

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function SettingsIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )
  }

  function SearchIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    )
  }