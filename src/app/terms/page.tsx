import React from 'react'
import Link from 'next/link'
import { ArrowLeft, FileText, Scale, Shield, AlertTriangle, Clock, Mail, Calendar } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto !px-4 py-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto !px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Please read these terms carefully before using our services. By using our platform, you agree to be bound by these terms.
            </p>
            <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
              <Calendar className="w-4 h-4" />
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-24">
            <div className="bg-card rounded-2xl border shadow-sm p-8 mb-8">
              <div className="flex flex-col lg:flex-row items-start gap-4 mb-6">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Acceptance of Terms</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      By accessing and using our website and services, you accept and agree to be bound by the terms and provision of this agreement.
                    </p>
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">Important Notice</h4>
                          <p className="text-amber-700 dark:text-amber-300 text-sm">
                            If you do not agree to abide by the above, please do not use this service.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border shadow-sm p-8 mb-8">
              <div className="flex flex-col lg:flex-row items-start gap-4 mb-6">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Use License</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>Permission is granted to temporarily download one copy of our materials for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                    
                    <ul className="list-disc ml-6 space-y-2">
                      <li>Modify or copy the materials</li>
                      <li>Use the materials for any commercial purpose or for any public display</li>
                      <li>Attempt to reverse engineer any software contained on our website</li>
                      <li>Remove any copyright or other proprietary notations from the materials</li>
                    </ul>

                    <div className="bg-muted/50 rounded-lg p-4 mt-4">
                      <p className="text-sm">
                        <strong>Note:</strong> This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times.</p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Your Responsibilities</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Maintain account security</li>
                      <li>• Keep information updated</li>
                      <li>• Use strong passwords</li>
                      <li>• Report unauthorized access</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Account Termination</h4>
                    <ul className="text-sm space-y-1">
                      <li>• You may delete anytime</li>
                      <li>• We may suspend for violations</li>
                      <li>• Data retention policies apply</li>
                      <li>• Appeal process available</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Prohibited Uses</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You may not use our service:</p>
                
                <div className="grid gap-3 mt-4">
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div className="text-red-700 dark:text-red-300">
                      For any unlawful purpose or to solicit others to perform unlawful acts
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div className="text-red-700 dark:text-red-300">
                      To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div className="text-red-700 dark:text-red-300">
                      To infringe upon or violate our intellectual property rights or the intellectual property rights of others
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                    <div className="text-red-700 dark:text-red-300">
                      To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border shadow-sm p-8 mb-8">
              <div className="flex flex-col lg:flex-row items-start gap-4 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Service Availability</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>We strive to provide consistent and reliable service, but cannot guarantee 100% uptime.</p>
                    
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Maintenance Windows</h4>
                      <p className="text-sm">
                        We may perform scheduled maintenance that could temporarily interrupt service. 
                        We will provide advance notice when possible.
                      </p>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Emergency Maintenance</h4>
                      <p className="text-sm">
                        In case of security issues or critical bugs, we may perform emergency maintenance 
                        without advance notice to protect user data and service integrity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  The information on this website is provided on an &quot;as is&quot; basis. To the fullest extent permitted by law, 
                  this Company excludes all representations, warranties, conditions and terms.
                </p>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Limitation of Liability</h4>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    In no event shall our company be liable for any special, direct, indirect, consequential, 
                    or incidental damages or any damages whatsoever arising out of or in connection with the use of this service.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Modifications</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may revise these terms of service at any time without notice. By using this website, 
                  you are agreeing to be bound by the then current version of these terms of service.
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Notification of Changes</h4>
                  <p className="text-blue-700 dark:text-blue-300 text-sm">
                    Material changes to these terms will be communicated via email or prominent notice on our website 
                    at least 30 days before they take effect.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border p-8">
              <div className="flex flex-col lg:flex-row items-start gap-4">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Contact Information</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href="mailto:legal@agency.com" className="text-primary hover:underline font-medium">
                        legal@agency.com
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      We will respond to your inquiry within 5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
