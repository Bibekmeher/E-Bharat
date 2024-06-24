import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const categoryList = [
    { name: 'fashion' },
    { name: 'shirt' },
    { name: 'jacket' },
    { name: 'mobile' },
    { name: 'laptop' },
    { name: 'shoes' },
    { name: 'home' },
    { name: 'books' }
];

const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;

    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
    });

    const getSingleProductFunction = async () => {
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id));
            const product = productTemp.data();
            setProduct({
                title: product?.title,
                price: product?.price,
                productImageUrl: product?.productImageUrl,
                category: product?.category,
                description: product?.description,
                quantity: product?.quantity,
                time: product?.time,
                date: product?.date
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const updateProduct = async () => {
        setLoading(true);
        try {
            await setDoc(doc(fireDB, 'products', id), product);
            toast.success("Product Updated successfully");
            getAllProductFunction();
            setLoading(false);
            navigate('/admin-dashboard');
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getSingleProductFunction();
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-100 to-pink-200">
            {loading && <Loader />}
            <div className="bg-white p-8 border border-pink-200 rounded-xl shadow-lg transition-transform transform hover:scale-105 w-full max-w-lg">
                <div className="mb-5">
                    <h2 className="text-center text-2xl font-extrabold text-pink-600">
                        Update Product
                    </h2>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={(e) => setProduct({ ...product, title: e.target.value })}
                        placeholder="Product Title"
                        className="bg-pink-50 border text-pink-600 border-pink-300 px-4 py-2 w-full rounded-md outline-none placeholder-pink-300 focus:ring-2 focus:ring-pink-500"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                        placeholder="Product Price"
                        className="bg-pink-50 border text-pink-600 border-pink-300 px-4 py-2 w-full rounded-md outline-none placeholder-pink-300 focus:ring-2 focus:ring-pink-500"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        name="productImageUrl"
                        value={product.productImageUrl}
                        onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })}
                        placeholder="Product Image Url"
                        className="bg-pink-50 border text-pink-600 border-pink-300 px-4 py-2 w-full rounded-md outline-none placeholder-pink-300 focus:ring-2 focus:ring-pink-500"
                    />
                </div>

                <div className="mb-4">
                    <select
                        value={product.category}
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                        className="w-full px-4 py-2 text-pink-600 bg-pink-50 border border-pink-300 rounded-md outline-none focus:ring-2 focus:ring-pink-500">
                        <option disabled>Select Product Category</option>
                        {categoryList.map((value, index) => (
                            <option key={index} value={value.name} className="first-letter:uppercase">
                                {value.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <textarea
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        name="description"
                        placeholder="Product Description"
                        rows="5"
                        className="w-full px-4 py-2 text-pink-600 bg-pink-50 border border-pink-300 rounded-md outline-none placeholder-pink-300 focus:ring-2 focus:ring-pink-500"
                    ></textarea>
                </div>

                <div className="mb-4">
                    <button
                        onClick={updateProduct}
                        type="button"
                        className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md shadow-md transition-transform transform hover:scale-105"
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateProductPage;
