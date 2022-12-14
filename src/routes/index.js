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
        "price": 27000,
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

const isAdmin = true;

router.get("/api/productos/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === Number(id));

  res.render("product", product);
});

router.get("/api/productos", (req, res) => {
  res.render("products", { products, hasAny: true });
});

isAdmin
  ? router.get("/api/productos/carga", (req, res) => {
      res.render("productForm");
    })
  : router.get("/api/productos/carga", (req, res) => {
      res.render("notAdmin");
    });

isAdmin
  ? router.post("/api/productos/carga", (req, res) => {
      const { name, price, thumbnail } = req.body;
      const maxId = products.length;

      products.push({
        title: name,
        price: price,
        thumbnail: thumbnail,
        id: maxId + 1,
      });
      console.log(products);

      res.redirect("/api/productos");
    })
  : router.post("/carga", (req, res) => {
      res.render("notAdmin");
    });

isAdmin
? router.get("/api/productos/editar", (req, res) => {
    res.render("putForm");
  })
: router.get("/api/productos/editar", (req, res) => {
    res.render("notAdmin");
  });
  

  isAdmin
?  router.put("/api/productos/editar", (req, res) => {
    const {id} = req.body.id;
    const updateProd = req.body;
    
    products.splice((Number(id)-1), 1)

    products.push({ title:updateProd.name,
                    price:updateProd.price,
                    thumbnail:updateProd.thumbnail,
                    id: Number(id)});
    console.log(updateProd)

    res.redirect("/api/productos/editar");
})

: router.put("/api/productos/editar", (req, res) => {
  res.render("notAdmin");
});

isAdmin
?  router.delete("/api/productos/:id", (req, res) => {
  const { id } = req.params;
  products.splice((Number(id)-1), 1);

  res.render("product", product);
})

: router.delete("/api/productos/:id", (req, res) => {
  res.render("notAdmin");
});

export default router;


// router.get("/product", (req, res) => {
//   res.render("products", { products });
// });