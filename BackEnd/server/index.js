const express = require('express')
const cors = require('cors')
const http  = require('http')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin')
const serviceAccount = require("../secrets/cscc01-79d1d-firebase-adminsdk-fbsvc-e140a87629.json")


const app = express();

const server = http.createServer(app);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const port = 3000;

app.use(express.json());

app.use(cors({ origin: '*' }));

// Create upload folder if not exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer config for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Firebase token check middleware
app.use((req, res, next) => {
  switch (req.url) {
    case "/SignUpInit":
    case "/api/verify":
      next(); // Skip token check for public endpoints
      break;
    default:
      admin.auth().verifyIdToken(req.body.token, true)
        .then((result) => {
          req.body.uid = result.uid;
          next();
        })
        .catch((error) => {
          console.error("Token verification failed:", error.message);
          next(new Error('Token Error'));
        });
      break;
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Server Error');
});

app.post('./TokenCheck', (req, res) => {
    res.send({ success: true })
})

app.post('/SignUpInit', (req, res) => {
        admin.auth().createUser({
            email: req.body.email,
            emailVerified: false,
            password: req.body.password,
            disabled: false,
        })
        // .then((response) => {
        //     return db.collection('UserData').doc(response.uid).set({
        //         Email: req.body.Email,
        //         Username: req.body.Username,
        //         Friends: [],
        //         FriendRequests: [],
        //     })
        // })
        .then(() => {
            res.send({ success: true });
        }).catch((error) => {
            res.send({ success: false, error: error });
        });
    });

// File upload route (Club verification)
app.post('/api/verify', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  console.log('✅ Uploaded file:', req.file.filename);
  res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
});

server.listen(port, () => {
    console.log(`listening on port:${port}`);
});