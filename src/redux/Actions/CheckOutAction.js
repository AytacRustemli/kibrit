import { BASE_URL } from "../../api/config";
import { CHECK_OUT } from "../Constants/CheckOutConstant";

export const CheckOutAction = (userId) => async (dispatch, getState) => {
    var products = JSON.parse(localStorage.getItem("cart"));
    var dataArr = [];

    for (let i = 0; i < products.length; i++) {
        var priceToUse = products[i].salePrice || products[i].price;

        var data = await fetch(`${BASE_URL}Order/addorder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bookId: products[i].id,
                bookName: products[i].name,
                totalPrice: products[i].quantity * priceToUse,
                totalQuantity: products[i].quantity,
                userId: userId,
            }),
        }).then((response) => response.json());

        dataArr.push(data);
    }

    dispatch({
        type: CHECK_OUT,
        payload: dataArr,
    });
};
