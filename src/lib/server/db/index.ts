import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

// if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
import { createClient } from '@libsql/client';

const client = createClient({ url: env.DB_FILE_NAME! });
export const db = drizzle(client, { schema });
