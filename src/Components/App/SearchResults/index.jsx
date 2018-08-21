import React, { PureComponent } from "react"
import { arrayOf, shape, string } from "prop-types"
import Slider from "react-slick"
import LexicalEntry from "./Components/LexicalEntry"
import "./SearchResults.sass"

const sliderSettings = {
  className: "",
  center: true,
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1
}

const renderResultItem = entry => {
  return (
    <li key={entry.id}>
      <LexicalEntry entry={entry} />
      <hr />
    </li>
  )
}

class SearchResults extends PureComponent {
  render() {
    const { results, imageResults } = this.props

    return (
      <div className="SearchResults">
        <div className="SearchResults__Images">
          <Slider {...sliderSettings}>
            {imageResults.map(img => (
              <a
                href={img.link}
                target="_blank"
                key={img.link}
                rel="noopener noreferrer"
              >
                <img src={img.thumbnailLink} alt="" />
              </a>
            ))}
          </Slider>
        </div>
        <ul className="SearchResults__Definitions">
          {results.map(entry => renderResultItem(entry))}
        </ul>
      </div>
    )
  }
}

SearchResults.propTypes = {
  results: arrayOf(
    shape({
      id: string,
      text: string,
      language: string,
      lexicalCategory: string,
      entries: arrayOf(shape({})),
      pronunciations: arrayOf(shape({}))
    })
  ).isRequired,

  imageResults: arrayOf(
    shape({
      link: string,
      thumbnailLink: string
    })
  ).isRequired
}

export default SearchResults
