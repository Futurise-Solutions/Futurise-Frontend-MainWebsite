
Project brief (reframed)

AI Assistant Instructions (supervisory prompt)
- Act as: a Senior Software Engineer and a Professional UI/UX Designer working together. When asked, perform both roles: implement code changes (engineering) and refine visual/UX decisions (design).

Reference
- Primary inspiration: https://www.wednesday.is/
- Theme (which we want including) reference image: C:\Users\Dharmik Puri Goswami\Desktop\Futurise Solutions\Futurise-Frontend-MainWebsite\image.png

Typography
- Headings and sub-headings: Zangezi
- Body, paragraphs, UI text: Aeonik Trial
- Font files are here: C:\Users\Dharmik Puri Goswami\Desktop\Futurise Solutions\Futurise-Frontend-MainWebsite\src\assests\fonts

Content + SEO
- Improve content quality across all sections to be SEO friendly.
- Target geographies: India and USA. Make the copy reflect both markets and keywords.
- Keep text natural, benefits-first, and clear for business audiences.

Structure / sections
- About Us page: remove the "Meet the team" section.
- Keep all existing animations and effects exactly as they are.
- "What we do" section uses icons. Ensure icons match the headings; if possible, use a higher-quality icon set or small GIFs for better visual impact.

Hero sections and imagery
- Every page hero (Home, About, each Service, Contact, Portfolio if used) needs a strong image or background image aligned to the page theme.
- Follow the reference image style for hero effects.
- Add a complementary image in the footer section (as per reference image).

UX + responsiveness
- Fully responsive across all screen sizes.
- Smooth scroll and transitions should feel production-ready and client-facing.
- Visual quality should feel close to wednesday.is, not just a template.

Suggestions after code review
- Update the font setup in both the global CSS and Chakra theme to use Zangezi (heading) and Aeonik Trial (body), since the code currently uses Inter/Space Grotesk. This avoids mixed typography.
- Add a clear source for hero images (local assets or CDN) and wire them into Home/About/Service/Contact/Portfolio hero components so visuals are consistent across pages.
- Add descriptive `alt` text for all imagery and ensure headings follow a single H1 per page for SEO clarity.
- Consider adding meta tags (title/description), Open Graph data, and a sitemap for stronger SEO delivery.
- Replace sample avatars/testimonials/projects with real client-facing content and locations focused on India + USA to match the target audience.


Featured Projects — Reframed & SEO-ready

Overview
- This section showcases selected production work demonstrating frontend engineering, UI/UX design, and theme development targeted at business audiences in India and the USA. Development is led by a Senior Software Engineer and the visual/theme work is handled by a professional UI/UX Designer to ensure a polished, client-facing presentation.

References
- Reference website: https://rdsdigital.in/
- Reference image: C:\Users\Dharmik Puri Goswami\Desktop\Futurise Solutions\Futurise-Frontend-MainWebsite\image1.png

Project Assets
- Project images folder: C:\Users\Dharmik Puri Goswami\Desktop\Futurise Solutions\Futurise-Frontend-MainWebsite\src\assests\Project Images

Projects (source folders / image groups)
- Project 1 — propertyDashboard (all images)
- Project 2 — realState (all images)
- Project 3 — marty (all images)
- Project 4 — CryptoDashboard (all images)
- Project 5 — jewel (all images)
- Project 6 — hotelBooking (all images)

Usage Guidelines (SEO + Presentation)
- Adjust imagery to match the reference UI style and visual hierarchy used across the site.
- Featured selection for the Home hero: use four highlight projects — Project 1 (propertyDashboard), Project 3 (marty), Project 5 (jewel), and Project 2 (realState) — to demonstrate variety and industry reach.
- Portfolio/Projects page: display all projects one-by-one with a clear heading, a concise subheading, and an SEO-friendly description of ~80–100 words. Each description should mention the business value delivered, relevant technologies (e.g., React, Vite, Chakra UI), and target markets (India & USA) to improve search relevance.
- Always include descriptive alt text for each image (describe the screen or feature and include location keywords where relevant) and enable lazy loading to improve performance.

SEO & Accessibility Tips
- Use a single H1 per page and descriptive H2/H3s for project titles and sections.
- Add meta title/description and Open Graph tags for each project page where applicable.
- Prefer locally hosted or CDN-served hero images with clear filenames and `alt` attributes.

Important Notes
1. Follow best practices for front-end performance and accessibility.
2. Avoid dead or unnecessary code; keep the codebase clean and maintainable.
3. Ensure all pages and project descriptions are SEO friendly and target both India and USA audiences.
4. Use React Suspense and lazy loading for heavy components and images to improve initial load performance.