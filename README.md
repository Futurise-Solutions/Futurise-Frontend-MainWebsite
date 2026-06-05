Project brief (reframed)

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
