const Cart = require("../model/cartModel");

// add item to cart
exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    if (cart) {
      // if cart exists, then update cart by quantity
      const product = req.body.cartItems.product;
      const isItemAdded = cart.cartItems.find((c) => c.product == product);
      let condition, action;
      if (isItemAdded) {
        condition = { user: req.user._id, "cartItems.product": product };
        action = {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: isItemAdded.quantity + req.body.cartItems.quantity,
            },
          },
        };
      } else {
        condition = { user: req.user._id };
        action = {
          $push: {
            cartItems: req.body.cartItems,
          },
        };
      }
      Cart.updateOne(condition, action).exec((error, _cart) => {
        if (error) {
          console.log(error);

          return res.status(400).json({ error });
        }
        if (_cart) {
          return res.status(201).json({ cart: _cart });
        }
      });
    } else {
      // create new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });
      cart.save((error, cart) => {
        if (error) {
          console.log(error);

          return res.status(400).json({ error });
        }
        if (cart) {
          return res.status(201).json({ cart });
        }
      });
    }
  });
};
exports.getSingleCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "cartItems.product",
      "itemName itemPrice itemCategory itemImage"
    );

    res.status(200).json({ success: true, cart });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Cant get Cart" });
  }
};
// empty cart
exports.emptyCart = async (req, res) => {
  try {
    const cart = await Cart.deleteOne({ user: req.user._id });

    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Cant get Cart" });
  }
};

//  remove from cart
exports.removeCartItems = (req, res) => {
  const productId = req.params.productId;
  if (productId) {
    Cart.updateOne(
      { user: req.user._id },
      {
        $pull: {
          cartItems: {
            product: productId,
          },
        },
      }
    ).exec((error, result) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      if (result) {
        res.status(202).json({ message: result });
      }
    });
  }
};
exports.decreaseCartItems = (req, res) => {
  // const productId = req.params.productId;
  // // const cartProductIndex = this.cartItems.product.findIndex((p) => {
  // //   return productID == p.product;
  // // });
  // let updatedCartItems = [req.body.cartItems];
  // console.log(updatedCartItems);
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
    if (cart) {
      // if cart exists, then update cart by quantity
      const product = req.body.cartItems.product;
      const isItemExist = cart.cartItems.find((c) => c.product == product);
      const quantity = req.body.cartItems.quantity;
      let condition, action;
      if (isItemExist && quantity > 1) {
        condition = { user: req.user._id, "cartItems.product": product };
        action = {
          $set: {
            "cartItems.$": {
              ...req.body.cartItems,
              quantity: quantity - 1,
            },
          },
        };
      } else {
        condition = { user: req.user._id };
        action = {
          $pull: {
            cartItems: req.body.cartItems,
          },
        };
      }
      Cart.updateOne(condition, action).exec((error, _cart) => {
        if (error) {
          console.log(error);

          return res.status(400).json({ error });
        }
        if (_cart) {
          return res.status(201).json({ cart: _cart });
        }
      });
    }
  });
};

exports.androidAddtoCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ error });
    }

    if (cart) {
      let cartItems = {
        product: req.body.product,
        quantity: req.body.quantity,
      };
      // console.log("product", cartItems.product);
      // console.log("quantity", cartItems.quantity);

      // if cart exists, then update cart by quantity
      const product = cartItems.product;
      const isItemAdded = cart.cartItems.length
        ? cart.cartItems.find((c) => c && c.product == product)
        : false;
      let condition, action;
      console.log("product", isItemAdded);
      if (isItemAdded) {
        condition = { user: req.user._id, "cartItems.product": product };
        action = {
          $set: {
            "cartItems.$": {
              ...cartItems,
              quantity: isItemAdded.quantity + parseInt(cartItems.quantity),
            },
          },
        };
      } else {
        condition = { user: req.user._id };
        action = {
          $push: {
            cartItems: cartItems,
          },
        };
      }
      Cart.updateOne(condition, action).exec((error, _cart) => {
        if (error) {
          console.log(error);

          return res.status(400).json({ error });
        }
        if (_cart) {
          return res.status(201).json({ success: true, cart: _cart });
        }
      });
    } else {
      let cartItems = {
        product: req.body.product,
        quantity: req.body.quantity,
      };
      // create new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: [cartItems],
      });
      cart.save((error, cart) => {
        if (error) {
          console.log(error);

          return res.status(400).json({ error });
        }
        if (cart) {
          return res.status(201).json({ success: true, cart });
        }
      });
    }
  });
};
