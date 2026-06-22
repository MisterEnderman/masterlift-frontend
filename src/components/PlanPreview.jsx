import React from 'react'
import { Link } from 'react-router-dom'

const style = `
.card {
  width: 190px;
  height: 254px;
  border-radius: 20px;
  padding: 5px;
  box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
  background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
}

.card__content {
  background: rgb(5, 6, 45);
  border-radius: 17px;
  width: 100%;
  height: 100%;
}

img {
    width: 95%;
    height: 95%;
    border-radius: 10px;
    object-fit: cover;
}

h2, p {
	color: white;
}

img[alt] {
	color: white;
}
`

const PlanPreview = ({ plan }) => {
    return (
        <>
            <style>{style}</style>
            <Link to={`/plan/${plan.id}`} className="card">
                <div className="card__content">
                    <h2>{plan.title}</h2>
                    <p>{plan.desc}</p>
                    <img src={plan.image} alt={plan.title} />
                </div>
            </Link>
        </>

        // <h2>{exercise.title}</h2>
    )
}

export default PlanPreview