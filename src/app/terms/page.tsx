import React from 'react'
import { FileText, Scale, Shield, AlertTriangle, Clock, Mail } from 'lucide-react'
import { LegalPageLayout } from '@/components/legal/LegalPageLayout'
import { ContentSection, InfoBox, ContactSection } from '@/components/legal/LegalComponents'

export default function Terms() {
  return (
    <LegalPageLayout 
      title="Terms of Service"
      description="Please read these terms carefully before using our services. By using our platform, you agree to be bound by these terms."
      icon={FileText}
    >
      <ContentSection icon={Scale} title="Acceptance of Terms" iconColor="blue">
        <p>
          By accessing and using this website, you accept and agree to be bound by the terms 
          and provision of this agreement. If you do not agree to abide by the above, please 
          do not use this service.
        </p>
        <p>
          These terms apply to all visitors, users, and others who access or use our service. 
          We reserve the right to update these terms at any time without prior notice.
        </p>
      </ContentSection>

      <ContentSection icon={Shield} title="Use License" iconColor="green">
        <p>We grant you a limited, non-exclusive, non-transferable license to use our services, subject to these terms:</p>
        
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Permitted Uses:</strong> Personal and commercial use in accordance with our guidelines</li>
          <li><strong>Restrictions:</strong> You may not modify, distribute, or reverse engineer our services</li>
          <li><strong>Content:</strong> You retain ownership of your content but grant us license to use it</li>
          <li><strong>Compliance:</strong> You must comply with all applicable laws and regulations</li>
        </ul>

        <InfoBox title="Commercial Use Guidelines" variant="info">
          For commercial use of our services, additional terms may apply. Please contact our sales team for enterprise licensing options.
        </InfoBox>
      </ContentSection>

      <ContentSection icon={AlertTriangle} title="User Responsibilities" iconColor="orange">
        <p>As a user of our services, you agree to:</p>
        
        <ul className="list-disc ml-6 space-y-2">
          <li>Provide accurate and complete information</li>
          <li>Maintain the security of your account credentials</li>
          <li>Use our services only for lawful purposes</li>
          <li>Respect the intellectual property rights of others</li>
          <li>Not engage in any activity that could harm or disrupt our services</li>
        </ul>

        <InfoBox title="Account Security" variant="warning">
          You are responsible for maintaining the confidentiality of your account and password. 
          Please notify us immediately of any unauthorized access to your account.
        </InfoBox>
      </ContentSection>

      <div className="bg-card rounded-2xl border shadow-sm p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>While we strive to provide continuous service, we cannot guarantee uninterrupted access:</p>
          
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Planned Maintenance</h4>
              <ul className="text-sm space-y-1">
                <li>• Scheduled updates and improvements</li>
                <li>• Advance notice when possible</li>
                <li>• Minimal disruption during off-peak hours</li>
              </ul>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Emergency Maintenance</h4>
              <ul className="text-sm space-y-1">
                <li>• Critical security updates</li>
                <li>• Infrastructure issues</li>
                <li>• Service restoration priorities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <ContentSection icon={AlertTriangle} title="Disclaimer and Limitations" iconColor="red">
        <p>Our services are provided &quot;as is&quot; without warranties of any kind:</p>
        
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>No Warranties:</strong> We disclaim all express and implied warranties</li>
          <li><strong>Limitation of Liability:</strong> Our liability is limited to the maximum extent permitted by law</li>
          <li><strong>Indemnification:</strong> You agree to indemnify us against claims arising from your use</li>
          <li><strong>Third-Party Content:</strong> We are not responsible for third-party content or services</li>
        </ul>

        <InfoBox title="Important Legal Notice" variant="warning">
          Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability. 
          In such cases, our liability will be limited to the fullest extent permitted by applicable law.
        </InfoBox>
      </ContentSection>

      <ContentSection icon={Clock} title="Termination" iconColor="purple">
        <p>Either party may terminate this agreement under the following circumstances:</p>
        
        <div className="space-y-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">Termination by You</h4>
            <p className="text-sm">You may terminate your account at any time by contacting our support team or using the account closure feature in your dashboard.</p>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">Termination by Us</h4>
            <p className="text-sm">We may terminate or suspend your account immediately if you breach these terms or engage in prohibited activities.</p>
          </div>
        </div>

        <p className="mt-4">
          Upon termination, your right to use our services will cease immediately. 
          Provisions that by their nature should survive termination will remain in effect.
        </p>
      </ContentSection>

      <div className="bg-card rounded-2xl border shadow-sm p-8 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            These terms are governed by and construed in accordance with the laws of [Your Jurisdiction], 
            without regard to its conflict of law provisions.
          </p>
          <p>
            Any disputes arising from these terms or your use of our services will be resolved through 
            binding arbitration in accordance with the rules of [Arbitration Organization].
          </p>
        </div>
      </div>

      <ContactSection
        icon={Mail}
        title="Questions About These Terms"
        description="If you have any questions about these Terms of Service, please don't hesitate to contact us:"
        email="legal@agency.com"
        additionalInfo="We're here to help clarify any concerns you may have."
      />
    </LegalPageLayout>
  )
}
