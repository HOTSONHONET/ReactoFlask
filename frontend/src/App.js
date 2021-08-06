import './App.css';
import { useState, useEffect } from 'react';
import ArticleList from './components/ArticleList';
import Form from './components/Form';

function App() {

  const [articles, setArticles] = useState([])
  const [edited_article, edited_setArticle] = useState(null)


  useEffect(() => {
    fetch('http://127.0.0.1:5000/showall', {
      'method': 'GET',
      headers: {
        'Content-Type': 'application/json',

      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))
  }, [])

  const editArticle = (article) => {
    edited_setArticle(article)
  }

  const updatedData = (article) => {
    const new_article = articles.map(my_article => {
      return (my_article.id === article.id) ? article : my_article;
    })
    setArticles(new_article)
  }


  const openForm = () => {
    edited_setArticle({title:'', body:''})
  }

  const insertedArticle = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }

  const deleteArticle = (article) => {
    const new_articles = articles.filter(my_article => {
      return !(my_article.id === article.id);
    })

    setArticles(new_articles)
  }

  return (
    <div className="App">
      <div className="container">
        <div className="row" id="intro">
          <h1>ReactoFlask</h1>
        </div>
        <div id="intro">
          <button className="btn btn-primary" onClick={openForm}>Insert Article</button>
        </div>
      </div>
      <br></br>
      <ArticleList articles = {articles} editArticle = {editArticle} deleteArticle = {deleteArticle}/>
      {edited_article ? <Form article = {edited_article} updatedData = {updatedData} insertedArticle = {insertedArticle}/> : null}
      
    </div>
  );
}

export default App;
