import { useEffect } from 'react';
import './app.scss';
import Card from './game/Card';
import { resizeFontSize } from './util';

function App() {
    useEffect(() => {
        resizeFontSize();
    }, []);
    return (
        <>
            <Card></Card>
        </>
    );
}

export default App;
