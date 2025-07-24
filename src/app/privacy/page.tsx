import React from 'react'
import { Shield, Eye, Users, Lock, Mail } from 'lucide-react'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'
import { ContentSection, InfoBox, RightItem, ContactSection } from '@/components/legal/LegalComponents'

export default function Privacy() {
  return (
    <LegalPageLayout 
      title="Privacy Policy"
      description="Your privacy is important to us. This policy explains how we collect, use, and protect your information."
      icon={Shield}
    >
      <ContentSection icon={Eye} title="Information We Collect" iconColor="blue">
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
      </ContentSection>

      <ContentSection icon={Users} title="How We Use Your Information" iconColor="green">
        <p>We use your information for the following purposes:</p>
        
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Service Provision:</strong> To provide, maintain, and improve our services</li>
          <li><strong>Communication:</strong> To send updates, newsletters, and respond to inquiries</li>
          <li><strong>Personalization:</strong> To customize your experience and show relevant content</li>
          <li><strong>Analytics:</strong> To understand usage patterns and improve our platform</li>
          <li><strong>Security:</strong> To protect against fraud and maintain platform security</li>
          <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
        </ul>
      </ContentSection>

      <ContentSection icon={Lock} title="Information Sharing and Disclosure" iconColor="purple">
        <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
        
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Service Providers:</strong> With trusted third-party providers who help us operate our services</li>
          <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or business transfers</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
          <li><strong>Consent:</strong> When you have given explicit consent to share your information</li>
        </ul>

        <InfoBox title="Third-Party Services">
          Our website may contain links to third-party services. We are not responsible for their privacy practices and encourage you to review their policies.
        </InfoBox>
      </ContentSection>

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
            <RightItem title="Access" description="Request a copy of your personal data" />
            <RightItem title="Rectification" description="Correct inaccurate or incomplete data" />
            <RightItem title="Erasure" description="Request deletion of your personal data" />
            <RightItem title="Portability" description="Receive your data in a structured format" />
          </div>
        </div>
      </div>

      <ContactSection
        icon={Mail}
        title="Contact Us"
        description="If you have any questions about this Privacy Policy or need to exercise your rights, please contact us:"
        email="privacy@agency.com"
        additionalInfo="We will respond to your request within 30 days."
      />
    </LegalPageLayout>
  )
}
