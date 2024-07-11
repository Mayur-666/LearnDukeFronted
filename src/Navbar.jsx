import React, { useState, useEffect, useRef } from "react";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";
import learnDuke from "./assets/learnDuke.png";
import { useNavigate, useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import Modal from "./Modal";
import axios from "axios";
import "./navbar.css";
import Logo from "./assets/logo2.jpg";
export default function Navbar() {
  const location = useLocation();
  if (location.pathname === "/createjob") {
    return null;
  }

  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const clickoutside = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userdata = JSON.parse(storedUser);
      axios
        .get(`https://learndukeserver.vercel.app/getUser/${userdata.email}`)
        .then((response) => {
          if(response.data===""){
            localStorage.removeItem("user");
            setUser(null);
            window.location.reload();
            
          }
          setPhoto(response.data.profilephoto.url);
        });
    }

    
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showMenu]);

  useEffect(() => {
    const saveUserDetails = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const email = urlParams.get("email");
      const name = urlParams.get("name");
      const accessToken = urlParams.get("accessToken");

      if (email && name && accessToken) {
        localStorage.setItem(
          "user",
          JSON.stringify({ email, name, accessToken })
        );
        await axios
          .get(`https://learndukeserver.vercel.app/getUser/${email}`)
          .then((response) => {
            setPhoto(response.data.profilephoto.url);
            setIsPremium(response.data.isPremium);
          });
        setUser({ email, name, accessToken });
        navigate("/teachingjobs");
      } else {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          await axios
            .get(
              `https://learndukeserver.vercel.app/getUser/${
                JSON.parse(storedUser).email
              }`
            )
            .then((response) => {
              let premium = response.data.isPremium;
              setIsPremium(premium);
            });
        }
      }
    };

    saveUserDetails();
  }, [navigate]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleGoogleLogin = () => {
    window.location.href = "https://learndukeserver.vercel.app/auth/google";
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClick = (e) => {
      if (clickoutside.current && !clickoutside.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    // scroll event
    // window.addEventListener("scroll  ", () => {
    //   setShowMenu(false);
    // });

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="p-4 flex justify-between items-center sticky top-0 bg-white h-20 border-b border-gray-200  z-50">
      <div className="flex items-center space-x-4 lg:space-x-6">
        <img
          src={Logo}
          alt="Learn Duke Logo"
          className="h-10 md:h-12 mt-2 md:mt-1 mr-10 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <div className="hidden lg:flex space-x-5 items-center w-fit p-1">
          <div
            className="cursor-pointer hover:underline"
            onClick={() => {
              navigate("/teachingjobs");
            }}
          >
            Explore Jobs
          </div>
          <div
            className="cursor-pointer p-1 hover:underline"
            onClick={() => {
              navigate("/mentorship");
            }}
          >
            Mentorship
          </div>
          <div
            className="cursor-pointer p-1 hover:underline"
            onClick={() => {
              navigate("/webinars");
            }}
          >
            Webinars
          </div>
          <div
            className="cursor-pointer hover:underline w-fit p-1 relative"
            onClick={() =>
              isPremium
                ? window.open("https://tally.so/r/mOPO5k", "blank")
                : setShowModal(true)
            }
          >
            Mock Interview
            <span
              className="absolute top-0 -right-4 font-semibold text-orange-500 glow-animation"
              style={{
                fontSize: "10px",
              }}
            >
              PRO
            </span>
          </div>
          <div
            className="cursor-pointer hover:underline w-fit p-1 relative"
            onClick={() => {
              isPremium
                ? window.open("https://tally.so/r/wAJ1Lo", "blank")
                : setShowModal(true);
            }}
          >
            Resume Building
            <span
              className="absolute font-semibold top-0 -right-4 text-orange-500 glow-animation"
              style={{
                fontSize: "10px",
              }}
            >
              PRO
            </span>
          </div>
          <div
            className="cursor-pointer hover:underline w-fit p-1 relative"
            onClick={() => {
              isPremium
                ? window.open("https://tally.so/r/wgAK0M", "blank")
                : setShowModal(true);
            }}
          >
            1:1 Mentorship
            <span
              className="absolute top-0 -right-4 text-orange-500 font-semibold glow-animation"
              style={{
                fontSize: "10px",
              }}
            >
              PRO
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {showMenu && (
          <div className="absolute top-0 w-full left-0  rounded-lg h-dvh backdrop-blur-sm z-10 flex flex-col lg:hidden animate-slide-left">
            <div
              ref={clickoutside}
              className="relative bg-white w-4/6 sm:w-3/6 md:max-w-80 h-full p-5"
              style={{
                boxShadow: "10px 0 50px 30px rgba(0,0,0,0.1)",
              }}
            >
              {user ? (
                <div className="h-10/12">
                  <div
                    className="flex items-center mb-4 cursor-pointer"
                    onClick={() => {
                      navigate("/userpage");
                      setShowMenu(false);
                    }}
                  >
                    <img
                      src={photo}
                      alt="User"
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <div className="font-semibold">{user.name}</div>
                  </div>
                  <div
                    className="text-base font-semibold mb-4 cursor-pointer p-1"
                    onClick={() => {
                      navigate("/teachingjobs");
                      setShowMenu(false);
                    }}
                  >
                    Explore Jobs
                  </div>
                  <div
                    className="text-base font-semibold  mb-4 cursor-pointer p-1"
                    onClick={() => {
                      navigate("/mentorship");
                      setShowMenu(false);
                    }}
                  >
                    Mentorship
                  </div>
                  <div
                    className="text-base font-semibold  mb-4 cursor-pointer p-1"
                    onClick={() => {
                      navigate("/webinars");
                      setShowMenu(false);
                    }}
                  >
                  Webinars
                  </div>
                  <div
                    className="text-base font-semibold  mb-4 cursor-pointer w-fit p-1 relative"
                    onClick={() => {
                      isPremium
                        ? window.open("https://tally.so/r/wgAK0M", "blank")
                        : setShowModal(true);
                      setShowMenu(false);
                    }}
                  >
                    1:1 Mentorship
                    <span className="absolute top-0 -right-6 text-xs text-orange-500 glow-animation">
                      PRO
                    </span>
                  </div>
                  <div
                    className="text-base font-semibold  mb-4 cursor-pointer w-fit p-1 relative "
                    onClick={() => {
                      setShowMenu(false);
                      isPremium
                        ? window.open("https://tally.so/r/mOPO5k", "blank")
                        : setShowModal(true);
                    }}
                  >
                    Mock Interview
                    <span className="absolute top-0 -right-6 text-xs text-orange-500 glow-animation">
                      PRO
                    </span>
                  </div>
                  <div
                    className="text-base font-semibold  mb-4 cursor-pointer w-fit p-1 relative"
                    onClick={() => {
                      isPremium
                        ? window.open("https://tally.so/r/wAJ1Lo", "blank")
                        : setShowModal(true);
                      setShowMenu(false);
                    }}
                  >
                    Resume Building
                    <span className="absolute top-0 -right-6 text-xs text-orange-500 glow-animation">
                      PRO
                    </span>
                  </div>
                  <button
                    className="py-2 mx-auto  bottom-5 left-4 w-full rounded-lg font-semibold bg-orange-500 text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col h-full">
                  <div className="h-10/12 ">
                    <div
                      className="text-base font-semibold mb-4 cursor-pointer p-1"
                      onClick={() => {
                        navigate("/teachingjobs")
                        setShowMenu(false)}
                      }
                    >
                      Explore Jobs
                    </div>
                    <div
                      className="text-base font-semibold mb-4 cursor-pointer p-1"
                      onClick={() =>
                        {
                          setShowMenu(false)
                        navigate("/mentorship")
                      }}
                    >
                      Mentorship
                    </div>
                    <div
                      className="text-base font-semibold mb-4 cursor-pointer p-1"
                      onClick={() =>
                        {
                          setShowMenu(false)
                        navigate("/webinars")
                      }}
                    >
                      Webinars
                    </div>
                    <div
                      className="text-base font-semibold mb-4 cursor-pointer w-fit p-1 relative"
                      onClick={() => {
                        isPremium
                          ? window.open("https://tally.so/r/wgAK0M", "blank")
                          : setShowModal(true);
                        setShowMenu(false);
                      }}
                    >
                      1:1 Mentorship
                      <span className="absolute top-0 -right-6 text-xs text-orange-500 glow-animation">
                        PRO
                      </span>
                    </div>
                    <div
                      className="text-base font-semibold mb-4 cursor-pointer w-fit p-1 relative"
                      onClick={() => {
                        isPremium
                          ? window.open("https://tally.so/r/mOPO5k", "blank")
                          : setShowModal(true);
                        setShowMenu(false);
                      }}
                    >
                      Mock Interview
                      <span className="absolute top-0 -right-6 text-xs text-orange-500 glow-animation">
                        PRO
                      </span>
                    </div>
                    <div
                      className="text-base font-semibold mb-4 cursor-pointer w-fit p-1 relative"
                      onClick={() => {
                        isPremium
                          ? window.open("https://tally.so/r/wAJ1Lo", "blank")
                          : setShowModal(true);
                        setShowMenu(false);
                      }}
                    >
                      Resume Building
                      <span className="absolute top-0 -right-6 text-xs text-orange-500 glow-animation">
                        PRO
                      </span>
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg font-semibold bg-black text-white mt-2"
                    onClick={handleGoogleLogin}
                  >
                    Log in with Google
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {user ? (
          <div className="hidden lg:flex items-center space-x-3">
            <div
              className="border-2 border-orange-500 cursor-pointer rounded-full"
              onClick={() => navigate("/userpage")}
            >
              <img src={photo} alt="User" className="w-8 h-8 rounded-full" />
            </div>
            <button
              className="px-4 py-2 rounded-lg font-semibold bg-orange-500 text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden lg:block">
            <button
              className="px-4 py-2 rounded-lg font-semibold bg-black text-white"
              onClick={handleGoogleLogin}
            >
              Log in with Google
            </button>
          </div>
        )}
        <div className="lg:hidden">
          {showMenu ? (
            <RiCloseLine
              className="cursor-pointer"
              size={35}
              onClick={toggleMenu}
            />
          ) : (
            <RiMenuLine
              className="cursor-pointer"
              size={35}
              onClick={toggleMenu}
            />
          )}
        </div>
      </div>
      {
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div className="text-lg flex flex-col text-center items-center justify-center">
            You are not a premium user.
            <br />
            Subscribe to any of our plans to avail pro benefits.
            <button
              className="px-3 py-1 bg-gradient-to-l from-yellow-500 to-orange-500 rounded-xl text-white whitespace-nowrap my-3 flex items-center justify-center space-x-1 w-40"
              onClick={() => {
                navigate("/subscription");
                setShowModal(false);
              }}
            >
              Subscribe Now
            </button>
          </div>
        </Modal>
      }
    </div>
  );
}
