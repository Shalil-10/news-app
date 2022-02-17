import React, { Component } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

import NewsItem from './NewsItem';
import Spinner from './Spinner';

import PropTypes from 'prop-types'

export default class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }


    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    constructor(props) {
        super(props)
        console.log("this is a constructor from news component")
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            // totalResults: 0
        }
        
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News App`
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=50c9a4941699408499273cf683616da0&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=50c9a4941699408499273cf683616da0&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true })
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.updateNews()
    }

    handlePrevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=50c9a4941699408499273cf683616da0&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        // this.setState({ loading: true })
        // let data = await fetch(url)
        // let parsedData = await data.json()

        // this.setState({
        //     articles: parsedData.articles,
        //     page: this.state.page - 1,
        //     loading: false
        // })
        await this.setState({ page: this.state.page - 1, })
        await this.updateNews()
    }


    handleNextClick = async () => {
        // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {    //38/20 = 1.9 = 2
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=50c9a4941699408499273cf683616da0&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        //     this.setState({ loading: true })
        //     let data = await fetch(url)
        //     let parsedData = await data.json()

        //     this.setState({
        //         articles: parsedData.articles,
        //         page: this.state.page + 1,
        //         loading: false
        //     })
        // }
        await this.setState({ page: this.state.page + 1, })
        await this.updateNews()

    }


    render() {
        return <Container>
            <h2 style={{
                margin: "30px",
                textAlign: "center",
            }}>News App - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>

            {this.state.loading && <Spinner />}
            <Row>
                {!this.state.loading && this.state.articles.map((element) => {
                    return <Col key={element.url}>
                        <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage || "http://www.italmodafurniture.com/media/catalog/product/cache/11/image/9df78eab33525d08d6e5fb8d27136e95/r/o/romeo.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                    </Col>
                })}
            </Row>
            <Container className='d-flex justify-content-between'>
                <Button disabled={this.state.page <= 1} variant="dark" onClick={this.handlePrevClick}>&larr; Previous</Button>
                <Button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} variant="dark" onClick={this.handleNextClick}>Next &rarr;</Button>
            </Container>
        </Container>
    }
}
