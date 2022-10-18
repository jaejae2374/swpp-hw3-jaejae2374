import './App.css';
import Login from './components/User/login'
import ArticleList from './containers/Article/ArticleList/ArticleList';
import ArticleCreate from './containers/Article/ArticleCreate/ArticleCreate';
import ArticleUpdate from './containers/Article/ArticleUpdate/ArticleUpdate';
import ArticleDetail from './containers/Article/ArticleDetail/ArticleDetail'
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
