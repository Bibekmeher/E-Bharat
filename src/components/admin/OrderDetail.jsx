import { useContext } from "react";
import myContext from "../../context/myContext";

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, orderDelete } = context;
    
    return (
        <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="py-5">
                <h1 className="text-2xl text-pink-500 font-bold">All Orders</h1>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-pink-50 text-pink-600">
                            <th className="p-4 text-md font-semibold border border-pink-100">S.No.</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Order Id</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Image</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Title</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Category</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Price</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Quantity</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Total Price</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Status</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Name</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Address</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Pincode</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Phone Number</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Email</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Date</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllOrder.map((order, orderIndex) => (
                            order.cartItems.map((item, itemIndex) => (
                                <tr key={`${orderIndex}-${itemIndex}`} className="text-gray-700 hover:bg-pink-50 transition duration-300">
                                    <td className="p-4 border border-pink-100">{itemIndex + 1}</td>
                                    <td className="p-4 border border-pink-100">{order.id}</td>
                                    <td className="p-4 border border-pink-100">
                                        <img src={item.productImageUrl} alt="Product" className="w-16 h-16 object-cover" />
                                    </td>
                                    <td className="p-4 border border-pink-100">{item.title}</td>
                                    <td className="p-4 border border-pink-100">{item.category}</td>
                                    <td className="p-4 border border-pink-100">₹{item.price}</td>
                                    <td className="p-4 border border-pink-100">{item.quantity}</td>
                                    <td className="p-4 border border-pink-100">₹{item.price * item.quantity}</td>
                                    <td className="p-4 border border-pink-100 text-green-600">{order.status}</td>
                                    <td className="p-4 border border-pink-100">{order.addressInfo.name}</td>
                                    <td className="p-4 border border-pink-100">{order.addressInfo.address}</td>
                                    <td className="p-4 border border-pink-100">{order.addressInfo.pincode}</td>
                                    <td className="p-4 border border-pink-100">{order.addressInfo.mobileNumber}</td>
                                    <td className="p-4 border border-pink-100">{order.email}</td>
                                    <td className="p-4 border border-pink-100">{order.date}</td>
                                    <td 
                                        className="p-4 border border-pink-100 text-red-500 cursor-pointer"
                                        onClick={() => orderDelete(order.id)}
                                    >
                                        Delete
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default OrderDetail;
