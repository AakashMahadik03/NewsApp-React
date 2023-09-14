import React, { Component } from "react";
import MyImg from "./newsD1.png";

export class NewsItem extends Component {
  render() {
    let { title, Description, imgurl, newsurl, author, publishedAt, source } =
      this.props;
    return (
      <div className="my-3">
        <div className="card">
          <span
            className="position-absolute translate-middle badge rounded-pill bg-danger"
            style={{ color: "white", left: "-10px", top: "-10px", zIndex: "1" }}
          >
            {source}
          </span>
          <img
            src={!imgurl ? MyImg : imgurl}
            className="card-img-top"
            alt="..."
          />

          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{Description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {!author ? "Unkown" : author} on{" "}
                {new Date(publishedAt).toGMTString()}
              </small>
            </p>
            <a href={newsurl} target="_blank" className="btn btn-sm btn-dark">
               know more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
