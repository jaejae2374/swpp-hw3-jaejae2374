import './App.css';
import Login from './components/login'
import ArticleList from './components/ArticleList';
import ArticleCreate from './components/ArticleCreate';
import ArticleUpdate from './components/ArticleUpdate';
import ArticleDetail from './components/ArticleDetail'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/create" element={<ArticleCreate />} />
        <Route path="/articles/:id/edit" element={<ArticleUpdate />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/" element={<Navigate replace to={"/login"} />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
