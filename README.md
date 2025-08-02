

```markdown
# 🏡 DreamSpace

**DreamSpace** is a full-stack real estate platform designed to simplify the property rental and buying experience. Built using the MERN stack (MongoDB, Express.js, React, and Node.js), DreamSpace allows users to explore listings, connect with property owners.

---

## 🚀 Features

- 🔐 **Authentication** — Secure login and registration using JWT tokens.
- 📋 **Property Listings** — Browse, add, update, or delete properties with ease.
- 🔍 **Search & Filter** — Find properties based on location, type, and price.
- 📸 **Image Upload** — Upload property images using cloud storage (e.g., Cloudinary).
- 🎨 **Responsive UI** — Mobile-friendly and intuitive user interface using Tailwind CSS.

---

## 🛠️ Tech Stack

| Tech             | Description                         |
|------------------|-------------------------------------|
| **Frontend**     | React, Tailwind CSS, Axios          |
| **Backend**      | Node.js, Express.js                 |
| **Database**     | MongoDB Atlas                       |
| **Authentication** | JWT (JSON Web Tokens)            |
| **Real-time**    | Socket.IO                           |
| **Deployment**   | Render / Vercel (Frontend & Backend)|

---

## 📁 Folder Structure

```

dreamSpace/
├── client/                 # React frontend
│   ├── src/
│   └── public/
├── server/                 # Node.js backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── lib/
│   └── middleware/
├── .env
├── package.json
└── README.md

````

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/shaik-asma2247/dreamSpace.git
cd dreamSpace
````

### 2. Set up Environment Variables

Create a `.env` file in the root directory with the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd ../client
npm install
```

### 4. Start the App

#### Backend

```bash
npm run dev
```

#### Frontend

```bash
npm start
```


---

## 🧑‍💻 Author

**Shaik Asma**

---



## 🙌 Acknowledgements

* MongoDB, Express, React, Node
* Cloudinary
* Render/Vercel


