import jsonFile from 'jsonfile'; // For managing the "Database"
import crypto from 'crypto';  // For generating session keys
import moment from 'moment'; // For making the expireDates

export async function createSession(userId) {
    try{
        const sessionKey = crypto.randomBytes(32).toString('hex');
        const expireTimestamp = moment().add(10, 'days').unix(); // 10 days from now

        await jsonFile.writeFile('sessions/activeSessions.json', { sessionKey, expireTimestamp });
        await jsonFile.writeFile('sessions/sessionUser.json', { sessionKey, userId });
        return {
            success: true,
            sessionKey,
            expireDate: expireTimestamp,
            userId
        }
    }catch (err) {
        return { success: false, error: err.message };
    }

}