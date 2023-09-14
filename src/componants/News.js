import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    pageSize: 15,
    country: "in",
    category: "general",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      searchQuery: "",
      totalResults: 0,
    };
    document.title = `${this.capitalizeFLetter(
      this.props.category
    )} - News Boy`;
  }

  capitalizeFLetter = (string) => {
    string = string[0].toUpperCase() + string.slice(1);
    return string;
  };

  async fetchData() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    await this.fetchData();
  }

  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
      page: this.state.page + 1,
    });
  };
  render() {
    return (
      <>
        <h1 className="text-center my-6" style={{ marginTop: '80px' }}>
          {this.capitalizeFLetter(this.props.category)} - Top Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={
            this.state.page <=
            Math.ceil(this.state.totalResults / this.props.pageSize)
          }
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element, index) => {
                const articleKey = `${element.url}-${index}`;
                return (
                  <div className="col-md-4" key={articleKey}>
                    <NewsItem
                      title={element.title}
                      Description={element.description}
                      imgurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      publishedAt={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;

//this is for prev next button

// import React, { Component } from "react";
// import NewsItem from "./NewsItem";
// import Spinner from "./Spinner";
// import PropTypes from "prop-types";

// export class News extends Component {
//   static defaultProps = {
//     pageSize: 15,
//     country: "in",
//     category: "general",
//   };

//   static propTypes = {
//     pageSize: PropTypes.number,
//     country: PropTypes.string,
//     category: PropTypes.string,
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       articles: [],
//       loading: false,
//       page: 1,
//       searchQuery: "",
//     };
//     document.title = `${this.capitalizeFLetter(this.props.category)} - News Boy`;

//   }

//   capitalizeFLetter=(string)=> {
//     string=string[0].toUpperCase() +
//         string.slice(1);
//     return string;
// }

//   async fetchData() {
//         const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=cf497b7941c14b9aaa8c13f80d297ad9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//         this.setState({ loading: true });
//         let data = await fetch(url);
//         let parseData = await data.json();
//         console.log(parseData);
//         this.setState({
//           articles: parseData.articles,
//           totalResults: parseData.totalResults,
//           loading: false,
//         });
//      }

//    async componentDidMount() {
//     await this.fetchData();
//   }

//   handlenextpage = async () => {
//     console.log("next");
//     this.setState({page: this.state.page + 1,})
//     this.fetchData();
//     // if (
//     //   !(
//     //     this.state.page + 1 >
//     //     Math.ceil(this.state.totalResult / this.props.pageSize)
//     //   )
//     // ) {
//     //   let url = `https://newsapi.org/v2/top-headlines?country=${
//     //     this.props.country
//     //   }&category=${
//     //     this.props.category
//     //   }&apiKey=cf497b7941c14b9aaa8c13f80d297ad9&page=${
//     //     this.state.page + 1
//     //   }&pageSize=${this.props.pageSize}`;
//     //   this.setState({ loading: true });
//     //   let data = await fetch(url);
//     //   let parseData = await data.json();
//     //   this.setState({
//     //     page: this.state.page + 1,
//     //     articles: parseData.articles,
//     //     loading: false,
//     //   });
//     // }
//   };
//   handleprevpage = async () => {
//     console.log("previous");
//     await this.setState({page: this.state.page - 1,});
//     this.fetchData();
//     // let url = `https://newsapi.org/v2/top-headlines?country=${
//     //   this.props.country
//     // }&category=${
//     //   this.props.category
//     // }&apiKey=cf497b7941c14b9aaa8c13f80d297ad9&page=${
//     //   this.state.page - 1
//     // }&pageSize=${this.props.pageSize}`;
//     // this.setState({ loading: true });
//     // let data = await fetch(url);
//     // let parseData = await data.json();
//     // console.log(parseData);
//     // this.setState({
//     //   page: this.state.page - 1,
//     //   articles: parseData.articles,
//     //   loading: false,
//     // });
//   };
//   render() {
//     return (
//       <div className="container">
//         <h1 className="text-center my-2">{this.capitalizeFLetter(this.props.category)} - Top Headlines</h1>
//         {this.state.loading && <Spinner />}
//         <div className="row">
//           {!this.state.loading &&
//             this.state.articles.map((element) => {
//               return (
//                 <div className="col-md-4" key={element.url}>
//                   <NewsItem
//                     title={element.title}
//                     Description={element.description}
//                     imgurl={element.urlToImage}
//                     newsurl={element.url}
//                     author={element.author}
//                     publishedAt={element.publishedAt}
//                     source={element.source.name}
//                   />
//                 </div>
//               );
//             })}
//         </div>
//         <div className="container d-flex justify-content-between my-3">
//           <button
//             disabled={this.state.page <= 1}
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handleprevpage}
//           >
//             &larr; Previous
//           </button>
//           <button
//             disabled={
//               this.state.page + 1 >
//               Math.ceil(this.state.totalResult / this.props.pageSize)
//             }
//             type="button"
//             className="btn btn-dark"
//             onClick={this.handlenextpage}
//           >
//             Next &rarr;
//           </button>
//         </div>
//       </div>
//     );
//   }
// }

// export default News;
