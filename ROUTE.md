# API ROUTES DOCUMENTATION

Base URL: `http://localhost:5054`

---

## 🧑 USERS

### `POST /api/users/signup`
- Registers a new user.
- **Body:** `{ name, email, phone_number, password }`

### `POST /api/users/login`
- Authenticates user and returns JWT token.
- **Body:** `{ email, password }`

### `POST /api/users/logout`
- Logs out a user (token discard logic handled client-side).

---

## 🎧 AUDIO

### `POST /api/audio/upload-audio`
- Uploads an audio file and returns transcription.
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `multipart/form-data` with `audioFile`.

---

## 📄 PDF

### `POST /api/pdf/upload-pdf`
- Uploads a PDF and extracts text from it.
- **Headers:** `Authorization: Bearer <token>`
- **Body:** `multipart/form-data` with `pdfFile`.

---

## 🗣️ TEXT TO AUDIO

### `POST /api/convert/convert-to-audio`
- Converts provided text to an audio file.
- **Body:** `{ text, userId }`

---

## 🤖 AI (Q&A)

### `POST /api/Ai/ask`
- Asks a question based on previously uploaded PDF.
- **Body:** `{ documentId, question, userId }`

---

### 🚀 Future Features (Planned)
- Audio-to-text Q&A
- Multilingual support
- AI recommendations

