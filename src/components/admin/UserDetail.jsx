import { useContext } from "react";
import myContext from "../../context/myContext";

const UserDetail = () => {
    const context = useContext(myContext);
    const { getAllUser } = context;

    return (
        <div className="bg-white p-5 rounded-lg shadow-md">
            <div className="py-5 flex justify-between items-center">
                {/* Text */}
                <h1 className="text-2xl text-pink-500 font-bold">All Users</h1>
            </div>

            {/* Table */}
            <div className="w-full overflow-x-auto mb-5">
                <table className="w-full text-left border-collapse bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-pink-50 text-pink-600">
                            <th className="p-4 text-md font-semibold border border-pink-100">S.No.</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Name</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Email</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Uid</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Role</th>
                            <th className="p-4 text-md font-semibold border border-pink-100">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getAllUser.map((value, index) => (
                            <tr key={index} className="text-gray-700 hover:bg-pink-50 transition duration-300">
                                <td className="p-4 border border-pink-100">{index + 1}</td>
                                <td className="p-4 border border-pink-100 first-letter:uppercase">{value.name}</td>
                                <td className="p-4 border border-pink-100 cursor-pointer">{value.email}</td>
                                <td className="p-4 border border-pink-100 cursor-pointer">{value.uid}</td>
                                <td className="p-4 border border-pink-100 cursor-pointer">{value.role}</td>
                                <td className="p-4 border border-pink-100 cursor-pointer">{value.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserDetail;
