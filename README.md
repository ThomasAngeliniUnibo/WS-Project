# Health Track Ontology

## Setup

- Effettuare il deployment locale di un'istanza di Stardog, utilizzando per esempio un'[immagine Docker](https://hub.docker.com/r/stardog/stardog).

- Aprire [Stardog Studio](http://stardog.studio);
- collegarsi all'istanza di stardog locale e creare un database `hto`;
- importare l'ontologia `hto.ttl` e i namespaces dallo stesso file;
- importare le ontologie esterne presenti nella cartella `import`;
- lanciare le due query di inserimento presenti nella cartella `query`;
- aprire un terminale e lanciare i seguenti comandi:

```bash
$ npm install
$ npm start
```
