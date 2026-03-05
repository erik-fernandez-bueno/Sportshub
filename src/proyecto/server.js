const express = require('express');
const admin = require("firebase-admin");
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const serviceAccount = require("./clauprivadafirebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.get('/api/test', (req, res) => {
  res.send("El servidor respon correctament!");
});

// register
app.post('/api/register', async (req, res) => {
  try {
    const usuari = req.body;
    console.log("Intent de registre per a:", usuari.email);

    if (!usuari.email || !usuari.password) {
      return res.status(400).send("Email i password són obligatoris");
    }

    await db.collection('usuaris').doc(usuari.email).set(usuari);

    console.log("Usuari guardat correctament a Firebase amb email:", usuari.email);
    res.status(201).json({ missatge: "Usuari creat correctament" });
  } catch (error) {
    console.error("Error al registre:", error);
    res.status(500).send("Error al servidor");
  }
});

// login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body; // Canviem 'nom' per 'email'
    console.log("Intent de login per:", email);

    const doc = await db.collection('usuaris').doc(email).get();

    if (!doc.exists) {
      return res.status(401).send("L'email no està registrat");
    }

    const dadesUsuari = doc.data();
    if (dadesUsuari.password === password) {
      res.json(dadesUsuari);
    } else {
      res.status(401).send("Contrasenya incorrecta");
    }
  } catch (error) {
    res.status(500).send("Error al login");
  }
});

// perfil
app.put('/api/perfil', async (req, res) => {
  const { email, ...updates } = req.body;
  await db.collection('users').doc(email).update(updates);
  res.send({ message: "Perfil actualitzat" });
});

app.listen(3000, () => console.log('Servidor corrent a http://localhost:3000'));
