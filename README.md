# Event Management API

Questa API consente di gestire un semplice sistema di eventi, permettendo di creare, recuperare, aggiornare e cancellare eventi.

## Tecnologie utilizzate

- Node.js
- Express.js

## Prerequisiti

- Node.js v14+ (https://nodejs.org/)
- npm v6+ (https://www.npmjs.com/)

## Installazione

1. Clona il repository:

```bash
git clone https://github.com/johnnypax/rest-api-node-express-eventi-yt
```

1. Accedi alla cartella del progetto:
se usi il **clone** il nome della cartella sarà uguale a quello della repository

```bash
cd rest-api-node-express-eventi-yt
```

3. Installa le dipendenze:

```bash
npm install
```

## Avvio del server
Per avviare il server, esegui il seguente comando:

```bash
node app.js
```

Il server sarà attivo su http://127.0.0.1:4000.

## Endpoint disponibili

### 1. Recupera tutti gli eventi

**GET** `/events`

**Risposta**:

```json
{
    "status": "SUCCESS",
    "data": [...]
}
```

### 2. Recupera un evento specifico

**GET** `/events/:cod`

**Parametri**:
- `:cod`: codice dell'evento

**Risposta**:

```json
{
    "status": "SUCCESS",
    "data": { ... }
}
```

In caso di errore:

```json
{
    "status": "ERROR",
    "data": "Oggetto non trovato"
}
```

### 3. Crea un nuovo evento

**POST** `/events`

**Body** (JSON):

```json
{
    "nome": "nome_evento",
    "descrizione": "descrizione_evento",
    "data": "data_evento",
    "location": "luogo_evento",
    "partecipanti": numero_partecipanti
}
```

**Risposta**:

```json
{
    "status": "SUCCESS",
    "data": { ... }
}
```

### 4. Elimina un evento

**DELETE** `/events/:cod`

**Parametri**:
- `:cod`: codice dell'evento

**Risposta**:

```json
{
    "status": "SUCCESS"
}
```

In caso di errore:

```json
{
    "status": "ERROR",
    "data": "Oggetto non trovato"
}
```

### 5. Aggiorna i partecipanti di un evento

**GET** `/events/:cod/:tipo`

**Parametri**:
- `:cod`: codice dell'evento
- `:tipo`: tipo di aggiornamento (`INC` per incrementare, `DEC` per decrementare)

**Risposta**:

Se l'aggiornamento è riuscito:

```json
{
    "status": "SUCCESS"
}
```

Se il comando è errato o ci sono partecipanti insufficienti:

```json
{
    "status": "ERROR",
    "data": "Partecipanti assenti" oppure "COMANDO NON RICONOSCIUTO"
}
```

### 6. Modifica i campi di un evento
**PATCH** `/events/:cod`

Descrizione: Questo endpoint consente di aggiornare uno o più campi di un evento esistente, identificato dal suo codice.

**Parametri**:
- `:cod`: codice dell'evento
- **Body (JSON)**: Puoi includere uno o più dei seguenti campi nel corpo della richiesta:

```json
{
    "nome": "nuovo_nome_evento",
    "descrizione": "nuova_descrizione_evento",
    "data": "nuova_data_evento",
    "location": "nuova_location_evento",
    "partecipanti": nuovo_numero_partecipanti
}
```

## Note

- **Incremento e decremento** dei partecipanti vengono gestiti tramite gli endpoint `/events/:cod/INC` e `/events/:cod/DEC`.
- La gestione dei dati è fatta in memoria e quindi **non è persistente**. Ogni riavvio del server resetta i dati.

## Contribuire

1. Fai un fork del progetto.
2. Crea il tuo branch (`git checkout -b feature/NuovaFeature`).
3. Commit delle tue modifiche (`git commit -m 'Aggiunta NuovaFeature'`).
4. Fai push al branch (`git push origin feature/NuovaFeature`).
5. Apri una pull request.

## Licenza

Questo progetto è rilasciato sotto la licenza MIT.
