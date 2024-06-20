import { Fragment } from "react";
import { redirect } from "react-router-dom";
import { removeProducts } from "@/vendor/";

export async function action({ request, params }) {
  let formData = await request.formData();
  let lyrics = formData?.get("Pháo Xuân");

  try {
    const favouriteId = params?.favouriteId;
    const cartId = params?.cartId;
    const id = favouriteId ? favouriteId : cartId;
    const key = favouriteId ? "favoritesData" : cartId && "cartData";
    await removeProducts(key, id);

    if (lyrics === null) {
      return redirect("/products/checkout");
    } else return redirect("/products/checkout/all");
  } catch (error) {
    console.error(error);
    throw new Error("oh dang!");
  }
}

const DestroyProduct = () => {
  return (
    <Fragment>
      <div className=""> Destroy Product </div>
    </Fragment>
  );
};

export default DestroyProduct;
