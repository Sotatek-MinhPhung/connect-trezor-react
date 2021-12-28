import TrezorConnect from "trezor-connect";
import {useState} from "react";

const defaultStellarPath = "m/44'/148'/0'";

const App = () => {
    const [address, setAddress] = useState('');

    const connect = async (path) => {
        // old config, can set any value to email and appUrl
        TrezorConnect.manifest({
            email: 'my_email@example.com',
            appUrl: 'http://localhost:3000',
        });
        try {
            const response = await TrezorConnect.stellarGetAddress({
                path: path || defaultStellarPath,
            });
            if ('address' in response.payload) {
                setAddress(response.payload.address);
            }
        } catch (e) {
            setAddress('');
            return JSON.stringify(e);
        }
    }

    return (
        <>
            <div>Current wallet: {address ? '-' : address}</div>
            <button onClick={connect}>
                Connect Trezor
            </button>
        </>
    )
};

export default App;
