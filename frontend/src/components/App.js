import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from "./ProtectedRoute";
import * as authUser from "../utils/auth";
import { setToken } from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const isSomePopupOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || !!selectedCard.link;
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log("Ошибка:", err);
        });
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((id) => id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setInfoTooltip(false);
  }

  useEffect(() => {
    const handleCloseByEsc = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };
  
    const handleOverlayClose = (evt) => {
      if (evt.target.classList.contains("popup")) {
        closeAllPopups();
      }
    };
  
    if (isSomePopupOpen) {
      document.addEventListener("keydown", handleCloseByEsc);
      document.addEventListener("mousedown", handleOverlayClose);
    }
  
    return () => {
      document.removeEventListener("keydown", handleCloseByEsc);
      document.removeEventListener("mousedown", handleOverlayClose);
    };
  }, [isSomePopupOpen]);
  

  function handleClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo(name, about)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleUpdateAvatar(ava) {
    api
      .setUserAvatar(ava.avatar)
      .then((res) => {
        setCurrentUser({ ...currentUser, avatar: res.avatar });
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((c) => c._id !== card._id),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }


  const handleLogin = async (email, password) => {
    try {
      const data = await authUser.authorize(email, password);
      if (data.token) {
        setToken(data.token);
        setLoggedIn(true);
        setUserEmail(email);
        localStorage.setItem("loggedIn", true);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      openInfoTooltip();
      setSuccess(false);
    }
    console.log();
  };

  
const handleRegister = (email, password) => {
  return authUser
    .register(email, password)
    .then((data) => {
      if (data) {
        openInfoTooltip();
        setSuccess(true);
        navigate("/sign-in");
      }
    })
    .catch((err) => {
      openInfoTooltip();
      setSuccess(false);
      console.log(err);
    });
};

useEffect (() => {
  if (loggedIn) navigate ('/');
}, [loggedIn, navigate]);

useEffect(() => {
  const token = localStorage.getItem('jwt');
  if (token) {
    authUser.checkToken(token)
          .then((res) => {
              if (res) {  
                  setLoggedIn(true);
                  setUserEmail(res.email);
              }
          })
          .catch((error) => {
            localStorage.removeItem('jwt');
            console.error(error);
          });
  }
}, []);

const onSignOut = () => {
  setLoggedIn(false);
  localStorage.removeItem('jwt');
  navigate("/sign-in");
};

const openInfoTooltip = () => {
  setInfoTooltip(true);
};

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userEmail={userEmail} loggedIn={loggedIn} onSignOut={onSignOut} />
        <Routes>
          <Route path="/" element= {
            <ProtectedRoute
                    loggedIn={loggedIn}
                    component= {Main} 
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleClick}
                    onCardLike={handleCardLike}
                    cards={cards}
                    onCardDelete={handleCardDelete} />
          }
        />
        <Route path="/sign-up" element={<Register onRegister={handleRegister}/>} />
        <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
        </Routes>
        <Footer />
        <EditProfilePopup
          closeAllPopups={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isEditProfilePopupOpen={isEditProfilePopupOpen}
        />
        <AddPlacePopup
          isAddPlacePopupOpen={isAddPlacePopupOpen}
          closeAllPopups={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isEditAvatarPopupOpen={isEditAvatarPopupOpen}
          closeAllPopups={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} closeAllPopups={closeAllPopups} />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltip}
          isSuccess={isSuccess}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;