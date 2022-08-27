import { NextApiRequest, NextApiResponse } from 'next';

const getAllShellies_GET = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        // Process a GET request
        // const _NODERED_URL = NODERED_URL;
        const _NODERED_URL = 'http://192.168.90.10:1880/nodeRed-sg/0/';

        const data = await fetch(`${_NODERED_URL}shelly/getShellies`);

        if (!data) {
            res.status(404).json({ errorMSG: 'nothing found' });
            return;
        }

        const test = await data.json();

        res.status(200).json(test);
    } else {
        // Handle any other HTTP method
        res.status(403).json({ errorMSG: 'only GET Method allowed here' });
    }
};

export default getAllShellies_GET;
