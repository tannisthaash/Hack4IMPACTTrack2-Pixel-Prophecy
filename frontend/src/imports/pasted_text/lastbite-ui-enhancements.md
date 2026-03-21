Enhance the LastBite web application UI with the following precise layout, navigation, and component improvements:

🧊 1. FIXED HEADER (NO ANIMATION)
📌 Requirements:

Header must be fixed at top (sticky)

Maintain constant height (no shrinking on scroll)

No animation that changes size

🎨 Style:

Glassmorphism (blur background)

Slight green tint blend

Soft border + shadow

🧭 Elements:

Logo (LastBite)

Navigation links: Home, How it Works, Impact, Contact

Right corner:

👤 User Dropdown (IMPORTANT)
Before Login:

Show button → “Account” (or icon)

Dropdown:

Sign In

Sign Up

After Login:

Replace with Profile Avatar/Button

Dropdown:

My Profile

Contact Us

Logout

🔗 Behavior:

My Profile → navigates to profile page

Contact Us → opens contact page

All links must be connected (prototype navigation)

🧊 2. GLASS CARDS (ALL PAGES)

Apply consistent glassmorphism cards across entire app:

🎨 Style:

Background: transparent with green gradient blend

Blur: 12–20px

Border: subtle white/green opacity

Rounded corners: 20px+

📌 Apply to:

Dashboard cards

Forms

Feature sections

Profile panels

Map info cards

🦶 3. GLOBAL FOOTER (ALL PAGES)
📌 Footer must be visible on:

Every page (fixed bottom or full-width section)

🧩 Structure:
1. Branding

Logo: LastBite

Tagline: “From Waste to Worth”

2. Navigation Links

Home

How it Works

Impact

Contact Us

3. About Section

Short description of platform

4. Social Media

Icons:

Instagram

LinkedIn

Twitter (X)

Minimal modern icons

🔗 Behavior:

ALL links must be connected to their respective pages

Smooth navigation (no page flicker)

📞 4. CONTACT US PAGE (NEW)
📌 Layout:

Centered glass card

🧩 Include:

Name input

Email input

Message textarea

Submit button

✨ Extras:

Contact details section:

Email

Phone

Optional map placeholder

👤 5. PROFILE SYSTEM (SEPARATE PAGES)

Create 3 different profile pages:

🍱 Restaurant Profile

Restaurant name

Location

Food posts history

Stats (meals donated)

🏢 NGO Profile

Organization name

Service area

Food received history

Impact stats

🚴 Volunteer Profile

Name

Tasks completed

Deliveries history

Achievement badges

✨ Common UI:

Profile image

Edit button

Activity timeline

Glass card layout

👁 6. PASSWORD FIELD IMPROVEMENT
📌 Add:

Eye icon inside password field

👇 Behavior:

Click → toggle:

Show password

Hide password

🔗 7. FULL NAVIGATION CONNECTIVITY (IMPORTANT)

Ensure:

Every button is clickable

Every page is connected via routing

No state-based toggling

🔁 Example Flow:

Home → Sign In → Dashboard

Dashboard → Map → Profile

Profile → Contact Us

🎯 8. UX RULES (CRITICAL)

No flickering transitions

No page hiding/showing

Use page-based navigation only

Smooth transitions (fade/slide)