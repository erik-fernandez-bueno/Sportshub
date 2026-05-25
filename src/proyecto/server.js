const express = require('express');
const admin = require("firebase-admin");
const cors = require('cors');
const nodemailer = require("nodemailer");

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-user-email']
}));
app.use(express.json());

const serviceAccount = require("./Novaclaveprivada.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sporthubefi@gmail.com",
    pass: "dcwf bmdt rtiw jllo"
  }
});

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
    const { email, password } = req.body;
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
  try {
    const dadesRaw = req.body;
    const dadesNetes = JSON.parse(JSON.stringify(dadesRaw));

    console.log("Dades netes que intentem guardar:", dadesNetes);

    if (!dadesNetes.email) {
      return res.status(400).send("Falta l'email per identificar el document");
    }

    const userRef = db.collection('usuaris').doc(dadesNetes.email);
    await userRef.set(dadesNetes, { merge: true });

    res.json({ missatge: "Perfil actualitzat" });
  } catch (error) {
    console.error("error al servidor: ", error);
    res.status(500).send(error.message);
  }
});

// sendemail
app.post('/api/enviar-email', async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    const htmlcorreo = `<!DOCTYPE html><html lang="ca"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Modificar Contrasenya</title><style>*{margin:0;padding:0;box-sizing:border-box}body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f0f4ff;font-family:sans-serif}.card{background:#fff;border-radius:16px;padding:48px 40px;text-align:center;max-width:380px;width:90%;box-shadow:0 4px 24px rgba(0,80,255,.08)}h1{font-size:1.6rem;color:#0a3880;margin-bottom:12px}p{color:#6b82b0;font-size:.95rem;margin-bottom:32px}.btn{display:inline-block;background:#1a5fe0;color:#fff !important;text-decoration:none;padding:14px 28px;border-radius:10px;font-size:1rem;font-weight:600;transition:background .2s}.btn:hover{background:#0a3880}</style></head><body><div class="card"><h1>Modificar Contrasenya</h1><p>Fes clic per canviar la teva contrasenya.</p><a href="http://localhost:4200/nuevacontrasenya?email=${encodeURIComponent(email)}" class="btn">Clica aquí per canviar la contrasenya</a></div></body></html>`
    const verificorreu = `<!DOCTYPE html><html lang="ca"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/><title>Codi Validació</title><style>*{margin:0;padding:0;box-sizing:border-box}body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f0f4ff;font-family:sans-serif}.card{background:#fff;border-radius:16px;padding:48px 40px;text-align:center;max-width:380px;width:90%;box-shadow:0 4px 24px rgba(0,80,255,.08)}h1{font-size:1.6rem;color:#0a3880;margin-bottom:12px}p{color:#6b82b0;font-size:.95rem;margin-bottom:32px}.message{color:#1a5fe0;font-size:2.5rem;font-weight:500}</style></head><body><div class="card"><h1>Codi Validació</h1><span class="message">${message}</span></div></body></html>`
    const mailOptions = {
      from: "sporthubefi@gmail.com",
      to: email,
      subject: subject,
      ...(message !== "" ? { html: verificorreu } : { html: htmlcorreo })
    }

    await transporter.sendMail(mailOptions);
    res.json({ missatge: "Email enviat correctament" });
  } catch (error) {
    console.error("Error enviant email:", error);
    res.status(500).send("Error enviant email");
  }
});

// check-email
app.get('/api/check-email', async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).send("Falta l'email");
    }
    const doc = await db.collection('usuaris').doc(email).get();
    res.json(doc.exists);
  } catch (error) {
    console.error("Error al comprovar email:", error);
    res.status(500).send("Error al servidor");
  }
});

const fs = require('fs');
const path = require('path');

app.post('/api/review', (req, res) => {
  try {
    const { email, review } = req.body;
    if (!review) {
      return res.status(400).send("La review no pot estar buida");
    }

    const reviewsDir = path.join(__dirname, 'reviews');
    if (!fs.existsSync(reviewsDir)) {
      fs.mkdirSync(reviewsDir);
    }

    const timestamp = new Date().getTime();
    const userClean = (email || 'anonim').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const fileName = `review_${userClean}_${timestamp}.txt`;
    const filePath = path.join(reviewsDir, fileName);

    const reviewData = `Data: ${new Date().toISOString()}\nUsuari: ${email || 'Anònim'}\nReview: ${review}\n`;

    fs.writeFileSync(filePath, reviewData, 'utf8');
    console.log(`Review guardada al fitxer: ${fileName}`);
    res.json({ missatge: "Review guardada correctament", fitxer: fileName });
  } catch (error) {
    console.error("Error al guardar la review:", error);
    res.status(500).send("Error al servidor en guardar la review");
  }
});

// cesta - obtener
app.get('/api/cesta/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const doc = await db.collection('usuaris').doc(email).get();

    if (!doc.exists) return res.status(404).send("Usuari no trobat");

    const cesta = doc.data().cesta ?? [];
    res.json(cesta);
  } catch (error) {
    console.error("Error obtenint cesta:", error);
    res.status(500).send("Error al servidor");
  }
});

// cesta - guardar/actualizar
app.put('/api/cesta/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { cesta } = req.body;

    if (!email) return res.status(400).send("Falta l'email");

    await db.collection('usuaris').doc(email).set({ cesta }, { merge: true });

    res.json({ missatge: "Cesta actualitzada correctament" });
  } catch (error) {
    console.error("Error actualitzant cesta:", error);
    res.status(500).send("Error al servidor");
  }
});

const { crearConfigBaseDades } = require("../app/db.config.js");
const dbp = crearConfigBaseDades();
const { getmodelProductes } = require("./models/productes.js");
const { getmodelaFactura } = require("./models/factura.js");
const { getmodetallsfactura } = require("./models/detallfactura.js");
const Producte = getmodelProductes(dbp);
const Factura = getmodelaFactura(dbp);
const DetallFactura = getmodetallsfactura(dbp);

dbp.sync().then(() => {
  console.log("DB sincronitzada correctament");
});

// productes
app.get('/api/productes', async (req, res) => {
  try {
    const where = {};
    if (req.query.sexe) {
      where.sexe = req.query.sexe;
    }
    const productes = await Producte.findAll({ where });
    res.json(productes);
  } catch (error) {
    console.error("Error obtenint productes:", error);
    res.status(500).send("Error obtenint productes");
  }
});

app.get('/api/productes/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const producte = await Producte.findOne({
      where: { id_productes: id }
    });

    if (!producte) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(producte);

  } catch (error) {
    console.error("Error obtenint producte per id:", error);
    res.status(500).send("Error servidor");
  }
});

// comprar - guardar factura i detalls
app.post('/api/comprar', async (req, res) => {
  try {
    const { email, cart } = req.body;

    if (!email || !cart || cart.length === 0) {
      return res.status(400).send("Falten dades de la compra");
    }

    // Obtenir el proper id de factura (max + 1)
    const ultimaFactura = await Factura.findOne({
      order: [['id_factures', 'DESC']]
    });
    const nouId = ultimaFactura ? ultimaFactura.id_factures + 1 : 1;

    // Crear la factura
    await Factura.create({
      id_factures: nouId,
      usuariemail: email,
      data: new Date().toISOString().split('T')[0]
    });

    // Crear els detalls de la factura (un per producte)
    const detalls = cart.map(item => ({
      id_fact: nouId,
      id_prod: item.id,
      quantity: item.quantity ?? 1,
      size: item.selectedSize
    }));
    await DetallFactura.bulkCreate(detalls);

    res.json({ missatge: "Compra realitzada correctament", id_factura: nouId });
  } catch (error) {
    console.error("Error al processar la compra:", error);
    res.status(500).send("Error al processar la compra");
  }
});

Factura.hasMany(DetallFactura, { foreignKey: 'id_fact', as: 'detallfactures' });
DetallFactura.belongsTo(Factura, { foreignKey: 'id_fact' });

DetallFactura.belongsTo(Producte, { foreignKey: 'id_prod', as: 'producte' });
Producte.hasMany(DetallFactura, { foreignKey: 'id_prod' });

app.get('/api/historial', esAdmin, async (req, res) => {
  try {
    const historial = await Factura.findAll({
      include: [{
        model: DetallFactura,
        as: 'detallfactures',
        include: [{
          model: Producte,
          as: 'producte'
        }]
      }],
      order: [['data', 'DESC']]
    });
    res.json(historial);
  } catch (error) {
    console.error("Error al carregar historial:", error);
    res.status(500).send("Error al servidor");
  }
});

async function esAdmin(req, res, next) {
  const email = req.headers['x-user-email'];
  if (!email) return res.status(403).send("Accés denegat");

  const doc = await db.collection('usuaris').doc(email).get();
  if (doc.exists && doc.data().admin === true) {
    next();
  } else {
    res.status(403).send("No tens permisos d'administrador");
  }
}

app.listen(3000, () => console.log('Servidor corrent a http://localhost:3000'));
