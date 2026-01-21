export default function ProductCard(props) {

    return (
        <div className="product-card">
            <img src="https://www.goodhousekeeping.com/uk/product-reviews/tech/a61095166/apple-ipad-10th-generation-review/" alt="Product Image" />
            <h2>{props.name}</h2>
            <p>{props.price}</p>
            <button>Add to Cart</button>
        </div>
    );
}