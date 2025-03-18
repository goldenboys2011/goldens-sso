import {createUser} from './libs/createUser.js'

import 'dotenv/config';
import express from 'express';
import { loginUser } from './libs/loginUser.js';
const app = express();

app.use(express.json());



app.get('/', (req, res) => {
  res.send('SSO Server is running!');
});

app.post('/create-user', async (req, res) => {
    try {
        const result = await createUser('test2', '123Test'); 
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
})

app.get('/create-user', (req, res) => {
    res.send('Usage: POST /create-user body: {username, password}');
})

app.post('/loginUser', (req, res) => {
  loginUser('test2', '123Test')
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
