"use client"

import { motion } from "framer-motion"

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-emerald-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-xl text-emerald-100">
            How we use cookies and similar technologies
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
              JobConnect ("we", "our", or "us") uses cookies and similar technologies on our website. This Cookie Policy explains how we use cookies, how they work, and your choices regarding cookies.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">What Are Cookies?</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners. Cookies are stored on your device's browser and contain data such as user preferences, login information, and browsing history.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-4">
              Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device when you go offline, while session cookies are deleted as soon as you close your web browser.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">How We Use Cookies</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to the website. It is recommended that you leave on all cookies if you are not sure whether you need them or not, in case they are used to provide a service that you use.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>
                <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You may disable these by changing your browser settings, but this may affect how the website functions.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.
              </li>
              <li>
                <strong>Functionality Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
              </li>
              <li>
                <strong>Advertising Cookies:</strong> These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements on other sites.
              </li>
              <li>
                <strong>Social Media Cookies:</strong> These cookies are set by social media services that we have added to the site to enable you to share our content with your friends and networks. They can track your browser across other sites and build a profile of your interests.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Third-Party Cookies</h2>
            <p className="text-gray-600 dark:text-gray-300">
              In some special cases, we also use cookies provided by trusted third parties. The following section details which third-party cookies you might encounter through this site.
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li>
                This site uses Google Analytics, one of the most widespread and trusted analytics solutions on the web, to help us understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.
              </li>
              <li>
                We also use social media buttons and/or plugins on this site that allow you to connect with your social network in various ways. For these to work, social media sites including Facebook, Twitter, and LinkedIn, will set cookies through our site which may be used to enhance your profile on their site or contribute to the data they hold for various purposes outlined in their respective privacy policies.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Managing Cookies</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You can prevent the setting of cookies by adjusting the settings on your browser. Be aware that disabling cookies will affect the functionality of this and many other websites that you visit. Disabling cookies will usually result in also disabling certain functionality and features of this site.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Most web browsers allow you to control cookies through their settings. The following links may be helpful:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li><a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:underline dark:text-blue-400">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" className="text-blue-600 hover:underline dark:text-blue-400">Mozilla Firefox</a></li>
              <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" className="text-blue-600 hover:underline dark:text-blue-400">Microsoft Edge</a></li>
              <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-blue-600 hover:underline dark:text-blue-400">Safari</a></li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300">
              In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-600 dark:text-gray-300">
              <li><a href="http://www.aboutads.info/choices/" className="text-blue-600 hover:underline dark:text-blue-400">Digital Advertising Alliance</a></li>
              <li><a href="https://www.youronlinechoices.com" className="text-blue-600 hover:underline dark:text-blue-400">Your Online Choices (EU)</a></li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Cookie Consent</h2>
            <p className="text-gray-600 dark:text-gray-300">
              When you first visit our website, we will show you a cookie banner that allows you to accept or decline non-essential cookies. You can change your preferences at any time by clicking on the "Cookie Settings" link in the footer of our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">More Information</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you are looking for more information, then you can contact us through one of our preferred contact methods:
            </p>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300">
              <li>Email: privacy@jobconnect.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </section>
        </motion.div>
      </main>
    </div>
  );
} 