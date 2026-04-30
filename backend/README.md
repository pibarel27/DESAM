# DESAM Backend

Express + MongoDB backend for the DESAM React frontend.

## Project structure

```
desam-backend/
├── server.js               ← entry point
├── .env.example            ← copy to .env and fill in values
├── models/
│   ├── Admin.js            ← admin account (hashed password)
│   └── About.js            ← about-page content
├── routes/
│   ├── admin.js            ← POST /api/admin/login  •  POST /api/admin/seed
│   ├── otp.js              ← POST /send-otp  •  POST /verify-otp  •  POST /reset-password
│   ├── about.js            ← GET /api/about  •  POST /api/about  (protected)
│   └── contact.js          ← POST /api/contact/send-message  (optional)
├── middleware/
│   └── requireAuth.js      ← JWT Bearer token check
└── utils/
    ├── mailer.js           ← nodemailer transporter
    └── otpStore.js         ← in-memory OTP store (5-min TTL)
```

## Quick start

### 1. Install dependencies
```bash
cd desam-backend
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env — set MONGO_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS
```

### 3. Create the admin account (one-time)
Start the server first, then run:
```bash
curl -X POST http://localhost:5000/api/admin/seed \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "YourStrongPassword",
    "email": "desamofficial02@gmail.com",
    "seedSecret": "<your SEED_SECRET from .env>"
  }'
```
This hashes the password and stores the account in MongoDB. Remove or
disable the `/seed` route after use.

### 4. Run the server
```bash
npm run dev        # development (nodemon)
npm start          # production
```

---

## API reference

### Auth

| Method | Path | Body | Response |
|--------|------|------|----------|
| POST | `/api/admin/login` | `{ username, password }` | `{ success, token }` |

Use the returned `token` as `Authorization: Bearer <token>` on protected routes.

### OTP / Password reset

| Method | Path | Body | Notes |
|--------|------|------|-------|
| POST | `/send-otp` | — | Sends OTP to admin's registered email |
| POST | `/verify-otp` | `{ email, otp }` | Returns `{ success }` |
| POST | `/reset-password` | `{ email, newPassword }` | Call after verifying OTP |

### About page

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| GET | `/api/about` | Public | Returns page content |
| POST | `/api/about` | Bearer token | Upserts page content |

POST body shape:
```json
{
  "aboutText": ["Paragraph one", "Paragraph two"],
  "vision": "Our vision...",
  "mission": "Our mission...",
  "values": "Our values...",
  "team": [
    { "name": "John", "role": "CEO", "image": "/img/john.jpg", "bio": "..." }
  ]
}
```

### Contact (optional server-side email)

| Method | Path | Body |
|--------|------|------|
| POST | `/api/contact/send-message` | `{ username, email, subject, message }` |

---

## Frontend changes needed

### 1. Admin login — use JWT instead of localStorage flag
Replace the hardcoded check in `AdminLogin.js`:

```js
// OLD
if (username === "admin" && password === "1234") { ... }

// NEW
const res = await axios.post("http://localhost:5000/api/admin/login", { username, password });
if (res.data.success) {
  localStorage.setItem("adminAuth", "true");
  localStorage.setItem("adminToken", res.data.token); // store JWT
  setIsAuth(true);
  navigate("/");
}
```

Then pass the token in protected requests:
```js
axios.post("http://localhost:5000/api/about", data, {
  headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` }
});
```

### 2. Gmail App Password setup
1. Enable 2-Step Verification on your Gmail account.
2. Go to **Google Account → Security → App passwords**.
3. Create a new App Password for "Mail / Other".
4. Paste it into `EMAIL_PASS` in `.env`.
