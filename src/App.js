import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import MainContainer from './container/MainContainer';

class App extends React.Component {
    render() {
        return(
            <div>
                <Header heading = 'Products Grid'/>
            
                <hr/>
                
                <MainContainer/>
            </div>
        )
    }
}

export default App;
