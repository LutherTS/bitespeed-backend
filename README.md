# Bitespeed Backend Task - Identity Reconciliation

(This is made with Remix. A version made with Next.js can be found here: https://github.com/LutherTS/nextjs-bitespeed-backend)

## Sources

Job link: https://bitespeed.notion.site/Backend-Developer-SDE-1-357cd0ddceba497bbf5f4dc88b03522b

Assignment link: https://bitespeed.notion.site/Bitespeed-Backend-Task-Identity-Reconciliation-53392ab01fe149fab989422300423199

## Endpoints

Hit the /identify endpoint with the relevant data (https://bitespeed-backend.fly.dev/identify).

Hit the /reset endpoint to reset the database (https://bitespeed-backend.fly.dev/reset).

## Extra Credits

- I've used zod to validate the provided phone numbers and emails.
- Phone numbers are accepted through a regex only if they exclusively include numbers.
- A phone number that begins with a "+" for country codes is also accepted.
- Emails can be provided as empty and if they're not, they are validated with the validator library's isEmail function.

- If two contacts are found and both are primary contacts, not only does the newest primary contact become a secondary contact to the oldest one, the secondary contacts of the newest primary are also reassigned as secondaries to the oldest primary.
- If two different contacts are found, one primary, one secondary, the primary of the secondary contact is found and as above, the newest primary between these two primaries and all its the secondary contacts are reassigned as secondaries to the oldest primary.
- If two different secondary contacts are found, both of their primaries are found and again, the newest of their primaries along with all its secondaries are reassigned as secondaries to the oldest primary.

## Contacts

Please let me know what you think at luther@tchofo-safo-portofolio.me.

And it you ever end up hiring me for this position, you can send the Apple AirPods Pro to Ayesha from Flexiple for the indirect referral. 🙂
