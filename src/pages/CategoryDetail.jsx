import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Layout from "../components/layout/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CategoryDetail = (props) => {
  const { id } = useParams();
  const [categoryDetails, setCategoryDetails] = useState();
  const navigate = useNavigate("");

  useEffect(() => {
    const getCategoryDetail = async () => {
      try {
        const accessToken = props.accessToken;
        const response = await axios.get(
          //   `
          //   https://api.spotify.com/v1/playlists/${id}`,
          `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );
        setCategoryDetails(response.data.playlists.items);
      } catch (err) {
        console.error(err);
      }
    };

    getCategoryDetail();
  }, [id, props]);

  if (!categoryDetails) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
        <Header accessToken={props.accessToken}/>

        <section className="mt-4 ps-6 h-44 flex items-end gap-6">
          <h1 className="text-green-500 font-bold text-8xl">Music</h1>
        </section>

        <section className="ps-6">
          <div className="mt-8">
            <ul className="categories grid grid-cols-4 gap-1">
              {categoryDetails.map((categoryDetail) => (
                <li
                  key={categoryDetail.id}
                  onClick={() => navigate(`/playlists/${categoryDetail.id}`)}
                  className="p-4 rounded-lg bg-black w-48 h-68"
                >
                  <img
                    src={categoryDetail.images[0].url}
                    className="object-cover rounded-lg"
                  />
                  <h3 className="text-white">{categoryDetail.name}</h3>
                  <h3 className="text-sm text-zinc-400">
                    {categoryDetail.description.length > 30
                      ? `${categoryDetail.description.slice(0, 30)}...`
                      : categoryDetail.description}
                  </h3>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Footer/>
    </Layout>
  );
};

CategoryDetail.propTypes = {
  accessToken: PropTypes.string,
};

export default CategoryDetail;
