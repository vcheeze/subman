import { createFileRoute } from '@tanstack/react-router'
import { Shield, FileText, Mail, Calendar } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Separator } from '~/components/ui/separator'

export const Route = createFileRoute('/_public/terms')({
  component: Privacy,
})

function Privacy() {
  return (
    <div className="container max-w-5xl mx-auto p-4 min-h-screen bg-background">
      <div className="border-b shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
              Privacy Policy
            </h1>
        </div>
        <p className="text-lg ">Privacy Policy and Terms of Service</p>
        <div className="flex items-center gap-2 mt-3">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Last Updated: June 19, 2025</span>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Privacy Policy Section */}
        <Card className="shadow-lg">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 " />
              <CardTitle className="text-2xl ">Privacy Policy</CardTitle>
            </div>
            <CardDescription className="text-base">
              At SubSafe, we value your privacy and are committed to protecting your personal information. 
              Our privacy-first approach means we do not integrate with banks or financial platforms, 
              and we give you full control over your data.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            
            {/* Information We Collect */}
            <section>
              <h3 className="text-xl font-semibold  mb-4">1. Information We Collect</h3>
              <p className=" mb-4">
                We collect only the information necessary to provide our subscription management services:
              </p>
              
              <div className="space-y-6">
                <div className=" p-4 rounded-lg">
                  <h4 className="font-semibold  mb-2">User-Provided Information:</h4>
                  <ul className="space-y-2 ">
                    <li><strong>Account Data:</strong> When you sign up, you provide an email address and optional username. This is used to create and manage your account.</li>
                    <li><strong>Subscription Data:</strong> You may manually enter subscription details or upload PDF bank/credit card statements for parsing. We use Amazon Textract to extract subscription details from PDFs, but we do not store the PDFs after processing.</li>
                  </ul>
                </div>
                
                <div className=" p-4 rounded-lg">
                  <h4 className="font-semibold  mb-2">Automatically Collected Information:</h4>
                  <ul className="space-y-2 ">
                    <li><strong>Usage Data:</strong> We collect anonymized data on how you interact with SubSafe to improve the app.</li>
                    <li><strong>Device Data:</strong> Basic information like browser type, operating system, and IP address to ensure compatibility and security.</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <Badge variant="secondary" className="bg-green-100 text-green-800 mb-2">
                  Privacy First
                </Badge>
                <p className="text-green-800 font-medium">
                  No Bank Integrations: We do not connect to your bank or financial accounts, ensuring your financial data remains private.
                </p>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h3 className="text-xl font-semibold  mb-4">2. How We Use Your Information</h3>
              <div className="grid gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 shrink-0"></div>
                  <p className="">Create and manage your SubSafe account</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 shrink-0"></div>
                  <p className="">Process uploaded PDFs to extract subscription details during onboarding</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 shrink-0"></div>
                  <p className="">Provide subscription tracking, reminders, and data insights</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 shrink-0"></div>
                  <p className="">Send email or push notifications for payment reminders (if enabled)</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 shrink-0"></div>
                  <p className="">Improve our app through anonymized analytics</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full mt-2 shrink-0"></div>
                  <p className="">Ensure security and prevent fraud</p>
                </div>
              </div>
            </section>

            {/* Data Storage and Security */}
            <section>
              <h3 className="text-xl font-semibold  mb-4">3. Data Storage and Security</h3>
              <div className="grid gap-4">
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-900 mb-2">No PDF Retention</h4>
                  <p className="text-amber-800">Uploaded PDFs are processed using Amazon Textract and deleted immediately after extracting subscription data.</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Encryption</h4>
                  <p className="text-blue-800">All data is stored with 256-bit encryption in our secure database (Neon DB).</p>
                </div>
                <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Two-Factor Authentication</h4>
                  <p className="text-purple-800">Optional 2FA via email enhances account security.</p>
                </div>
              </div>
            </section>

            {/* Data Sharing */}
            <section>
              <h3 className="text-xl font-semibold  mb-4">4. Data Sharing</h3>
              <p className=" mb-4">
                We do not sell, share, or transfer your personal information to third parties, except:
              </p>
              <div className="space-y-3">
                <div className="border-l-4 pl-4">
                  <h4 className="font-semibold ">Service Providers</h4>
                  <p className="">We use Amazon Textract for PDF parsing and Firebase for notifications. These providers are bound by strict data protection agreements.</p>
                </div>
                <div className="border-l-4 pl-4">
                  <h4 className="font-semibold ">Legal Requirements</h4>
                  <p className="">We may disclose data if required by law or to protect our rights and safety.</p>
                </div>
                <div className="border-l-4 pl-4">
                  <h4 className="font-semibold ">Anonymized Analytics</h4>
                  <p className="">We use aggregated, non-identifiable data to improve SubSafe.</p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h3 className="text-xl font-semibold  mb-4">5. Your Rights</h3>
              <p className=" mb-4">You have full control over your data:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Access & Edit</h4>
                  <p className="text-green-800 text-sm">View and update your account and subscription data anytime in the app.</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-900 mb-2">Delete</h4>
                  <p className="text-red-800 text-sm">Request deletion of your account and all associated data. We'll delete your data within 30 days.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Opt-Out</h4>
                  <p className="text-blue-800 text-sm">Disable notifications or analytics in your account settings.</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">International Rights</h4>
                  <p className="text-purple-800 text-sm">EU, UK, and California users have additional rights under GDPR or CCPA.</p>
                </div>
              </div>
            </section>

            {/* Additional Sections */}
            <div className="grid md:grid-cols-2 gap-6">
              <section>
                <h3 className="text-lg font-semibold  mb-3">7. Cookies</h3>
                <p className=" text-sm">We use minimal cookies for essential functions. You can manage cookie preferences in your browser settings.</p>
              </section>
              <section>
                <h3 className="text-lg font-semibold  mb-3">8. Data Retention</h3>
                <p className=" text-sm">Account data is retained while your account is active. Inactive accounts are deleted after 12 months.</p>
              </section>
            </div>
          </CardContent>
        </Card>

        {/* Terms of Service Section */}
        <Card className="shadow-lg">
          <CardHeader className=" border-b">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 " />
              <CardTitle className="text-2xl ">Terms of Service</CardTitle>
            </div>
            <CardDescription className="text-base">
              Welcome to SubSafe, a privacy-first Progressive Web App for managing your subscriptions. 
              By using our app, you agree to these terms.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            
            {/* Using SubSafe */}
            <section>
              <h3 className="text-xl font-semibold  mb-4">1. Using SubSafe</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold  mb-2">Eligibility</h4>
                  <p className="">You must be at least 13 years old to use SubSafe. If under 18, you need parental consent.</p>
                </div>
                <div>
                  <h4 className="font-semibold  mb-2">Account Security</h4>
                  <p className="">You need an account to use SubSafe. Keep your login details secure and don't share them.</p>
                </div>
                <div>
                  <h4 className="font-semibold  mb-2">User Responsibilities</h4>
                  <div className=" p-4 rounded-lg">
                    <p className=" mb-2">You agree to:</p>
                    <div className="space-y-1 text-sm ">
                      <p>• Provide accurate subscription details</p>
                      <p>• Review parsed data from uploaded PDFs</p>
                      <p>• Use SubSafe for personal, non-commercial purposes only</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold  mb-2">Prohibited Actions</h4>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-red-800 mb-2">You must not:</p>
                    <div className="space-y-1 text-sm text-red-700">
                      <p>• Attempt to hack, reverse-engineer, or misuse SubSafe</p>
                      <p>• Upload harmful files or violate any laws</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Freemium Model */}
            <section>
              <h3 className="text-xl font-semibold  mb-4">2. Freemium Model</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
                  <Badge className="bg-green-100 text-green-800 mb-3">Free Tier</Badge>
                  <div className="space-y-2 text-sm text-green-800">
                    <p>• Unlimited subscription tracking</p>
                    <p>• Payment reminders</p>
                    <p>• 3 PDF parses/month</p>
                    <p>• Basic insights</p>
                  </div>
                </div>
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                  <Badge className="bg-blue-100 text-blue-800 mb-3">Premium Tier</Badge>
                  <p className="text-blue-900 font-semibold mb-2">$3.99/month or $39.99/year</p>
                  <div className="space-y-2 text-sm text-blue-800">
                    <p>• Unlimited PDF parsing</p>
                    <p>• Advanced insights</p>
                    <p>• Multi-device sync</p>
                    <p>• CSV/PDF export</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-amber-800 text-sm">
                  <strong>Note:</strong> No refunds for premium subscriptions, but you can cancel anytime to prevent future charges.
                </p>
              </div>
            </section>

            {/* Your Content */}
            <section>
              <h3 className="text-xl font-semibold  mb-4">3. Your Content</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-300 pl-4">
                  <h4 className="font-semibold ">Ownership</h4>
                  <p className="">You own all subscription data you enter or approve from PDF parsing.</p>
                </div>
                <div className="border-l-4 border-blue-300 pl-4">
                  <h4 className="font-semibold ">License</h4>
                  <p className="">You grant SubSafe a limited license to process and store your data to provide our services.</p>
                </div>
                <div className="border-l-4 border-blue-300 pl-4">
                  <h4 className="font-semibold ">Accuracy</h4>
                  <p className="">You're responsible for ensuring the accuracy of your subscription data.</p>
                </div>
              </div>
            </section>

            {/* Additional Terms */}
            <div className="grid md:grid-cols-2 gap-6">
              <section>
                <h3 className="text-lg font-semibold  mb-3">6. Termination</h3>
                <p className=" text-sm mb-2">You can delete your account anytime. We may suspend accounts for violating these terms.</p>
                <p className=" text-sm">Termination deletes your data within 30 days.</p>
              </section>
              <section>
                <h3 className="text-lg font-semibold  mb-3">7. Disclaimers</h3>
                <p className=" text-sm mb-2">SubSafe is provided "as is." We don't guarantee 100% accuracy of PDF parsing.</p>
                <p className=" text-sm">We're not responsible for financial decisions based on SubSafe's data.</p>
              </section>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="shadow-lg bg-linear-to-r from-blue-50 to-slate-50">
          <CardContent className="p-8 text-center">
            <Mail className="w-8 h-8  mx-auto mb-4" />
            <h3 className="text-xl font-semibold  mb-2">Questions or Concerns?</h3>
            <p className=" mb-4">
              We're here to help with any questions about our Privacy Policy or Terms of Service.
            </p>
            <a 
              href="mailto:support@subsafe.app" 
              className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail className="w-4 h-4" />
              support@subsafe.app
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
