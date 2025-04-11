import { FC, useEffect } from "react";
import scss from "./ProductDetails.module.scss";
import { useAppDispatch, useAppSelector } from "../../../store/Store";
import axios from "axios";
import { setData } from "../../../store/slices/DataSlices";

interface IWordObj {
  i: string;
}

const API = import.meta.env.VITE_API;

const ProductDetails: FC = () => {
  const { oneProduct } = useAppSelector((store) => store.dataProduct);
  const dispatch = useAppDispatch();
  //!
  const title = oneProduct.map((item) => item.name);
  const sliceTitle = title.join("").split(" ");
  const arr: IWordObj[] = sliceTitle.map((word) => ({ i: word }));
  const arr2 = arr.slice(1).map((word) => word.i);
  //!
  async function readProduct() {
    const { data } = await axios.get(API);
    dispatch(setData(data.data));
  }

  useEffect(() => {
    readProduct();
  }, []);

  return (
    <section className={scss.ProductDetails}>
      <div className="container">
        <div className={scss.content}>
          {oneProduct ? (
            oneProduct.map((item, index) => (
              <>
                <div key={index} className={scss.image}>
                  <img src={item.photoURL} alt={item.name} />
                </div>
                <div className={scss.details}>
                  <h1>
                    {arr.length > 0 && (
                      <h1>
                        {arr[0].i} <h2>{`${arr2[0]} ${arr2[1]}`}</h2>
                      </h1>
                    )}
                  </h1>
                  <p className={scss.subtitle}>Iconic Style Meets Innovation</p>
                  <p>{item.description}</p>
                  <ul>
                    <li>Size: {item.size || "Not specified"}</li>
                    <li>Brand: {item.brand}</li>
                    <li>Category: {item.category || "Not specified"}</li>
                    <li>Price: ${item.price}</li>
                    <li>Durable rubber Waffle outsole for traction</li>
                    <li>Breathable mesh upper with synthetic overlays</li>
                    <li>Available in multiple colorways</li>
                  </ul>
                  <button className={scss.ctaButton}>Shop Now</button>
                </div>
              </>
            ))
          ) : (
            <h1>loading</h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
