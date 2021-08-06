import React from 'react';
import APIService from './APIService';
import '../App.css';


function ArticleList(props) {
    const editArticle = (article) => {
        props.editArticle(article)
    }

    const deleteArticle = (article) => {
        APIService.deleteArticle(article.id)
        .then(() => props.deleteArticle(article))
    }

    return (
        <div className="container-fluid">
            {props.articles && props.articles.map(article => {
                return (
                    <div key={article.id} id="bg-article">
                        <h1>{article.title}</h1>
                        <p>{article.body}</p>
                        <p>Date : {article.date}</p>

                        <div className="row">
                            <div className="col-md-1">
                                <button className="btn btn-success"
                                    onClick={() => editArticle(article)}>Update</button>
                            </div>

                            <div className="col">
                                <button className="btn btn-danger" onClick = {() => deleteArticle(article)}>Delete</button>
                            </div>
                        </div>
                        <hr />
                    </div>
                )
            })}

        </div>
    )
}

export default ArticleList
