"use client";

import { useRouter } from "next/compat/router";
import { useState, useEffect } from "react"; // useEffect 추가
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import DashboardCalendar from "@/components/component/dashboard-calendar";

// import charts
import { GodLifeIndex } from "@/components/component/charts/GodLifeIndex";
import { CalendarEventVisualization } from "@/components/component/charts/active-time";
import { EventTypesCard } from "@/components/component/charts/EventTypesCard";
import { ChronotypeAnalysis } from "@/components/component/charts/ChronotypeAnalysis";
import { WeeklyActivityCard } from "@/components/component/charts/WeeklyActivityCard";
import { CategoryDistributionCard } from "@/components/component/charts/CategoryDistributionCard";

// import icon
import { CalendarClockIcon } from "@/components/component/icon/CalendarClockIcon";
import { BarChartIcon } from "@/components/component/icon/BarChartIcon";
import { BellIcon } from "@/components/component/icon/BellIcon";
import { CalendarIcon } from "@/components/component/icon/CalendarIcon";
import { HomeIcon } from "@/components/component/icon/HomeIcon";
import { SearchIcon } from "@/components/component/icon/SearchIcon";
import { SettingsIcon } from "@/components/component/icon/SettingsIcon";
import { SyncIcon } from "@/components/component/icon/SyncIcon";
import axios from "axios";
import UpcomingSchedule from "./charts/Upcoming_schedule";

export function lookbackDashboardAfterlogin() {
  const [godlifeprogress, setProgress] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const router = useRouter();

  // 사용자 이메일 가져오기
  useEffect(() => {
    const token = localStorage.getItem("access_token"); // JWT 토큰 가져오기
    if (!token) {
      console.error("Access token is missing.");
      if (router) {
        router.replace("/"); // router가 정의되어 있을 때만 호출
      }
      return;
    }

    // /me API 호출
    axios
    .get("https://api.look-back.site/api/v1/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setUserEmail(res.data.email); // 이메일 설정
      })
      .catch((err) => {
        console.error("Failed to fetch user info:", err);
        if (router) {
          router.replace("/"); // router가 정의되어 있을 때만 호출
        }
      });
  }, [router]);

  const handleProgress = (godlifeprogress: number | null) => {
    setProgress(godlifeprogress);
  };

  const handleCalendarSync = async () => {
    if (isSyncing) return;

    setIsSyncing(true);
    const token = localStorage.getItem("access_token");

    try {
      await axios.post(
        "https://api.look-back.site/api/v1/calendar/sync-events",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("캘린더 업데이트 완료!"); // 간단한 알림으로 대체
    } catch (error) {
      console.error("Calendar sync failed:", error);
      alert("Failed to sync calendar"); // 간단한 알림으로 대체
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link
              href="#"
              className="flex items-center gap-2 font-semibold"
              prefetch={false}
            >
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
                href={`/userprofile?email=${userEmail}`}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                prefetch={false}
              >
                <SettingsIcon className="h-4 w-4" />
                Settings
              </Link>
              {/* Sync 버튼 추가 */}
              <button
                onClick={handleCalendarSync}
                disabled={isSyncing}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary disabled:opacity-50"
              >
                <SyncIcon className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Syncing...' : 'Sync Calendar'}
              </button>
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
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full border w-8 h-8"
              >
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
              <DropdownMenuItem>
                <Link href={`/userprofile?email=${userEmail}`}>Settings</Link>
              </DropdownMenuItem>
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
                  <Button
                    id="date"
                    variant="outline"
                    className="w-[280px] justify-start text-left font-normal"
                  >
                    <CalendarClockIcon className="mr-2 h-4 w-4" />
                    Jan 19, 2025 - Jan 25, 2025
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar initialFocus mode="range" numberOfMonths={2} />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid gap-6 w-full max-w-screen-xl mx-auto">
            <div
              className="grid gap-6 w-full"
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(200px, 3fr) 2fr",
              }}
            >
              <DashboardCalendar />
              <div className="flex flex-col gap-4 h-[600px]">
                <GodLifeIndex />
                <CategoryDistributionCard />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <WeeklyActivityCard />
              <EventTypesCard />
            </div>
            <div className="grid grid-cols-[3fr_2fr] gap-6">
              <CalendarEventVisualization /> {/* CalendarEventVisualization를 컴포넌트로 사용 */}
              <ChronotypeAnalysis eventData={[]}/> {/* chronotype-analysis를 컴포넌트로 사용 */}
            </div>
              <UpcomingSchedule />
            </div>
          </main>
        </div>
      </div>
    )
  }