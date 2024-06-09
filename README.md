# Bitespeed Backend Task - Identity Reconciliation

## Sources

Job link: https://bitespeed.notion.site/Backend-Developer-SDE-1-357cd0ddceba497bbf5f4dc88b03522b

Assignment link: https://bitespeed.notion.site/Bitespeed-Backend-Task-Identity-Reconciliation-53392ab01fe149fab989422300423199

## Endpoints

Hit the /identify endpoint with the relevant data (https://bitespeed-backend.fly.dev/identify).

Hit the /reset endpoint to reset the database (https://bitespeed-backend.fly.dev/reset).

## Extra Credits

- I've used zod to validate the provided phone numbers and emails.
- Phone numbers are accepted through a regex only if they exclusively include numbers.
- A phone number that begins with a + for country codes is also accepted.
- Emails can be provided as empty and if they're not, they are validated with the validator library's isEmail function.

- If two different secondary contacts are found, one via the phone number, another one via the email, the most recent of their primary contacts is selected for the response.
- If two different contacts are found, one primary, one secondary, the secondary contact is reassigned from its prexisting primary to the primary that was found.
- If two contacts are found and both are primary contacts, not only does the newest primary contact become the a secondary contact to the oldest one, the secondary contacts of the newest primary are also reassigned as secondaries to the oldest primary.

## Contacts

Please let me know what you think at luther@tchofo-safo-portofolio.me.

And it you ever end up hiring me for this position, you can send Apple AirPods Pro to Ayesha from Flexiple for the indirect referral. 🙂
