import {useEffect, useState} from 'react'
import './App.css'

import {
    ArbitrumOne,
    Aurora,
    Avalanche,
    Base,
    BNBChain,
    BOB,
    Celo,
    Cronos,
    Ethereum,
    Fantom,
    Gnosis,
    Harmony,
    Heco,
    Kava,
    Klaytn,
    Linea,
    Metis,
    Moonbeam,
    Moonriver,
    OasisEmerald,
    OKTC,
    Optimism,
    Polygon,
    PolygonzkEVM,
    zkSyncEra
} from "@particle-network/chains";
import '@particle-network/connectkit/dist/index.css';
import {evmWallets} from '@particle-network/connectors';
import {
    ConnectButton,
    ModalProvider,
    useAccountInfo,
    useConnectId,
    useConnectKit,
    useNetwork,
    useParticleConnect,
    useParticleProvider
} from "@particle-network/connectkit";
import {useEthereum} from '@particle-network/auth-core-modal';
import {PARTICLE_APP_ID, PARTICLE_CLIENT_KEY, PARTICLE_PROJECT_ID, WALLET_CONNECT_APP_ID} from "./env-constants";

const supportChains = [
    Ethereum,
    ArbitrumOne,
    Polygon,
    BNBChain,
    Optimism,
    Base,
    Avalanche,
    Fantom,
    zkSyncEra,
    PolygonzkEVM,
    Linea,
    /*Canto*/
    Gnosis,
    Klaytn,
    Aurora,
    Cronos,
    Celo,
    Moonriver,
    Heco,
    BOB,
    OKTC,
    /*BTTC*/
    Moonbeam,
    /*Fuse*/
    OasisEmerald,
    /*Ontology*/
    Kava,
    Metis,
    /*Pulse*/
    /*Velas*/
    Harmony
];


const InnerComponet = () => {

    const {
        chainInfo,
        switchChain: evmSwitchChain,
        provider: particleProvider,
        sendTransaction
    } = useEthereum();


    const handleAction = async () => {
        await sendTransaction({
            data: "0x0502b1c500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001bc16d674ec80000000000000000000000000000000000000000000000000000000000000010b9830000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000003b8b87c0101640e107c4a72dec79826768c239f1eb48cc85f012a792",
            to: "0x1111111254eeb25477b68fb85ed929f73a960582",
            value: "2000000000000000000",
            // value: "0x0",
            from: "0x0870507ce25d33c5eeeb3c1030149c9749e1b09e",
            chainId: chainInfo.id,
            gasLevel: 'high',
        })
    }

    return (
        <>
            <ConnectButton/>
            <button onClick={handleAction}>Send Test</button>
        </>
    )
}

function App() {


    return (
        <ModalProvider
            options={{
                projectId: PARTICLE_PROJECT_ID,
                clientKey: PARTICLE_CLIENT_KEY,
                appId: PARTICLE_APP_ID,
                chains: supportChains,
                wallet: {    //optional: particle wallet config
                    visible: true, //display wallet button when connect particle success.
                    supportChains: supportChains,
                    customStyle: {}, //optional: custom wallet style
                },
                promptSettingConfig: { //optional: particle security account config
                    //prompt set payment password. 0: None, 1: Once(default), 2: Always
                    promptPaymentPasswordSettingWhenSign: 1,
                    //prompt set master password. 0: None(default), 1: Once, 2: Always
                    promptMasterPasswordSettingWhenLogin: 1
                },
                connectors: evmWallets({
                    projectId: WALLET_CONNECT_APP_ID,
                    showQrModal: false
                }),
            }}
            theme={'dark'}
            language={'en'}   //optional:localize, default en
            walletSort={['Particle Auth', 'Wallet']} //optional:wallet order
        >
            <InnerComponet/>
        </ModalProvider>
    )
}

export default App
