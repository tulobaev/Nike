import { FC, useEffect, useState } from "react";
import scss from "./AdminPage.module.scss";
import FormPage from "../../form/FormPage";
import { useAppDispatch, useAppSelector } from "../../store/Store";
import { setData } from "../../store/slices/DataSlices";
import axios from "axios";

const API = import.meta.env.VITE_API;
const AdminPage: FC = () => {
  const { data } = useAppSelector((store) => store.dataProduct);
  const dispatch = useAppDispatch();
  const [checkEmail, setCheckEmail] = useState(false);
  const [email, setEmail] = useState("");
  const adminEmail = "talgattulobaev519@gmail.com";

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === adminEmail) {
      setCheckEmail(true);
    } else {
      alert("Incorrect email. Please try again.");
      setEmail("");
    }
  };

  async function readProduct() {
    const { data } = await axios.get(API);
    dispatch(setData(data.data));
  }

  async function deleteProduct(id: number) {
    try {
      await axios.delete(`${API}/${id}`);
      readProduct();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    readProduct();
    setData;
  }, []);

  if (!checkEmail) {
    return (
      <section className={scss.CheckAdminPage}>
        <div className="container">
          <div className={scss.Checkcontent}>
            <h2 className={scss.checkTitle}>Admin Login</h2>
            <form onSubmit={handleEmail} className={scss.loginForm}>
              <input
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                placeholder="Enter admin email"
                className={scss.input}
                required
              />
              <button type="submit" className={scss.submitButton}>
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={scss.AdminPage}>
      <div className="container">
        <div className={scss.content}>
          <FormPage />
          <h1 className={scss.title}>All Products</h1>
          <div className={scss.products}>
            {data.map((item, index) => (
              <div key={index} className={scss.productCard}>
                <img src={item.photoURL} alt={item.name} />
                <h2>{item.name}</h2>
                <p>{item.price} $</p>
                <span>Brand: {item.brand}</span>
                <div className={scss.buttons}>
                  <button
                    onClick={() => deleteProduct(item._id)}
                    className={scss.deleteBtn}
                  >
                    delete
                  </button>
                  <button className={scss.editBtn}>edit</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
