import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { decreaseItemQuantity, getFavoriesTotal, increaseItemQuantity, removeItem } from '../redux/Reducer/favoriteSlice';
import { FILE_PATH } from '../api/config';
import { addToCart } from '../redux/Reducer/cartSlice';

const Favories = () => {
  const { favories, totalQuantityFavories, totalPriceFavories } = useSelector((state) => state.favories)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavoriesTotal());
  }, [favories]);
  return (
    <div>
      <hr />
      <div id="cartTotal">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 box">
              <table>
                <thead>
                  <tr>
                    <th>Şəkil</th>
                    <th>Məhsulun adı</th>
                    <th className="product">Qiyməti</th>
                    <th>Sebete elave et</th>
                    {/* <th className="product">Ümumi məbləğ</th> */}
                    <th>Sil</th>
                  </tr>
                </thead>
                <tbody>
                  {favories.length > 0
                    ? favories.map((product) => (
                      <tr>
                        <td>
                          <img
                            src={`${FILE_PATH}${product.bookCover}`}
                            alt="kitab"
                          />
                        </td>
                        <td>{product.name}</td>
                        <td className="product">
                          {
                            product.isSale === true ? (
                              <>
                                <span>
                                  <del> {product.price} AZN</del>
                                </span>
                                <span style={{ marginLeft: "10px" }}>
                                  {product.salePrice} AZN
                                </span>
                              </>
                            ) : (
                              <>
                                <span>
                                  {product.price} AZN
                                </span>
                              </>
                            )
                          }
                        </td>
                        <td
                          className="sebet" style={{cursor:"pointer"}} onClick={() => {
                            dispatch(addToCart(product));
                          }}>Səbətə at
                        </td>
                        <td>
                          <i class="fa-solid fa-x" style={{ cursor: "pointer" }} onClick={() => dispatch(removeItem(product.id))}></i>
                        </td>
                      </tr>
                    ))
                    : (
                      <>
                        <p>Favori məhsulunuz yoxdur .</p>
                        <div className="deneme">
                          <span className="shop">
                            <Link to='/allbook' style={{ textDecoration: "none", color: "black", backgroundColor: "#EF4626", padding:"10px 20px" }}>Alış verişə davam et .</Link>
                          </span>
                        </div>
                      </>
                    )}

                </tbody>
              </table>
            </div>
            
          </div>
        </div>
      </div>
    </div >
  )
}

export default Favories