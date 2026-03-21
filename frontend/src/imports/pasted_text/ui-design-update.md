Update the LastBite UI design to properly support both Light Mode and Dark Mode with clean, consistent, and accessible design.

🌗 1. GLOBAL THEME SYSTEM (VERY IMPORTANT)

Design must support two complete themes:

🌞 Light Mode

Background: soft white / off-white (#F9FAFB)

Text: dark gray / near black (#111827)

Cards: light glass / subtle shadows

🌙 Dark Mode

Background: deep dark (#020617 / #0F172A)

Text: soft white (#E5E7EB)

Cards: transparent glass (neutral, not green)

🎯 RULE:

Maintain strong contrast between text and background in both modes

🧾 2. INPUT FIELDS FIX (BOTH MODES)
❗ Problem:

Text not visible while typing

✅ Design Inputs:
🌞 Light Mode:

Background: white

Text: black / dark gray

Placeholder: gray (#6B7280)

Border: light gray

Focus: green border glow

🌙 Dark Mode:

Background: dark gray (#1F2937)

Text: white (#FFFFFF)

Placeholder: light gray (#9CA3AF)

Border: subtle gray

Caret (cursor): white

✨ Add:

Eye icon for password (toggle visibility)

Smooth focus animations

🧊 3. GLASS UI (FIXED FOR BOTH MODES)
❗ Remove:

Heavy green tint

✅ Use:
🌞 Light Mode Glass:

rgba(255,255,255,0.6)

Soft blur

Light shadow

🌙 Dark Mode Glass:

rgba(255,255,255,0.05)

Strong blur

Subtle border

🎯 Rule:

Glass must be neutral, not green-heavy

🖥 4. FULL-SCREEN LAYOUT (IMPORTANT)

Remove boxed/container layout

Make UI full-width

Use padding instead of fixed container

🖼 5. HERO SECTION (IMAGE FIX)
❗ Replace:

Green circle / abstract shapes

✅ With:

High-quality food image

🎨 Style:

Slight overlay for readability

Smooth blending with background

Maintain depth and realism

👤 6. HEADER SIMPLIFICATION
❌ Remove:

“Account” button

“Profile” text button

✅ Replace with:

Only profile icon (avatar)

👇 Behavior:
Before Login:

Dropdown:

Sign In

Sign Up

After Login:

Dropdown:

My Profile

Contact Us

Logout

🧭 7. NAVIGATION (NO LOGOUT ISSUE)
✅ MUST:

Clicking Home / Contact / Dashboard should NOT log out user

🔥 Add this rule:

“Maintain persistent authentication state across navigation. Do not reset session on page change.”

🦶 8. FOOTER (FIXED FOR BOTH MODES)
❗ Remove:

Rounded card footer

Floating footer box

✅ New Footer:
Layout:

Full-width

Integrated with page bottom

🎨 Light Mode:

Soft gray background

Dark text

🌙 Dark Mode:

Dark background (#020617)

Light text

🧩 Sections:

Logo + tagline

Navigation links

About

Social icons

✨ 9. COLOR USAGE RULE

Green should be used ONLY for:

Buttons

Highlights

Active states

❌ Avoid:

Full green backgrounds

Green-tinted glass

🎬 10. UX & INTERACTION RULES

No flickering

No layout shifting

Smooth transitions

Stable UI

💡 FINAL STRICT LINE (MOST IMPORTANT)

Add this at the end:

“Ensure proper light and dark theme contrast, fix input visibility in both modes, remove green tint from glass UI, use full-width layout, replace decorative shapes with real images, simplify header to icon-only profile access, and maintain persistent authentication state across all navigation.”