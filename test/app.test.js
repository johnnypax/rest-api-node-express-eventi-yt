// test/app.test.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // Stai attento, il file `app.js` deve esportare `app` ;)
const { expect } = chai;

chai.use(chaiHttp);

describe("Event Management API", () => {
    
    // Test per l'endpoint GET /events
    describe("GET /events", () => {
        it("Dovrebbe recuperare tutti gli eventi", (done) => {
            chai.request(app)
                .get("/events")
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equal("SUCCESS");
                    expect(res.body.data).to.be.an("array");
                    done();
                });
        });
    });

    // Test per l'endpoint GET /events/:cod
    describe("GET /events/:cod", () => {
        it("Dovrebbe recuperare un evento specifico", (done) => {
            const codice = "evto1";
            chai.request(app)
                .get(`/events/${codice}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equal("SUCCESS");
                    expect(res.body.data.codice).to.equal(codice);
                    done();
                });
        });

        it("Dovrebbe restituire un errore se l'evento non esiste", (done) => {
            chai.request(app)
                .get("/events/nonEsistente")
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body.status).to.equal("ERROR");
                    expect(res.body.data).to.equal("Oggetto non trovato");
                    done();
                });
        });
    });

    // Test per l'endpoint POST /events
    describe("POST /events", () => {
        it("Dovrebbe creare un nuovo evento", (done) => {
            const nuovoEvento = {
                nome: "Nuovo Evento",
                descrizione: "Descrizione evento",
                data: "01/01/2025",
                location: "Test Location",
                partecipanti: 10
            };
            chai.request(app)
                .post("/events")
                .send(nuovoEvento)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equal("SUCCESS");
                    expect(res.body.data).to.include(nuovoEvento);
                    done();
                });
        });
    });

    // Test per l'endpoint DELETE /events/:cod
    describe("DELETE /events/:cod", () => {
        it("Dovrebbe eliminare un evento esistente", (done) => {
            const codice = "evto1";
            chai.request(app)
                .delete(`/events/${codice}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equal("SUCCESS");
                    done();
                });
        });

        it("Dovrebbe restituire un errore se l'evento da eliminare non esiste", (done) => {
            chai.request(app)
                .delete("/events/nonEsistente")
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body.status).to.equal("ERROR");
                    expect(res.body.data).to.equal("Oggetto non trovato");
                    done();
                });
        });
    });

    // Test per l'endpoint GET /events/:cod/:tipo
    describe("GET /events/:cod/:tipo", () => {
        it("Dovrebbe incrementare i partecipanti", (done) => {
            const codice = "evto1";
            chai.request(app)
                .get(`/events/${codice}/INC`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equal("SUCCESS");
                    done();
                });
        });

        it("Dovrebbe decrementare i partecipanti", (done) => {
            const codice = "evto2";
            chai.request(app)
                .get(`/events/${codice}/DEC`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.status).to.equal("SUCCESS");
                    done();
                });
        });

        it("Dovrebbe restituire un errore se il comando non è riconosciuto", (done) => {
            const codice = "evto1";
            chai.request(app)
                .get(`/events/${codice}/UNKNOWN`)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.status).to.equal("ERROR");
                    expect(res.body.data).to.equal("COMANDO NON RICONOSCIUTO");
                    done();
                });
        });
    });
});
