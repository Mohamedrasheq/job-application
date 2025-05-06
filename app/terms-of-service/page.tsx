"use client"

import { motion } from "framer-motion"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-blue-100">
            The rules and guidelines for using our platform
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
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Agreement to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300">
              These Terms of Service constitute a legally binding agreement made between you and JobConnect, concerning your access to and use of our website. You agree that by accessing the website, you have read, understood, and agree to be bound by all of these Terms of Service. If you do not agree with all of these terms, you are prohibited from using the website and must discontinue use immediately.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Supplemental terms and conditions or documents that may be posted on the website from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms of Service at any time and for any reason.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">User Representations</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              By using the website, you represent and warrant that:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>All registration information you submit will be true, accurate, current, and complete</li>
              <li>You will maintain the accuracy of such information and promptly update such registration information as necessary</li>
              <li>You have the legal capacity and you agree to comply with these Terms of Service</li>
              <li>You are not a minor in the jurisdiction in which you reside</li>
              <li>You will not access the website through automated or non-human means, whether through a bot, script, or otherwise</li>
              <li>You will not use the website for any illegal or unauthorized purpose</li>
              <li>Your use of the website will not violate any applicable law or regulation</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              If you provide any information that is untrue, inaccurate, not current, or incomplete, we have the right to suspend or terminate your account and refuse any and all current or future use of the website (or any portion thereof).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">User Registration</h2>
            <p className="text-gray-600 dark:text-gray-300">
              You may be required to register with the website. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Prohibited Activities</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You may not access or use the website for any purpose other than that for which we make the website available. The website may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              As a user of the website, you agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>Systematically retrieve data or other content from the website to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us</li>
              <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords</li>
              <li>Circumvent, disable, or otherwise interfere with security-related features of the website</li>
              <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the website</li>
              <li>Use any information obtained from the website in order to harass, abuse, or harm another person</li>
              <li>Make improper use of our support services or submit false reports of abuse or misconduct</li>
              <li>Engage in any automated use of the system, such as using scripts to send comments or messages</li>
              <li>Attempt to impersonate another user or person or use the username of another user</li>
              <li>Sell or otherwise transfer your profile</li>
              <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material, including excessive use of capital letters and spamming, that interferes with any party's uninterrupted use and enjoyment of the website</li>
              <li>Engage in any unauthorized use of the website, including collecting usernames and/or email addresses of users by electronic or other means</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">User Generated Contributions</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              The website may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the website, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, "Contributions").
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Contributions may be viewable by other users of the website. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary. When you create or make available any Contributions, you thereby represent and warrant that:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>The creation, distribution, transmission, public display, or performance, and the accessing, downloading, or copying of your Contributions do not and will not infringe the proprietary rights, including but not limited to the copyright, patent, trademark, trade secret, or moral rights of any third party</li>
              <li>You are the creator and owner of or have the necessary licenses, rights, consents, releases, and permissions to use and to authorize us, the website, and other users of the website to use your Contributions in any manner contemplated by the website and these Terms of Service</li>
              <li>Your Contributions are not false, inaccurate, or misleading</li>
              <li>Your Contributions are not unsolicited or unauthorized advertising, promotional materials, pyramid schemes, chain letters, spam, mass mailings, or other forms of solicitation</li>
              <li>Your Contributions do not violate any applicable law, regulation, or rule</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Submissions</h2>
            <p className="text-gray-600 dark:text-gray-300">
              You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information regarding the website ("Submissions") provided by you to us are non-confidential and shall become our sole property. We shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of these Submissions for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Website Management</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We reserve the right, but not the obligation, to: (1) monitor the website for violations of these Terms of Service; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Service, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the website or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the website in a manner designed to protect our rights and property and to facilitate the proper functioning of the website.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Term and Termination</h2>
            <p className="text-gray-600 dark:text-gray-300">
              These Terms of Service shall remain in full force and effect while you use the website. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS OF SERVICE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE WEBSITE (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF SERVICE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE WEBSITE OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Modifications and Interruptions</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We reserve the right to change, modify, or remove the contents of the website at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our website. We also reserve the right to modify or discontinue all or part of the website without notice at any time.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the website.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              We cannot guarantee the website will be available at all times. We may experience hardware, software, or other problems or need to perform maintenance related to the website, resulting in interruptions, delays, or errors. We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the website at any time or for any reason without notice to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Governing Law</h2>
            <p className="text-gray-600 dark:text-gray-300">
              These Terms of Service and your use of the website are governed by and construed in accordance with the laws applicable to agreements made and to be entirely performed within the State/Commonwealth of [STATE/COUNTRY], without regard to its conflict of law principles.
            </p>
          </section>
        </motion.div>
      </main>
    </div>
  );
} 