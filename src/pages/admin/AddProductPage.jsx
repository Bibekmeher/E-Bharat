import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
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

const AddProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity: 1,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        })
    });

    const addProductFunction = async () => {
        if (product.title === "" || product.price === "" || product.productImageUrl === "" || product.category === "" || product.description === "") {
            return toast.error("All fields are required");
        }

        setLoading(true);
        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, product);
            toast.success("Product added successfully");
            navigate('/admin-dashboard');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Failed to add product");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-100 to-pink-200">
            {loading && <Loader />}
            <div className="bg-white p-8 border border-pink-200 rounded-xl shadow-lg transition-transform transform hover:scale-105 w-full max-w-lg">
                <div className="mb-5">
                    <h2 className="text-center text-2xl font-extrabold text-pink-600">
                        Add Product
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
                        onClick={addProductFunction}
                        type="button"
                        className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md shadow-md transition-transform transform hover:scale-105"
                    >
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddProductPage;
