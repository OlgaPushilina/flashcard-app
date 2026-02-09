Reflection

Problem-solving approach

I started by reading through all the requirements and looking at the mockups to understand what screens I needed to build. Then I mapped out the routes - home page, deck views, study mode, create/edit forms for decks and cards.
I worked on one screen at a time, starting with the simpler ones like the home page and NotFound. Once those worked, I moved to the more complex features like the Study component with its flip/next card logic. I kept testing in the browser as I went to catch issues early.
When I hit bugs, I'd check the console first, then trace through the code to figure out where things went wrong. Google and React docs helped when I got stuck on specific errors.

Key technical decisions

I organized the project using a feature-based folder structure (`features/decks/`, `features/cards/`, `features/study/`) instead of grouping by type (`components/`, `pages/`). This keeps related files together - so all the deck-related components live in one folder. It makes it easier to find things and understand how the app is organized.
I also chose to use nested routes in React Router instead of writing out every path in full. So instead of having separate routes like `/decks/:deckId`, `/decks/:deckId/edit`, `/decks/:deckId/study`, I nested them under a parent `<Route path="decks">`. This made the routing structure cleaner and mirrors the folder structure nicely.

AI Use Disclosure

Yes - I used AI tools to help with this project. Mostly for getting unstuck on specific errors like the controlled/uncontrolled input warning, understanding React patterns like AbortController for cleanup, and helping debug issues faster by explaining what error messages meant.

Area to strengthen

I want to get better at testing React components. I relied mostly on manual browser testing for this project, but I know that's not scalable. Writing unit tests with React Testing Library and understanding how to mock API calls properly would make my code more reliable and catch bugs before they hit production.
I'd also like to learn more about React performance optimization - things like useMemo, useCallback, and when they actually matter versus when they're overkill.
