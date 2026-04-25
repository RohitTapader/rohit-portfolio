
"use client";

import React from "react";
import ChatWidget from "@/components/ChatWidget";

// Navigation items map directly to section IDs on this same page.
// Clicking a nav item scrolls to the matching section.
const NAV_LINKS = [
  { name: "Home", section: "home" },
  { name: "About", section: "about" },
  { name: "Experience", section: "experience" },
  { name: "Skills", section: "skills" },
  { name: "Projects", section: "projects" },
  { name: "Contact", section: "contact" },
];

function scrollToSection(section: string) {
  // Find section by ID and smooth-scroll to it.
  const el = document.getElementById(section);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function HomePage() {
  return (
    // This entire page is a single long-scroll portfolio landing page.
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-zinc-100 font-sans">
      {/* Header & Navigation */}
      <header className="fixed w-full top-0 bg-white/90 dark:bg-zinc-900/90 z-40 shadow-sm backdrop-blur border-b border-gray-100 dark:border-zinc-800">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
          <span className="text-xl font-bold tracking-tight">Rohit Tapader</span>
          <ul className="hidden md:flex space-x-6">
            {NAV_LINKS.map((link) => (
              <li key={link.section}>
                <button
                  onClick={() => scrollToSection(link.section)}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          {/* Mobile nav */}
          <div className="md:hidden flex">
            {/* Mobile menu: can add an actual menu later */}
            <select
              onChange={e => scrollToSection(e.target.value)}
              className="bg-transparent border rounded px-2 py-1 text-gray-900 dark:text-zinc-100"
              aria-label="Navigate to section"
              defaultValue=""
            >
              <option value="" disabled>Navigate...</option>
              {NAV_LINKS.map(link => (
                <option value={link.section} key={link.section}>{link.name}</option>
              ))}
            </select>
          </div>
        </nav>
      </header>

      {/* Main portfolio content sections start here. */}
      <main className="pt-20 pb-12 max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <section
          id="home"
          className="flex flex-col md:flex-row items-center gap-8 md:gap-14 py-14"
        >
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-5">
              Senior Product Manager | B2B SaaS, Platform Solutions &amp; AI-Driven Workflows
            </h1>
            <p className="text-lg md:text-xl mb-7 text-gray-600 dark:text-zinc-300 max-w-xl">
              I build and scale AI-enabled B2B SaaS products that turn complex workflows into intuitive, high-impact user experiences.
            </p>
            <a
              href="#contact"
              onClick={e => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded shadow hover:bg-blue-700 transition"
            >
              Connect With Me
            </a>
          </div>
          <div className="flex justify-center md:justify-end flex-1 shrink-0">
            <img
              src="/profile-portrait.png"
              alt="Rohit Tapader portrait"
              className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-blue-600 dark:border-blue-400 shadow-lg"
            />
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-12 border-b border-gray-200 dark:border-zinc-800 flex flex-col md:flex-row gap-6 md:gap-20"
        >
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-3">About Me</h2>
            <p className="text-gray-700 dark:text-zinc-300 text-base md:text-lg mb-4">
              Product Manager with 8+ of experience building and scaling B2B SaaS, platform, and automation products across Compliance, Finance and Manufacturing domains. Proven track record of delivering 0-&gt;1 products and driving adoption, improving efficiency through scalable systems and data-driven product design. Experienced in product discovery, roadmap execution, and cross-functional collaboration, with exposure to AI-assisted and rule-based systems.
            </p>
          </div>
        </section>

        {/* Experience Section: each company is one article block. */}
        <section
          id="experience"
          className="py-12 border-b border-gray-200 dark:border-zinc-800"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
            Experience
          </h2>

          <div className="space-y-8">
            <article>
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                ADP Private Limited, Senior Product Manager - 1
              </h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">
                04/2024 - Present | Hyderabad
              </p>
              <ul className="list-disc ml-6 space-y-2 text-sm md:text-base text-gray-700 dark:text-zinc-300">
                <li>
                  Built a scalable billing system integrating multiple data touchpoints, driving adoption to <strong>700+ existing and new clients in 1.5 years</strong>, reducing manual billing effort by <strong>50%</strong> and preventing <strong>$450K annual credits</strong> caused by incorrect billing.
                </li>
                <li>
                  Redesigned tax filing workflows by automating manual service and operations touchpoints and introducing rule-based validation for jurisdiction-specific checks, improving efficiency by <strong>25%</strong>.
                </li>
                <li>
                  Launched a plug-and-play solution to standardize integration formats based on mid-market client feedback, reducing onboarding time by <strong>15%</strong> and improving integration adoption by <strong>20%</strong>.
                </li>
                <li>
                  Led development for an agentic AI-driven service automation solution, automating <strong>~40% of Tier-1 support requests</strong> (for example, invoice and billing queries, account updates) via LLM plus API orchestration; demonstrated <strong>~$400K-$600K annual savings potential</strong> based on pilot volumes (<strong>~12,000 tickets</strong>).
                </li>
              </ul>
            </article>

            <article>
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                HighRadius Corporation, Associate Product Manager
              </h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">
                05/2022 - 04/2024 | Hyderabad
              </p>
              <ul className="list-disc ml-6 space-y-2 text-sm md:text-base text-gray-700 dark:text-zinc-300">
                <li>
                  Led a 0 to 1 launch of a product, enabling automation of core product workflows, achieving <strong>~30% pilot-to-paid conversion</strong> within 3 months and scaling from <strong>15 to 80+ paying customers</strong> over 18 months.
                </li>
                <li>
                  Built a rule-based and AI-assisted system for transaction matching across bank, AR, and GL data, improving auto-reconciliation rates to <strong>80%</strong> and reducing manual effort by <strong>60%</strong>.
                </li>
                <li>
                  Developed shared platform capabilities (ERP integrations, orchestration, reusable objects), reducing duplicate development effort by <strong>25%</strong> and improving delivery timelines by <strong>20%</strong>.
                </li>
                <li>
                  Increased feature adoption by <strong>20%</strong> by aligning sales and customer success on use-case qualification, onboarding journeys, and targeted engagement to drive consistent feature usage.
                </li>
              </ul>
            </article>

            <article>
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                Mindtree Limited, Product Owner
              </h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">
                06/2021 - 04/2022 | Kolkata
              </p>
              <ul className="list-disc ml-6 space-y-2 text-sm md:text-base text-gray-700 dark:text-zinc-300">
                <li>
                  Delivered a fleet and tyre lifecycle management platform, improving visibility across inventory, inspection, and lifecycle performance.
                </li>
                <li>
                  Designed tyre condition tracking capabilities, improving data completeness by <strong>30%</strong> and enabling better maintenance decisions.
                </li>
                <li>
                  Built an end-to-end tyre inspection system, reducing manual reporting effort by <strong>50%</strong> and improving turnaround time.
                </li>
                <li>
                  Introduced a tyre reuse capability, reducing wastage by <strong>10%</strong> and improving cost efficiency.
                </li>
                <li>
                  Improved data quality by <strong>25%</strong> by integrating structured inspection and performance parameters.
                </li>
              </ul>
            </article>

            <article>
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                Tata Consultancy Services Limited, Software Engineer
              </h3>
              <p className="text-sm text-gray-600 dark:text-zinc-400 mb-3">
                10/2016 - 02/2020 | Hyderabad
              </p>
              <ul className="list-disc ml-6 space-y-2 text-sm md:text-base text-gray-700 dark:text-zinc-300">
                <li>
                  Developed new credit card and forbearance workflows, improving client adoption by <strong>20%</strong>.
                </li>
                <li>
                  Migrated legacy systems to microservices architecture, improving efficiency by <strong>30%</strong>.
                </li>
                <li>
                  Automated unit testing systems, reducing testing time by <strong>25%</strong> and improving release quality.
                </li>
              </ul>
            </article>
          </div>
        </section>

        {/* Skills Section: grouped chips for fast recruiter scan. */}
        <section
          id="skills"
          className="py-12 border-b border-gray-200 dark:border-zinc-800"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
            Skills
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-center md:text-left">Product Management</h3>
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
                {[
                  "User Research",
                  "Market Research",
                  "Product Roadmapping",
                  "Stakeholder Manager",
                  "User Experience Optimization",
                  "Agile",
                  "UX Prototyping",
                ].map(skill => (
                  <span
                    key={skill}
                    className="bg-blue-50 dark:bg-zinc-800 px-4 py-2 rounded-full text-blue-700 dark:text-blue-300 font-medium text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-center md:text-left">Tools</h3>
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
                {["Jira", "Confluence", "Aha!", "Figma", "Miro", "Tableau"].map(skill => (
                  <span
                    key={skill}
                    className="bg-indigo-50 dark:bg-zinc-800 px-4 py-2 rounded-full text-indigo-700 dark:text-indigo-300 font-medium text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-center md:text-left">AI Tools &amp; Framework</h3>
              <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
                {[
                  "Claude Code",
                  "Cursor",
                  "Figma Make",
                  "LLM",
                  "Generative AI",
                  "Agentic AI",
                ].map(skill => (
                  <span
                    key={skill}
                    className="bg-emerald-50 dark:bg-zinc-800 px-4 py-2 rounded-full text-emerald-700 dark:text-emerald-300 font-medium text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section: currently keeping one highlighted project. */}
        <section
          id="projects"
          className="py-12 border-b border-gray-200 dark:border-zinc-800"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">
            Highlighted Projects
          </h2>
          <div className="grid md:grid-cols-1 gap-8">
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow p-6 transition hover:scale-105 hover:shadow-xl">
              <h3 className="font-bold text-lg flex items-center gap-2 text-blue-700 dark:text-blue-400">
                <svg className="h-6 w-6 inline-block" fill="none" stroke="currentColor" strokeWidth={2}
                  viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m4-4h.01M12 2a10 10 0 11-7.07 2.93A10 10 0 0112 2z" /></svg>
                AI Resume Assistant
              </h3>
              <p className="text-gray-700 dark:text-zinc-300 text-sm mt-1 mb-2">
                Built a resume-based website with an AI chatbot that answers recruiter questions instantly, combining LLM integration with a portfolio-first experience to accelerate hiring decisions.
              </p>
              <a
                href="https://github.com/RohitTapader"
                className="text-blue-600 dark:text-blue-400 underline hover:font-semibold"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Code
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section: quick links for recruiter outreach. */}
        <section
          id="contact"
          className="py-14 text-center flex flex-col items-center"
        >
          <h2 className="text-2xl font-semibold mb-3">Contact</h2>
          <p className="text-gray-700 dark:text-zinc-300 text-base mb-4">
            Let&apos;s collaborate or chat product, tech, or innovation.
          </p>
          <a
            href="mailto:rohittapader15@gmail.com"
            className="inline-block text-blue-600 dark:text-blue-400 underline text-lg font-medium mb-4"
          >
            rohittapader15@gmail.com
          </a>
          <div className="flex gap-7 items-center justify-center">
            <a
              href="https://www.linkedin.com/in/rohittapader/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 dark:hover:text-blue-400"
              aria-label="LinkedIn"
            >
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.23c-.96 0-1.73-.78-1.73-1.74s.77-1.74 1.73-1.74c.96 0 1.74.78 1.74 1.74s-.78 1.74-1.74 1.74zm15.5 11.23h-3v-5.4c0-1.29-.46-2.17-1.6-2.17-.88 0-1.41.59-1.65 1.16-.08.19-.1.46-.1.73v5.68h-3s.04-9.21 0-10.17h3v1.44c.4-.62 1.13-1.5 2.74-1.5 2 0 3.5 1.31 3.5 4.13v6.1z" />
              </svg>
            </a>
            <a
              href="https://github.com/RohitTapader"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 dark:hover:text-blue-400"
              aria-label="GitHub"
            >
              <svg className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2c-5.52 0-10 4.48-10 10 0 4.41 2.87 8.16 6.84 9.49.5.09.68-.21.68-.47v-1.62c-2.78.61-3.37-1.34-3.37-1.34-.46-1.12-1.13-1.42-1.13-1.42-.93-.64.07-.63.07-.63 1.03.07 1.59 1.06 1.59 1.06 .92 1.57 2.41 1.12 2.99 .85.09-.67.36-1.12.66-1.38-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.99 1.03-2.69-.1-.26-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.03a9.58 9.58 0 012.5-.34c.85.01 1.71.12 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03 .55 1.39.2 2.41.1 2.67.64.7 1.03 1.6 1.03 2.69 0 3.83-2.34 4.68-4.57 4.93.37.32.71.94.71 1.9v2.82c0 .26.18.56.69.47A10 10 0 0022 12c0-5.52-4.48-10-10-10z" />
              </svg>
            </a>
          </div>
        </section>
        {/* ChatWidget is rendered here; it calls /api/chat in route.ts. */}
        <ChatWidget />
      </main>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-gray-100 dark:border-zinc-800 text-center text-xs text-gray-500 dark:text-zinc-500 mt-8">
        &copy; {new Date().getFullYear()} Rohit Tapader. Crafted with passion. 
        <span className="hidden xs:inline"> &middot; Open to collaboration &amp; consulting</span>
      </footer>
    </div>
  );
}