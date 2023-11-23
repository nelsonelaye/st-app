import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Main from './EntryFile/Main'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <Main />
    </BrowserRouter>
)
