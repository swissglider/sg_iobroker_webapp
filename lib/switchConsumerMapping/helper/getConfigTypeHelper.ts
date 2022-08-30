const getConfigTypeHelper = (mappingFn: string): string => {
    return mappingFn === 'Wandschalter'
        ? 'wandschalterConfig'
        : mappingFn === 'Mobilerschalter'
        ? 'mobilerschalterConfig'
        : mappingFn === 'Lichtschalter'
        ? 'lichtschalterConfig'
        : '';
};

export default getConfigTypeHelper;
