/**
 * Content for /privacy.
 *
 * Originally extracted from src/Pages/PrivacyPolicy.jsx. Revised 25 Nov 2026 to describe
 * what the site actually uses: EmailJS, Google Analytics 4, Microsoft Clarity, Vercel
 * hosting with Web Analytics and Speed Insights, Google Calendar appointment scheduling
 * (embedded in the booking modal), Cloudinary blog images, WhatsApp, the chat assistant, and the copy of each enquiry stored by /api/lead.
 *
 * ⚠️ PrivacyPolicyBody.jsx renders every section except the LAST, then draws its own
 * "10. Contact Us" card. Keep Contact as the final section, and keep ten sections unless
 * that hard-coded heading is updated too. Name no service the site does not use.
 */

export const LAST_UPDATED = "26 November 2026";
export const COMPANY = "Futurise Solutions";
export const EMAIL = "business@futurisesolutions.com";
export const ADDRESS = "Huddart Parker Building, Wellington Central, Wellington 6011, New Zealand";

export const sections = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "1.1 Information You Provide Directly",
        body: `When you contact us, we collect the information you choose to give us. The contact form asks for your name, email address, country and the service you are interested in, and lets you add your company name, a phone or WhatsApp number and a description of your project. The newsletter sign-up asks only for your email address. If you book a call, the booking form asks for details such as your name and email address. If you email us or message us on WhatsApp, we receive what you send, together with your email address or your WhatsApp name and number. If you type questions into the chat assistant, we receive those messages.`,
      },
      {
        subtitle: "1.2 Information Collected Automatically",
        body: `When you visit futurisesolutions.com, some technical information is collected automatically: IP address and approximate location, browser type and version, operating system, the pages you visit and how long you spend on them, the website that referred you, and device type (desktop, mobile, tablet). It is collected by our hosting provider and by the analytics tools described in section 3. Microsoft Clarity also records clicks, scrolling and mouse movement to produce session recordings and heatmaps, and it masks what you type into form fields. When you send the contact form, it also carries the page you sent it from, the page you first arrived on during that visit, the website that referred you and any campaign (UTM) tags in the link you followed, so that we know where enquiries come from.`,
      },
      {
        subtitle: "1.3 Cookies & Similar Technologies",
        body: `Google Analytics and Microsoft Clarity use cookies so they can recognise a returning browser and measure how the site is used. The site itself keeps a few small values in your browser: a display setting and, for the length of a visit only, a few interface choices (such as whether the homepage introduction has already played) and the page, referring website and any campaign tags you arrived with, so that an enquiry can say where it came from. You can block or delete cookies and stored site data in your browser settings; the site still works without them.`,
      },
    ],
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    content: [
      {
        subtitle: "",
        body: `We use your information only for the purposes below. For each one we say what allows us to use it, known as the lawful basis.`,
      },
      {
        subtitle: "Replying to Enquiries & Bookings",
        body: `To reply to you, answer your questions, prepare a quote and arrange calls. Basis: you asked us to get in touch, so this is a step you requested before any contract, and we have a legitimate interest in answering the people who contact us.`,
      },
      {
        subtitle: "Keeping a Copy of Each Enquiry",
        body: `We keep a copy of each contact-form enquiry and newsletter sign-up in our own database, so that none is lost if an email fails to arrive and so that we can follow up. Basis: our legitimate interest in not losing enquiries and in following them up.`,
      },
      {
        subtitle: "Client Projects",
        body: `To manage projects we are engaged on and to keep you updated on the work. Basis: performing our contract with you.`,
      },
      {
        subtitle: "Newsletter",
        body: `To send you our newsletter, only if you subscribe. Basis: your consent, which you can withdraw at any time by writing to business@futurisesolutions.com.`,
      },
      {
        subtitle: "Website Analytics & Improvement",
        body: `To understand how the site is used, find pages that are broken, slow or confusing, and improve them. Basis: our legitimate interest in running a website that works.`,
      },
      {
        subtitle: "Chat Assistant",
        body: `To answer the questions you type into the chat assistant. Basis: our legitimate interest in answering visitors' questions.`,
      },
      {
        subtitle: "Legal & Compliance",
        body: `To comply with applicable laws and regulations, enforce our terms, prevent fraud and spam, and protect the rights, safety, and property of Futurise Solutions and our clients. Basis: our legal obligations, and our legitimate interest in protecting the site and our business.`,
      },
    ],
  },
  {
    id: "data-sharing",
    title: "3. Data Sharing & Third Parties",
    content: [
      {
        subtitle: "",
        body: `We do not sell, rent, or trade your personal information to third parties. We share it only with the services below, which run this website and our communications, and in the limited circumstances that follow them:`,
      },
      {
        subtitle: "Email Delivery (EmailJS)",
        body: `EmailJS delivers contact-form enquiries and newsletter sign-ups from this website to our inbox.`,
      },
      {
        subtitle: "Our Own Database",
        body: `Contact-form enquiries and newsletter sign-ups are stored in our own database on our backend as well as emailed to us. A contact-form copy also records the page you sent it from, the page you first arrived on, the website that referred you and any campaign (UTM) tags.`,
      },
      {
        subtitle: "Analytics (Google, Microsoft, Vercel)",
        body: `Google Analytics 4 measures how visitors use the site. Microsoft Clarity produces session recordings and heatmaps of clicks, scrolling and mouse movement, and masks what you type into form fields. Vercel hosts the site, and Vercel Web Analytics and Speed Insights measure visits and how quickly pages load.`,
      },
      {
        subtitle: "Booking (Google Calendar)",
        body: `Calls are booked through Google Calendar appointment scheduling. The booking calendar opens inside this site but is a Google page: it loads from Google, which may set its own cookies, only when you open it. When you book, the details you enter in the booking form go to Google and to us.`,
      },
      {
        subtitle: "Images (Cloudinary)",
        body: `Blog images are stored on and served by Cloudinary. Your browser fetches them from Cloudinary, which, like any image host, receives your IP address and browser details to deliver them.`,
      },
      {
        subtitle: "WhatsApp (Meta)",
        body: `If you choose to message us on WhatsApp, the conversation takes place on WhatsApp, a service operated by Meta, and WhatsApp's own terms and privacy policy apply to it.`,
      },
      {
        subtitle: "Chat Assistant",
        body: `Questions you type into the chat assistant are sent to our backend and to the AI model provider that writes its replies.`,
      },
      {
        subtitle: "Other Tools",
        body: `We also use email and project-management tools to run our business and deliver client work. Each provider named in this section handles information under its own terms and privacy policy.`,
      },
      {
        subtitle: "Legal Requirements",
        body: `We may disclose your information if required to do so by law, court order, or governmental authority, or if we believe disclosure is necessary to protect our rights, your safety, or the safety of others.`,
      },
      {
        subtitle: "Business Transfers",
        body: `In the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via email or a prominent notice on our website before your personal data is transferred and becomes subject to a different privacy policy.`,
      },
    ],
  },
  {
    id: "data-security",
    title: "4. Data Security",
    content: [
      {
        subtitle: "",
        body: `We take reasonable and appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. Our website uses HTTPS encryption for all data in transit. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`,
      },
    ],
  },
  {
    id: "your-rights",
    title: "5. Your Rights",
    content: [
      {
        subtitle: "",
        body: `Under the New Zealand Privacy Act 2020, the UK and EU GDPR and India's Digital Personal Data Protection Act 2023, you can ask us for access to the personal information we hold about you, ask us to correct it, and ask us to delete it. Depending on the law that applies to you, you may also have the other rights listed here:`,
      },
      {
        subtitle: "Access",
        body: `You have the right to request a copy of the personal information we hold about you.`,
      },
      {
        subtitle: "Correction",
        body: `You have the right to request that we correct any inaccurate or incomplete personal information we hold about you.`,
      },
      {
        subtitle: "Deletion",
        body: `You may request that we delete your personal information, subject to our legal obligations to retain certain records.`,
      },
      {
        subtitle: "Objection & Restriction",
        body: `You may object to our processing of your personal information or request that we restrict processing in certain circumstances.`,
      },
      {
        subtitle: "Portability",
        body: `Where technically feasible, you may request a copy of your data in a structured, machine-readable format.`,
      },
      {
        subtitle: "Withdraw Consent",
        body: `Where processing is based on your consent (e.g. newsletter), you may withdraw that consent at any time without affecting the lawfulness of processing before withdrawal.`,
      },
      {
        subtitle: "",
        body: `To exercise any of these rights, please contact us at business@futurisesolutions.com. We will respond within 30 days. If you are unhappy with how we handle your information, you can also complain to the privacy regulator where you live, such as the Office of the Privacy Commissioner in New Zealand.`,
      },
    ],
  },
  {
    id: "data-retention",
    title: "6. Data Retention",
    content: [
      {
        subtitle: "",
        body: `We keep enquiries (contact-form submissions and the copy in our database, booking details, emails and WhatsApp messages) for as long as we need them to respond to you and follow up, and no longer than 24 months after our last contact with you, unless you ask us to delete them sooner. Newsletter sign-ups are kept until you unsubscribe. Client project data is retained for up to 7 years for financial and legal compliance purposes. Analytics data is kept by the analytics providers under the retention settings of those tools.`,
      },
    ],
  },
  {
    id: "childrens-privacy",
    title: "7. Children's Privacy",
    content: [
      {
        subtitle: "",
        body: `Our website and services are not directed to children under the age of 16. We do not knowingly collect personal information from children under 16. If you believe we have inadvertently collected such information, please contact us immediately and we will take steps to delete it.`,
      },
    ],
  },
  {
    id: "international-transfers",
    title: "8. International Data Transfers",
    content: [
      {
        subtitle: "",
        body: `Futurise Solutions is a New Zealand company, and our team works from India. The services described in section 3 may store or process your information in other countries, including the United States, so it may be transferred to, stored in, or processed in countries other than your own. When we transfer personal data internationally, we take appropriate safeguards to ensure it is protected in accordance with applicable privacy laws.`,
      },
    ],
  },
  {
    id: "policy-changes",
    title: "9. Changes to This Privacy Policy",
    content: [
      {
        subtitle: "",
        body: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we do, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.`,
      },
    ],
  },
  {
    id: "contact",
    title: "10. Contact Us",
    content: [
      {
        subtitle: "",
        body: `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:`,
      },
    ],
  },
];
