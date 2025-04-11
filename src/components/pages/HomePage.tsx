import { FC, useEffect } from "react";
import scss from "./HomePage.module.scss";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { oneProduct, setData } from "../../store/slices/DataSlices";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const API = import.meta.env.VITE_API;

interface IWordObj {
  i: string;
}

const HomePage: FC = () => {
  const navigate = useNavigate();
  const { data } = useAppSelector((store) => store.dataProduct);
  const dispatch = useAppDispatch();

  async function readProduct() {
    const { data } = await axios.get(API);
    dispatch(setData(data.data));
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

  useEffect(() => {
    readProduct();
  }, []);

  //!
  const newCardSlice = data.slice(data.length - 3);
  const newCardMain = data.slice(data.length - 1);
  const title = newCardMain.map((item) => item.name);
  const sliceTitle = title.join("").split(" ");
  const arr: IWordObj[] = sliceTitle.map((word) => ({ i: word }));
  const arr2 = arr.slice(1).map((word) => word.i);
  //!

  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);

  return (
    <section className={scss.HomePage}>
      <div className={scss.contentBackground}></div>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.title}>
            <h1>
              {arr.length > 0 && (
                <h1>
                  {arr[0].i} <h2>{`${arr2[0]} ${arr2[1]}`}</h2>
                </h1>
              )}
            </h1>
            {newCardMain.map((item, index) => (
              <p key={index}>{item.description}</p>
            ))}

            <div className={scss.ctaButtons}>
              <button
                onClick={() => navigate("/products")}
                className={scss.ctaButton}
              >
                Shop Now
              </button>
              <button
                onClick={() =>
                  newCardMain.map((item) => getOneProduct(item._id))
                }
                className={`${scss.ctaButton} ${scss.outline}`}
              >
                Learn More
              </button>
            </div>
          </div>
          <div className={scss.image}>
            {newCardMain.length > 0 ? (
              newCardMain.map((item, index) => (
                <div key={index}>
                  <img
                    data-aos="zoom-out-down"
                    src={item.photoURL}
                    alt={item.name}
                  />

                  <span className={scss.badge}>New Release</span>
                </div>
              ))
            ) : (
              <h1>loading</h1>
            )}
          </div>
        </div>

        <div className={scss.cardContainer}>
          <span className={scss.badge}>New Release</span>
          <div className={scss.box}>
            {newCardSlice ? (
              newCardSlice.map((item, index) => (
                <div key={index} className={scss.card}>
                  <Zoom>
                    <img src={item.photoURL} alt={item.name} />
                  </Zoom>
                  <h3>{item.name}</h3>

                  <div
                    onClick={() => getOneProduct(item._id)}
                    className={scss.priceInfo}
                  >
                    <p>${item.price}</p>
                  </div>
                  <div className={scss.rating}>
                    ★★★★☆ <span>(4.5/5)</span>
                  </div>
                </div>
              ))
            ) : (
              <h1>loading</h1>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
