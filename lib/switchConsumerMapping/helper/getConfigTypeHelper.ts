const getConfigTypeHelper = (mappingFn: string): string => {
    return mappingFn === 'Wandschalter'
        ? 'wandschalterConfig'
        : mappingFn === 'Mobilerschalter'
        ? 'mobilerschalterConfig'
        : '';
};

export default getConfigTypeHelper;
