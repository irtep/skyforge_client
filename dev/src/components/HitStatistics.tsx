import { Button, Container, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { SkyContext } from '../context/skyContext';
import { CharacterStats } from '../App';

const HitStatistics: React.FC = () => {

    const {
        hitCalculator,
        setHitCalculator
    } = useContext(SkyContext);

    return (
        <Container sx={{
            background: "linear-gradient(darkRed, darkRed, red)", 
            padding: 1,
            borderRadius: 5,
            margin: 1
            }}>

            <Typography sx={{color: "orange"}}>hits:</Typography>
            
            {hitCalculator.characterStats.map((char: CharacterStats) => {
                const hits = char.hits || {};
                return (
                    <Container key={char.name}>
                        {/*
                        <Typography variant="h6">
                            {char.name}
                        </Typography>
                        */}
                        <div>
                            {Object.entries(hits)
                                .sort(([hitTypeA], [hitTypeB]) => {
                                    // Extract numbers from the hit types
                                    const numA = parseInt(hitTypeA.match(/\d+/)?.[0] || '0', 10);
                                    const numB = parseInt(hitTypeB.match(/\d+/)?.[0] || '0', 10);

                                    // If numbers are equal, sort lexicographically
                                    if (numA === numB) {
                                        return hitTypeA.localeCompare(hitTypeB);
                                    }

                                    // Otherwise, sort numerically
                                    return numA - numB;
                                })
                                .map(([hitType, count]) => (
                                    <Typography key={hitType}>
                                        {`${hitType}: ${count}`}
                                    </Typography>
                                ))}
                        </div>
                        {
                            (hitCalculator.characterStats[0].hits) ?
                                <>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        sx={{ margin: 1, background: "darkRed" }}
                                        onClick={() => {
                                            setHitCalculator({
                                                ...hitCalculator,
                                                characterStats: [
                                                    {
                                                        name: 'You',
                                                        hits: {}
                                                    }
                                                ]
                                            })
                                        }}
                                    > reset stats </Button>
                                </> : <></>
                        }
                    </Container>
                );
            })}
        </Container>
    );
};

export default HitStatistics;