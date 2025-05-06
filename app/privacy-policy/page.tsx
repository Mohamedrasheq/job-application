"use client"

import { motion } from "framer-motion"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-indigo-100">
            How we collect, use, and protect your information
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-lg dark:prose-invert max-w-none"
        >
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Introduction</h2>
            <p className="text-gray-600 dark:text-gray-300">
              At JobConnect, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Information We Collect</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We collect several types of information from and about users of our website, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>Personal identifiers such as name, email address, and phone number</li>
              <li>Professional or employment-related information</li>
              <li>Education information</li>
              <li>Information about your usage of our website</li>
              <li>Information provided in your job applications or job postings</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              We collect this information directly from you when you provide it to us, automatically as you navigate through the site, and from third parties, such as business partners.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How We Use Your Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We use information that we collect about you or that you provide to us:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>To present our website and its contents to you</li>
              <li>To provide you with information, products, or services that you request from us</li>
              <li>To match job seekers with relevant job opportunities</li>
              <li>To fulfill any other purpose for which you provide it</li>
              <li>To provide you with notices about your account</li>
              <li>To carry out our obligations and enforce our rights</li>
              <li>To notify you about changes to our website or any products or services we offer</li>
              <li>In any other way we may describe when you provide the information</li>
              <li>For any other purpose with your consent</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Disclosure of Your Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may disclose aggregated information about our users, and information that does not identify any individual, without restriction.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We may disclose personal information that we collect or you provide as described in this privacy policy:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>To our subsidiaries and affiliates</li>
              <li>To contractors, service providers, and other third parties we use to support our business</li>
              <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets</li>
              <li>To fulfill the purpose for which you provide it</li>
              <li>For any other purpose disclosed by us when you provide the information</li>
              <li>With your consent</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              We may also disclose your personal information to comply with any court order, law, or legal process, including to respond to any government or regulatory request, or if we believe disclosure is necessary or appropriate to protect the rights, property, or safety of our company, our customers, or others.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Data Security</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. All information you provide to us is stored on our secure servers behind firewalls. Any payment transactions will be encrypted using SSL technology.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              The safety and security of your information also depends on you. Where we have given you (or where you have chosen) a password for access to certain parts of our website, you are responsible for keeping this password confidential. We ask you not to share your password with anyone.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Your Rights and Choices</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You have certain rights regarding the personal information we collect about you. These include:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>The right to access your personal information</li>
              <li>The right to rectify or update your personal information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict processing of your personal information</li>
              <li>The right to object to processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              To exercise any of these rights, please contact us using the contact information provided below.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Changes to Our Privacy Policy</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We may update our privacy policy from time to time. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the website home page or by email. The date the privacy policy was last revised is identified at the top of the page. You are responsible for ensuring we have an up-to-date active and deliverable email address for you, and for periodically visiting our website and this privacy policy to check for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contact Information</h2>
            <p className="text-gray-600 dark:text-gray-300">
              To ask questions or comment about this privacy policy and our privacy practices, contact us at: privacy@jobconnect.com
            </p>
          </section>
        </motion.div>
      </main>
    </div>
  );
} 