import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {

    static defaultProps = {
        category: "business",
        pageSize: 30,

    }

    static propTypes = {
        category: PropTypes.string,
        pageSize: PropTypes.number,
    }


    constructor () {
        super();
        this.state = { 
            articles: [],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=21473341dead4618bdcab7a417ae1e95&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        //console.log(parsedData)
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }


    handlePrevClick = async () => {
        //console.log('prevoius')
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=21473341dead4618bdcab7a417ae1e95&page= ${this.state.page - 1}& pageSize=${this.props.pageSize}`;
        this.setState({loading: true})
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }
    handleNextClick = async () => {
        //console.log('next')
        if(this.state.page + 1 > Math.ceil(this.state.totalResults/10)){

        }
        else{
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=21473341dead4618bdcab7a417ae1e95&page= ${this.state.page + 1}& pageSize=${this.props.pageSize}`;
            this.setState({loading: true})
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
                loading: false
            })
        }

    }

  render() {
    return (
        <div className='container mb-4' style={{color: this.props.mode === 'dark' ? 'white': 'black'}} >
            <h2>News Monkey - Top Headlines</h2>
            {this.state.loading && <Spinner />}
            <div className="row g-4 mt-2 mb-4">
                {!this.state.loading && this.state.articles.map((element)=>{               
                    return <div className="col-md-3" key={element.url}>
                        <NewsItem  title={element.title?element.title.slice(0,35): ""} description= {element.description?element.description.slice(0,88):""} imageUrl= {element.urlToImage} newsUrl={element.url} />
                    </div>
                })}
            </div>
            <div className="row">
                <div className="d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePrevClick} >&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/ this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick} >Next &rarr;</button>
                </div>
            </div>
      </div>
    )
  }
}
