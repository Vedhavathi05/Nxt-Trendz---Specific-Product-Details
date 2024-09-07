import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

import './index.css'

class ProductItemDetails extends Component {
  state = {
    apiStatus: 'INITIAL',
    productDetails: [],
    similarProducts: [],
    quantity: 1,
  }

  componentDidMount() {
    this.getProductItemDetails()
  }

  getProductItemDetails = async () => {
    this.setState({apiStatus: 'PROGRESS'})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/products/${id}`
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = {
        id: data.id,
        imageUrl: data.image_url,
        price: data.price,
        availability: data.availability,
        brand: data.brand,
        description: data.description,
        rating: data.rating,
        style: data.style,
        title: data.title,
        totalReviews: data.total_reviews,
      }
      const similarPRoductsData = data.similar_products.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        price: each.price,
        availability: each.availability,
        brand: each.brand,
        description: each.description,
        rating: each.rating,
        style: each.style,
        title: each.title,
        totalReviews: each.total_reviews,
      }))
      this.setState({
        productDetails: updatedData,
        similarProducts: similarPRoductsData,
        apiStatus: 'SUCCESS',
      })
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  showProductsView = () => {
    const {history} = this.props
    history.replace('/products')
  }

  renderComponentBasedOnState = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'PROGRESS':
        return this.ShowLoader()
      case 'SUCCESS':
        return this.ShowSuccessView()
      case 'FAILURE':
        return this.ShowFailureView()
      default:
        return null
    }
  }

  ShowLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  ShowFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
      />
      <h1>Product Not Found</h1>
      <button type="button" onClick={this.showProductsView}>
        Continue Shopping
      </button>
    </div>
  )

  decreamentValue = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1,
      }))
    }
  }

  increamentValue = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1,
    }))
  }

  ShowSuccessView = () => {
    const {productDetails, similarProducts, quantity} = this.state
    return (
      <div>
        <div className="card-container-for-products-items">
          <img
            src={productDetails.imageUrl}
            alt="product"
            className="product-image"
          />
          <div>
            <h1 className="product-heading">{productDetails.title}</h1>
            <br />
            <p className="paragraph-price">Rs.{productDetails.price}/- </p>
            <br />
            <div className="displaying-as-flex">
              <p className="rating-styling">
                {productDetails.rating}
                <img
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                  className="start-image-styling"
                />
              </p>

              <p>{productDetails.totalReviews} Reviews</p>
            </div>
            <br />
            <p className="description-for-filters">
              {productDetails.description}
            </p>
            <br />
            <p className="pargarph-thicking">Available: </p>
            <p className="description-for-filters">
              {productDetails.availability}
            </p>

            <p className="pargarph-thicking">Brand:</p>
            <p className="description-for-filters">{productDetails.brand}</p>

            <br />
            <hr />
            <div className="quantity-buttons">
              <button
                type="button"
                className="inc-dec-buttons"
                onClick={this.decreamentValue}
                data-testid="minus"
              >
                <BsDashSquare />
              </button>
              <p>{quantity}</p>
              <button
                type="button"
                className="inc-dec-buttons"
                onClick={this.increamentValue}
                data-testid="plus"
              >
                <BsPlusSquare />
              </button>
            </div>
            <button type="button" className="button-add-to-cart">
              ADD TO CART
            </button>
          </div>
        </div>
        <ul className="ul-conatiner">
          {similarProducts.map(each => (
            <li key={each.id}>
              <SimilarProductItem details={each} key={each.id} />
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderComponentBasedOnState()}
      </div>
    )
  }
}

export default ProductItemDetails
