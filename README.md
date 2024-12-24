# subman

## Roadmap

### Core Features

- [ ] Manage subscriptions
  - [x] create - name, price, frequency, subscribed on, cancellation reminder - number of days/hours/minutes before
  - [x] update
  - [x] delete
  - [ ] implement all of the above with DB
- [ ] Auth with Lucia
- [ ] Views
  - [ ] upcoming renewals/expiring subs
  - [ ] costliest/cheapest
  - [ ] best/worst rated
  - [ ] newest/oldest
- [ ] Add tags for categorization
- [ ] Reminders and alerts
  - [ ] include free trial expiry countdown and reminder

### Gamification

- [ ] Fun quizzes:
  - [ ] guess the price of a subscription
  - [ ] subscriptions facts
  - [ ] other user-related quizzes

### Nice-to-haves

- [ ] Dark Mode Easter Egg: “Night Mode Persona”: If users activate dark mode, let the app’s character or messages become a bit snarky or funny, with more sarcastic comments. This adds an unexpected twist and a bit of personality!
- [ ] Support multiple currencies
  - [ ] use open exchange API - free tier updates daily, and paid tier has real-time data (but how to achieve real-time?)
- [ ] “Break Up” Button: Goodbye Animation: When a user cancels a subscription, show a humorous breakup animation like a small heart breaking or a box packing up with the subscription's icon going away.
- [ ] Subscription “Thermometer”: Heat Scale of Value: Display a mini thermometer or rating scale where users can rate each subscription as “worth every penny” to “time to cancel,” and the app suggests cutting back based on low scores.
- [ ] Spending Badges & Fun Achievements: Badge System: Reward users for positive habits with playful badges, like “Unsubscribed!” (for canceling an unused subscription), “Stuck to 3!” (for keeping subscriptions under three), or “First Trim” (for first-time unsubscribing). This falls under gamifications as well.
- [ ] “Auto-Nag” Mode: Subscription Reminder Bot: Give users the option to turn on a "nag" mode that sends humorous but persistent reminders to review a subscription that they marked as “questionable” or rarely use. For instance, “Hey! Remember that gym subscription you used once?”
- [ ] Bucket list
  - [ ] add platforms to wishlist
  - [ ] also allow some sort of broadcasting feature (like a forum?) where users can share subscriptions that are on discount

### Miscellaneous

- [ ] Prompt to rate un-rated subs
- [ ] Visualizations
- [ ] Motivations for cutting cost
  - [ ] allow users to rate each subscription for value, and calculate the true value based on the rating and the cost of the sub
  - [ ] fun/sarcastic text
  - [ ] spending forecast - when user adds a new subscription
  - [ ] gamification - make it a challenge to cut a certain amount
  - [ ] maybe have a can't cut list?
