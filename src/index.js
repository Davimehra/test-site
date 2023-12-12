import ReactDOM from "react-dom/client";
import {App} from "./components/App";


const root = ReactDOM.createRoot(document.querySelector('#root'))

function Index(){
    return(
        <App/>
    )
}

root.render(<Index/>)