import db from "../model/index.mjs";

//  create main model
const Product = db.products;
const Review = db.reviews;

// main work starts here

// 1. creating products

const addProduct = async (req, res) => {
  let info = {
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  const product = await Product.create(info);
  res.status(200).send(product);
  console.log(product);
};

// 2 . get All product

const getAllProducts = async (req, res) => {
  let products = await Product.findAll({
    /*   attributes: [
            'title',
            'price'
        ] */
  });
  res.status(200).send(products);
};

// 3. get Asingle product

const getOneProduct = async (req, res) => {
  let id = req.params.id;
  let product = await Product.findone({
    where: { id: id },
  });
  res.status(200).send(product);
};

// 4. Update Asingle product

const UpdateOneProduct = async (req, res) => {
  let id = req.params.id;
  let product = await Product.update(req.body, {
    where: { id: id },
  });
  res.status(200).send(product);
};

// 5. delet Asingle product

const deletOneProduct = async (req, res) => {
  let id = req.params.id;
  await Product.destroy({ where: { id: id } });
  res.status(200).send("Product is deleted !!");
};

// 6. get Published products

const getPublishedProduct = async (req, res) => {
  let products = await Product.findAll({
    where: { published: true },
  });
  res.status(200).send(products);
};

export default {
  addProduct,
  getAllProducts,
  getOneProduct,
  UpdateOneProduct,
  deletOneProduct,
  getPublishedProduct,
};
