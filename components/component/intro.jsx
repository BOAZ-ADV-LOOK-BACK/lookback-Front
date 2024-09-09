/**
 * v0 by Vercel.
 * @see https://v0.dev/t/qnOkPWQb6is
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
          <CalendarIcon className="h-6 w-6" />
          <span className="sr-only">구글 캘린더 대시보드</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            기능
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            후기
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            가격
          </Link>
          <Link href="#" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
            문의
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 sm:py-20 md:py-28 lg:py-36 bg-gradient-to-r from-[#007bff] to-[#ff69b4]">
          <div className="container px-4 md:px-6 flex flex-col items-center text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-none">
              Look-Back은 여러분의 <span className="text-green-300">캘린더를 분석</span>하여<br /> 여러분의 <span className="text-green-300">삶을 돌아보는 기회</span>를 제공합니다.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mt-4 max-w-3xl">
              강력한 구글 캘린더 기반 대시보드로 일정을 체계화하고, 집중력을 높이며, 목표를 달성하세요.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/dashboard"
                className="inline-flex h-10 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#007bff] shadow transition-transform transform hover:scale-105 active:scale-95 hover:bg-[#FFFFFF]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:animate-rainbow"
                prefetch={false}
              >
                <span className="hover:animate-[rainbow-text_2s_infinite]">시작하기</span>
              </Link>
              <Link
                href="/learn-more"
                className="inline-flex h-10 items-center justify-center rounded-md bg-transparent border border-[#FFFFFF] px-8 text-sm font-medium text-[#FFFFFF] shadow transition-transform transform hover:scale-105 active:scale-95 hover:bg-[#FFFFFF]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:animate-[rainbow-text_1.5s_linear_infinite]"
                prefetch={false}
              >
                자세히 알아보기
              </Link>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 sm:py-20 md:py-28 lg:py-36">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-4">
                <InfoIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">성과 시각화</h3>
                <p className="text-muted-foreground">
                  자세한 성과 시각화를 통해 캘린더 활동에 대한 통찰을 얻고, 시간과 생산성을 최적화할 수 있습니다.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <AlarmClockIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">맞춤형 알림</h3>
                <p className="text-muted-foreground">
                  습관과 선호도에 맞춰 조정되는 스마트한 맞춤형 알림으로 일정을 관리하세요.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <ClipboardIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">진행 상황 추적</h3>
                <p className="text-muted-foreground">
                  포괄적인 추적 도구를 통해 목표 달성 진행 상황을 모니터링하고, 동기부여와 집중력을 유지하세요.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="testimonials" className="w-full py-12 sm:py-20 md:py-28 lg:py-36 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-4 bg-background p-6 rounded-lg shadow">
                <img
                  src="boy.png"
                  width="64"
                  height="64"
                  alt="Avatar"
                  className="rounded-full"
                  style={{ aspectRatio: "64/64", objectFit: "cover" }}
                />
                <p className="text-muted-foreground">
                  "구글 캘린더 대시보드는 제 생산성에 혁명을 일으켰습니다. 맞춤형 알림과 진행 상황 추적 기능이 업무
                  관리와 목표 달성에 큰 도움이 되었습니다."
                </p>
                <div className="font-medium">- 김효대, 기업가</div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 bg-background p-6 rounded-lg shadow">
                <img
                  src="/woman-2.png"
                  width="64"
                  height="64"
                  alt="Avatar"
                  className="rounded-full"
                  style={{ aspectRatio: "64/64", objectFit: "cover" }}
                />
                <p className="text-muted-foreground">
                  "일정 관리에 어려움을 겪었지만, 구글 캘린더 대시보드 덕분에 훨씬 쉬워졌습니다. 성과 시각화 기능이 매우
                  유용하고, 시간 관리에 큰 도움이 되었습니다."
                </p>
                <div className="font-medium">- 이하윤, 마케팅 매니저</div>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 bg-background p-6 rounded-lg shadow">
                <img
                  src="/girl.png"
                  width="64"
                  height="64"
                  alt="Avatar"
                  className="rounded-full"
                  style={{ aspectRatio: "64/64", objectFit: "cover" }}
                />
                <p className="text-muted-foreground">
                  "바쁜 전문가로서 구글 캘린더 대시보드는 제게 구세주와 같습니다. 진행 상황 추적 기능이 동기부여와 목표
                  관리에 큰 도움이 되었고, 맞춤형 알림이 제 일정을 체계화하는 데 기여했습니다."
                </p>
                <div className="font-medium">- 신예린, 소프트웨어 엔지니어</div>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 sm:py-20 md:py-28 lg:py-36">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-background p-6 rounded-lg shadow">
                <h3 className="text-2xl font-bold">무료</h3>
                <p className="text-4xl font-bold mt-4">$0</p>
                <p className="text-muted-foreground mt-2">매월</p>
                <ul className="space-y-2 mt-6">
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 mr-2 text-primary" />
                    성과 시각화
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 mr-2 text-primary" />
                    맞춤형 알림
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 mr-2 text-primary" />
                    진행 상황 추적
                  </li>
                </ul>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-black px-8 text-sm font-medium text-[#FFFFFF] shadow transition-transform transform hover:scale-105 active:scale-95 hover:bg-[#000000]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:animate-rainbow"
                  prefetch={false}
                >
                  가입하기
                </Link>
              </div>
              <div className="bg-background p-6 rounded-lg shadow">
                <h3 className="text-2xl font-bold">프로</h3>
                <p className="text-4xl font-bold mt-4">$3</p>
                <p className="text-muted-foreground mt-2">매월</p>
                <ul className="space-y-2 mt-6">
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 mr-2 text-primary" />
                    성과 시각화
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 mr-2 text-primary" />
                    맞춤형 알림
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 mr-2 text-primary" />
                    진행 상황 추적
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 mr-2 text-primary" />
                    일정 제안
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  프로 플랜은 현재 개발 중입니다. 업데이트 정보를 확인해 주세요.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow">
                <h3 className="text-2xl font-bold">기업</h3>
                <p className="text-4xl font-bold mt-4">문의</p>
                <p className="text-muted-foreground mt-2">맞춤형 가격</p>
                <ul className="space-y-2 mt-6">
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 mr-2 text-primary" />
                    성과 시각화
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 mr-2 text-primary" />
                    맞춤형 알림
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 mr-2 text-primary" />
                    진행 상황 추적
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 mr-2 text-primary" />
                    맞춤형 통합
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="h-5 w-5 mr-2 text-primary" />
                    전담 지원
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  기업 플랜은 현재 개발 중입니다. 자세한 내용은 문의해 주시기 바랍니다.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 sm:py-20 md:py-28 lg:py-36 bg-muted">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">문의하기</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              문의 사항이 있거나 시작 방법이 궁금하신가요? 저희 팀이 도와드리겠습니다.
            </p>
            <form className="mt-8 max-w-md mx-auto space-y-4">
              <Input type="text" placeholder="이름" className="w-full" />
              <Input type="email" placeholder="이메일" className="w-full" />
              <Textarea placeholder="메시지" className="w-full" />
              <Button type="submit" className="w-full">
                제출
              </Button>
            </form>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 구글 캘린더 대시보드. 모든 권리 보유.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            이용 약관
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            개인정보 보호 정책
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function AlarmClockIcon(props) {
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
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2 2" />
      <path d="M5 3 2 6" />
      <path d="m22 6-3-3" />
      <path d="M6.38 18.7 4 21" />
      <path d="M17.64 18.67 20 21" />
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


function CheckIcon(props) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function ClipboardIcon(props) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  )
}


function InfoIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}