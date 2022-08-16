import type { NextApiRequest, NextApiResponse } from 'next';

const standardCall = async (req: NextApiRequest, res: NextApiResponse) => {
    // const _NODERED_URL = NODERED_URL;
    const _NODERED_URL = 'http://192.168.90.10:1880/nodeRed-sg/0/';
    if (req.method === 'GET') {
        res.status(403).json('Get is not allowed');
    }
    if (req.method === 'POST') {
        const data = req.body.data;
        const url = req.body.url;
        console.log(data);
        if (!url) {
            res.status(400).json({ errorMSG: 'url musst be set' });
            return;
        }
        if (!data) {
            res.status(400).json({ errorMSG: 'config must be set' });
            return;
        }

        try {
            const response = await fetch(_NODERED_URL + url, {
                method: 'POST',
                body: JSON.stringify(data),
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

export default standardCall;
