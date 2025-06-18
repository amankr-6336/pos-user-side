import React from 'react'
import { GrRestaurant } from "react-icons/gr";
import './CategoryBox.scss'

function CategoryBox() {
  return (
     <div className="category-box">
        <div className="category-img">
          <GrRestaurant id='icon'/>
        </div>

        <div className="category-name">
            <p>Desserts</p>
        </div>
     </div>
  )
}

export default CategoryBox