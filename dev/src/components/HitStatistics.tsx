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
        <>
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
                                .sort(([hitTypeA], [hitTypeB]) => hitTypeA.localeCompare(hitTypeB))
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
        </>
    );
};

export default HitStatistics;