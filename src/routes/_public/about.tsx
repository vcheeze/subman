import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  Bell,
  Check,
  Eye,
  FileSearch,
  FileText,
  Lock,
  Mail,
  PieChart,
  Plus,
  PlusCircle,
  Search,
  Shield,
  ShieldCheck,
  Smartphone,
  Trash2,
  TrendingUp,
  Upload,
} from 'lucide-react'
import { useState } from 'react'
import { Header } from '~/components/Header'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
export const Route = createFileRoute('/_public/about')({
  component: Home,
})

const features = [
  {
    icon: FileSearch,
    title: 'Smart PDF Parsing',
    description:
      'Upload bank or credit card statements. Our AI detects subscriptions automatically for your review.',
    color: 'text-blue-600 bg-blue-100',
  },
  {
    icon: PlusCircle,
    title: 'Manual Control',
    description:
      'Add, edit, and organize subscriptions exactly how you want. Full control over your data.',
    color: 'text-emerald-600 bg-emerald-100',
  },
  {
    icon: Bell,
    title: 'Smart Reminders',
    description:
      'Get notified before payments are due. Web push notifications and optional email alerts.',
    color: 'text-orange-600 bg-orange-100',
  },
  {
    icon: PieChart,
    title: 'Beautiful Insights',
    description:
      'Visualize spending patterns with interactive charts. See top subscriptions and category breakdowns.',
    color: 'text-purple-600 bg-purple-100',
  },
  {
    icon: Shield,
    title: 'Privacy by Design',
    description:
      '256-bit encryption, no PDF retention, optional 2FA. Your financial data stays secure and private.',
    color: 'text-red-600 bg-red-100',
  },
  {
    icon: Smartphone,
    title: 'Progressive Web App',
    description:
      'Works offline, installs like a native app. Access your subscriptions anywhere, anytime.',
    color: 'text-indigo-600 bg-indigo-100',
  },
]

const privacyFeatures = [
  {
    icon: Shield,
    title: 'No Bank Connections',
    description:
      'We never connect to your bank accounts or financial institutions. You upload PDFs manually when you choose to.',
  },
  {
    icon: Lock,
    title: '256-Bit Encryption',
    description:
      'All your data is encrypted with industry-standard 256-bit encryption, both in transit and at rest.',
  },
  {
    icon: Eye,
    title: 'You Control Access',
    description:
      'Optional two-factor authentication and granular privacy controls. You decide what data to share and when.',
  },
  {
    icon: Trash2,
    title: 'PDFs Not Retained',
    description:
      'Uploaded PDFs are processed and immediately deleted. We only keep the subscription data you approve.',
  },
]

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload Your PDF',
    description:
      'Drop your bank or credit card statement PDF. We process it securely and delete it immediately.',
    color: 'text-blue-600 bg-blue-100',
  },
  {
    icon: Search,
    step: '02',
    title: 'Review Detections',
    description:
      'Our AI finds potential subscriptions in your statement. You review and approve what to add.',
    color: 'text-emerald-600 bg-emerald-100',
  },
  {
    icon: Plus,
    step: '03',
    title: 'Manage Manually',
    description:
      'Add new subscriptions, edit details, set categories. You have complete control over your data.',
    color: 'text-orange-600 bg-orange-100',
  },
  {
    icon: TrendingUp,
    step: '04',
    title: 'Track & Optimize',
    description:
      'Get insights into your spending patterns, receive reminders, and optimize your subscriptions.',
    color: 'text-purple-600 bg-purple-100',
  },
]

function Home() {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    // Handle file drop logic here
  }

  return (
    <>
      <Header />
      <main>
        <section className="relative overflow-hidden py-20 lg:py-32">
          {/* Background decoration */}
          <div className="-z-10 absolute inset-0">
            <div className="-translate-x-1/2 absolute top-0 left-1/2 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
            <div className="absolute top-32 right-0 h-72 w-72 rounded-full bg-emerald-200/20 blur-3xl" />
          </div>

          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Content */}
              <div className="text-center lg:text-left">
                {/* <<div className="inline-flex items-center px-3 py-1 mb-6 text-sm font-medium text-blue-700 bg-blue-100 rounded-full">> */}
                <Badge className="bg-primary/20 font-medium text-primary text-sm">
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy-First Design
                </Badge>

                <h1 className="mb-6 font-bold font-serif text-5xl text-foreground leading-tight lg:text-7xl">
                  Take Control of Your{' '}
                  <span className="text-primary">Subscriptions</span>
                </h1>

                <p className="mb-8 text-muted-foreground leading-7 sm:text-lg">
                  Manual tracking without the bank connections. Upload your PDF
                  statements, review detected subscriptions, and manage
                  everything on your terms.
                </p>

                <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <Button className="px-8 py-6 text-lg" size="lg">
                    Start with PDF Upload
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    className="px-8 py-6 text-lg"
                    size="lg"
                    variant="outline"
                  >
                    See How It Works
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center justify-center space-x-6 text-muted-foreground text-sm lg:justify-start">
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-emerald-600" />
                    No bank connections
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-emerald-600" />
                    256-bit encryption
                  </div>
                  <div className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-emerald-600" />
                    PDFs not stored
                  </div>
                </div>
              </div>

              {/* PDF Upload Card */}
              <div className="flex justify-center lg:justify-end">
                <Card
                  className={`w-full max-w-md p-8 transition-all duration-300 ${
                    isDragOver
                      ? 'scale-105 border-primary/50 bg-primary/10'
                      : 'border-2 border-muted-foreground/30 border-dashed hover:border-primary/40 hover:bg-primary/5'
                  }`}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10">
                      <Upload className="h-8 w-8 text-primary/60" />
                    </div>

                    <h3 className="mb-2 font-semibold text-lg">
                      Upload Your Statement
                    </h3>
                    <p className="mb-6 text-muted-foreground text-sm">
                      Drop your bank or credit card PDF here, or click to browse
                    </p>

                    <Button
                      className="mb-4 w-full border-primary/20 hover:border-primary/50"
                      variant="outline"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Choose PDF File
                    </Button>

                    <p className="text-muted-foreground text-xs">
                      Supports: Bank statements, credit card statements
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 lg:py-32" id="features">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-6 font-bold font-serif text-4xl text-foreground lg:text-6xl">
                Everything You Need to{' '}
                <span className="text-primary">Stay Organized</span>
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
                Subman combines the convenience of automation with the security
                of manual control. No bank connections, no compromises.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <Card
                  className="group hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur transition-all duration-300 hover:shadow-lg"
                  key={index}
                >
                  <CardContent className="p-8">
                    <div
                      className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}
                    >
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-3 font-semibold text-xl transition-colors group-hover:text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section
          className="bg-emerald-50/50 py-20 lg:py-32 dark:bg-[#0E1512]"
          id="privacy"
        >
          <div className="container mx-auto max-w-7xl px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <div className="mb-6 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 font-medium text-emerald-700 text-sm">
                  <Shield className="mr-2 h-4 w-4" />
                  Privacy-First Design
                </div>

                <h2 className="mb-6 font-bold font-serif text-4xl text-foreground lg:text-6xl">
                  Your Data Stays{' '}
                  <span className="text-emerald-600">Yours</span>
                </h2>

                <p className="mb-8 text-lg text-muted-foreground leading-7">
                  Built from the ground up with privacy in mind. No hidden data
                  collection, no selling to third parties, no unnecessary
                  permissions.
                </p>

                <div className="mb-8 space-y-6">
                  {privacyFeatures.map((feature, index) => (
                    <div className="flex items-start space-x-4" key={index}>
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                        <feature.icon className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  className="border-emerald-200 hover:bg-emerald-50"
                  size="lg"
                  variant="outline"
                >
                  <Link to="/privacy">Read Our Privacy Policy</Link>
                </Button>
              </div>

              {/* Visual */}
              <div className="relative">
                <Card className="border-emerald-200/50 bg-gradient-to-br from-emerald-50 to-blue-50 p-8">
                  <div className="text-center">
                    <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-600">
                      <ShieldCheck className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="mb-4 font-semibold text-xl">
                      Privacy Promise
                    </h3>
                    <div className="space-y-3 text-muted-foreground text-sm">
                      <div className="flex items-center justify-between">
                        <span>Data Collection</span>
                        <span className="font-medium text-emerald-600">
                          Minimal
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Third-party Sharing</span>
                        <span className="font-medium text-emerald-600">
                          Never
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>PDF Retention</span>
                        <span className="font-medium text-emerald-600">
                          0 Days
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Your Control</span>
                        <span className="font-medium text-emerald-600">
                          Complete
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Decorative elements */}
                <div className="-top-3 -left-3 absolute h-8 w-8 animate-pulse rounded-full bg-emerald-200 opacity-50" />
                <div className="-bottom-2 -right-2 absolute h-6 w-6 animate-pulse rounded-full bg-blue-200 opacity-50" />
              </div>
            </div>
          </div>
        </section>
        <section className="py-20 lg:py-32" id="how-it-works">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-6 font-bold font-serif text-4xl text-foreground lg:text-6xl">
                How Subman <span className="text-primary">Works</span>
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
                Simple, secure, and completely under your control. Get started
                in minutes, not hours.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div className="relative" key={index}>
                  <Card className="group hover:-translate-y-1 h-full border-border/50 bg-card/50 backdrop-blur transition-all duration-300 hover:shadow-lg">
                    <CardContent className="p-8 text-center">
                      <div className="relative mb-6">
                        <div
                          className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${step.color} mb-4`}
                        >
                          <step.icon className="h-8 w-8" />
                        </div>
                        <div className="-top-9 -left-2 absolute flex h-8 w-8 items-center justify-center rounded-full bg-muted font-bold text-muted-foreground text-sm">
                          {step.step}
                        </div>
                      </div>

                      <h3 className="mb-3 font-semibold text-lg transition-colors group-hover:text-primary">
                        {step.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Connection line for desktop */}
                  {index < steps.length - 1 && (
                    <div className="-right-8 absolute top-1/2 hidden h-px w-8 bg-gradient-to-r from-border to-transparent lg:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-slate-900 py-16 text-slate-100">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold font-serif text-2xl">
                  Subman
                </span>
              </div>
              <p className="mb-6 max-w-md text-slate-400 leading-relaxed">
                Privacy-first subscription management for the modern user. Take
                control of your subscriptions without compromising your
                financial privacy.
              </p>
              <div className="flex space-x-4">
                <Button
                  className="text-slate-400 hover:bg-slate-800 hover:text-white"
                  size="icon"
                  variant="ghost"
                >
                  <svg
                    fill="none"
                    height="1227"
                    viewBox="0 0 1200 1227"
                    width="1200"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"
                      fill="currentColor"
                    />
                  </svg>
                </Button>
                <Button
                  className="text-slate-400 hover:bg-slate-800 hover:text-white"
                  size="icon"
                  variant="ghost"
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a className="transition-colors hover:text-white" href="#">
                    Features
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-white" href="#">
                    Security
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-white" href="#">
                    Pricing
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-white" href="#">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="mb-4 font-semibold">Support</h3>
              <ul className="space-y-3 text-slate-400">
                <li>
                  <a className="transition-colors hover:text-white" href="#">
                    Help Center
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-white" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-white" href="#">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-white" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between border-slate-800 border-t pt-8 md:flex-row">
            <p className="mb-4 text-slate-400 text-sm md:mb-0">
              © 2025 Subman. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-slate-400 text-sm">
              <span className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                Privacy-first design
              </span>
              <span>256-bit encryption</span>
              <span>No data selling</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
