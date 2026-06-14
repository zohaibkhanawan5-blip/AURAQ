# AURAQ Website — Editing Guide

## 📁 File Structure
```
auraq-website/
├── index.html      ← All page content & structure
├── style.css       ← All colours, fonts, layout
├── script.js       ← Interactions, order logic
├── README.md       ← This file
└── images/
    ├── logo.png
    ├── desert-bloom.png
    └── goolden-dust.png
```

---

## ✏️ Common Edits (index.html)

### Change phone number
Search for `+92 300 123 4567` and replace with your number.

### Change email
Search for `hello@auraq.pk` and replace with your email.

### Add social media links
Find the `.social-links` section and replace the `href="#"` with your URLs:
```html
<a href="https://instagram.com/auraq">...</a>
<a href="https://facebook.com/auraq">...</a>
<a href="https://wa.me/923001234567">...</a>
```

### Change perfume price
Search for `Rs 2,500` in index.html and `2500` in script.js.

### Add more perfumes
Copy the entire `<div class="perfume-card">` block and change the image, name, description, and notes.

---

## 🎨 Colour Changes (style.css)

All colours are at the top of style.css under `:root {}`:

| Variable         | Current Value | Purpose           |
|-----------------|---------------|-------------------|
| `--orange`       | `#D4520A`     | Brand primary     |
| `--orange-deep`  | `#A83D05`     | Hover state       |
| `--gold`         | `#C9952B`     | Luxury accent     |
| `--ivory`        | `#FAF7F2`     | Page background   |
| `--charcoal`     | `#1A1209`     | Dark sections     |

---

## 📦 Enable WhatsApp Orders (script.js)

In `script.js`, find the WhatsApp block and:
1. Uncomment the `window.open(...)` lines
2. Replace `923001234567` with your WhatsApp number (country code + number, no spaces)

This will auto-open WhatsApp with the order details when someone submits a form.

---

## 🌐 Deploying the Website

### Free hosting options:
1. **Netlify** (recommended) — Drag and drop the folder at netlify.com
2. **Vercel** — Connect GitHub repo at vercel.com
3. **GitHub Pages** — Push to a GitHub repo and enable Pages

### Custom domain:
Buy a domain like `auraq.pk` from PKNIC or Namecheap, then connect it to your host.

---

## 📋 Viewing Orders

Orders are saved locally in the browser's localStorage.
To view them, open the browser console and type:
```js
JSON.parse(localStorage.getItem('auraq_orders'))
```

For a real order system, connect a backend (e.g. Google Sheets via FormSubmit.co) or email service.

---

Made with ❤️ for AURAQ
