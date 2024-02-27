import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const CategorySection = (props) => {
  const navigate = useNavigate();

  const backgroundColors = ["blue", "green", "orange", "red", "purple"];

  return (
    <div className="w-full p-4">
      <ul className="categories grid grid-cols-4 gap-1">
        {props.categories.map((category, index) => (
          <li
            key={category.id}
            onClick={() => navigate(`/categories/${category.id}`)}
            style={{
              backgroundColor:
                backgroundColors[index % backgroundColors.length],
            }}
            className="category-card relative overflow-hidden rounded-md py-2 px-4 mb-2 cursor-pointer"
          >
            <h1 className="text-white text-xl font-bold">{category.name}</h1>
            <img
              src={category.icons[0].url}
              className="w-28 h-28 rotate-12 absolute -bottom-1 -right-5"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

CategorySection.propTypes = {
  categories: PropTypes.array,
};

export default CategorySection;
