const listaProductos = [
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
        img1: 'buzoWilson1.jpg',
        img2: 'buzoWilson2.jpg',
        img3: 'buzoWilson3.jpg',
        img4: 'buzoWilson4.jpg',
    },
    {
        id:2,
        titulo: 'Maleta para Entrenar',
        rate: "4.2",
        precioAntes: '25.000',
        precioAhora: '12.500',
        discount: "50%",
        descripcion: "La bolsa para zapatillas Nike Brasilia te permite guardar y transportar tus zapatillas separadas del resto de tu equipación. El asa del extremo es fácil de agarrar sobre la marcha, y el bolsillo exterior con cremallera mantiene accesibles los objetos pequeños.",
        color: "Negro",
        categoria: "Maletas",
        img1: 'MaletaparaEntrenamiento1.jpg',
        img2: 'MaletaparaEntrenamiento2.jpg',
        img3: 'MaletaparaEntrenamiento3.jpg',
        img4: 'MaletaparaEntrenamiento4.jpg',
    },
    {
        id:3,
        titulo: 'Nike Pro Running',
        rate: "4.8",
        precioAntes: '6.000',
        precioAhora: '3.000',
        discount: "50%",
        descripcion: "La camiseta Nike Pro Runnning está confeccionada con un tejido ligero y transpirable en las zonas donde se acumula más calor para mantener la frescura desde el calentamiento hasta el estiramiento.",
        color: "Negro",
        categoria: "Camisetas",
        img1: 'NikeProRunning1.jpg',
        img2: 'NikeProRunning2.jpg',
        img3: 'NikeProRunning3.jpg',
        img4: 'NikeProRunning4.jpg',
    },
    {
        id:4,
        titulo: 'Tenis de Running Nike',
        rate: "4.7",
        precioAntes: '20.000',
        precioAhora: '10.000',
        discount: "50%",
        descripcion: "Con la máxima amortiguación para aportar sujeción en cada kilómetro, las Invincible 3 incorporan nuestro máximo nivel de comodidad en la planta del pie para mantenerte en movimiento hoy, mañana y más allá. Diseñadas para correr, son muy elásticas y ofrecen una gran sujeción para que puedas seguir por tu ruta preferida y volver para la próxima carrera con un look listo y revitalizado.",
        color: "Negro",
        categoria: "Tennis",
        img1: 'TenisdeRunningNike1.jpg',
        img2: 'TenisdeRunningNike2.jpg',
        img3: 'TenisdeRunningNike3.jpg',
        img4: 'TenisdeRunningNike4.jpg',
    },
    {
        id:5,
        titulo: 'Riñonera Nike Heritage',
        rate: "4.2",
        precioAntes: '25.000',
        precioAhora: '12.500',
        discount: "50%",
        descripcion: "La riñonera Nike Heritage es la opción ideal para la rutina diaria gracias a su correa cómoda y fácil de ajustar. El compartimento principal ofrece almacenamiento seguro para el teléfono, los aperitivos o la cartera, y el bolsillo pequeño para accesorios de la parte posterior ayuda a tener las llaves y la información de viaje segura y al alcance de la mano. Para la confección de este producto se ha empleado, al menos, un 65 % de poliéster reciclado.",
        color: "Negro",
        categoria: "Accesorios",
        img1: 'RiñoneraNikeHeritage1.jpg',
        img2: 'RiñoneraNikeHeritage2.jpg',
        img3: 'RiñoneraNikeHeritage3.jpg',
        img4: 'RiñoneraNikeHeritage4.jpg',
    },{
        id:6,
        titulo: 'Sudadera Running Nike',
        rate: "4.1",
        precioAntes: '20.000',
        precioAhora: '10.000',
        discount: "50%",
        descripcion: "El pantalón Nike Dri-FIT Challenger está confeccionado al 100 % con fibras de poliéster recicladas para que puedas sentirte bien de muchas formas diferentes. El tejido ligero y suave con tecnología de capilarización del sudor ofrece transpirabilidad y comodidad. Gracias a los bolsillos con botones con cierre a presión puedes mantener tu equipación cerca.",
        color: "Gris",
        categoria: "Sudadera",
        img1: 'SudaderaRunningNike1.png',
        img2: 'SudaderaRunningNike2.jpg',
        img3: 'SudaderaRunningNike3.jpg',
        img4: 'SudaderaRunningNike4.jpg',
    },{
        id:7,
        titulo: 'Nike Air Force',
        rate: "4.3",
        precioAntes: '20.000',
        precioAhora: '10.000',
        discount: "50%",
        descripcion: "En una palabra: tradición. Con su estilo retro, la mediasuela suave y los detalles dentados, las Cortez han destacado década tras década en el mundo del running clásico, como fenómeno de moda y como estrella de cine. La nueva versión de este conocido modelo ofrece un estilo vintage con detalles de ante y un logotipo tradicional. Además, la clásica combinación de colores universitaria en verde green y sail ofrece un estilo deportivo y la suela exterior de goma proporciona el toque final.",
        color: "Azul",
        categoria: "Tennis",
        img1: 'NikeAirForce1.jpg',
        img2: 'NikeAirForce2.jpg',
        img3: 'NikeAirForce3.jpg',
        img4: 'NikeAirForce4.jpg',
    },{
        id:8,
        titulo: 'Manos Libres Nike',
        rate: "4.1",
        precioAntes: '20.000',
        precioAhora: '10.000',
        discount: "50%",
        descripcion: "El rodillo de espuma Nike Recovery 33 cm cuenta con una superficie densa y rugosa que masajea y estira los grupos musculares durante los calentamientos y los enfriamientos.",
        color: "Negro",
        categoria: "Accesorios",
        img1: 'ManosLibresNike1.jpg',
        img2: 'ManosLibresNike2.jpg',
        img3: 'ManosLibresNike3.jpg',
        img4: 'ManosLibresNike4.jpg',
    },{
        id:9,
        titulo: 'Jordan Essentials',
        rate: "4.1",
        precioAntes: '20.000',
        precioAhora: '10.000',
        discount: "50%",
        descripcion: " Esta chaqueta es ideal para combatir el frío con un tejido repelente al agua y un gran aislamiento sintético y acolchado. El ajuste es lo suficientemente holgado como para llevarlo sobre un jersey, y la capucha es extraíble para aquellos días en los que no se necesita la protección adicional.",
        color: "Amarillo",
        categoria: "Chaqueta",
        img1: 'JordanEssentials1.png',
        img2: 'JordanEssentials2.jpg',
        img3: 'JordanEssentials3.jpg',
        img4: 'JordanEssentials4.jpg',
    }
]

const productController = {
    productCart: (req, res) => {
        res.render("products/productCart");
    },

    productDetail: (req, res) => {
        res.render("products/productDetailAldi");
    },

    addProduct: (req, res) => {
        res.render("products/addProduct");
    },

    editProduct: (req, res) => {
        res.render("products/editProduct");
    },

    detailProduct: (req, res) => {
        let prendaId = req.params.id;
        const prendaAMostrar = listaProductos.find(prenda =>{
            return prenda.id == prendaId;
        });
        res.render("products/detailProduct", {prenda:prendaAMostrar });
    },

    productList: (req, res) => {
        res.render("products/productList", {listaProductos:listaProductos });
    },

    detalleRopa:(req,res) => {
        let prenda = listaProductos.find(prenda=>prenda.id == req.params.ropaId);
        res.render("DetalleRopa", { prenda: prenda });
    },
}

module.exports = productController;