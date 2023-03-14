import { Client } from 'pg';

let client: Client;

// this function is not testable!
export async function connect({ user, host, database, password, port }) {
  const c = new Client({ user, host, database, password, port });
  console.log('pg client created');
  c.connect(function (err) {
    if (err) throw err;
    console.log('pg client connected');
    client = c;
  });
}

export default function db(): Client {
  if (!client) {
    throw new Error('you have to connect before calling this function');
  }
  return client;
}
