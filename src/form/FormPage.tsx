import { FC, useEffect } from "react";
import scss from "./FormPage.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { setData } from "../store/slices/DataSlices";
import { useNavigate } from "react-router-dom";

interface IForm {
  name: string;
  price: number;
  photoURL: string;
  description: string;
  category: string;
  brand: string;
  size: string;
  color: string;
}

const API = import.meta.env.VITE_API;

const FormPage: FC = () => {
  const { register, handleSubmit, reset } = useForm<IForm>();
  const navigate = useNavigate();

  const sendData: SubmitHandler<IForm> = async (data) => {
    const newObj = {
      name: data.name,
      price: data.price,
      photoURL: data.photoURL,
      description: data.description,
      category: data.category,
      brand: data.brand,
      size: data.size,
      color: data.color,
    };
    try {
      await axios.post(API, newObj);
      reset();
    } catch (error) {
      console.log("✨при добавлении продукта:✨", error);
    }
  };

  useEffect(() => {
    setData;
  }, []);
  return (
    <section className={scss.FormPage}>
      <div className="container">
        <div className={scss.content}>
          <h1 className={scss.title}>Add Your Nike Product</h1>
          <form onSubmit={handleSubmit(sendData)} className={scss.form}>
            <div className={scss.inputGroup}>
              <label htmlFor="name">Product Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                id="name"
                placeholder="e.g. Nike Air Max 90"
              />
            </div>

            <div className={scss.inputGroup}>
              <label htmlFor="photoURL">Photo URL</label>
              <input
                {...register("photoURL", { required: "Photo URL is required" })}
                type="text"
                id="photoURL"
                placeholder="https://example.com/image.png"
              />
            </div>

            <div className={scss.inputGroup}>
              <label htmlFor="price">Price ($)</label>
              <input
                {...register("price", {
                  required: "Price is required",
                  min: 0,
                })}
                type="number"
                id="price"
                placeholder="e.g. 130"
              />
            </div>

            <div className={scss.inputGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                id="description"
                placeholder="Describe the product (e.g. Lightweight running shoes...)"
              />
            </div>
            <div className={scss.inputGroup}>
              <label htmlFor="color">Color</label>
              <input
                {...register("color", { required: "Color is required" })}
                type="text"
                id="color"
                placeholder="e.g. Black/White"
              />
            </div>

            <div className={scss.inputGroup}>
              <label htmlFor="category">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                id="category"
              >
                <option value="">Select Category</option>
                <option value="Men's Footwear">Men's Footwear</option>
                <option value="Women's Footwear">Women's Footwear</option>
                <option value="Kids' Footwear">Kids' Footwear</option>
                <option value="Running">Running</option>
                <option value="Basketball">Basketball</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Training">Training</option>
              </select>
            </div>

            <div className={scss.inputGroup}>
              <label htmlFor="brand">Brand</label>
              <select
                {...register("brand", { required: "Brand is required" })}
                id="brand"
              >
                <option value="">Select Brand</option>
                <option value="Nike">Nike</option>
                <option value="Jordan">Jordan</option>
                <option value="Nike SB">Nike SB</option>
                <option value="Converse">Converse</option>
              </select>
            </div>

            <div className={scss.inputGroup}>
              <label htmlFor="size">Size (EU)</label>
              <select
                {...register("size", { required: "Size is required" })}
                id="size"
              >
                <option value="">Select Size</option>
                <option value="36">36</option>
                <option value="38">38</option>
                <option value="40">40</option>
                <option value="42">42</option>
                <option value="44">44</option>
              </select>
            </div>

            <div className={scss.ctaButtons}>
              <button
                onClick={() => navigate("/products")}
                type="submit"
                className={scss.ctaButton}
              >
                Create Product
              </button>
              <button
                type="button"
                className={scss.ctaButton}
                onClick={() => reset()}
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FormPage;
