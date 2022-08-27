import { Flex } from '@chakra-ui/react';
import { useGetColor } from '../hooks/getColors';

const SimpleContainerWithColor = ({ children, withoutContainer }: any) => {
    const boxBG = useGetColor('gray.100');
    return (
        <>
            {!withoutContainer ? (
                <Flex
                    direction={'column'}
                    marginX={5}
                    marginTop={2}
                    background={boxBG}
                    p={1}
                    paddingX={3}
                    rounded={15}
                    paddingBottom={4}
                >
                    {children}
                </Flex>
            ) : (
                <>{children}</>
            )}
        </>
    );
};

export default SimpleContainerWithColor;
