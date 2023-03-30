const ropa = [
    {
        id:1,
        titulo: 'Buso Deportivo Wilson',
        rate: "4.5",
        precioAntes: '10.000',
        precioAhora: '8.000',
        discount: "20%",
        descripcion: "Las prendas deportivas wilson ofrecen diseños modernos, únicos, de alta calidad, brindándote comodidad y un estilo incomparable que te hará marcar la diferencia, dónde quiera que vayas. Wilson es uno de los must-have wilson, toda una prenda clásica. es tanto práctica como versátil, podrás combinarla para cualquier ocasión.",
        color: "Gris",
        categoria: "Busos",
        img: 'buzo1.jpg',
    },
    {
        id:2,
        titulo: 'Nike Pro Running',
        rate: "4.8",
        precioAntes: '6.000',
        precioAhora: '3.000',
        discount: "50%",
        descripcion: "La camiseta Nike Pro Runnning está confeccionada con un tejido ligero y transpirable en las zonas donde se acumula más calor para mantener la frescura desde el calentamiento hasta el estiramiento.",
        color: "Negro",
        categoria: "Camisetas",
        img: 'indumentaria1.png',
    },
    {
        id:3,
        titulo: 'Sudadera Running Nike',
        rate: "4.3",
        precioAntes: '20.000',
        precioAhora: '10.000',
        discount: "50%",
        descripcion: "Está confeccionado al 100 % con fibras de poliéster recicladas para que puedas sentirte bien de muchas formas diferentes. El tejido ligero y suave con tecnología de capilarización del sudor ofrece transpirabilidad y comodidad.",
        color: "Gris",
        categoria: "Sudadera",
        img: 'indumentaria2.png',
    },
    {
        id:4,
        titulo: 'Jordan Essentials',
        rate: "4.1",
        precioAntes: '20.000',
        precioAhora: '10.000',
        discount: "50%",
        descripcion: " Esta chaqueta es ideal para combatir el frío con un tejido repelente al agua y un gran aislamiento sintético y acolchado. El ajuste es lo suficientemente holgado como para llevarlo sobre un jersey, y la capucha es extraíble para aquellos días en los que no se necesita la protección adicional.",
        color: "Amarillo",
        categoria: "Chaqueta",
        img: 'indumentaria3.png',
    },
]


const productController = {
    productCart: (req, res) => {
        res.render("products/productCart");
    },

    productDetail: (req, res) => {
        res.render("products/productDetail");
    },

    addProduct: (req, res) => {
        res.render("products/addProduct");
    },

    editProduct: (req, res) => {
        res.render("products/editProduct");
    },

    detailProduct: (req, res) => {
        res.render("products/detailProduct");
    },

    productList: (req, res) => {
        res.render("products/productList", {ropa: ropa});
    }
}

module.exports = productController;