# Fox & Timber Website

## Included
- `index.html`
- `who.html`
- `what.html`
- `where.html`
- `how.html`
- `client-login.html`
- `contact.php`
- `css/style.css`
- `js/scipts.js`
- all images in `img/`

## Before publishing
1. Replace the placeholder address and phone number in `where.html`.
2. Replace social media `#` links throughout the pages.
3. Confirm `hello@foxandtimber.com` and `no-reply@foxandtimber.com` exist.
4. Configure SPF, DKIM, and DMARC for the domain.
5. Host on a server with PHP mail enabled, or replace `contact.php` with an authenticated mail provider such as Postmark, Mailgun, Amazon SES, or SendGrid.
6. The client portal is a visual demo only. Demo credentials are:
   - `demo@foxandtimber.com`
   - `timber2026`
7. Do not use the demo portal for real client data. Production use requires server-side authentication, authorization, encrypted storage, audit logging, and a PCI-compliant payment provider.
8. The map uses OpenStreetMap.
9. Google Fonts and Font Awesome are loaded from their public CDNs.

## Contact form behavior
The contact form posts to `contact.php`. The handler:
- sends the inquiry to `hello@foxandtimber.com`
- sends a confirmation from `no-reply@foxandtimber.com`
- returns JSON so the form disappears and the success panel appears

Some shared hosting providers disable PHP `mail()`. For reliable delivery, connect the form to an authenticated transactional email service before launch.
