import {Connection} from 'stardog';

export const connection = new Connection({
  username: 'admin',
  password: 'admin',
  endpoint: 'http://localhost:5820',
});

export const database = 'hto';

export const mimeType = 'application/sparql-results+json';
