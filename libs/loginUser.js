import jsonFile from 'jsonfile'; // For managing the "Database"
import { createSession } from './createSession.js';

export async function loginUser(username, password){
    let userData = await jsonFile.readFile(`users/${username}.json`);
    if (userData.password == password){
        const sessionResponse = await createSession(userData.id);

        if (!sessionResponse.success) {
            throw new Error(`Failed to create session: ${sessionResponse.error}`);
        }
        
        const sessionKey = sessionResponse.sessionKey;
        return {
            succes: true,
            sessionKey: sessionKey
        }
    }
}