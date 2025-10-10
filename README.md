---

## **Tech Stack**

* Next.js (React)
* TypeScript
* Tailwind CSS (UI Styling)
* React Icons

---

## **Setup Instructions**

### 1. Clone the Repository

```bash
git clone Cloning https://github.com/Tima99/CheckMinistry-Assignment-Client
cd CheckMinistry-Assignment-Client
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

Add the following environment variables (example):

```env
NEXT_PUBLIC_API_V1_BASE_URL=http://localhost:3000/api/v1
```

- Replace the API URL with your backend server URL if different.

---

### 4. Run the Development Server

```bash
npm run dev
```

- Frontend runs on `http://localhost:3001` (or default Next.js port 3000 if backend is on a different port)

---

### 5. Build and Run in Production

```bash
npm run build
npm start
```

- Production server runs on the default Next.js port (3000)

---

### 6. Notes

- Make sure the **backend server is running** for API calls.
- You can adjust **API URLs** in `.env`.
- Hot reload works automatically in dev mode.

---
