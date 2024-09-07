// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {details} = props
  const {imageUrl, price, brand, rating, title} = details
  return (
    <div className="bg-card">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="image-styling"
      />
      <h1 className="heading">{title}</h1>
      <p>by {brand}</p>
      <div className="displaying-as-flex2">
        <p>RS {price}/- </p>
        <p className="rating-styling2">
          {rating}
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="start-image-styling"
          />
        </p>
      </div>
    </div>
  )
}

export default SimilarProductItem
