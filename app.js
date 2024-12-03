// Importa i pacchetti
const express = require("express");
const cors = require("cors");

// Avvia l'applicazione
const app = express();
app.use(cors()); // Configura CORS con allow all
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configura l'accesso
const host = "127.0.0.1";
const port = 4000;

// Database Mock
let eventi = [
    {
        "codice": "evto1",
        "nome": "viva",
        "descrizione": "evento per la vita",
        "data": "26/04/2024",
        "location": "lanciano hall",
        "partecipanti": 0
    },
    {
        "codice": "evto2",
        "nome": "festa san giovanni",
        "descrizione": "evento per san giovanni",
        "data": "24/06/2024",
        "location": "cruz das almas",
        "partecipanti": 3
    }
];

// Avvia il server
app.listen(port, host, () => {
    console.log(`Server in ascolto su ${host}:${port}`);
});

// Endpoints

// Recupera tutti gli eventi
app.get("/events", (req, res) => {
    res.json({ status: "SUCCESS", data: eventi });
});

// Recupera un evento specifico
app.get("/events/:cod", (req, res) => {
    const evento = eventi.find(e => e.codice === req.params.cod);
    if (evento) {
        res.json({ status: "SUCCESS", data: evento });
    } else {
        res.status(404).json({ status: "ERROR", data: "Oggetto non trovato" });
    }
});

// Crea un nuovo evento
app.post("/events", (req, res) => {
    const nuovoEvento = {
        "codice": `evto${eventi.length + 1}`,
        "nome": req.body.nome,
        "descrizione": req.body.descrizione,
        "data": req.body.data,
        "location": req.body.location,
        "partecipanti": req.body.partecipanti || 0
    };
    eventi.push(nuovoEvento);
    res.json({ status: "SUCCESS", data: nuovoEvento });
});

// Elimina un evento
app.delete("/events/:cod", (req, res) => {
    const indice = eventi.findIndex(e => e.codice === req.params.cod);
    if (indice !== -1) {
        eventi.splice(indice, 1);
        res.json({ status: "SUCCESS" });
    } else {
        res.status(404).json({ status: "ERROR", data: "Oggetto non trovato" });
    }
});

// Modifica i campi di un evento
app.patch("/events/:cod", (req, res) => {
    const evento = eventi.find(e => e.codice === req.params.cod);

    if (!evento) {
        return res.status(404).json({ status: "ERROR", data: "Oggetto non trovato" });
    }

    const { nome, descrizione, data, location, partecipanti } = req.body;

    if (nome !== undefined) evento.nome = nome;
    if (descrizione !== undefined) evento.descrizione = descrizione;
    if (data !== undefined) evento.data = data;
    if (location !== undefined) evento.location = location;
    if (partecipanti !== undefined) evento.partecipanti = partecipanti;

    res.json({ status: "SUCCESS", data: evento });
});

// Aggiorna i partecipanti di un evento
app.get("/events/:cod/:tipo", (req, res) => {
    const evento = eventi.find(e => e.codice === req.params.cod);

    if (!evento) {
        return res.status(404).json({ status: "ERROR", data: "Oggetto non trovato" });
    }

    switch (req.params.tipo) {
        case "INC":
            evento.partecipanti++;
            res.json({ status: "SUCCESS" });
            break;
        case "DEC":
            if (evento.partecipanti > 0) {
                evento.partecipanti--;
                res.json({ status: "SUCCESS" });
            } else {
                res.status(400).json({ status: "ERROR", data: "Partecipanti assenti" });
            }
            break;
        default:
            res.status(400).json({ status: "ERROR", data: "COMANDO NON RICONOSCIUTO" });
            break;
    }
});

module.exports = app;   //Serve per Mocha
