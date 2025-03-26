import { writeFileSync } from 'fs';

const targetPath = './src/environments/environment.prod.ts';
const env = process.env;

const envConfig = `export const environment = {
    production: true,
    api: '${env['NG_APP_API']}',
    auth0: {
        domain: '${env['NG_APP_AUTH0_DOMAIN']}',
        clientId: '${env['NG_APP_AUTH0_CLIENT_ID']}',
        audience: '${env['NG_APP_AUTH0_AUDIENCE']}'
    }
};`;

writeFileSync(targetPath, envConfig);