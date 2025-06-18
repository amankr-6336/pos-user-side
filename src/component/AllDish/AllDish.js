import React, { useEffect, useState } from "react";
import SingleCategory from "../SingleCategory/SingleCategory";
import SingleMeneBox from "../SingleMenuBox/SingleMeneBox";
import { axiosClient } from "../../utils/AxiosClient";
import { useParams } from "react-router-dom";
import './AllDish.scss'

function AllDish() {
  const [menu, setMenu] = useState(null);
  const [categories, setCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const params=useParams();

  useEffect(()=>{
     GetCategory();
       // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    getMenuForCategory({ category: selectedCategory, menuId: null });
  }, [selectedCategory]);

  async function GetCategory() {
    try {
      const response = await axiosClient.get("/category/get-categories", {
        params: { restaurantId: params.restroId },
      });
      const categories = response?.data?.result?.categories;

      setCategory(categories);
      if (categories && categories.length > 0) {
        const firstCategory = categories[0];
        setSelectedCategory(firstCategory);
        console.log(firstCategory);
        await getMenuForCategory(firstCategory);
      }
      setSelectedCategory(response?.data?.result?.categories[0]);
      console.log(categories);
    } catch (error) {
      console.log(error);
    }
  }

  async function getMenuForCategory({ category }) {
    console.log(category);
    try {
      const response = await axiosClient.get("/menu/get-menu", {
        params: { categoryId: category?._id },
      });
      // console.log(response.data.result.menus);

      const menus = response?.data?.result?.menus || [];
      setMenu(menus);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="all-dishes">
      <div className="category-listing-section">
        <p className="section-heading">Categories</p>
        <div className="listing-section">
          {categories?.map((item, index) => (
            <SingleCategory
              data={item}
              key={index}
              selected={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          ))}
        </div>
      </div>

      <div className="menu-listing-section">
        <p className="section-heading">Menu</p>
        <div className="listing-section">
          {menu?.map((item, index) => (
            <SingleMeneBox data={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllDish;
