import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';

import NewsItem from './NewsItem';
import Spinner from './Spinner';

import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

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
            loading: true,
            page: 1,
            totalResults: 0
        }

        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News App`
    }



    async componentDidMount() {


        this.props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        this.props.setProgress(30)
        let parsedData = await data.json()
        this.props.setProgress(70)
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100)

    }


    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 })
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`

        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({ articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults })
    };


    render() {
        return <>
            <div>
                <h2 style={{
                    margin: "90px 10px 30px  10px",
                    textAlign: "center",
                }}>News App - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
            </div>

            {this.state.loading && <Spinner />}
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                loader={<Spinner />}
            >
                <Container >
                    <Row>
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage || "http://www.italmodafurniture.com/media/catalog/product/cache/11/image/9df78eab33525d08d6e5fb8d27136e95/r/o/romeo.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </Row>
                </Container>
            </InfiniteScroll>
        </>
    }
}
