# Form Backend (Node.js + Express + MongoDB)

Backend for the React form with fields:

```
first_choice, second_choice, company_address, company_does, company_nature,
dob, address, phone_number, origin, card_number, home_address,
d_address, d_dob, d_fullname, d_phone_number, d_origin,
file, file2, file3
```

## Setup

```bash
cd form-backend
npm install
cp .env.example .env
# edit .env and set MONGODB_URI (local Mongo or MongoDB Atlas)
npm run dev      # nodemon (auto-restart)
# or
npm start
```

Server runs at `http://localhost:5000` by default.

## Project structure

```
form-backend/
├── config/db.js            # Mongoose connection
├── models/Form.js           # Schema matching all form fields
├── middleware/upload.js     # Multer config for file, file2, file3
├── controllers/formController.js
├── routes/formRoutes.js
├── uploads/                 # Uploaded files are stored here, served at /uploads/<filename>
├── server.js
└── .env
```

## Schema

`file`, `file2`, `file3` are stored as sub-documents with metadata
(`originalName`, `fileName`, `path`, `mimeType`, `size`) — the actual file
bytes live on disk in `/uploads`, not in MongoDB. `dob` and `d_dob` are
stored as `Date`. All other fields are `String`.

## API

All endpoints are prefixed with `/api/forms`.

| Method | Route          | Description                          |
|--------|----------------|---------------------------------------|
| POST   | `/`            | Create a form submission (multipart)  |
| GET    | `/`            | List submissions (`?page=&limit=`)    |
| GET    | `/:id`         | Get one submission                    |
| PUT    | `/:id`         | Update a submission (multipart)       |
| DELETE | `/:id`         | Delete a submission + its files       |

### Create/update requests must use `multipart/form-data`

Since the form has file fields, requests must be sent as `multipart/form-data`,
not JSON. Example using the browser `fetch` with your React state:

```js
const handleSubmit = async () => {
  const fd = new FormData();
  Object.entries(form).forEach(([key, value]) => {
    if (["file", "file2", "file3"].includes(key)) {
      if (value) fd.append(key, value); // value must be a File object
    } else {
      fd.append(key, value);
    }
  });

  const res = await fetch("http://localhost:5000/api/forms", {
    method: "POST",
    body: fd, // do NOT set Content-Type manually; the browser sets the boundary
  });
  const data = await res.json();
  console.log(data);
};
```

For file inputs in React, store the actual `File` object in state on change:

```jsx
<input
  type="file"
  onChange={(e) => setForm({ ...form, file: e.target.files[0] })}
/>
```

### Example response

```json
{
  "success": true,
  "data": {
    "_id": "64f...",
    "first_choice": "kk",
    "second_choice": "k",
    "company_address": "8",
    "dob": "1990-01-01T00:00:00.000Z",
    "file": {
      "originalName": "id.png",
      "fileName": "file-1699999999999-123456789.png",
      "path": "/uploads/file-1699999999999-123456789.png",
      "mimeType": "image/png",
      "size": 34521
    },
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

## Notes

- File uploads are limited to 10MB each and to types: jpg, jpeg, png, gif, pdf, doc, docx.
  Adjust `middleware/upload.js` (`fileFilter`, `limits`) as needed.
- Uploaded files are served statically at `http://localhost:5000/uploads/<fileName>`.
- On update, if a new file is uploaded for a field, the old file is deleted from disk.
- On delete, all associated files are removed from disk.
- CORS is open (`cors()`); restrict it in `server.js` for production.
