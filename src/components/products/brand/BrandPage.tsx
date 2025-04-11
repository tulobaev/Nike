import { FC, useEffect } from "react";
import scss from "./BrandPage.module.scss";
import axios from "axios";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/Store";
import { oneProduct, setData } from "../../../store/slices/DataSlices";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const API = import.meta.env.VITE_API;

const BrandPage: FC = () => {
  const { data } = useAppSelector((store) => store.dataProduct);
  const dispatch = useAppDispatch();
  const { brand } = useParams<{ brand: string }>();
  const navigate = useNavigate();

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

  const filterBrand = data.filter((item) => item.brand === brand);

  return (
    <section className={scss.BrandPage}>
      <div className="container">
        <div className={scss.content}>
          <h1>{brand} Products</h1>
          <div className={scss.products}>
            {filterBrand ? (
              filterBrand.map((item, index) => (
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
              ))
            ) : (
              <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
                {Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className={scss.productCard}>
                      <Skeleton height={200} />
                      <Skeleton
                        height={28}
                        width="70%"
                        style={{ marginTop: 10 }}
                      />
                      <Skeleton
                        height={20}
                        width="30%"
                        style={{ marginTop: 8 }}
                      />
                      <Skeleton
                        height={16}
                        width="50%"
                        style={{ marginTop: 8 }}
                      />
                    </div>
                  ))}
              </SkeletonTheme>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandPage;
