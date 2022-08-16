import type { NextApiRequest, NextApiResponse } from 'next';
import { NODERED_URL } from './Config';

const nodeRedStandardCall = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        res.status(403).json('Get is not allowed');
    }
    if (req.method === 'POST') {
        const configuration = req.body.config;
        const url = req.body.url;
        if (!url) {
            res.status(400).json({ errorMSG: 'url musst be set' });
            return;
        }
        if (!configuration) {
            res.status(400).json({ errorMSG: 'config must be set' });
            return;
        }

        try {
            const response = await fetch(NODERED_URL + url, {
                method: 'POST',
                body: JSON.stringify(configuration),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const t = await response.text();
            res.status(response.status).send(t);
        } catch (error) {
            res.status(400).json({ errorMSG: error });
            return;
        }
    }
};

export default nodeRedStandardCall;
