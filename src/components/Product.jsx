export function Product({ title, imageSrc, info, price, qty, id }) {
  return (
    <div className="product">
      <img src={imageSrc} alt={title} />
      <div>
        <h3>{title}</h3>
        <p className="info">{info}</p>
        <div>
          <button>-</button>
          <span>{qty}</span>
          <button>+</button>
        </div>
      </div>
      <div className="priceColumn">
        <p>{price} €</p>
        <button data-role="delete">Delete</button>
      </div>
    </div>
  )
}
