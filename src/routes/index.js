import { Router } from "express";


const router = Router();

const products = [
    
    {
        "title": "Tanque 500",
        "price": 21000,
        "thumbnail": "./img/maral60.jpg",
        "id": 1
      },
    {
        "title": "Vanitory Maral 60",
        "price": 21000,
        "thumbnail": "./img/maral60.jpg",
        "id": 2
      },
      {
        "title": "Vanitory standard 50",
        "price": 17000,
        "thumbnail": "./img/std50.jpg",
        "id": 3
      },
      
]

router.get("/product/:id", (req, res)=> {
    const {id} = req.params;
        const product = products.find(product=> product.id === Number(id));

        res.render("product", product);
    });

router.get("/product", (req, res)=> {
    res.render("products", { products, hasAny: true });
    });

router.get("/", (req, res) => {
    res.render("productForm")
});

router.post('/', (req, res) => {
    const { name, price, thumbnail } = req.body;
    const maxId = products.length;

    products.push({ title:name , price:price , thumbnail:thumbnail , id: maxId + 1});
    console.log(products)


    res.redirect("/");
});

router.get("/product", (req, res) => {
    res.render("products", { products });
});

export default router;
