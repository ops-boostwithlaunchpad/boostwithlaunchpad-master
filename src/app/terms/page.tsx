import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="py-32 px-12 max-md:px-5 max-md:py-20 text-center">
          <div className="max-w-[900px] mx-auto">
            <h1 className="font-heading text-[3.5rem] max-md:text-[2.2rem] font-bold leading-[1.1] mb-6">
              Terms of Service
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
              {/* Agreement to Terms */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Agreement to Terms
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8]">
                  By accessing or using the services provided by Launchpad (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), including Launchpad Boost, Launchpad Automation, and any related platforms (collectively, the &quot;Services&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not access or use the Services. These Terms constitute a legally binding agreement between you and Launchpad.
                </p>
              </div>

              {/* Service Description */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Service Description
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8]">
                  Launchpad provides AI-powered platforms designed to help businesses grow and operate more efficiently. Our current services include:
                </p>
                <ul className="text-[#a1a1aa] leading-[1.8] list-disc pl-6 space-y-2 mt-4">
                  <li>
                    <strong className="text-[#e5e5e5]">Launchpad Boost:</strong> An automated platform for Google Business Profile (GBP) optimization, local SEO enhancement, review generation, and rank monitoring.
                  </li>
                  <li>
                    <strong className="text-[#e5e5e5]">Launchpad Automation:</strong> A custom AI agent platform that builds and deploys intelligent automation solutions tailored to your specific business workflows and operational needs.
                  </li>
                </ul>
                <p className="text-[#a1a1aa] leading-[1.8] mt-4">
                  We reserve the right to modify, suspend, or discontinue any aspect of the Services at any time, with reasonable notice when practicable.
                </p>
              </div>

              {/* Account Registration and Responsibilities */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Account Registration and Responsibilities
                </h2>

                <h3 className="font-heading text-xl font-semibold mb-3 mt-6">
                  Account Creation
                </h3>
                <p className="text-[#a1a1aa] leading-[1.8] mb-4">
                  To use our Services, you must create an account. By registering, you agree to:
                </p>
                <ul className="text-[#a1a1aa] leading-[1.8] list-disc pl-6 space-y-2">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
                  <li>Have the authority to enter into these Terms on behalf of yourself or the entity you represent</li>
                </ul>

                <h3 className="font-heading text-xl font-semibold mb-3 mt-6">
                  Account Security
                </h3>
                <p className="text-[#a1a1aa] leading-[1.8] mb-4">
                  You are responsible for maintaining the security of your account. You agree to:
                </p>
                <ul className="text-[#a1a1aa] leading-[1.8] list-disc pl-6 space-y-2">
                  <li>Keep your login credentials confidential and secure</li>
                  <li>Accept responsibility for all activities that occur under your account</li>
                  <li>Notify us immediately of any unauthorized access or use of your account</li>
                </ul>
              </div>

              {/* Subscriptions and Payments */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Subscriptions and Payments
                </h2>

                <h3 className="font-heading text-xl font-semibold mb-3 mt-6">
                  Plans
                </h3>
                <p className="text-[#a1a1aa] leading-[1.8]">
                  We offer subscription-based plans for our Services. Details regarding pricing, features, and plan tiers are available on our website and may be updated from time to time.
                </p>

                <h3 className="font-heading text-xl font-semibold mb-3 mt-6">
                  Billing
                </h3>
                <p className="text-[#a1a1aa] leading-[1.8] mb-4">
                  By subscribing to a plan, you agree to the following billing terms:
                </p>
                <ul className="text-[#a1a1aa] leading-[1.8] list-disc pl-6 space-y-2">
                  <li>Subscriptions automatically renew on a monthly basis unless cancelled</li>
                  <li>Subscription fees are charged in advance at the beginning of each billing cycle</li>
                  <li>All fees are non-refundable except as required by applicable law</li>
                  <li>We will provide at least 30 days&apos; notice before implementing any price changes to your plan</li>
                </ul>

                <h3 className="font-heading text-xl font-semibold mb-3 mt-6">
                  Cancellation
                </h3>
                <p className="text-[#a1a1aa] leading-[1.8]">
                  You may cancel your subscription at any time through your account settings or by contacting our support team. Cancellation will take effect at the end of the current billing period. You will retain access to the Services until the end of your paid period.
                </p>
              </div>

              {/* Google Business Profile Authorization */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Google Business Profile Authorization
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8] mb-4">
                  By using Launchpad Boost, you authorize us to:
                </p>
                <ul className="text-[#a1a1aa] leading-[1.8] list-disc pl-6 space-y-2">
                  <li>Access and manage your Google Business Profile on your behalf</li>
                  <li>Make updates, edits, and optimizations to your profile content, categories, and attributes</li>
                  <li>Monitor your search rankings, visibility metrics, and review performance</li>
                  <li>Implement automated SEO strategies designed to improve your local search presence</li>
                </ul>
                <p className="text-[#a1a1aa] leading-[1.8] mt-4">
                  You may revoke this authorization at any time by disconnecting your Google Business Profile from our platform or by contacting us directly.
                </p>
              </div>

              {/* Acceptable Use */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Acceptable Use
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8] mb-4">
                  You agree not to use the Services to:
                </p>
                <ul className="text-[#a1a1aa] leading-[1.8] list-disc pl-6 space-y-2">
                  <li>Violate any applicable laws, regulations, or third-party rights</li>
                  <li>Submit false, misleading, or fraudulent information</li>
                  <li>Interfere with or disrupt the integrity or performance of the Services</li>
                  <li>Attempt to gain unauthorized access to any systems or networks connected to the Services</li>
                  <li>Use the Services for any purpose that is harmful, abusive, or contrary to the intended use</li>
                  <li>Reverse engineer, decompile, or disassemble any aspect of the Services</li>
                </ul>
              </div>

              {/* Intellectual Property */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Intellectual Property
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8]">
                  All content, features, functionality, software, designs, trademarks, and intellectual property associated with the Services are owned by Launchpad or its licensors and are protected by applicable intellectual property laws. You may not copy, modify, distribute, sell, or lease any part of our Services without our prior written consent. Your use of the Services does not grant you any ownership rights in our intellectual property.
                </p>
              </div>

              {/* Service Level and Performance */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Service Level and Performance
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8]">
                  We strive to maintain high availability and performance of our Services. However, we do not guarantee uninterrupted or error-free operation. Scheduled maintenance, updates, and unforeseen technical issues may occasionally affect service availability. We will make reasonable efforts to notify you in advance of any planned downtime.
                </p>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Limitation of Liability
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8] mb-4">
                  To the maximum extent permitted by applicable law:
                </p>
                <ul className="text-[#a1a1aa] leading-[1.8] list-disc pl-6 space-y-2">
                  <li>Launchpad shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, business opportunities, or goodwill</li>
                  <li>Our total aggregate liability arising out of or related to these Terms or the Services shall not exceed the total amount paid by you to Launchpad during the twelve (12) months preceding the claim</li>
                  <li>We are not liable for any losses or damages resulting from actions taken by third parties, including Google, or changes to third-party platforms, algorithms, or policies</li>
                </ul>
              </div>

              {/* Disclaimer of Warranties */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Disclaimer of Warranties
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8]">
                  THE SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE SERVICES WILL MEET YOUR REQUIREMENTS, OPERATE WITHOUT INTERRUPTION, OR BE ERROR-FREE. YOUR USE OF THE SERVICES IS AT YOUR OWN RISK.
                </p>
              </div>

              {/* Indemnification */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Indemnification
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8]">
                  You agree to indemnify, defend, and hold harmless Launchpad, its officers, directors, employees, agents, and affiliates from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable attorneys&apos; fees) arising out of or related to your use of the Services, your violation of these Terms, or your violation of any rights of a third party.
                </p>
              </div>

              {/* Termination */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Termination
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8] mb-4">
                  We may suspend or terminate your access to the Services at any time, with or without notice, for any reason, including but not limited to:
                </p>
                <ul className="text-[#a1a1aa] leading-[1.8] list-disc pl-6 space-y-2">
                  <li>Violation of these Terms or any applicable policies</li>
                  <li>Non-payment of subscription fees</li>
                  <li>As required by law or regulation</li>
                  <li>At our sole discretion, if we believe your use poses a risk to the Services or other users</li>
                </ul>
                <p className="text-[#a1a1aa] leading-[1.8] mt-4">
                  Upon termination, your right to use the Services will immediately cease. Provisions of these Terms that by their nature should survive termination will remain in effect.
                </p>
              </div>

              {/* Dispute Resolution */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Dispute Resolution
                </h2>

                <h3 className="font-heading text-xl font-semibold mb-3 mt-6">
                  Governing Law
                </h3>
                <p className="text-[#a1a1aa] leading-[1.8]">
                  These Terms shall be governed by and construed in accordance with the laws of the State of Florida, without regard to its conflict of law provisions.
                </p>

                <h3 className="font-heading text-xl font-semibold mb-3 mt-6">
                  Arbitration
                </h3>
                <p className="text-[#a1a1aa] leading-[1.8]">
                  Any dispute, controversy, or claim arising out of or relating to these Terms or the Services shall be resolved through binding arbitration conducted in Palm Beach County, Florida, in accordance with the rules of the American Arbitration Association. Each party shall bear its own costs and attorneys&apos; fees. The arbitrator&apos;s decision shall be final and binding and may be entered as a judgment in any court of competent jurisdiction. You agree to waive any right to a jury trial or to participate in a class action.
                </p>
              </div>

              {/* Changes to Terms */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Changes to Terms
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8]">
                  We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on our website and updating the &quot;Last Updated&quot; date. Your continued use of the Services after any modifications constitutes your acceptance of the revised Terms. If you do not agree to the changes, you must discontinue use of the Services.
                </p>
              </div>

              {/* General Provisions */}
              <div className="mb-12">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  General Provisions
                </h2>
                <ul className="text-[#a1a1aa] leading-[1.8] list-disc pl-6 space-y-2">
                  <li>
                    <strong className="text-[#e5e5e5]">Entire Agreement:</strong> These Terms, together with our Privacy Policy, constitute the entire agreement between you and Launchpad regarding the Services.
                  </li>
                  <li>
                    <strong className="text-[#e5e5e5]">Severability:</strong> If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.
                  </li>
                  <li>
                    <strong className="text-[#e5e5e5]">Waiver:</strong> Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.
                  </li>
                  <li>
                    <strong className="text-[#e5e5e5]">Assignment:</strong> You may not assign or transfer these Terms or your rights under them without our prior written consent. We may assign our rights and obligations without restriction.
                  </li>
                </ul>
              </div>

              {/* Contact Box */}
              <div className="mt-16 rounded-2xl bg-accent/10 border border-accent/20 p-8 max-md:p-6">
                <h2 className="font-heading text-[1.75rem] font-bold mb-4">
                  Contact Us
                </h2>
                <p className="text-[#a1a1aa] leading-[1.8] mb-6">
                  If you have any questions about these Terms of Service, please contact us:
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
