import { createFileRoute } from '@tanstack/react-router'
import { Calendar, FileText, Mail, Shield } from 'lucide-react'
import { Badge } from '~/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Separator } from '~/components/ui/separator'

export const Route = createFileRoute('/terms')({
  component: Privacy,
})

function Privacy() {
  return (
    <div className="container mx-auto min-h-screen max-w-5xl bg-background p-4">
      <div className="border-b shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10rounded-lg w-10 items-center justify-center">
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="scroll-m-20 text-balance text-center font-extrabold text-4xl tracking-tight">
            Privacy Policy
          </h1>
        </div>
        <p className="text-lg ">Privacy Policy and Terms of Service</p>
        <div className="mt-3 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">Last Updated: June 19, 2025</span>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Privacy Policy Section */}
        <Card className="shadow-lg">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 " />
              <CardTitle className="text-2xl ">Privacy Policy</CardTitle>
            </div>
            <CardDescription className="text-base">
              At SubSafe, we value your privacy and are committed to protecting
              your personal information. Our privacy-first approach means we do
              not integrate with banks or financial platforms, and we give you
              full control over your data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            {/* Information We Collect */}
            <section>
              <h3 className="mb-4 font-semibold text-xl">
                1. Information We Collect
              </h3>
              <p className=" mb-4">
                We collect only the information necessary to provide our
                subscription management services:
              </p>

              <div className="space-y-6">
                <div className=" rounded-lg p-4">
                  <h4 className="mb-2 font-semibold">
                    User-Provided Information:
                  </h4>
                  <ul className="space-y-2 ">
                    <li>
                      <strong>Account Data:</strong> When you sign up, you
                      provide an email address and optional username. This is
                      used to create and manage your account.
                    </li>
                    <li>
                      <strong>Subscription Data:</strong> You may manually enter
                      subscription details or upload PDF bank/credit card
                      statements for parsing. We use Amazon Textract to extract
                      subscription details from PDFs, but we do not store the
                      PDFs after processing.
                    </li>
                  </ul>
                </div>

                <div className=" rounded-lg p-4">
                  <h4 className="mb-2 font-semibold">
                    Automatically Collected Information:
                  </h4>
                  <ul className="space-y-2 ">
                    <li>
                      <strong>Usage Data:</strong> We collect anonymized data on
                      how you interact with SubSafe to improve the app.
                    </li>
                    <li>
                      <strong>Device Data:</strong> Basic information like
                      browser type, operating system, and IP address to ensure
                      compatibility and security.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                <Badge
                  className="mb-2 bg-green-100 text-green-800"
                  variant="secondary"
                >
                  Privacy First
                </Badge>
                <p className="font-medium text-green-800">
                  No Bank Integrations: We do not connect to your bank or
                  financial accounts, ensuring your financial data remains
                  private.
                </p>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h3 className="mb-4 font-semibold text-xl">
                2. How We Use Your Information
              </h3>
              <div className="grid gap-3">
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full" />
                  <p className="">Create and manage your SubSafe account</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full" />
                  <p className="">
                    Process uploaded PDFs to extract subscription details during
                    onboarding
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full" />
                  <p className="">
                    Provide subscription tracking, reminders, and data insights
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full" />
                  <p className="">
                    Send email or push notifications for payment reminders (if
                    enabled)
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full" />
                  <p className="">
                    Improve our app through anonymized analytics
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-2 h-2 w-2 shrink-0 rounded-full" />
                  <p className="">Ensure security and prevent fraud</p>
                </div>
              </div>
            </section>

            {/* Data Storage and Security */}
            <section>
              <h3 className="mb-4 font-semibold text-xl">
                3. Data Storage and Security
              </h3>
              <div className="grid gap-4">
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <h4 className="mb-2 font-semibold text-amber-900">
                    No PDF Retention
                  </h4>
                  <p className="text-amber-800">
                    Uploaded PDFs are processed using Amazon Textract and
                    deleted immediately after extracting subscription data.
                  </p>
                </div>
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h4 className="mb-2 font-semibold text-blue-900">
                    Encryption
                  </h4>
                  <p className="text-blue-800">
                    All data is stored with 256-bit encryption in our secure
                    database (Neon DB).
                  </p>
                </div>
                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4">
                  <h4 className="mb-2 font-semibold text-purple-900">
                    Two-Factor Authentication
                  </h4>
                  <p className="text-purple-800">
                    Optional 2FA via email enhances account security.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Sharing */}
            <section>
              <h3 className="mb-4 font-semibold text-xl">4. Data Sharing</h3>
              <p className=" mb-4">
                We do not sell, share, or transfer your personal information to
                third parties, except:
              </p>
              <div className="space-y-3">
                <div className="border-l-4 pl-4">
                  <h4 className="font-semibold ">Service Providers</h4>
                  <p className="">
                    We use Amazon Textract for PDF parsing and Firebase for
                    notifications. These providers are bound by strict data
                    protection agreements.
                  </p>
                </div>
                <div className="border-l-4 pl-4">
                  <h4 className="font-semibold ">Legal Requirements</h4>
                  <p className="">
                    We may disclose data if required by law or to protect our
                    rights and safety.
                  </p>
                </div>
                <div className="border-l-4 pl-4">
                  <h4 className="font-semibold ">Anonymized Analytics</h4>
                  <p className="">
                    We use aggregated, non-identifiable data to improve SubSafe.
                  </p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h3 className="mb-4 font-semibold text-xl">5. Your Rights</h3>
              <p className=" mb-4">You have full control over your data:</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-green-50 p-4">
                  <h4 className="mb-2 font-semibold text-green-900">
                    Access & Edit
                  </h4>
                  <p className="text-green-800 text-sm">
                    View and update your account and subscription data anytime
                    in the app.
                  </p>
                </div>
                <div className="rounded-lg bg-red-50 p-4">
                  <h4 className="mb-2 font-semibold text-red-900">Delete</h4>
                  <p className="text-red-800 text-sm">
                    Request deletion of your account and all associated data.
                    We'll delete your data within 30 days.
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 p-4">
                  <h4 className="mb-2 font-semibold text-blue-900">Opt-Out</h4>
                  <p className="text-blue-800 text-sm">
                    Disable notifications or analytics in your account settings.
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 p-4">
                  <h4 className="mb-2 font-semibold text-purple-900">
                    International Rights
                  </h4>
                  <p className="text-purple-800 text-sm">
                    EU, UK, and California users have additional rights under
                    GDPR or CCPA.
                  </p>
                </div>
              </div>
            </section>

            {/* Additional Sections */}
            <div className="grid gap-6 md:grid-cols-2">
              <section>
                <h3 className="mb-3 font-semibold text-lg">7. Cookies</h3>
                <p className=" text-sm">
                  We use minimal cookies for essential functions. You can manage
                  cookie preferences in your browser settings.
                </p>
              </section>
              <section>
                <h3 className="mb-3 font-semibold text-lg">
                  8. Data Retention
                </h3>
                <p className=" text-sm">
                  Account data is retained while your account is active.
                  Inactive accounts are deleted after 12 months.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>

        {/* Terms of Service Section */}
        <Card className="shadow-lg">
          <CardHeader className=" border-b">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 " />
              <CardTitle className="text-2xl ">Terms of Service</CardTitle>
            </div>
            <CardDescription className="text-base">
              Welcome to SubSafe, a privacy-first Progressive Web App for
              managing your subscriptions. By using our app, you agree to these
              terms.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            {/* Using SubSafe */}
            <section>
              <h3 className="mb-4 font-semibold text-xl">1. Using SubSafe</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 font-semibold">Eligibility</h4>
                  <p className="">
                    You must be at least 13 years old to use SubSafe. If under
                    18, you need parental consent.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Account Security</h4>
                  <p className="">
                    You need an account to use SubSafe. Keep your login details
                    secure and don't share them.
                  </p>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">User Responsibilities</h4>
                  <div className=" rounded-lg p-4">
                    <p className=" mb-2">You agree to:</p>
                    <div className="space-y-1 text-sm ">
                      <p>• Provide accurate subscription details</p>
                      <p>• Review parsed data from uploaded PDFs</p>
                      <p>
                        • Use SubSafe for personal, non-commercial purposes only
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Prohibited Actions</h4>
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="mb-2 text-red-800">You must not:</p>
                    <div className="space-y-1 text-red-700 text-sm">
                      <p>
                        • Attempt to hack, reverse-engineer, or misuse SubSafe
                      </p>
                      <p>• Upload harmful files or violate any laws</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Freemium Model */}
            <section>
              <h3 className="mb-4 font-semibold text-xl">2. Freemium Model</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-green-200 bg-green-50 p-6">
                  <Badge className="mb-3 bg-green-100 text-green-800">
                    Free Tier
                  </Badge>
                  <div className="space-y-2 text-green-800 text-sm">
                    <p>• Unlimited subscription tracking</p>
                    <p>• Payment reminders</p>
                    <p>• 3 PDF parses/month</p>
                    <p>• Basic insights</p>
                  </div>
                </div>
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
                  <Badge className="mb-3 bg-blue-100 text-blue-800">
                    Premium Tier
                  </Badge>
                  <p className="mb-2 font-semibold text-blue-900">
                    $3.99/month or $39.99/year
                  </p>
                  <div className="space-y-2 text-blue-800 text-sm">
                    <p>• Unlimited PDF parsing</p>
                    <p>• Advanced insights</p>
                    <p>• Multi-device sync</p>
                    <p>• CSV/PDF export</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
                <p className="text-amber-800 text-sm">
                  <strong>Note:</strong> No refunds for premium subscriptions,
                  but you can cancel anytime to prevent future charges.
                </p>
              </div>
            </section>

            {/* Your Content */}
            <section>
              <h3 className="mb-4 font-semibold text-xl">3. Your Content</h3>
              <div className="space-y-3">
                <div className="border-blue-300 border-l-4 pl-4">
                  <h4 className="font-semibold ">Ownership</h4>
                  <p className="">
                    You own all subscription data you enter or approve from PDF
                    parsing.
                  </p>
                </div>
                <div className="border-blue-300 border-l-4 pl-4">
                  <h4 className="font-semibold ">License</h4>
                  <p className="">
                    You grant SubSafe a limited license to process and store
                    your data to provide our services.
                  </p>
                </div>
                <div className="border-blue-300 border-l-4 pl-4">
                  <h4 className="font-semibold ">Accuracy</h4>
                  <p className="">
                    You're responsible for ensuring the accuracy of your
                    subscription data.
                  </p>
                </div>
              </div>
            </section>

            {/* Additional Terms */}
            <div className="grid gap-6 md:grid-cols-2">
              <section>
                <h3 className="mb-3 font-semibold text-lg">6. Termination</h3>
                <p className=" mb-2 text-sm">
                  You can delete your account anytime. We may suspend accounts
                  for violating these terms.
                </p>
                <p className=" text-sm">
                  Termination deletes your data within 30 days.
                </p>
              </section>
              <section>
                <h3 className="mb-3 font-semibold text-lg">7. Disclaimers</h3>
                <p className=" mb-2 text-sm">
                  SubSafe is provided "as is." We don't guarantee 100% accuracy
                  of PDF parsing.
                </p>
                <p className=" text-sm">
                  We're not responsible for financial decisions based on
                  SubSafe's data.
                </p>
              </section>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="bg-linear-to-r from-blue-50 to-slate-50 shadow-lg">
          <CardContent className="p-8 text-center">
            <Mail className="mx-auto mb-4 h-8 w-8" />
            <h3 className="mb-2 font-semibold text-xl">
              Questions or Concerns?
            </h3>
            <p className=" mb-4">
              We're here to help with any questions about our Privacy Policy or
              Terms of Service.
            </p>
            <a
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-white transition-colors hover:bg-blue-700"
              href="mailto:support@subsafe.app"
            >
              <Mail className="h-4 w-4" />
              support@subsafe.app
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
