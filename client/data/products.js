
const tshirtImages = [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=85"
];

const oversizedImages = [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=700&q=85"
];

const shirtImages = [
    "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1604695573706-53170668f6a6?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&w=700&q=85"
];

const jeansImages = [
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=700&q=85"
];

const capImages = [
    "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=700&q=85"
];

const hoodieImages = [
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=700&q=85",
    "https://images.unsplash.com/photo-1572495532141-4b8a2d1e3e4e?auto=format&fit=crop&w=700&q=85"
];

/* =========================
   PRODUCT CREATOR
========================= */

const makeProducts = (
    names,
    category,
    gender,
    images,
    startingPrice,
    sizes,
    description
) => {
    return names.map((name, index) => {
        const price =
            startingPrice + (index % 5) * 100;

        const discount =
            10 + (index % 4) * 5;

        const oldPrice = Math.round(
            price / (1 - discount / 100)
        );

        return {
            id:
                category
                    .replace(/\s/g, "")
                    .toLowerCase() +
                "-" +
                (index + 1),

            name,

            category,

            gender,

            price,

            oldPrice,

            discount: `${discount}% OFF`,

            size: sizes,

            stock: 10 + (index % 15),

            image:
                images[index % images.length],

            description
        };
    });
};

/* =========================
   T-SHIRTS - 20
========================= */

const tshirts = makeProducts(
    [
        "Classic Black T-Shirt",
        "Essential White T-Shirt",
        "Urban Grey T-Shirt",
        "Navy Blue Basic T-Shirt",
        "Olive Green T-Shirt",
        "Maroon Casual T-Shirt",
        "Beige Everyday T-Shirt",
        "Sky Blue Cotton T-Shirt",
        "Charcoal Graphic T-Shirt",
        "Rust Orange T-Shirt",
        "Cream Minimal T-Shirt",
        "Forest Green T-Shirt",
        "Royal Blue T-Shirt",
        "Wine Red T-Shirt",
        "Black Graphic T-Shirt",
        "White Minimal T-Shirt",
        "Brown Casual T-Shirt",
        "Lavender Cotton T-Shirt",
        "Dark Green T-Shirt",
        "Stone Grey T-Shirt"
    ],
    "T-Shirts",
    "Men",
    tshirtImages,
    599,
    "S,M,L,XL",
    "Comfortable everyday cotton T-shirt designed for casual style and easy wear."
);

/* =========================
   OVERSIZED T-SHIRTS - 20
========================= */

const oversizedTshirts = makeProducts(
    [
        "Oversized Black Street T-Shirt",
        "Oversized White Essential T-Shirt",
        "Oversized Grey Drop Shoulder T-Shirt",
        "Oversized Beige Streetwear T-Shirt",
        "Oversized Brown T-Shirt",
        "Oversized Green T-Shirt",
        "Oversized Navy T-Shirt",
        "Oversized Cream T-Shirt",
        "Oversized Charcoal T-Shirt",
        "Oversized Blue Street T-Shirt",
        "Oversized Maroon T-Shirt",
        "Oversized Olive T-Shirt",
        "Oversized Sand T-Shirt",
        "Oversized Rust T-Shirt",
        "Oversized Black Graphic T-Shirt",
        "Oversized White Graphic T-Shirt",
        "Oversized Purple T-Shirt",
        "Oversized Dark Green T-Shirt",
        "Oversized Stone T-Shirt",
        "Oversized Sky Blue T-Shirt"
    ],
    "Oversized T-Shirts",
    "Men",
    oversizedImages,
    699,
    "S,M,L,XL",
    "Relaxed oversized fit with a modern streetwear look and comfortable fabric."
);

/* =========================
   SHIRTS - 20
========================= */

const shirts = makeProducts(
    [
        "Classic White Casual Shirt",
        "Black Oxford Shirt",
        "Navy Blue Casual Shirt",
        "Sky Blue Cotton Shirt",
        "Beige Linen Shirt",
        "Olive Casual Shirt",
        "Brown Check Shirt",
        "Blue Check Shirt",
        "Maroon Casual Shirt",
        "Cream Linen Shirt",
        "Grey Oxford Shirt",
        "Green Casual Shirt",
        "White Stripe Shirt",
        "Blue Stripe Shirt",
        "Black Casual Shirt",
        "Rust Linen Shirt",
        "Denim Blue Shirt",
        "Khaki Casual Shirt",
        "Charcoal Shirt",
        "Off White Casual Shirt"
    ],
    "Shirts",
    "Men",
    shirtImages,
    899,
    "S,M,L,XL",
    "Smart casual shirt made for everyday outfits, college wear and weekend styling."
);

/* =========================
   JEANS - 20
========================= */

const jeans = makeProducts(
    [
        "Classic Blue Straight Jeans",
        "Black Slim Fit Jeans",
        "Dark Blue Regular Jeans",
        "Light Blue Relaxed Jeans",
        "Washed Blue Jeans",
        "Charcoal Straight Jeans",
        "Mid Blue Slim Jeans",
        "Black Regular Jeans",
        "Vintage Blue Jeans",
        "Dark Grey Jeans",
        "Light Wash Denim Jeans",
        "Indigo Straight Jeans",
        "Stone Wash Jeans",
        "Deep Blue Denim Jeans",
        "Grey Slim Fit Jeans",
        "Black Street Jeans",
        "Blue Relaxed Fit Jeans",
        "Dark Indigo Jeans",
        "Faded Blue Jeans",
        "Classic Black Denim"
    ],
    "Jeans",
    "Men",
    jeansImages,
    1299,
    "28,30,32,34,36,38",
    "Classic denim jeans with a comfortable fit suitable for everyday casual outfits."
);

/* =========================
   CAPS - 20
========================= */

const caps = makeProducts(
    [
        "Classic Black Cap",
        "White Minimal Cap",
        "Navy Blue Cap",
        "Grey Everyday Cap",
        "Olive Green Cap",
        "Beige Cotton Cap",
        "Maroon Street Cap",
        "Brown Casual Cap",
        "Black Logo Cap",
        "Blue Denim Cap",
        "Cream Cap",
        "Forest Green Cap",
        "Charcoal Cap",
        "Rust Orange Cap",
        "Royal Blue Cap",
        "Stone Grey Cap",
        "Black Streetwear Cap",
        "Khaki Cap",
        "Dark Green Cap",
        "Washed Black Cap"
    ],
    "Caps",
    "Unisex",
    capImages,
    399,
    "Free Size",
    "Comfortable everyday cap with an adjustable fit and clean modern styling."
);

/* =========================
   HOODIES - 20
========================= */

const hoodies = makeProducts(
    [
        "Classic Black Hoodie",
        "Essential Grey Hoodie",
        "Cream Oversized Hoodie",
        "Navy Blue Hoodie",
        "Olive Green Hoodie",
        "Brown Street Hoodie",
        "Maroon Fleece Hoodie",
        "Beige Casual Hoodie",
        "Charcoal Hoodie",
        "Forest Green Hoodie",
        "White Minimal Hoodie",
        "Royal Blue Hoodie",
        "Rust Orange Hoodie",
        "Black Graphic Hoodie",
        "Grey Oversized Hoodie",
        "Dark Green Hoodie",
        "Stone Hoodie",
        "Wine Red Hoodie",
        "Sand Beige Hoodie",
        "Midnight Blue Hoodie"
    ],
    "Hoodies",
    "Men",
    hoodieImages,
    999,
    "S,M,L,XL",
    "Soft and comfortable hoodie designed for casual everyday wear and streetwear styling."
);

/* =========================
   ALL 120 PRODUCTS
========================= */

const styleCartProducts = [
    ...tshirts,
    ...oversizedTshirts,
    ...shirts,
    ...jeans,
    ...caps,
    ...hoodies
];

export default styleCartProducts;

