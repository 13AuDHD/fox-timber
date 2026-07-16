# Fox & Timber Website

## Local preview
The shared header and footer use a small JavaScript `fetch()` include system. Opening files directly may block includes. Run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages
1. Upload all contents to a repository root.
2. Go to Settings → Pages.
3. Choose Deploy from a branch.
4. Select `main` and `/ (root)`.
5. Add your custom domain when ready.

## Scheduling
In `contact.html`, replace:

`https://calendly.com/YOUR-USERNAME/consultation`

with your live Calendly, Cal.com, or SavvyCal event URL. Create an event named Fox & Timber Consultation, set availability, duration, buffer time, intake questions, and video meeting settings.

## Replace before launch
Search for:
- `YOUR-USERNAME`
- `+1 970 555 0113`
- `Replace with your public mailing address`
- `href="#"` social links

## Structure
- `/css/styles.css`
- `/js/scripts.js`
- `/img/`
- `/includes/header.htm`
- `/includes/footer.htm`
- `/index.html`
- `/who.html`
- `/what.html`
- `/portfolio.html`
- `/contact.html`

FontAwesome is imported from `styles.css`. Google Fonts are linked in each page head. Uploaded logo artwork is used for branding rather than recreating the logo with a font.
