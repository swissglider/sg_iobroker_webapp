import type { NextApiRequest, NextApiResponse } from 'next';

const getMobilerSchalterConfiguration = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await fetch(`http://localhost:1880/nodeRed-sg/0/mobilerschalterLampeMapper/getConfigList`);

    if (!data) {
        res.status(404).json({ errorMSG: 'nothing found' });
        return;
    }

    const { lampenList, mobilerschalterList, configList } = await data.json();

    // const configurationList = configList.map((conf: any) => ({
    const configurationList = [].map((conf: any) => ({
        mobilerschalterString: `${
            mobilerschalterList.hasOwnProperty(conf.mobilerSchalterChannelID)
                ? mobilerschalterList[conf.mobilerSchalterChannelID].name
                : conf.mobilerSchalterChannelID
        } [${conf.style}]`,
        lampenString: `${
            lampenList.hasOwnProperty(conf.selectedLampeID)
                ? lampenList[conf.selectedLampeID].name
                : conf.selectedLampeID
        }${
            conf.selectedSceneID
                ? lampenList[conf.selectedLampeID]?.scenes.some((e: any) => e.id === conf.selectedSceneID)
                    ? ' [' +
                      lampenList[conf.selectedLampeID].scenes.find((e: any) => e.id === conf.selectedSceneID).name +
                      ']'
                    : ' [' + conf.selectedSceneID + ']'
                : ''
        }`,
        error:
            !(
                mobilerschalterList.hasOwnProperty(conf.mobilerSchalterChannelID) &&
                mobilerschalterList[conf.mobilerSchalterChannelID].availableStyles.some(
                    (e: string) => e === conf.style,
                ) &&
                lampenList.hasOwnProperty(conf.selectedLampeID)
            ) ||
            (conf.selectedSceneID !== undefined &&
                !lampenList[conf.selectedLampeID].scenes.some((e: any) => e.id === conf.selectedSceneID)),
        config: conf,
    }));

    // console.log(configurationList);
    res.status(200).json({ lampenList, mobilerschalterList, configList, configurationList });
    if (req.method === 'POST') {
        console.log(req.body);
        // Process a POST request
    } else {
        // Handle any other HTTP method
    }
};

export default getMobilerSchalterConfiguration;
