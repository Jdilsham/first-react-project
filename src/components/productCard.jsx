export default function ProductCard(props) {

    return (
        <div className="product-card">
            <img src={props.image} alt={props.name} />
            <h2>{props.name}</h2>
            <p>{props.price}</p>
            <button>Add to Cart</button>
        </div>
    );
}