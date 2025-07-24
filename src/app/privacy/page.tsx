import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Eye, Users, Lock, Mail, Calendar } from 'lucide-react'

export default function Privacy() {
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
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold bg-gradient-to-b from-foreground to-muted-foreground bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <p className=" text-muted-foreground max-w-xl mx-auto mb-6">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
                  <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>We collect several types of information to provide and improve our services:</p>
                    
                    <div className="ml-4">
                      <h4 className="font-semibold text-foreground mb-2">Personal Information</h4>
                      <ul className="list-disc ml-6 space-y-1">
                        <li>Name, email address, and contact information</li>
                        <li>Account credentials and profile information</li>
                        <li>Payment and billing information</li>
                        <li>Communication preferences</li>
                      </ul>
                    </div>

                    <div className="ml-4">
                      <h4 className="font-semibold text-foreground mb-2">Usage Information</h4>
                      <ul className="list-disc ml-6 space-y-1">
                        <li>Pages visited, features used, and time spent on our platform</li>
                        <li>Device information, IP address, and browser type</li>
                        <li>Location data (with your permission)</li>
                        <li>Cookies and similar tracking technologies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border shadow-sm p-8 mb-8">
              <div className="flex flex-col lg:flex-row items-start gap-4 mb-6">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>We use your information for the following purposes:</p>
                    
                    <ul className="list-disc ml-6 space-y-2">
                      <li><strong>Service Provision:</strong> To provide, maintain, and improve our services</li>
                      <li><strong>Communication:</strong> To send updates, newsletters, and respond to inquiries</li>
                      <li><strong>Personalization:</strong> To customize your experience and show relevant content</li>
                      <li><strong>Analytics:</strong> To understand usage patterns and improve our platform</li>
                      <li><strong>Security:</strong> To protect against fraud and maintain platform security</li>
                      <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border shadow-sm p-8 mb-8">
              <div className="flex flex-col lg:flex-row items-start gap-4 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Lock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Information Sharing and Disclosure</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
                    
                    <ul className="list-disc ml-6 space-y-2">
                      <li><strong>Service Providers:</strong> With trusted third-party providers who help us operate our services</li>
                      <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or business transfers</li>
                      <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
                      <li><strong>Consent:</strong> When you have given explicit consent to share your information</li>
                    </ul>

                    <div className="bg-muted/50 rounded-lg p-4 mt-4">
                      <h4 className="font-semibold text-foreground mb-2">Third-Party Services</h4>
                      <p>Our website may contain links to third-party services. We are not responsible for their privacy practices and encourage you to review their policies.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We implement appropriate technical and organizational measures to protect your personal information:</p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Technical Safeguards</h4>
                    <ul className="text-sm space-y-1">
                      <li>• SSL/TLS encryption</li>
                      <li>• Regular security audits</li>
                      <li>• Access controls and authentication</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">Organizational Measures</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Employee training programs</li>
                      <li>• Data processing agreements</li>
                      <li>• Incident response procedures</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl border shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the following rights regarding your personal information:</p>
                
                <div className="grid gap-3 mt-4">
                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong className="text-foreground">Access:</strong> Request a copy of your personal data
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong className="text-foreground">Rectification:</strong> Correct inaccurate or incomplete data
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong className="text-foreground">Erasure:</strong> Request deletion of your personal data
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <strong className="text-foreground">Portability:</strong> Receive your data in a structured format
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border p-8">
              <div className="flex flex-col lg:flex-row items-start gap-4">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about this Privacy Policy or need to exercise your rights, please contact us:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href="mailto:privacy@agency.com" className="text-primary hover:underline font-medium">
                        privacy@agency.com
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      We will respond to your request within 30 days.
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
