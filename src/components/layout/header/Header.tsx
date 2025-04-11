import scss from "./Header.module.scss";
import { SiNike } from "react-icons/si";
import { links } from "../../../links/Links";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/Store";
import { setSearch } from "../../../store/slices/DataSlices";
import { FC } from "react";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { searchValue } = useAppSelector((store) => store.dataProduct);

  return (
    <section className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <div>
            <SiNike className={scss.logo} onClick={() => navigate("/")} />
          </div>
          <div className={scss.menu}>
            <nav>
              {links.map((item, index) => (
                <p key={index}>
                  <Link className={scss.links} to={item.link}>
                    {item.title}
                  </Link>
                </p>
              ))}
            </nav>

            <div className={scss.inputBox}>
              <div className={scss.group}>
                <svg
                  className={scss.icon}
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                  </g>
                </svg>
                <input
                  onChange={({ target }) => dispatch(setSearch(target.value))}
                  placeholder="Search"
                  type="search"
                  value={searchValue}
                  className={scss.input}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </section>
  );
};

export default Header;
