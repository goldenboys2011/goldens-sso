import jsonFile from 'jsonfile';
import { createSession } from './createSession.js';

export async function createUser(username, password) {
    try {
        let data = await jsonFile.readFile('users/latest.json');
        
        let id = data.id + 1;
        await jsonFile.writeFile('users/latest.json', { id });

        const sessionResponse = await createSession(id);

        if (!sessionResponse.success) {
            throw new Error(`Failed to create session: ${sessionResponse.error}`);
        }
        
        const sessionKey = sessionResponse.sessionKey;

        await jsonFile.writeFile(`users/${username}.json`, {
            id,
            username,
            password, // Store encrypted password in production!
            sessionKey
        });

        return {
            success: true,
            userId: id,
            username, // Fixed typo
            encryptedPassword: password,
            sessionKey
        };
    } catch (err) {
        return { success: false, error: err.message };
    }
}
