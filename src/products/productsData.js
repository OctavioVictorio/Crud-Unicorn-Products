//clave de almacenamiento
const STORAGE_KEY = "productos";

//productos por defecto
const defaultProducts = [
    {
        id: 1,
        nombre: "Producto 1",
        precio: 10,
        categoria: "Categoría 1",
        descripcion: "Descripción 1",
    },
    {
        id: 2,
        nombre: "Producto 2",
        precio: 20,
        categoria: "Categoría 2",
        descripcion: "Descripción 2",
    },
];

//obtener productos
export const getProducts = () => {
    const storedProducts = localStorage.getItem(STORAGE_KEY);
    return storedProducts ? JSON.parse(storedProducts) : defaultProducts;
}

//guardar productos en el localStorage
const saveProducts = (products) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

//agregar producto
export const addProduct = (product) => {
    const products = getProducts();
    const newProduct = { ...product, id: products.length + 1 };
    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
    return newProduct;
};

//actualizar producto
export const updateProduct = (id, updatedProduct) => {
    const products = getProducts();
    const updatedProducts = products.map((product) => {
        if (product.id === id) {
            return { ...product, ...updatedProduct };
        }
        return product;
    });
    saveProducts(updatedProducts);
    return updatedProducts.find((product) => product.id === id);
};

//eliminar producto
export const deleteProduct = (id) => {
    const products = getProducts();
    const updatedProducts = products.filter((product) => product.id !== id);
    saveProducts(updatedProducts);
    return updatedProducts;
};

//obtener producto por id
export const getProductById = (id) => {
    const products = getProducts();
    return products.find((product) => product.id === id);
};