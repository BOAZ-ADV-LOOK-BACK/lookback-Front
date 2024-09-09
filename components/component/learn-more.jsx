/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QNysWKv2rJo
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export default function Component() {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">Unlock Your Potential with Our Motivational Dashboard</h1>
            <p className="text-muted-foreground mb-8">
              Our service harnesses the power of your Google Calendar data to provide a personalized dashboard and
              reminder system that will keep you on track and motivated.
            </p>
            <div className="grid gap-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Service Overview</h2>
                <p className="text-muted-foreground">
                  Leverage your Google Calendar data to visualize your goal progress and task completion. Receive
                  customized reminders to help you stay focused and achieve your objectives.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Key Features</h2>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-start gap-4">
                    <BarChartIcon className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Performance Visualization</h3>
                      <p>Track your goal progress and task completion with intuitive charts and timelines.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <BellIcon className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Personalized Reminders</h3>
                      <p>Stay on top of important deadlines and milestones with customized alerts and notifications.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <ClipboardIcon className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">Progress Tracking</h3>
                      <p>
                        Review your weekly and monthly progress, and receive personalized insights to help you stay
                        motivated.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-muted rounded-lg overflow-hidden">
              <img
                src="/pure_white_background_calendar_dashboard.png"
                alt="Dashboard Preview"
                width={800}
                height={600}
                className="w-full"
                style={{ aspectRatio: "800/600", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
        <div className="mt-12 md:mt-20">
          <h2 className="text-3xl font-bold mb-8">User Scenarios</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Motivation Boost</h3>
              <p className="text-muted-foreground">
                By reviewing your completed tasks and goal achievements, you'll gain a sense of accomplishment and be
                motivated to continue your progress.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Effective Goal Pursuit</h3>
              <p className="text-muted-foreground">
                With personalized reminders for important deadlines and milestones, you'll be able to stay on track and
                efficiently work towards your objectives.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 md:mt-20">
          <h2 className="text-3xl font-bold mb-8">Technical Details</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-semibold mb-4">System Architecture</h3>
              <p className="text-muted-foreground">
                Our service integrates with the Google Calendar API to collect and analyze your data. We utilize React.js
                and Tailwind CSS to build the user interface, and leverage AI technologies to provide advanced analytics
                and personalized reminders.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Technology Stack</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-4">
                  <ChromeIcon className="w-6 h-6 text-primary" />
                  <span>Google Calendar API</span>
                </li>
                <li className="flex items-center gap-4">
                  <CodepenIcon className="w-6 h-6 text-primary" />
                  <span>React.js</span>
                </li>
                <li className="flex items-center gap-4">
                  <WindIcon className="w-6 h-6 text-primary" />
                  <span>Tailwind CSS</span>
                </li>
                <li className="flex items-center gap-4">
                  <XIcon className="w-6 h-6 text-primary" />
                  <span>AI-powered Analytics and Reminders</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
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
  
  
  function ChromeIcon(props) {
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
        <circle cx="12" cy="12" r="4" />
        <line x1="21.17" x2="12" y1="8" y2="8" />
        <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
        <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
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
  
  
  function CodepenIcon(props) {
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
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
        <line x1="12" x2="12" y1="22" y2="15.5" />
        <polyline points="22 8.5 12 15.5 2 8.5" />
        <polyline points="2 15.5 12 8.5 22 15.5" />
        <line x1="12" x2="12" y1="2" y2="8.5" />
      </svg>
    )
  }
  
  
  function WindIcon(props) {
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
        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
        <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
        <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
      </svg>
    )
  }
  
  
  function XIcon(props) {
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
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    )
  }
