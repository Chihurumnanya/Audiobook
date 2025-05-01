# 🎧 Audiobook API

Audiobook is a **TypeScript-based backend API** built to serve as the foundation for an intelligent multimedia application. The API provides functionality for converting text (typed or from a PDF) into audio, managing users securely, and preparing for advanced AI features like audio transcription and question answering.

This is more than just a text-to-speech converter—it's a scalable, modular system designed with clean architecture and future AI integration in mind.

---

## 🚀 Features Implemented

### ✅ 1. User Authentication

- **JWT-based authentication** with token expiration.
- **Password hashing** using `bcrypt` for security.
- Signup, login, and logout endpoints built using a **service-based architecture**.
- User data stored in **PostgreSQL** using **Sequelize ORM**.
- User model includes `soft delete` capability.

---

### ✅ 2. PDF Upload and Parsing

- Users can upload PDF files.
- Extracted text from PDFs is available for further processing.
- Used `pdf-parse` to extract textual content from uploaded files.

---

### ✅ 3. Audio Upload and Management

- Users can upload `.wav` audio files.
- Uploaded audio is stored in the filesystem and metadata saved in the database.
- Files are processed via **Multer** middleware.
- Sequelize model for `UploadedAudio` tracks metadata like filename, path, and uploader.

---

### ✅ 4. Text-to-Audio Conversion (Text-to-Speech)

- Converts raw text into `.wav` audio using a TTS engine (e.g., Node `gtts`, or any TTS module).
- Generated audio is saved and stored in the filesystem.
- Sequelize model for `GeneratedAudio` stores metadata like:
  - File path
  - Original text
  - User ID
- Endpoint: `POST /api/textToAudio/convert-to-text-audio`

---

## 🛠️ Tech Stack

| Layer             | Technology                             |
|------------------|----------------------------------------|
| Language          | TypeScript                             |
| Server Framework  | Express.js                             |
| ORM               | Sequelize                              |
| Database          | PostgreSQL                             |
| Auth              | JWT + bcrypt                           |
| File Upload       | Multer                                 |
| PDF Parsing       | `pdf-parse`                            |
| Audio Generation  | Text-to-Speech engine (`gtts`/TTS lib) |
| AI Tools (WIP)    | Hugging Face + LangChain.js (future)   |

---

## 🔧 Folder Structure

```
/src
 ├── config/             # DB, auth, and hashing configs
 ├── models/             # Sequelize models (User, Audio, PDF)
 ├── routes/             # All route definitions
 ├── services/           # Core business logic
 ├── documents/            # Stored files (audio, PDF)
 └── utils/              # (Optional: helper functions)
```

---

## 🔐 Authentication Flow

1. **User signs up** → password hashed → saved in DB.
2. JWT token generated and returned.
3. Protected endpoints require token in `Authorization` header.
4. Token expires after 30 days.

---

## 📦 Project Setup & Usage

### 1. Clone the repo

```bash
git clone https://github.com/Chihurumnanya/Audiobook.git
cd Audiobook
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file based on `.env.example`:

```env
PORT=5000
DB_NAME=audiobook_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
JWT_SECRET=your_jwt_secret
```

### 4. Run the project

#### Development

```bash
npm run start:dev
```

#### Production

```bash
npm run build:prod
npm run start:prod
```

---

## 📌 Endpoints Overview

| Method | Endpoint                                 | Description                         |
|--------|------------------------------------------|-------------------------------------|
| POST   | `/api/users/signup`                      | Register a new user                 |
| POST   | `/api/users/login`                       | Log in and receive a JWT            |
| GET    | `/api/users/profile`                     | (Future) Get logged-in user profile |
| POST   | `/api/audio/upload-audio`                | Upload audio file                   |
| POST   | `/api/pdf/upload-pdf`                    | Upload PDF and extract text         |
| POST   | `api/convert/convert-to-audio`           | Convert text to audio               |

---

## 📈 What's Next

Here’s what I plan to implement next to evolve Audiobook:

- **🎤 Audio-to-Text (Transcription):** Using Hugging Face models to transcribe uploaded audio.
- **🤖 AI Q&A System:** Ask questions based on uploaded or transcribed content using LangChain.js.
- **📊 Analytics Dashboard:** Admin dashboard to view user activity and content stats.
- **🔒 Token Blacklisting:** Enhance JWT logout by maintaining a denylist.
- **🌍 Translation Support:** Translate text or audio into other languages using AI.

---

## 🙌 Contributing

This is a personal learning and portfolio project. If you’d like to collaborate, feel free to fork and submit a pull request.

---

## 🧠 Inspiration

This API is designed with future AI integration in mind and is part of my preparation for applying to international AI and backend internships (e.g., **RISE Germany**, **HZB**, **HZDR**, etc.).
