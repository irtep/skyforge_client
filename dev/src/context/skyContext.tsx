import React, { createContext, useState } from 'react';
import { Socket } from 'socket.io-client';
import { ButtonItem, Trigger, Widths } from '../App';

export const SkyContext: React.Context<any> = createContext(undefined);

interface Props {
    children: React.ReactNode;
};

interface CharacterStats {
    name: string;
    hits: any;
};

interface HitCalculator {
    show: boolean;
    output: string;
    characterStats: CharacterStats[]
};

export const SkyProvider: React.FC<Props> = (props: Props): React.ReactElement => {
    const [messages, setMessages] = useState<string[]>([]);
    const [command, setCommand] = useState<string>('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const [showProts, setShowProts] = useState<boolean>(false);
    const [showButtons, setShowButtons] = useState<boolean>(false);
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [links, setLinks] = useState<boolean>(false);
    const [partyProts, setPartyProts] = useState<string>('');
    const [triggers, setTriggers] = useState<Trigger[]>([]);
    const [fontSize, setFontSize] = useState(12);
    const [savedButtons, setSavedButtons] = useState<ButtonItem[]>([]);
    const [widths, setWidths] = useState<Widths>({
      mudScreen: 8,
      sideBar: 4
    });
    const [hitCalculator, setHitCalculator] = useState<HitCalculator>({
        show: false,
        output: '',
        characterStats: [
            {
                name: 'You',
                hits: {}
            }
        ]
    });
    
    return (
        <SkyContext.Provider value={{
            
            messages, setMessages,
            command, setCommand,
            socket, setSocket,
            showProts, setShowProts,
            showButtons, setShowButtons,
            showSettings, setShowSettings,
            partyProts, setPartyProts,
            triggers, setTriggers,
            fontSize, setFontSize,
            savedButtons, setSavedButtons,
            widths, setWidths,
            hitCalculator, setHitCalculator,
            links, setLinks
        }}>
            {props.children}
        </SkyContext.Provider>
    );
}