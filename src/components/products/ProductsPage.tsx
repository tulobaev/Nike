import { FC, useEffect, useState } from "react";
import scss from "./ProductsPage.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import axios from "axios";
import { oneProduct, setData } from "../../store/slices/DataSlices";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useNavigate } from "react-router-dom";

const brands = [
  {
    brand: "Nike",
    logo: "https://cdn-icons-png.flaticon.com/512/732/732084.png",
  },
  {
    brand: "Jordan",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Jumpman_logo.svg/640px-Jumpman_logo.svg.png",
  },
  {
    brand: "Nike SB",
    logo: "https://lezebre.lu/images/detailed/14/18541-nike-sb-vetement-logo.png",
  },
  {
    brand: "Converse",
    logo: "https://logos-world.net/wp-content/uploads/2020/06/Converse-Logo.png",
  },
];
const API = import.meta.env.VITE_API;

const ProductsPage: FC = () => {
  const navigate = useNavigate();
  const { data, searchValue } = useAppSelector((store) => store.dataProduct);
  const dispatch = useAppDispatch();
  const category = [...new Set(data.map((item) => item.category))];
  const [filterCategory, setFilterCategory] = useState("All");

  async function readProduct() {
    const { data } = await axios.get(API);
    dispatch(setData(data.data.reverse()));
  }

  async function getOneProduct(id: number) {
    try {
      const { data } = await axios.get(`${API}/${id}`);
      dispatch(oneProduct(data));
      navigate(`/details/${id}`);
    } catch (error) {
      console.error(error);
    }
  }

  function filterSearch(value: string) {
    let result = data.filter(
      (item) =>
        item.name.toLowerCase().trim().includes(value.toLowerCase().trim()) ||
        item.price.toString().includes(value)
    );
    dispatch(setData(result));

    if (!value) {
      readProduct();
    }
  }

  //!
  const filteredData = data.filter(
    (item) =>
      filterCategory.toLowerCase().trim() === "all" ||
      item.category.toLowerCase().trim() === filterCategory.toLowerCase().trim()
  );
  //!

  useEffect(() => {
    readProduct();
  }, []);

  useEffect(() => {
    filterSearch(searchValue);
  }, [searchValue]);

  return (
    <section className={scss.ProductsPage}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.containerCategory}>
            <div className={scss.category}>
              <h1>All category</h1>
              <div className={scss.btnBox}>
                <button onClick={() => setFilterCategory("all")}>All</button>
                {category.map((item, index) => (
                  <div key={index}>
                    <button onClick={() => setFilterCategory(item)}>
                      {item}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className={scss.products}>
              {filteredData.map((item, index) => (
                <div
                  key={index}
                  className={scss.productCard}
                  onClick={() => getOneProduct(item._id)}
                >
                  <Zoom>
                    <img src={item.photoURL} alt={item.name} />
                  </Zoom>
                  <h2>{item.name}</h2>
                  <p>{item.price} $</p>
                  <span>Brand: {item.brand}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={scss.brandsFooter}>
            <h1>Our Brands</h1>
            <div className={scss.brandsList}>
              {brands.map((item, index) => (
                <div
                  onClick={() => navigate(`/brand/${item.brand}`)}
                  className={scss.brandCard}
                  key={index}
                >
                  <img
                    src={item.logo}
                    alt={item.brand}
                    className={scss.brandLogo}
                  />
                  <span>{item.brand}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsPage;
