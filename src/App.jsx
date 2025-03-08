import HomePage from "./componant/pages/home/HomePage"
import CodePreview from "./componant/pages/Code_preview/code_preview"
import { Route,Routes } from "react-router-dom"


const App = () => {
    
    return(
        <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/" element={<CodePreview />} />
            



        </Routes>
    )
}
export default App;