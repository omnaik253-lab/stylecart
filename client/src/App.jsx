import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5001/api";

/* =========================================================
   STYLECART PRODUCT ART
========================================================= */

const colorMap = {
    black: "#222222",
    white: "#F4F4F2",
    grey: "#858585",
    gray: "#858585",
    charcoal: "#454545",
    navy: "#263B63",
    blue: "#376BA5",
    "sky blue": "#78A9D2",
    royal: "#315DA5",
    indigo: "#304A73",
    olive: "#687448",
    green: "#3E704F",
    "dark green": "#31563F",
    forest: "#315B45",
    maroon: "#7B3044",
    wine: "#68263C",
    rust: "#B65D3F",
    orange: "#D2783E",
    beige: "#D8C2A4",
    cream: "#EEE2CC",
    brown: "#78563E",
    lavender: "#A99BC8",
    purple: "#73568E",
    sand: "#D2BE9E",
    stone: "#A8A39B",
    khaki: "#A7986A"
};

const fallbackColors = [
    "#222222",
    "#F4F4F2",
    "#858585",
    "#263B63",
    "#687448",
    "#7B3044",
    "#D8C2A4",
    "#78A9D2",
    "#454545",
    "#B65D3F",
    "#EEE2CC",
    "#315B45"
];

function getProductColor(name = "", index = 0) {
    const text = name.toLowerCase();

    const orderedColors = [
        "sky blue",
        "dark green",
        "royal",
        "indigo",
        "forest",
        "navy",
        "olive",
        "maroon",
        "charcoal",
        "lavender",
        "purple",
        "brown",
        "rust",
        "orange",
        "beige",
        "cream",
        "khaki",
        "stone",
        "grey",
        "gray",
        "black",
        "white",
        "blue",
        "green",
        "red"
    ];

    for (const colorName of orderedColors) {
        if (text.includes(colorName)) {
            return colorMap[colorName] || fallbackColors[index % fallbackColors.length];
        }
    }

    return fallbackColors[index % fallbackColors.length];
}

function getGarmentType(category = "", name = "") {
    const text = `${category} ${name}`.toLowerCase();

    if (text.includes("jean")) return "jeans";
    if (text.includes("cap")) return "cap";
    if (text.includes("hoodie")) return "hoodie";
    if (text.includes("shirt") && !text.includes("t-shirt")) return "shirt";
    if (text.includes("oversized")) return "oversized";
    if (text.includes("dress")) return "dress";

    return "tshirt";
}

function getPrintType(name = "", index = 0) {
    const text = name.toLowerCase();

    if (text.includes("graphic")) return "graphic";
    if (text.includes("logo")) return "logo";
    if (text.includes("check")) return "check";
    if (text.includes("stripe")) return "stripe";

    const types = ["minimal", "stripe", "dots", "graphic", "logo", "check"];

    return types[index % types.length];
}

function getPrint(color, type) {
    const dark = "#171717";
    const light = "#FFFFFF";

    if (type === "stripe") {
        return `
            <g opacity="0.20">
                <rect x="210" y="270" width="180" height="18" fill="${dark}"/>
                <rect x="210" y="315" width="180" height="18" fill="${dark}"/>
                <rect x="210" y="360" width="180" height="18" fill="${dark}"/>
                <rect x="210" y="405" width="180" height="18" fill="${dark}"/>
            </g>
        `;
    }

    if (type === "dots") {
        return `
            <g fill="${dark}" opacity="0.22">
                <circle cx="250" cy="310" r="7"/>
                <circle cx="300" cy="310" r="7"/>
                <circle cx="350" cy="310" r="7"/>
                <circle cx="275" cy="355" r="7"/>
                <circle cx="325" cy="355" r="7"/>
                <circle cx="250" cy="400" r="7"/>
                <circle cx="300" cy="400" r="7"/>
                <circle cx="350" cy="400" r="7"/>
            </g>
        `;
    }

    if (type === "check") {
        return `
            <g opacity="0.16" fill="${dark}">
                <rect x="225" y="285" width="42" height="42"/>
                <rect x="309" y="285" width="42" height="42"/>
                <rect x="267" y="327" width="42" height="42"/>
                <rect x="351" y="327" width="42" height="42"/>
                <rect x="225" y="369" width="42" height="42"/>
                <rect x="309" y="369" width="42" height="42"/>
            </g>
        `;
    }

    if (type === "graphic") {
        return `
            <g>
                <circle cx="300" cy="350" r="48" fill="${light}" opacity="0.90"/>
                <text
                    x="300"
                    y="362"
                    text-anchor="middle"
                    font-size="28"
                    font-family="Arial, sans-serif"
                    font-weight="700"
                    fill="${dark}"
                >SC</text>
            </g>
        `;
    }

    if (type === "logo") {
        return `
            <text
                x="300"
                y="365"
                text-anchor="middle"
                font-size="28"
                font-family="Arial, sans-serif"
                font-weight="700"
                letter-spacing="4"
                fill="${light}"
                opacity="0.88"
            >STYLE</text>
        `;
    }

    if (type === "minimal") {
        return `
            <circle
                cx="300"
                cy="350"
                r="12"
                fill="${light}"
                opacity="0.8"
            />
        `;
    }

    return "";
}

function createProductArtwork(name = "", category = "", index = 0) {
    const color = getProductColor(name, index);
    const printType = getPrintType(name, index);
    const garment = getGarmentType(category, name);
    const print = getPrint(color, printType);

    const uniqueId = `shadow-${index}-${String(name).length}`;

    let garmentMarkup = "";

    if (garment === "jeans") {
        garmentMarkup = `
            <path
                d="M215 205 L385 205 L365 525 L315 525 L300 350 L285 525 L235 525 Z"
                fill="${color}"
            />
            <path
                d="M215 205 L300 205 L300 350 L285 525 L235 525 Z"
                fill="${color}"
            />
            <path
                d="M300 205 L385 205 L365 525 L315 525 L300 350 Z"
                fill="${color}"
                opacity="0.92"
            />
            <rect
                x="220"
                y="195"
                width="160"
                height="42"
                rx="8"
                fill="${color}"
            />
            <line
                x1="300"
                y1="235"
                x2="300"
                y2="500"
                stroke="#171717"
                stroke-width="3"
                opacity="0.18"
            />
            <path
                d="M225 245 L275 270"
                stroke="#171717"
                stroke-width="3"
                opacity="0.18"
            />
            <path
                d="M325 270 L375 245"
                stroke="#171717"
                stroke-width="3"
                opacity="0.18"
            />
        `;
    } else if (garment === "cap") {
        garmentMarkup = `
            <path
                d="M210 350
                   Q215 255 300 245
                   Q385 255 390 350
                   L365 375
                   Q300 395 235 375 Z"
                fill="${color}"
            />
            <path
                d="M300 245
                   Q320 300 390 350
                   Q340 330 300 330
                   Q260 330 210 350
                   Q280 300 300 245 Z"
                fill="${color}"
                opacity="0.90"
            />
            <path
                d="M235 375 Q300 405 365 375"
                fill="none"
                stroke="#171717"
                stroke-width="5"
                opacity="0.18"
            />
            <text
                x="300"
                y="325"
                text-anchor="middle"
                font-size="24"
                font-family="Arial, sans-serif"
                font-weight="700"
                fill="#FFFFFF"
                opacity="0.9"
            >SC</text>
        `;
    } else if (garment === "hoodie") {
        garmentMarkup = `
            <path
                d="M250 165
                   Q300 115 350 165
                   L400 205
                   L455 355
                   L395 385
                   L365 310
                   L365 520
                   L235 520
                   L235 310
                   L205 385
                   L145 355
                   L200 205 Z"
                fill="${color}"
            />

            <path
                d="M250 165
                   Q300 225 350 165
                   Q340 120 300 115
                   Q260 120 250 165"
                fill="${color}"
                stroke="#171717"
                stroke-width="3"
                opacity="0.96"
            />

            <path
                d="M265 180 Q300 205 335 180"
                fill="none"
                stroke="#171717"
                stroke-width="4"
                opacity="0.20"
            />

            <path
                d="M260 400 Q300 420 340 400"
                fill="none"
                stroke="#171717"
                stroke-width="4"
                opacity="0.16"
            />

            ${print}
        `;
    } else if (garment === "shirt") {
        garmentMarkup = `
            <path
                d="M250 165
                   L290 145
                   L300 175
                   L310 145
                   L350 165
                   L405 210
                   L370 275
                   L345 250
                   L345 520
                   L255 520
                   L255 250
                   L230 275
                   L195 210 Z"
                fill="${color}"
            />

            <path
                d="M290 145 L300 175 L310 145"
                fill="none"
                stroke="#171717"
                stroke-width="4"
                opacity="0.30"
            />

            <line
                x1="300"
                y1="180"
                x2="300"
                y2="510"
                stroke="#171717"
                stroke-width="3"
                opacity="0.18"
            />

            <circle cx="300" cy="245" r="4" fill="#171717" opacity="0.35"/>
            <circle cx="300" cy="295" r="4" fill="#171717" opacity="0.35"/>
            <circle cx="300" cy="345" r="4" fill="#171717" opacity="0.35"/>
            <circle cx="300" cy="395" r="4" fill="#171717" opacity="0.35"/>

            ${print}
        `;
    } else if (garment === "dress") {
        garmentMarkup = `
            <path
                d="M270 170
                   L285 145
                   L315 145
                   L330 170
                   L345 255
                   L415 520
                   L185 520
                   L255 255 Z"
                fill="${color}"
            />
            <path
                d="M270 170 L300 210 L330 170"
                fill="none"
                stroke="#171717"
                stroke-width="4"
                opacity="0.18"
            />
            ${print}
        `;
    } else if (garment === "oversized") {
        garmentMarkup = `
            <path
                d="M225 150
                   L270 125
                   Q300 160 330 125
                   L375 150
                   L455 220
                   L410 310
                   L365 275
                   L365 535
                   L235 535
                   L235 275
                   L190 310
                   L145 220 Z"
                fill="${color}"
            />

            <path
                d="M270 125 Q300 165 330 125"
                fill="none"
                stroke="#171717"
                stroke-width="5"
                opacity="0.25"
            />

            ${print}
        `;
    } else {
        garmentMarkup = `
            <path
                d="M250 165
                   L285 140
                   Q300 170 315 140
                   L350 165
                   L410 215
                   L370 285
                   L335 250
                   L335 520
                   L265 520
                   L265 250
                   L230 285
                   L190 215 Z"
                fill="${color}"
            />

            <path
                d="M285 140 Q300 175 315 140"
                fill="none"
                stroke="#171717"
                stroke-width="5"
                opacity="0.25"
            />

            ${print}
        `;
    }

    const svg = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="700"
            height="800"
            viewBox="0 0 600 650"
        >
            <defs>
                <filter id="${uniqueId}" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow
                        dx="0"
                        dy="14"
                        stdDeviation="12"
                        flood-color="#000000"
                        flood-opacity="0.18"
                    />
                </filter>
            </defs>

            <rect
                width="600"
                height="650"
                rx="30"
                fill="#F8E8F0"
            />

            <circle
                cx="300"
                cy="310"
                r="220"
                fill="#FFFFFF"
                opacity="0.72"
            />

            <ellipse
                cx="300"
                cy="540"
                rx="155"
                ry="22"
                fill="#171717"
                opacity="0.10"
            />

            <g filter="url(#${uniqueId})">
                ${garmentMarkup}
            </g>

            <text
                x="300"
                y="605"
                text-anchor="middle"
                font-size="17"
                font-family="Arial, sans-serif"
                font-weight="700"
                letter-spacing="3"
                fill="#7B2D5F"
            >STYLECART</text>
        </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

/* =========================================================
   PRODUCT DATA
========================================================= */

const productNames = {
    "T-Shirts": [
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

    "Oversized T-Shirts": [
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

    Shirts: [
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

    Jeans: [
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

    Caps: [
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

    Hoodies: [
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
    ]
};

const categoryPrices = {
    "T-Shirts": 599,
    "Oversized T-Shirts": 699,
    Shirts: 899,
    Jeans: 1299,
    Caps: 399,
    Hoodies: 999
};

const categorySizes = {
    "T-Shirts": "S,M,L,XL",
    "Oversized T-Shirts": "S,M,L,XL",
    Shirts: "S,M,L,XL",
    Jeans: "28,30,32,34,36",
    Caps: "Free Size",
    Hoodies: "S,M,L,XL"
};

/* =========================================================
   LOCATION DATA
========================================================= */

const countries = [
    "India",
    "United Arab Emirates",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia"
];

const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
];

const countryStates = {
    "United Arab Emirates": [
        "Abu Dhabi",
        "Dubai",
        "Sharjah",
        "Ajman"
    ],
    "United States": [
        "California",
        "Florida",
        "New York",
        "Texas"
    ],
    "United Kingdom": [
        "England",
        "Scotland",
        "Wales",
        "Northern Ireland"
    ],
    Canada: [
        "Ontario",
        "Quebec",
        "British Columbia",
        "Alberta"
    ],
    Australia: [
        "New South Wales",
        "Victoria",
        "Queensland",
        "Western Australia"
    ]
};

function createProducts() {
    const products = [];
    let id = 100;

    Object.entries(productNames).forEach(([category, names]) => {
        names.forEach((name, index) => {
            products.push({
                id: id++,
                name,
                category,
                price: categoryPrices[category] + (index % 5) * 100,
                size: categorySizes[category],
                description: `Premium ${category.toLowerCase()} designed for everyday comfort and modern style.`,
                image: createProductArtwork(name, category, index),
                stock: 10 + (index % 20)
            });
        });
    });

    return products;
}

const demoProducts = createProducts();

/* =========================================================
   APP
========================================================= */

function App() {
    const [databaseProducts, setDatabaseProducts] = useState([]);
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);

    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");

    const [showCart, setShowCart] = useState(false);
    const [showWishlist, setShowWishlist] = useState(false);

    const [showAuth, setShowAuth] = useState(false);
    const [authMode, setAuthMode] = useState("login");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [showCheckout, setShowCheckout] = useState(false);
    const [checkoutProduct, setCheckoutProduct] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        address: "",
        country: "India",
        city: "",
        state: "",
        pincode: "",
        paymentMethod: "Cash on Delivery"
    });

    /* =========================================================
       LOAD PRODUCTS
    ========================================================= */

    useEffect(() => {
        axios
            .get(`${API}/products`)
            .then((response) => {
                const products = (response.data || []).map(
                    (product, index) => ({
                        ...product,
                        image: createProductArtwork(
                            product.name || "StyleCart Product",
                            product.category || "T-Shirts",
                            index + 50
                        )
                    })
                );

                setDatabaseProducts(products);
            })
            .catch((error) => {
                console.error("Products API error:", error.message);
                setDatabaseProducts([]);
            });
    }, []);

    const allProducts = useMemo(() => {
        return [...databaseProducts, ...demoProducts];
    }, [databaseProducts]);

    const filteredProducts = useMemo(() => {
        let result = allProducts;

        if (category !== "All") {
            result = result.filter(
                (product) =>
                    product.category?.toLowerCase() ===
                    category.toLowerCase()
            );
        }

        if (search.trim()) {
            const text = search.toLowerCase();

            result = result.filter(
                (product) =>
                    product.name?.toLowerCase().includes(text) ||
                    product.category?.toLowerCase().includes(text)
            );
        }

        return result;
    }, [allProducts, category, search]);

    const cartTotal = cart.reduce(
        (total, item) =>
            total + Number(item.price) * item.quantity,
        0
    );

    const getSizesForProduct = (product) => {
        if (!product) return [];

        return String(product.size || "")
            .split(",")
            .map((size) => size.trim())
            .filter(Boolean);
    };

    /* =========================================================
       LOGIN
    ========================================================= */

    const requireLogin = (action) => {
        if (!isLoggedIn) {
            setAuthMode("login");
            setShowAuth(true);
            return false;
        }

        action();
        return true;
    };

    const handleLogin = (event) => {
        event.preventDefault();

        setIsLoggedIn(true);
        setShowAuth(false);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setCart([]);
        setWishlist([]);
    };

    /* =========================================================
       CART
    ========================================================= */

    const addToCart = (product, size = "") => {
        requireLogin(() => {
            const availableSizes = getSizesForProduct(product);

            if (availableSizes.length > 1 && !size) {
                setSelectedProduct(product);
                setSelectedSize("");
                return;
            }

            const finalSize =
                size || availableSizes[0] || "Free Size";

            setCart((previous) => {
                const existing = previous.find(
                    (item) =>
                        item.id === product.id &&
                        item.selectedSize === finalSize
                );

                if (existing) {
                    return previous.map((item) =>
                        item.id === product.id &&
                        item.selectedSize === finalSize
                            ? {
                                  ...item,
                                  quantity: item.quantity + 1
                              }
                            : item
                    );
                }

                return [
                    ...previous,
                    {
                        ...product,
                        quantity: 1,
                        selectedSize: finalSize
                    }
                ];
            });

            setSelectedProduct(null);
            setSelectedSize("");
        });
    };

    const removeFromCart = (id, size) => {
        setCart((previous) =>
            previous.filter(
                (item) =>
                    !(
                        item.id === id &&
                        item.selectedSize === size
                    )
            )
        );
    };

    const updateQuantity = (id, size, amount) => {
        setCart((previous) =>
            previous.map((item) =>
                item.id === id &&
                item.selectedSize === size
                    ? {
                          ...item,
                          quantity: Math.max(
                              1,
                              item.quantity + amount
                          )
                      }
                    : item
            )
        );
    };

    /* =========================================================
       WISHLIST
    ========================================================= */

    const toggleWishlist = (product) => {
        requireLogin(() => {
            setWishlist((previous) => {
                const exists = previous.some(
                    (item) => item.id === product.id
                );

                if (exists) {
                    return previous.filter(
                        (item) => item.id !== product.id
                    );
                }

                return [...previous, product];
            });
        });
    };

    /* =========================================================
       PRODUCT
    ========================================================= */

    const openProduct = (product) => {
        setSelectedProduct(product);
        setSelectedSize("");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    const buyNow = (product, size = "") => {
        requireLogin(() => {
            const availableSizes = getSizesForProduct(product);

            if (availableSizes.length > 1 && !size) {
                setSelectedProduct(product);
                setSelectedSize("");
                return;
            }

            const finalSize =
                size || availableSizes[0] || "Free Size";

            setCheckoutProduct({
                ...product,
                selectedSize: finalSize,
                quantity: 1
            });

            setShowCheckout(true);
            setSelectedProduct(null);
            setSelectedSize("");
        });
    };

    const checkoutCart = () => {
        if (cart.length === 0) return;

        requireLogin(() => {
            setCheckoutProduct(null);
            setShowCart(false);
            setShowCheckout(true);
        });
    };

    /* =========================================================
       CHECKOUT
    ========================================================= */

    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;

        setCustomer({
            ...customer,
            country: selectedCountry,
            state: ""
        });
    };

    const getStateOptions = () => {
        if (customer.country === "India") {
            return indianStates;
        }

        return countryStates[customer.country] || [];
    };

    const handlePhoneChange = (event) => {
        const value = event.target.value
            .replace(/\D/g, "")
            .slice(0, 10);

        setCustomer({
            ...customer,
            phone: value
        });
    };

    const handlePincodeChange = (event) => {
        const value = event.target.value
            .replace(/\D/g, "")
            .slice(0, 6);

        setCustomer({
            ...customer,
            pincode: value
        });
    };

    /* =========================================================
       PLACE ORDER
    ========================================================= */

    const placeOrder = async (event) => {
        event.preventDefault();

        if (customer.name.trim().length < 2) {
            alert("Please enter your full name.");
            return;
        }

        if (customer.phone.length !== 10) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        if (customer.address.trim().length < 5) {
            alert("Please enter your delivery address.");
            return;
        }

        if (!customer.country) {
            alert("Please select your country.");
            return;
        }

        if (!customer.city.trim()) {
            alert("Please enter your city.");
            return;
        }

        if (!customer.state) {
            alert("Please select your state.");
            return;
        }

        if (customer.pincode.length !== 6) {
            alert("Please enter a valid 6-digit pincode.");
            return;
        }

        if (!customer.paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        const total = checkoutProduct
            ? Number(checkoutProduct.price)
            : cartTotal;

        try {
            const response = await axios.post(`${API}/orders`, {
                customerName: customer.name.trim(),
                phone: customer.phone,
                address: customer.address.trim(),
                country: customer.country,
                city: customer.city.trim(),
                state: customer.state,
                pincode: customer.pincode,
                paymentMethod: customer.paymentMethod,
                totalAmount: total
            });

            console.log("ORDER SAVED:", response.data);

            setShowCheckout(false);
            setOrderPlaced(true);
            setCart([]);
            setCheckoutProduct(null);

        } catch (error) {
            console.error(
                "ORDER ERROR:",
                error.response?.data || error.message
            );

            const serverMessage =
                error.response?.data?.error ||
                error.response?.data?.message ||
                error.message;

            alert(
                `Order could not be saved.\n\n${serverMessage}`
            );
        }
    };

    /* =========================================================
       CATEGORY
    ========================================================= */

    const selectCategory = (value) => {
        setCategory(value);
        setShowCart(false);
        setShowWishlist(false);

        setTimeout(() => {
            document
                .getElementById("products")
                ?.scrollIntoView({
                    behavior: "smooth"
                });
        }, 50);
    };

    return (
        <div className="app">

            {/* =================================================
                NAVBAR
            ================================================= */}

            <header className="navbar">

                <div className="nav-left">

                    <button
                        className="logo"
                        onClick={() => {
                            setCategory("All");
                            setSearch("");
                            window.scrollTo({
                                top: 0,
                                behavior: "smooth"
                            });
                        }}
                    >
                        Style<span>Cart</span>
                    </button>

                    <nav>
                        <button
                            onClick={() =>
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth"
                                })
                            }
                        >
                            Home
                        </button>

                        <button
                            onClick={() =>
                                document
                                    .getElementById("products")
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    })
                            }
                        >
                            Products
                        </button>

                        <button
                            onClick={() =>
                                document
                                    .getElementById("categories")
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    })
                            }
                        >
                            Categories
                        </button>
                    </nav>

                </div>

                <div className="nav-right">

                    {searchOpen && (
                        <div className="search-box">

                            <span>⌕</span>

                            <input
                                autoFocus
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search products..."
                            />

                        </div>
                    )}

                    <button
                        className="nav-icon"
                        onClick={() =>
                            setSearchOpen(!searchOpen)
                        }
                        title="Search"
                    >
                        🔍
                    </button>

                    <button
                        className="nav-icon"
                        style={{
                            width: "48px",
                            height: "48px",
                            fontSize: "25px"
                        }}
                        onClick={() => {
                            requireLogin(() => {
                                setShowWishlist(true);
                                setShowCart(false);
                            });
                        }}
                        title="Wishlist"
                    >
                        ♡

                        {wishlist.length > 0 && (
                            <span className="count">
                                {wishlist.length}
                            </span>
                        )}
                    </button>

                    <button
                        className="nav-icon"
                        style={{
                            width: "48px",
                            height: "48px",
                            fontSize: "23px"
                        }}
                        onClick={() => {
                            requireLogin(() => {
                                setShowCart(true);
                                setShowWishlist(false);
                            });
                        }}
                        title="Bag"
                    >
                        🛍

                        {cart.length > 0 && (
                            <span className="count">
                                {cart.length}
                            </span>
                        )}
                    </button>

                    <button
                        className="account-button"
                        onClick={() => {
                            if (isLoggedIn) {
                                handleLogout();
                            } else {
                                setAuthMode("login");
                                setShowAuth(true);
                            }
                        }}
                    >
                        {isLoggedIn ? "Logout" : "Account"}
                    </button>

                </div>

            </header>

            {/* =================================================
                HERO
            ================================================= */}

            <section className="hero">

                <div className="hero-content">

                    <p className="eyebrow">
                        THE NEW STYLE EDIT
                    </p>

                    <h1>
                        Wear Your
                        <br />
                        <span>Own Story.</span>
                    </h1>

                    <p className="hero-text">
                        Discover everyday essentials, streetwear and
                        timeless pieces made for your style.
                    </p>

                    <button
                        className="primary-button"
                        onClick={() =>
                            document
                                .getElementById("products")
                                ?.scrollIntoView({
                                    behavior: "smooth"
                                })
                        }
                    >
                        Shop Collection →
                    </button>

                </div>

                <div className="hero-visual">

                    <div className="hero-circle"></div>

                    <img
                        src={createProductArtwork(
                            "Oversized Black Graphic T-Shirt",
                            "Oversized T-Shirts",
                            99
                        )}
                        alt="StyleCart clothing"
                    />

                    <div className="hero-tag">
                        <strong>NEW</strong>
                        <span>2026 COLLECTION</span>
                    </div>

                </div>

            </section>

            {/* =================================================
                CATEGORIES
            ================================================= */}

            <section
                className="categories-section"
                id="categories"
            >

                <div className="section-heading">

                    <div>

                        <p className="eyebrow">
                            SHOP BY STYLE
                        </p>

                        <h2>Categories</h2>

                    </div>

                    <span className="category-hint">
                        {category === "All"
                            ? "Showing everything"
                            : `Showing ${category}`}
                    </span>

                </div>

                <div className="category-buttons">

                    {[
                        "All",
                        "T-Shirts",
                        "Oversized T-Shirts",
                        "Shirts",
                        "Jeans",
                        "Caps",
                        "Hoodies"
                    ].map((item) => (

                        <button
                            key={item}
                            className={
                                category === item
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                selectCategory(item)
                            }
                        >
                            {item}
                        </button>

                    ))}

                </div>

            </section>

            {/* =================================================
                PRODUCTS
            ================================================= */}

            <section
                className="products-section"
                id="products"
            >

                <div className="section-heading">

                    <div>

                        <p className="eyebrow">
                            CURATED FOR YOU
                        </p>

                        <h2>
                            {category === "All"
                                ? "Trending Now"
                                : category}
                        </h2>

                    </div>

                    <span className="product-count">
                        {filteredProducts.length} products
                    </span>

                </div>

                {filteredProducts.length === 0 ? (

                    <div className="empty-state">

                        <div>⌕</div>

                        <h3>No products found</h3>

                        <p>
                            Try another search or category.
                        </p>

                        <button
                            className="primary-button"
                            onClick={() => {
                                setCategory("All");
                                setSearch("");
                            }}
                        >
                            View All Products
                        </button>

                    </div>

                ) : (

                    <div className="product-grid">

                        {filteredProducts.map((product) => (

                            <div
                                className="product-card"
                                key={`${product.category}-${product.id}`}
                            >

                                <div
                                    className="product-image"
                                    onClick={() =>
                                        openProduct(product)
                                    }
                                >

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                    />

                                    <button
                                        className={`heart-button ${
                                            wishlist.some(
                                                (item) =>
                                                    item.id ===
                                                    product.id
                                            )
                                                ? "liked"
                                                : ""
                                        }`}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            toggleWishlist(product);
                                        }}
                                    >
                                        {wishlist.some(
                                            (item) =>
                                                item.id ===
                                                product.id
                                        )
                                            ? "♥"
                                            : "♡"}
                                    </button>

                                    <span className="quick-view">
                                        Quick View
                                    </span>

                                </div>

                                <div className="product-info">

                                    <p className="product-category">
                                        {product.category}
                                    </p>

                                    <h3>{product.name}</h3>

                                    <div className="product-bottom">

                                        <strong>
                                            ₹
                                            {Number(
                                                product.price
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </strong>

                                        <button
                                            className="add-button"
                                            onClick={() =>
                                                addToCart(product)
                                            }
                                        >
                                            + Add
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

            {/* =================================================
                PRODUCT DETAIL
            ================================================= */}

            {selectedProduct && (

                <div
                    className="overlay"
                    onClick={() =>
                        setSelectedProduct(null)
                    }
                >

                    <div
                        className="product-detail-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <button
                            className="close-button"
                            onClick={() =>
                                setSelectedProduct(null)
                            }
                        >
                            ×
                        </button>

                        <div className="detail-image">

                            <img
                                src={selectedProduct.image}
                                alt={selectedProduct.name}
                            />

                        </div>

                        <div className="detail-info">

                            <p className="product-category">
                                {selectedProduct.category}
                            </p>

                            <h2>
                                {selectedProduct.name}
                            </h2>

                            <div className="detail-price">
                                ₹
                                {Number(
                                    selectedProduct.price
                                ).toLocaleString("en-IN")}
                            </div>

                            <p className="detail-description">
                                {selectedProduct.description}
                            </p>

                            <div className="size-area">

                                <strong>
                                    Select Size
                                </strong>

                                <div className="sizes">

                                    {getSizesForProduct(
                                        selectedProduct
                                    ).map((size) => (

                                        <button
                                            type="button"
                                            key={size}
                                            onClick={() =>
                                                setSelectedSize(size)
                                            }
                                            style={{
                                                border:
                                                    selectedSize === size
                                                        ? "2px solid #7B2D5F"
                                                        : "1px solid #ddd",
                                                background:
                                                    selectedSize === size
                                                        ? "#F8E8F0"
                                                        : "#fff",
                                                color:
                                                    selectedSize === size
                                                        ? "#7B2D5F"
                                                        : "#171717",
                                                fontWeight:
                                                    selectedSize === size
                                                        ? "700"
                                                        : "500",
                                                cursor: "pointer",
                                                padding: "10px 16px",
                                                borderRadius: "8px"
                                            }}
                                        >
                                            {size}
                                        </button>

                                    ))}

                                </div>

                                {!selectedSize && (
                                    <p
                                        style={{
                                            color: "#7B2D5F",
                                            fontSize: "13px",
                                            marginTop: "8px"
                                        }}
                                    >
                                        Please select a size before
                                        continuing.
                                    </p>
                                )}

                            </div>

                            <div className="detail-actions">

                                <button
                                    className="secondary-button"
                                    onClick={() => {

                                        if (!selectedSize) {
                                            alert(
                                                "Please select a size first."
                                            );
                                            return;
                                        }

                                        addToCart(
                                            selectedProduct,
                                            selectedSize
                                        );

                                    }}
                                >
                                    Add to Bag
                                </button>

                                <button
                                    className="primary-button"
                                    onClick={() => {

                                        if (!selectedSize) {
                                            alert(
                                                "Please select a size first."
                                            );
                                            return;
                                        }

                                        buyNow(
                                            selectedProduct,
                                            selectedSize
                                        );

                                    }}
                                >
                                    Buy Now
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            )}

            {/* =================================================
                CART
            ================================================= */}

            {showCart && (

                <div className="side-panel">

                    <div className="panel-header">

                        <div>

                            <p className="eyebrow">
                                YOUR SELECTION
                            </p>

                            <h2>Shopping Bag</h2>

                        </div>

                        <button
                            onClick={() =>
                                setShowCart(false)
                            }
                        >
                            ×
                        </button>

                    </div>

                    {cart.length === 0 ? (

                        <div className="empty-state small">

                            <div>🛍</div>

                            <h3>
                                Your bag is empty
                            </h3>

                            <p>
                                Add something you love.
                            </p>

                        </div>

                    ) : (

                        <>

                            <div className="cart-items">

                                {cart.map((item) => (

                                    <div
                                        className="cart-item"
                                        key={`${item.id}-${item.selectedSize}`}
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                        />

                                        <div className="cart-item-info">

                                            <h3>
                                                {item.name}
                                            </h3>

                                            <strong>
                                                ₹
                                                {Number(
                                                    item.price
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </strong>

                                            <p
                                                style={{
                                                    margin: "5px 0",
                                                    fontSize: "13px",
                                                    color: "#666"
                                                }}
                                            >
                                                Size:{" "}
                                                <strong>
                                                    {
                                                        item.selectedSize
                                                    }
                                                </strong>
                                            </p>

                                            <div className="quantity">

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.selectedSize,
                                                            -1
                                                        )
                                                    }
                                                >
                                                    −
                                                </button>

                                                <span>
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.selectedSize,
                                                            1
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>

                                            </div>

                                            <button
                                                className="remove-button"
                                                onClick={() =>
                                                    removeFromCart(
                                                        item.id,
                                                        item.selectedSize
                                                    )
                                                }
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                            <div className="cart-footer">

                                <div className="total-row">

                                    <span>Total</span>

                                    <strong>
                                        ₹
                                        {cartTotal.toLocaleString(
                                            "en-IN"
                                        )}
                                    </strong>

                                </div>

                                <button
                                    className="primary-button full"
                                    onClick={checkoutCart}
                                >
                                    Proceed to Checkout →
                                </button>

                            </div>

                        </>

                    )}

                </div>

            )}

            {/* =================================================
                WISHLIST
            ================================================= */}

            {showWishlist && (

                <div className="side-panel">

                    <div className="panel-header">

                        <div>

                            <p className="eyebrow">
                                SAVED FOR LATER
                            </p>

                            <h2>Wishlist</h2>

                        </div>

                        <button
                            onClick={() =>
                                setShowWishlist(false)
                            }
                        >
                            ×
                        </button>

                    </div>

                    {wishlist.length === 0 ? (

                        <div className="empty-state small">

                            <div>♡</div>

                            <h3>
                                Your wishlist is empty
                            </h3>

                            <p>
                                Save your favourite styles here.
                            </p>

                        </div>

                    ) : (

                        <div className="wishlist-grid">

                            {wishlist.map((product) => (

                                <div
                                    className="wishlist-item"
                                    key={product.id}
                                >

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                    />

                                    <h3>
                                        {product.name}
                                    </h3>

                                    <strong>
                                        ₹
                                        {Number(
                                            product.price
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </strong>

                                    <button
                                        className="secondary-button"
                                        onClick={() =>
                                            addToCart(product)
                                        }
                                    >
                                        Add to Bag
                                    </button>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            )}

            {/* =================================================
                AUTH
            ================================================= */}

            {showAuth && (

                <div
                    className="overlay"
                    onClick={() =>
                        setShowAuth(false)
                    }
                >

                    <div
                        className="auth-modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <button
                            className="close-button"
                            onClick={() =>
                                setShowAuth(false)
                            }
                        >
                            ×
                        </button>

                        <div className="auth-brand">
                            Style<span>Cart</span>
                        </div>

                        <h2>
                            {authMode === "login"
                                ? "Welcome back"
                                : "Create your account"}
                        </h2>

                        <p>
                            {authMode === "login"
                                ? "Login to continue shopping."
                                : "Join StyleCart and discover your style."}
                        </p>

                        <form onSubmit={handleLogin}>

                            {authMode === "signup" && (

                                <input
                                    required
                                    placeholder="Full Name"
                                />

                            )}

                            <input
                                required
                                type="email"
                                placeholder="Email Address"
                            />

                            <input
                                required
                                type="password"
                                placeholder="Password"
                            />

                            <button className="primary-button full">
                                {authMode === "login"
                                    ? "Login"
                                    : "Create Account"}
                            </button>

                        </form>

                        <button
                            className="switch-auth"
                            onClick={() =>
                                setAuthMode(
                                    authMode === "login"
                                        ? "signup"
                                        : "login"
                                )
                            }
                        >
                            {authMode === "login"
                                ? "Don't have an account? Sign up"
                                : "Already have an account? Login"}
                        </button>

                    </div>

                </div>

            )}

            {/* =================================================
                CHECKOUT
            ================================================= */}

            {showCheckout && (

                <div className="overlay">

                    <div className="checkout-modal">

                        <button
                            className="close-button"
                            onClick={() =>
                                setShowCheckout(false)
                            }
                        >
                            ×
                        </button>

                        <div className="checkout-title">

                            <p className="eyebrow">
                                ALMOST THERE
                            </p>

                            <h2>Checkout</h2>

                        </div>

                        <div className="checkout-layout">

                            {/* DELIVERY FORM */}

                            <form
                                onSubmit={placeOrder}
                                className="checkout-form"
                            >

                                <h3>
                                    Delivery Details
                                </h3>

                                <input
                                    required
                                    minLength="2"
                                    placeholder="Full Name"
                                    value={customer.name}
                                    onChange={(event) =>
                                        setCustomer({
                                            ...customer,
                                            name: event.target.value
                                        })
                                    }
                                />

                                <input
                                    required
                                    type="tel"
                                    inputMode="numeric"
                                    pattern="[0-9]{10}"
                                    minLength="10"
                                    maxLength="10"
                                    placeholder="10-digit Phone Number"
                                    value={customer.phone}
                                    onChange={handlePhoneChange}
                                />

                                <textarea
                                    required
                                    minLength="5"
                                    placeholder="Delivery Address"
                                    value={customer.address}
                                    onChange={(event) =>
                                        setCustomer({
                                            ...customer,
                                            address:
                                                event.target.value
                                        })
                                    }
                                />

                                <select
                                    required
                                    value={customer.country}
                                    onChange={handleCountryChange}
                                >

                                    <option value="">
                                        Select Country
                                    </option>

                                    {countries.map((country) => (

                                        <option
                                            key={country}
                                            value={country}
                                        >
                                            {country}
                                        </option>

                                    ))}

                                </select>

                                <div className="two-inputs">

                                    <input
                                        required
                                        placeholder="City"
                                        value={customer.city}
                                        onChange={(event) =>
                                            setCustomer({
                                                ...customer,
                                                city:
                                                    event.target.value
                                            })
                                        }
                                    />

                                    <select
                                        required
                                        value={customer.state}
                                        onChange={(event) =>
                                            setCustomer({
                                                ...customer,
                                                state:
                                                    event.target.value
                                            })
                                        }
                                        disabled={
                                            !customer.country
                                        }
                                    >

                                        <option value="">
                                            Select State
                                        </option>

                                        {getStateOptions().map(
                                            (state) => (

                                                <option
                                                    key={state}
                                                    value={state}
                                                >
                                                    {state}
                                                </option>

                                            )
                                        )}

                                    </select>

                                </div>

                                <input
                                    required
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]{6}"
                                    minLength="6"
                                    maxLength="6"
                                    placeholder="6-digit Pincode"
                                    value={customer.pincode}
                                    onChange={handlePincodeChange}
                                />

                                <h3>
                                    Payment Method
                                </h3>

                                <select
                                    required
                                    value={
                                        customer.paymentMethod
                                    }
                                    onChange={(event) =>
                                        setCustomer({
                                            ...customer,
                                            paymentMethod:
                                                event.target.value
                                        })
                                    }
                                >

                                    <option value="Cash on Delivery">
                                        Cash on Delivery
                                    </option>

                                    <option value="UPI">
                                        UPI
                                    </option>

                                    <option value="Card">
                                        Card
                                    </option>

                                </select>

                                <button
                                    type="submit"
                                    className="primary-button full"
                                >
                                    Place Order →
                                </button>

                            </form>

                            {/* ORDER SUMMARY */}

                            <div className="checkout-summary">

                                <h3>
                                    Order Summary
                                </h3>

                                {checkoutProduct ? (

                                    <div className="summary-product">

                                        <img
                                            src={
                                                checkoutProduct.image
                                            }
                                            alt={
                                                checkoutProduct.name
                                            }
                                        />

                                        <div>

                                            <strong>
                                                {
                                                    checkoutProduct.name
                                                }
                                            </strong>

                                            <span>
                                                Size:{" "}
                                                {
                                                    checkoutProduct.selectedSize
                                                }
                                            </span>

                                            <span>
                                                ₹
                                                {Number(
                                                    checkoutProduct.price
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </span>

                                        </div>

                                    </div>

                                ) : (

                                    cart.map((item) => (

                                        <div
                                            className="summary-product"
                                            key={`${item.id}-${item.selectedSize}`}
                                        >

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                            />

                                            <div>

                                                <strong>
                                                    {item.name}
                                                </strong>

                                                <span>
                                                    Size:{" "}
                                                    {
                                                        item.selectedSize
                                                    }
                                                </span>

                                                <span>
                                                    {
                                                        item.quantity
                                                    }{" "}
                                                    × ₹
                                                    {Number(
                                                        item.price
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </span>

                                            </div>

                                        </div>

                                    ))

                                )}

                                <div className="summary-total">

                                    <span>Total</span>

                                    <strong>
                                        ₹
                                        {(
                                            checkoutProduct
                                                ? Number(
                                                      checkoutProduct.price
                                                  )
                                                : cartTotal
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            )}

            {/* =================================================
                ORDER SUCCESS
            ================================================= */}

            {orderPlaced && (

                <div className="overlay">

                    <div className="success-modal">

                        <div className="success-icon">
                            ✓
                        </div>

                        <p className="eyebrow">
                            ORDER CONFIRMED
                        </p>

                        <h2>
                            Thank you for shopping!
                        </h2>

                        <p>
                            Your StyleCart order has been
                            placed successfully.
                        </p>

                        <button
                            className="primary-button"
                            onClick={() =>
                                setOrderPlaced(false)
                            }
                        >
                            Continue Shopping
                        </button>

                    </div>

                </div>

            )}

            {/* =================================================
                FOOTER
            ================================================= */}

            <footer>

                <div className="footer-brand">

                    Style<span>Cart</span>

                    <p>
                        Style that speaks for you.
                    </p>

                </div>

                <div className="footer-links">

                    <span>Shop</span>
                    <span>About</span>
                    <span>Contact</span>
                    <span>Privacy</span>

                </div>

                <p className="copyright">
                    © 2026 StyleCart. All rights reserved.
                </p>

            </footer>

        </div>
    );
}

export default App;