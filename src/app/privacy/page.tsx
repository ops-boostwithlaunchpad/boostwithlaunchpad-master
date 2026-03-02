import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-32 px-12 max-md:px-5 max-md:py-20 text-center">
          <div className="max-w-[900px] mx-auto">
            <h1 className="font-heading text-[3.5rem] max-md:text-[2.2rem] font-bold leading-[1.1] mb-6">
              Privacy Policy
            </h1>
            <p className="text-text-dim text-lg">
              Last Updated: February 2, 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-32 px-12 max-md:px-5 max-md:pb-20">
          <div className="max-w-[900px] mx-auto">
            <div className="bg-[#1a1a1a] border border-[#27272a] rounded-2xl p-12 max-md:p-6">
              {/* Introduction */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Introduction
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8]">
                  Launchpad (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services, including Launchpad Boost, Launchpad Automation, and any related platforms (collectively, the &quot;Services&quot;). By accessing or using our Services, you agree to the terms of this Privacy Policy. If you do not agree with the practices described herein, please do not use our Services.
                </p>
              </div>

              {/* Information We Collect */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Information We Collect
                </h2>

                <h3 className="font-heading text-xl font-semibold mb-3 mt-6">
                  Personal Information
                </h3>
                <p className="text-[#a1a1aa] leading-[1.8] mb-4">
                  We may collect the following personal information when you register for an account, subscribe to a plan, or interact with our Services:
                </p>
                <ul className="text-[#a1a1aa] leading-[1.8] list-disc pl-6 space-y-2">
                  <li>Name, email address, and phone number</li>
                  <li>Business name, address, and category</li>
                  <li>Payment and billing information</li>
                  <li>Google Business Profile access credentials and authorization tokens</li>
                  <li>Communication preferences</li>
                </ul>

                <h3 className="font-heading text-xl font-semibold mb-3 mt-6">
                  Automatically Collected Information
                </h3>
                <p className="text-[#a1a1aa] leading-[1.8] mb-4">
                  When you use our Services, we may automatically collect certain information, including:
                </p>
                <ul className="text-[#a1a1aa] leading-[1.8] list-disc pl-6 space-y-2">
                  <li>Device and browser information (e.g., IP address, browser type, operating system)</li>
                  <li>Usage data (e.g., pages visited, features used, session duration)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Google Business Profile performance data and analytics</li>
                </ul>
              </div>

              {/* How We Use Your Information */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8] mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="text-[#a1a1aa] leading-[1.8] list-disc pl-6 space-y-2">
                  <li>Providing, maintaining, and improving our Services</li>
                  <li>Processing payments and managing subscriptions</li>
                  <li>Optimizing your Google Business Profile through automated SEO strategies</li>
                  <li>Sending weekly performance reports and service updates</li>
                  <li>Improving our platform, algorithms, and user experience</li>
                  <li>Responding to customer support requests and inquiries</li>
                  <li>Preventing fraud, abuse, and unauthorized access</li>
                  <li>Complying with legal obligations and enforcing our terms</li>
                </ul>
              </div>

              {/* Information Sharing and Disclosure */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Information Sharing and Disclosure
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8] mb-4">
                  We do not sell your personal information. We may share your information in the following circumstances:
                </p>
                <ul className="text-[#a1a1aa] leading-[1.8] list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-[#e5e5e5]">Service Providers:</strong> We may share information with trusted third-party vendors who assist in operating our platform, processing payments, and delivering services.
                  </li>
                  <li>
                    <strong className="text-[#e5e5e5]">Google:</strong> With your authorization, we access and interact with Google APIs to manage and optimize your Google Business Profile.
                  </li>
                  <li>
                    <strong className="text-[#e5e5e5]">Legal Requirements:</strong> We may disclose information if required by law, court order, or governmental regulation, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.
                  </li>
                  <li>
                    <strong className="text-[#e5e5e5]">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.
                  </li>
                </ul>
              </div>

              {/* Data Security */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Data Security
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8] mb-4">
                  We implement industry-standard security measures to protect your information, including:
                </p>
                <ul className="text-[#a1a1aa] leading-[1.8] list-disc pl-6 space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security audits and vulnerability assessments</li>
                  <li>Role-based access controls and authentication protocols</li>
                  <li>Secure payment processing through Stripe</li>
                </ul>
                <p className="text-[#a1a1aa] leading-[1.8] mt-4">
                  While we strive to protect your information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>

              {/* Your Rights and Choices */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Your Rights and Choices
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8] mb-4">
                  Depending on your jurisdiction, you may have the following rights regarding your personal information:
                </p>
                <ul className="text-[#a1a1aa] leading-[1.8] list-disc pl-6 space-y-2">
                  <li>Access, correct, or delete your personal data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Revoke Google Business Profile access authorization</li>
                  <li>Request data portability</li>
                  <li>Object to or restrict certain processing activities</li>
                </ul>
                <p className="text-[#a1a1aa] leading-[1.8] mt-4">
                  To exercise any of these rights, please contact us at{" "}
                  <a
                    href="mailto:privacy@boostwithlaunchpad.com"
                    className="text-accent hover:underline"
                  >
                    privacy@boostwithlaunchpad.com
                  </a>
                  . We will respond to your request within 30 days.
                </p>
              </div>

              {/* Cookies and Tracking */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Cookies and Tracking
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8]">
                  We use cookies and similar tracking technologies to enhance your experience, analyze usage patterns, and deliver personalized content. You can manage your cookie preferences through your browser settings. Please note that disabling cookies may affect the functionality of certain features within our Services.
                </p>
              </div>

              {/* Data Retention */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Data Retention
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8]">
                  We retain your personal information for as long as your account is active or as needed to provide our Services. Upon cancellation of your subscription, we will retain your data for up to 90 days before it is permanently deleted, unless we are required to retain it for legal or regulatory purposes. You may request earlier deletion by contacting us.
                </p>
              </div>

              {/* Children's Privacy */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Children&apos;s Privacy
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8]">
                  Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected data from a minor, we will take steps to delete such information promptly.
                </p>
              </div>

              {/* International Data Transfers */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  International Data Transfers
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8]">
                  Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your jurisdiction. By using our Services, you consent to the transfer of your information to the United States and other countries where we operate. We take appropriate measures to ensure your data is protected in accordance with this Privacy Policy.
                </p>
              </div>

              {/* Changes to This Privacy Policy */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Changes to This Privacy Policy
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8]">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the &quot;Last Updated&quot; date. Your continued use of our Services after any changes constitutes your acceptance of the revised policy.
                </p>
              </div>

              {/* Contact Box */}
              <div className="mt-16 rounded-2xl bg-accent/10 border border-accent/20 p-8 max-md:p-6">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Contact Us
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8] mb-6">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <ul className="text-[#a1a1aa] leading-[1.8] space-y-2">
                  <li>
                    <strong className="text-[#e5e5e5]">Email:</strong>{" "}
                    <a
                      href="mailto:support@boostwithlaunchpad.com"
                      className="text-accent hover:underline"
                    >
                      support@boostwithlaunchpad.com
                    </a>
                  </li>
                  <li>
                    <strong className="text-[#e5e5e5]">Address:</strong> Launchpad, Palm Beach, Florida, USA
                  </li>
                  <li>
                    <strong className="text-[#e5e5e5]">Online:</strong>{" "}
                    <Link href="/contact" className="text-accent hover:underline">
                      Contact Form
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
