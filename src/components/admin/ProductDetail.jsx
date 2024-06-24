import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";

const ProductDetail = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProduct, getAllProductFunction } = context;

    const navigate = useNavigate();

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            await deleteDoc(doc(fireDB, 'products', id));
            toast.success('Product Deleted successfully');
            getAllProductFunction();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="py-5 flex justify-between items-center">
                <h1 className="text-2xl text-pink-500 font-bold">All Products</h1>
                <Link to={'/addproduct'}>
                    <button className="px-5 py-2 bg-pink-500 text-white font-semibold rounded-lg shadow hover:bg-pink-600 transition duration-300">Add Product</button>
                </Link>
            </div>

            <div className="flex justify-center relative top-20">
                {loading && <Loader />}
            </div>

            <div className="w-full overflow-x-auto mb-5">
                <table className="w-full text-left border-collapse bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-pink-50 text-pink-600">
                            <th className="p-4 text-md font-semibold border border-pink-100">S.No.</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Image</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Title</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Price</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Category</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Date</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Edit</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllProduct.map((item, index) => {
                            const { id, title, price, category, date, productImageUrl } = item;
                            return (
                                <tr key={index} className="text-gray-700 hover:bg-pink-50 transition duration-300">
                                    <td className="p-4 border border-pink-100">{index + 1}</td>
                                    <td className="p-4 border border-pink-100">
                                        <div className="flex justify-center">
                                            <img className="w-20 h-20 object-cover rounded-lg" src={productImageUrl} alt={title} />
                                        </div>
                                    </td>
                                    <td className="p-4 border border-pink-100">{title}</td>
                                    <td className="p-4 border border-pink-100">₹{price}</td>
                                    <td className="p-4 border border-pink-100">{category}</td>
                                    <td className="p-4 border border-pink-100">{date}</td>
                                    <td onClick={() => navigate(`/updateproduct/${id}`)} className="p-4 border border-pink-100 text-green-500 cursor-pointer hover:text-green-600 transition duration-300">Edit</td>
                                    <td onClick={() => deleteProduct(id)} className="p-4 border border-pink-100 text-red-500 cursor-pointer hover:text-red-600 transition duration-300">Delete</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetail;
