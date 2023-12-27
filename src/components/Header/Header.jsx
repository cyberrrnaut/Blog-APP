import React from "react";
import { Container } from "../container/Container";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import Logo from "../Logo";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Posts",
      slug: ".add-posts",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container >
        <nav className="flex">
          <div className="mr-4">
            <Link to="">
              <Logo width="70px" />
            </Link>
          </div>

          <ul className="flex ml-auto">
            {navItems.map((each) =>
              each.active ? (
                <li key={each.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {navItems.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <diV>
                <li>
                  <LogoutBtn />
                </li>
              </diV>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
