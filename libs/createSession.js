import jsonFile from 'jsonfile'; // For managing the "Database"
import crypto from 'crypto';  // For generating session keys
import moment from 'moment'; // For making the expireDates

export async function createSession(userId) {
    try{
        const sessionKey = crypto.randomBytes(32).toString('hex');
        const expireTimestamp = moment().add(10, 'days').unix(); // 10 days from now
        const currentTimestamp = moment().unix();

        // Update activeSessions
        const activeSessions = await jsonFile.readFile('sessions/activeSessions.json');
        activeSessions.push({ sessionKey, expireTimestamp });
        const validSessions = activeSessions.filter(session => session.expireTimestamp > currentTimestamp);
        await jsonFile.writeFile('sessions/activeSessions.json', validSessions);

        // Update session => User
        const sessionUser = await jsonFile.readFile('sessions/sessionUser.json');
        sessionUser.push({ sessionKey, userId});
        await jsonFile.writeFile('sessions/sessionUser.json', sessionUser);


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