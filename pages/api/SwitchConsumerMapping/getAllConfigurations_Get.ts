import { NextApiRequest, NextApiResponse } from 'next';
import getSelectAddList from '../../../lib/switchConsumerMapping/generators/SelectAddList_Generator';

const getAllConfigurations_GET = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        // Process a GET request
        // const _NODERED_URL = NODERED_URL;
        const _NODERED_URL = 'http://192.168.90.10:1880/nodeRed-sg/0/';
        const { mappingFn } = req.query;
        const mappingFn_Str = typeof mappingFn === 'string' ? mappingFn : mappingFn?.toString();

        const data = await fetch(`${_NODERED_URL}SwitchConsumerMapping/getAllConfigurations`);

        if (!data) {
            res.status(404).json({ errorMSG: 'nothing found' });
            return;
        }

        const { ConfigFunctions, switchURL, mappings } = await data.json();

        if (
            mappingFn_Str &&
            ConfigFunctions.some(
                (e: any) => e.ConfigFunctionName.toLocaleLowerCase() === (mappingFn_Str + 'Config').toLocaleLowerCase(),
            )
        ) {
            const mappingFns: Record<string, Record<string, any>> = ConfigFunctions.find(
                (e: any) => e.ConfigFunctionName.toLocaleLowerCase() === (mappingFn_Str + 'Config').toLocaleLowerCase(),
            );
            if (mappingFns) {
                res.status(200).json({
                    switchesList: mappingFns.switchesList,
                    consumersList: mappingFns.consumersList,
                    switchURL,
                    mappings,
                    selectAddList: getSelectAddList({ mappingFns, mappingFn_Str, mappings }),
                });
                return;
            }
        }

        res.status(200).json({});
    } else {
        // Handle any other HTTP method
        res.status(403).json({ errorMSG: 'only GET Method allowed here' });
    }
};

export default getAllConfigurations_GET;
