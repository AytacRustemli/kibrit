import "./bookdetail.scss";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { FaStar } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss/navigation";
import "swiper/scss";
import "swiper/scss/pagination";
import { Navigation, Scrollbar, A11y } from "swiper";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL, FILE_PATH } from '../../api/config'
import { addToCart, decreaseItemQuantity, getCartTotal, increaseItemQuantity } from "../../redux/Reducer/cartSlice";
import { toast } from "react-toastify";
import { addToFavories } from "../../redux/Reducer/favoriteSlice";
import Carousel from "react-multi-carousel";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBooks] = useState([]);
  const data = useSelector(state => state.cart.data.message) || []
  const [photo, setPhoto] = useState([]);
  const [userName, setUserName] = useState("");
  const [review, setReview] = useState("");
  const [email, setEmail] = useState("");
  const stars = Array(5).fill(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [value, setValue] = useState("1");
  const dispatch = useDispatch();

  console.log(data);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClick = (value) => {
    setCurrentValue(value);
  };
  const handleMouseOver = (value) => {
    setHoverValue(value);
  };
  const handleMouseLeave = (value) => {
    setHoverValue(undefined);
  };
  const postComment = async () => {
    fetch(BASE_URL + "Comment/addcomment", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        userName: userName,
        userEmail: email,
        review: review,
        ratings: currentValue,
        productId: id,
      }),
    });
  };
  var starCount = book.rating;
  var test = [
    <StarOutlineIcon />,
    <StarOutlineIcon />,
    <StarOutlineIcon />,
    <StarOutlineIcon />,
    <StarOutlineIcon />,
  ];

  for (let index = 0; index < 5; index++) {
    if (starCount % 1 !== 0) {
      starCount -= starCount % 1;
    }
    if (index < starCount) {
      test[index] = <StarIcon />;
    } else {
      if (book.rating % 1 === 0) {
        break;
      }
      if (index === starCount) {
        test[index] = <StarHalfIcon />;
        break;
      }
    }
  }
  const reviewStar = (stars) => {
    var star = [
      <StarOutlineIcon />,
      <StarOutlineIcon />,
      <StarOutlineIcon />,
      <StarOutlineIcon />,
      <StarOutlineIcon />,
    ];

    for (let i = 0; i < stars; i++) {
      star[i] = <StarIcon style={{ color: "#FFBA5A" }} />;
    }

    return <>{star.map((e) => e)}</>;
  };

  const { cart, totalQuantity, totalPrice } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cart]);
  const getBooks = async () => {
    await fetch(BASE_URL + "book/getbyid/" + id)
      .then((res) => res.json())
      .then((data) => setBooks(data.message));
  };
  useEffect(() => {
    getBooks();
  }, [dispatch]);
  const notify = () =>
    toast(
      <Link to="/cart" style={{ textDecoration: "none" }}>
        "Product added to cart !"
      </Link>
    );

  return (
    <div id="bookdetail">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="imagee">
              <div className="row">
                <div className="col-lg-2">
                  {book.bookPictures &&
                    book.bookPictures.map((e) => (
                      <img
                        onClick={(a) => setPhoto(e)}
                        className="sml-picture"
                        width='100%'
                        src={`${FILE_PATH}${e}`}
                        alt="kitab"
                      />
                    ))}
                </div>
                <div className="col-lg-10">
                  {book.bookPictures && (
                    <div className="big-picture">
                      <img
                        width="100%"
                        src={`${FILE_PATH}${photo.length === 0
                          ? book.bookPictures[0]
                          : photo
                          }`}
                        alt="kitab"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="text">
              <div className="title">
                <h1>{book.name}</h1>
                <hr />
              </div>
              <ul>
                <li>
                  <div className="d-flex">
                    {
                      book.isSale === true ? (
                        <>
                          <span>
                            <del> {book.price} AZN</del>
                          </span>
                          <span style={{ marginLeft: "10px" }}>
                            {book.salePrice} AZN
                          </span>
                        </>
                      ) : (
                        <>
                          <span>
                            {book.price} AZN
                          </span>
                        </>
                      )
                    }
                    {book.isStock === true ? (
                      <div className="stock">
                        <p>Stock'da var</p>
                      </div>
                    ) : (
                      <div className="stock">
                        <p>Stock'da yoxdur</p>
                      </div>
                    )}
                  </div>
                </li>
              </ul>
              <div className="parametrs">
                <span>
                  <strong>Yayin evi: </strong> {book.publisherName}
                </span>{" "}
                <br />
                <span>
                  <strong>Yazar: </strong> {book.authorName}
                </span>{" "}
                <br />
                <span>
                  <strong>Kitabin dili :</strong> {book.languageName}
                </span>{" "}
                <br />
                <span>
                  <strong>Kagiz cinsi :</strong> {book.paperType}
                </span>{" "}
                <br />
                <span>
                  <strong>Olculer :</strong> {book.size}
                </span>{" "}
                <br />
                <span>
                  <strong>Janrı:</strong> {book.genreName}
                </span>{" "}
                <br />
              </div>
              <p>{book.reviewCount} customer reviews</p>
              <div className="plus">
                <p>
                  <td className='incDecButton'>
                    <button className="fas fa-minus" onClick={() => dispatch(decreaseItemQuantity(book.id))} ></button>
                    <span>1</span>
                    <button className="fas fa-plus" onClick={() => dispatch(increaseItemQuantity(book.id))}></button>
                  </td>
                </p>
                <span className="sebet" onClick={() => {
                  dispatch(addToCart(book));
                }}> Səbətə at</span>
              </div>
            </div>
          </div>
        </div>
        <div className="boxes">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Çatdırılma" value="1" />
                  <Tab label={`Rəylər (${book.reviewCount})`} value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div id="description">
                  <p>
                    Bütün metro stansiyalara istənilən saatda, Bakıdaxili adresə taksi ilə və bölgələrə poçtla çatdırılmamız mövcuddur🌻
                  </p>
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div id="comment">
                  <div className="container">
                    <div className="top">
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="add">
                            <div className="d-flex">
                              <div className="admin">
                                {book.comments &&
                                  book.comments.map((comment) => (
                                    <div key={comment.userEmail}>
                                      <h6 className="date">
                                        {comment.userName} - {comment.userEmail}
                                      </h6>
                                      <p className="light">
                                        Your review : {comment.review}
                                      </p>
                                      <p>
                                        Your rating :{reviewStar(comment.ratings)}
                                      </p>
                                      <hr />
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bottom">
                      <div class="comment-title">
                        <h2>Add a review</h2>
                      </div>
                      <div class="comment-input-box">
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="comment-input">
                              <input
                                width="100%"
                                onChange={(e) => setUserName(e.target.value)}
                                type="text"
                                placeholder="Name"
                                required
                              />
                            </div>
                          </div>
                          <div class="col-lg-12">
                            <div class="comment-input">
                              <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email"
                                required
                              />
                            </div>
                          </div>
                          <div class="col-lg-12">
                            <textarea
                              onChange={(e) => setReview(e.target.value)}
                              placeholder="Your review"
                              class="comment-input comment-textarea"
                            ></textarea>
                          </div>
                          <div class="comment-rating">
                            <div className="d-flex">
                              <span>Your rating : </span>
                              <div style={styles.containerr}>
                                <div style={styles.stars}>
                                  {stars.map((_, index) => {
                                    return (
                                      <FaStar
                                        key={index}
                                        size={15}
                                        style={{
                                          marginRight: 10,
                                          cursor: "pointer",
                                        }}
                                        color={
                                          (hoverValue || currentValue) > index
                                            ? colors.orange
                                            : colors.grey
                                        }
                                        onClick={() => handleClick(index + 1)}
                                        onMouseOver={() =>
                                          handleMouseOver(index + 1)
                                        }
                                        onMouseLeave={handleMouseLeave}
                                      />
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-12">
                            <div class="comment-submit">
                              <button
                                onClick={(e) => postComment()}
                                type="submit"
                                class="cart-btn"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </div>
        <div className="similar">
          <div className="title">
            <h4>Yazarın digər kitabları</h4>
          </div>
          <div className="books">
            <div className="bottom">
            <Carousel responsive={responsive}>
                {
                  data &&
                  data.filter((x) => x.authorName === book.authorName)
                    .map((e) => (
                        <div className="containerr" key={e.id}>
                          <div className="row align-items-center">
                            <div className="col-lg-12">
                              <div className="box">
                                <div className="image">
                                  <Link to={'/book/' + e.id}>
                                    <img
                                      src={`${FILE_PATH}${book.bookCover}`}
                                      alt="kitab"
                                    />
                                  </Link>
                                  <div className="icons">
                                    <i className="fa-solid fa-heart icon" onClick={() => dispatch(addToFavories(book))}></i>
                                    <br />
                                    <i className="fa-solid fa-bag-shopping icon" onClick={() => dispatch(addToCart(book))}></i>
                                  </div>
                                </div>
                                <div className="text">
                                  <span className="box1 super">{book.name}</span>
                                  <span className="box1 number">
                                    {
                                      book.isSale === true ? (
                                        <>
                                          <span>
                                            <del> {book.price} AZN</del>
                                          </span>
                                          <span style={{ marginLeft: "10px" }}>
                                            {book.salePrice} AZN
                                          </span>
                                        </>
                                      ) : (
                                        <>
                                          <span>
                                            {book.price} AZN
                                          </span>
                                        </>
                                      )
                                    }
                                  </span>
                                  <span className="sebet" onClick={() => {
                                    dispatch(addToCart(book));
                                    notify()
                                  }}>Səbətə at</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      
                    ))
                }
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

const styles = {
  containerr: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default BookDetail;