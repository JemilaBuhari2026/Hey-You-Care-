# Hey You Care 

PROJECT: HEY! YOU CARE
VERSION: MVP FOUNDATION V1
Act as a senior product designer, UX researcher and full-stack
application architect.
We are building Hey! You Care, a culturally responsive,
AI-powered emotional support and care-navigation web application
for pregnant women and mothers during the first year after birth.
This is intended to become BOTH:
1. A functional prototype suitable for demonstrating to potential
   funders and partners.
2. A real, responsibly developed MVP that can eventually be used
   by real mothers.
Do not build a superficial landing page only. Establish the
foundation of a functional application that can be extended
incrementally.
IMPORTANT DEVELOPMENT RULES
- Do not implement every feature in one pass.
- Do not add unnecessary complexity.
- Do not invent working backend integrations.
- Do not claim a feature works unless it actually works.
- Do not expose API keys or secrets in frontend code.
- Do not store real users' sensitive conversations.
- Do not create fake user testimonials, usage statistics,
  clinical results or partnerships.
- Do not introduce unnecessary dependencies.
- Keep the project maintainable and suitable for future
  development through GitHub and Claude Code.
- Before making major architectural decisions, explain the
  decision and its implications.
- Build the initial interface and navigation first.
PRODUCT PROMISE
Hey! You Care helps mothers feel heard, identify manageable
next steps and find ways to ask for appropriate human support.
Brand tagline:
"Feel heard. Find support. Take your next step."
Supporting message:
"You don't have to carry it all alone. Let's find your next
step together."
The application is an AI-powered supportive companion.
It is not a therapist, doctor, midwife or emergency service.
It does not diagnose or claim to treat mental health conditions.
TARGET USERS
Primary users are adult pregnant women and mothers during the
first year after birth, initially focusing on Nigeria.
The design must feel culturally relevant and welcoming without
assuming that all mothers have the same family structure,
religious beliefs, experiences or support systems.
INITIAL LANGUAGE STRATEGY
- English is the initial interface language.
- Design the architecture to support Nigerian Pidgin later.
- Do not claim multilingual AI functionality exists until it
  has been implemented and tested.
- Use natural, simple, respectful and nonjudgmental language.
BRAND IDENTITY
Create a premium, warm, emotionally reassuring visual identity.
Primary colours:
- Soft lilac: #E8DDF0
- Deep muted purple: #76556F
- Warm cream: #FFF8F0
- Burnt orange: #C96F45
- Chocolate brown: #4A302B
- Soft green: #A8B69A
Use these colours consistently.
The overall design should feel:
- Warm
- Safe
- Modern
- Human-centred
- Calm
- Premium
- Culturally inclusive
- Appropriate for adults
Use soft rounded corners, generous whitespace, beautiful
typography and subtle transitions.
Avoid:
- A cold hospital-interface appearance.
- Excessive pink.
- Overly childish illustrations.
- Excessive gradients.
- Generic corporate dashboards.
- Too many cards on one screen.
- Overwhelming animations.
- Manipulative engagement patterns.
Use accessible colour contrast and readable text sizes.
PRODUCT STRUCTURE
Create the following main application routes or equivalent
screen structure.
1. WELCOME / LANDING SCREEN
Display:
- Hey! You Care branding.
- The headline: "You don't have to carry it all alone."
- Supporting text explaining the product simply.
- Primary button: "Let's talk".
- Secondary action: "Explore how it works".
- A concise explanation that the companion uses AI.
- A clear route to privacy information.
Do not make unsupported claims about improving clinical
outcomes or replacing professional care.
2. ONBOARDING SCREEN
Introduce the product's purpose and limitations.
Explain that:
- The companion uses AI.
- It offers supportive conversation and practical next steps.
- It is not a medical or mental health professional.
- Users control what they share.
- The product should not be relied on for emergency assistance.
Keep the language concise and understandable.
Do not request unnecessary personal details.
Do not ask for diagnoses, detailed medical histories,
precise addresses or emergency contacts during initial
onboarding.
Provide appropriate consent and privacy-information
placeholders that will be connected to the real data
architecture later.
Do not imply that a consent choice has been recorded
unless it is actually implemented.
3. HOME SCREEN
Create a calm, uncluttered home screen with four main options:
A. TALK TO ME
A supportive conversation experience.
B. LITTLE LIGHTER
Short, optional activities for reflection, grounding and
lightening the mental load.
C. REACH FOR ME
A tool that helps users put requests for practical or
emotional support into words.
D. FIND SUPPORT
A future-facing entry point for verified human and
professional support resources.
If Find Support is not yet implemented, clearly mark it as
a planned feature or provide a safe informational placeholder.
Do not fabricate providers or emergency numbers.
The home screen must not overwhelm users with multiple
competing calls to action.
4. TALK TO ME SCREEN
Create the interface for a supportive AI conversation.
For this initial stage:
- Build the conversation interface and message composer.
- Include a text input and send button.
- Include an obvious way to end the interaction.
- Provide an empty state and loading state.
- Provide a clear error state.
- Include a visible AI identity disclosure.
- Include a placeholder for future voice interaction.
Do not pretend that a real AI model is connected yet.
Do not generate fabricated assistant replies and present
them as genuine live AI responses.
If the backend is not connected, display an appropriate
development-state message.
The architecture must eventually support secure server-side
AI calls and must not expose secret API keys in the browser.
Do not persist conversation transcripts by default.
5. LITTLE LIGHTER SCREEN
Create a feature hub with two planned activities:
- Worry-Eating Monster
- Drama Queen Court
The interface should make clear that these are optional
wellbeing activities, not clinical treatments.
Create attractive preview cards and navigation.
The detailed game logic will be implemented in a later step.
6. REACH FOR ME SCREEN
Create the interface for helping a mother draft a request
for support.
Possible categories:
- Someone to listen.
- Help with childcare.
- Help with meals.
- Help with errands.
- Company or companionship.
- Help attending an appointment.
- Other practical support.
Allow the user to choose a category and proceed to a draft
creation screen.
For this initial stage, build the interface and navigation.
The actual AI-powered draft generation will be implemented
later.
Never send a message automatically.
The user must control whether, when and to whom a message
is shared.
Do not assume that a partner or family member is safe.
7. PRIVACY AND SETTINGS SCREEN
Create an accessible settings screen containing:
- Privacy information.
- AI limitations.
- Conversation-data information.
- Account and data controls placeholders.
- Language preference placeholder.
- Feedback and report-a-problem entry point.
Do not claim that account deletion, consent storage or other
data controls are functional until they have been implemented.
TECHNICAL FOUNDATION
Use a clean, component-based application structure.
Keep presentation components separate from business logic
where practical.
Prepare the project for version control through GitHub.
Do not add a database or real AI integration during this
initial design pass unless essential to establish the
structure.
Do not hard-code secret credentials.
Do not create unnecessary tables or collect personal data
without an explicit requirement.
ACCESSIBILITY
Target WCAG 2.2 AA where applicable.
Ensure:
- Readable typography.
- Appropriate colour contrast.
- Keyboard-accessible navigation.
- Visible focus states.
- Proper form labels.
- Clear errors.
- Mobile responsiveness.
- Support for reduced-motion preferences where appropriate.
MOBILE-FIRST DESIGN
Most initial users are expected to access the application
through mobile devices.
Make the experience work 
 on small Android screens.
Avoid heavy imagery and unnecessary animations.
DELIVERABLE FOR THIS FIRST PASS
1. Build the responsive application foundation.
2. Implement the main navigation and screen structure.
3. Apply the brand design consistently.
4. Implement basic interactions and navigation.
5. Ensure the project builds without errors.
6. Clearly identify anything that is only a placeholder.
7. Summarise what was actually implemented.
8. Identify any architectural or security concerns before
   proceeding to backend integration.
Do not proceed to a full backend implementation yet.
Start by creating the application foundation.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://you-are-held-mother-care.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/defd6f8e-78e7-43ec-b5c2-7f9d52ca8cf5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
