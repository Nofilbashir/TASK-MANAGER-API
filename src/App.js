import './App.css';
import Home from './Components/Home/Home';
import Edit from './Components/Edit/Edit';
import NotFound from './Components/NotFound/NotFound';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
function App() {
  return (
    
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
