"use client"

import { motion } from "framer-motion"

export default function GDPRPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">GDPR Compliance</h1>
          <p className="text-xl text-purple-100">
            How we comply with the General Data Protection Regulation
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
              At JobConnect, we are committed to ensuring the privacy and protection of your personal data in accordance with the General Data Protection Regulation (GDPR). This page outlines how we comply with GDPR requirements and explains your rights under this regulation.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">What is GDPR?</h2>
            <p className="text-gray-600 dark:text-gray-300">
              The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy for all individuals within the European Union and the European Economic Area. It addresses the export of personal data outside the EU and EEA areas and aims to give control to individuals over their personal data.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Data Processing Principles</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Under GDPR, we adhere to the following data processing principles:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>
                <strong>Lawfulness, fairness, and transparency:</strong> We process personal data lawfully, fairly, and in a transparent manner.
              </li>
              <li>
                <strong>Purpose limitation:</strong> We collect personal data only for specified, explicit, and legitimate purposes.
              </li>
              <li>
                <strong>Data minimization:</strong> We ensure that personal data is adequate, relevant, and limited to what is necessary for the purposes for which it is processed.
              </li>
              <li>
                <strong>Accuracy:</strong> We take reasonable steps to ensure that personal data is accurate and kept up to date.
              </li>
              <li>
                <strong>Storage limitation:</strong> We keep personal data for no longer than is necessary for the purposes for which it is processed.
              </li>
              <li>
                <strong>Integrity and confidentiality:</strong> We process personal data in a manner that ensures appropriate security, including protection against unauthorized or unlawful processing and against accidental loss, destruction, or damage.
              </li>
              <li>
                <strong>Accountability:</strong> We are responsible for and can demonstrate compliance with all of the above principles.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Your Rights Under GDPR</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Under GDPR, you have several rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>
                <strong>Right to be informed:</strong> You have the right to be informed about the collection and use of your personal data.
              </li>
              <li>
                <strong>Right of access:</strong> You have the right to access your personal data and supplementary information.
              </li>
              <li>
                <strong>Right to rectification:</strong> You have the right to have inaccurate personal data rectified, or completed if it is incomplete.
              </li>
              <li>
                <strong>Right to erasure:</strong> You have the right to have your personal data erased in certain circumstances.
              </li>
              <li>
                <strong>Right to restrict processing:</strong> You have the right to request the restriction or suppression of your personal data.
              </li>
              <li>
                <strong>Right to data portability:</strong> You have the right to obtain and reuse your personal data for your own purposes across different services.
              </li>
              <li>
                <strong>Right to object:</strong> You have the right to object to the processing of your personal data in certain circumstances.
              </li>
              <li>
                <strong>Rights in relation to automated decision making and profiling:</strong> You have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning you or similarly significantly affects you.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How We Use Your Data</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We collect and process your personal data for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>To provide our job matching and recruitment services</li>
              <li>To create and manage your account</li>
              <li>To communicate with you about our services, updates, and job opportunities</li>
              <li>To improve our website and services</li>
              <li>To ensure the security and proper functioning of our platform</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              We only collect the information that is necessary for these purposes and ensure that it is processed lawfully, fairly, and transparently.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Data Security</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We take data security seriously and have implemented appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage. These measures include encryption, access controls, regular security assessments, and staff training on data protection.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">International Data Transfers</h2>
            <p className="text-gray-600 dark:text-gray-300">
              If we transfer your personal data outside the European Economic Area (EEA), we ensure that appropriate safeguards are in place to protect your data. This may include using Standard Contractual Clauses approved by the European Commission, Binding Corporate Rules, or other legally approved mechanisms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Data Breach Procedures</h2>
            <p className="text-gray-600 dark:text-gray-300">
              In the event of a personal data breach, we will notify the relevant supervisory authority within 72 hours of becoming aware of the breach, unless the breach is unlikely to result in a risk to your rights and freedoms. If the breach is likely to result in a high risk to your rights and freedoms, we will also notify you directly.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Data Protection Officer</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We have appointed a Data Protection Officer (DPO) to oversee our GDPR compliance. If you have any questions about how we handle your personal data or wish to exercise your rights under GDPR, you can contact our DPO at dpo@jobconnect.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Exercising Your Rights</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              To exercise any of your rights under GDPR, please contact us using one of the following methods:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
              <li>Email: gdpr@jobconnect.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Mail: JobConnect, GDPR Compliance Department, 123 Main Street, New York, NY 10001, USA</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              We will respond to your request within one month of receiving it. This period may be extended by two further months where necessary, taking into account the complexity and number of requests. We will inform you of any such extension within one month of receiving your request.
            </p>
          </section>
        </motion.div>
      </main>
    </div>
  );
} 