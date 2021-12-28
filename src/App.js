import TrezorConnect from "trezor-connect";
import {useState} from "react";

const defaultStellarPath = "m/44'/148'/0'";

const App = () => {
    const [address, setAddress] = useState('');
    const [path, setPath] = useState(defaultStellarPath);

    const connect = async () => {
        // old config, can set any value to email and appUrl
        // maybe, there's no need these config in new version of package
        // if it's not working, try to remove the config below or use old version "trezor-connect": "8.1.27",
        TrezorConnect.manifest({
            email: 'my_email@example.com',
            appUrl: 'http://localhost:3000',
        });


        try {
            // find method base on network in: https://github.com/trezor/connect/blob/develop/docs/methods.md
            const response = await TrezorConnect.stellarGetAddress({
                path: path || defaultStellarPath,
            });
            // console.log(response.payload);
            if ('address' in response.payload) {
                setAddress(response.payload.address);
            } else {
                setAddress('');
            }
        } catch (e) {
            setAddress('');
            return JSON.stringify(e);
        }
    }

    const handlePathOnChange = (e) => {
        setPath(e.target.value)
    }

    return (
        <>
            <div>Current wallet: {address ? '-' : address}</div>
            <button onClick={connect}>
                Connect Trezor
            </button>
            path: <input type="text" value={path} onChange={handlePathOnChange}/>
        </>
    )
};

export default App;
