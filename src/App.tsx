import './App.css';
import Login from './components/login'
import ArticleList from './components/ArticleList';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/" element={<Navigate replace to={"/login"} />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
