import { Container, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { SkyContext } from '../context/skyContext';
import { Prot } from '../data/prots';
import { ActiveProts } from '../App';

const ProtsBox: React.FC = () => {

    const { activeProts, protStopMsg } = useContext(SkyContext);

    return (
        <Container sx={{
            background: "linear-gradient(navy, darkBlue, blue)", 
            padding: 1,
            borderRadius: 5,
            margin: 1
            }}>
        
            <Typography sx={{color: "cyan"}}>Protections:</Typography>

            {
                activeProts.map((prot: ActiveProts, i: number) => {
                    return (
                        <Typography key={`aPro ${i}`} sx={{color: "gold"}}>
                            {prot.prot.name}
                            {
                                (prot.target !== '') ? <>({prot.target})</> : <></>
                            }

                        </Typography>
                    )
                })
            }
            <Typography sx={{color: "orange"}}>
                {protStopMsg}
            </Typography>

        </Container>
    );
};

export default ProtsBox;