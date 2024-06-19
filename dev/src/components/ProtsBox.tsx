import { Container } from '@mui/material';
import React, { useContext } from 'react';
import { SkyContext } from '../context/skyContext';

const ProtsBox: React.FC = () => {

    const { partyProts} = useContext(SkyContext);

    return (
        <Container>

            {partyProts}

        </Container>
    );
};

export default ProtsBox;