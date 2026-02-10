import React, { useState } from "react";
import registerImage from "../assets/student2.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const RegisterPage = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        studentRollNo: "",
        role: "student"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:3000/api/user/register",
                formData,
                { withCredentials: true }
            );

            console.log("Registration successful", res.data);

            // redirect based on role
            // if (formData.role === "admin") {
            //     navigate("/admin/login");
            // } else {
                navigate("/login");
            //}
        } catch (err) {
            console.error("Registration failed", err.response?.data?.message);
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
                {/* Left - Register Form */}
                <div className="flex items-center justify-center p-8 bg-white">
                    <div className="w-full max-w-md space-y-6 border px-6 py-8">
                        <h2 className="text-3xl font-bold text-gray-800">
                            Create an Account
                        </h2>

                        <form className="space-y-4" onSubmit={handleRegister}>
                            {/* Role Selector */}
                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Register As
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-md"
                                >
                                    <option value="student">Student</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            {/* Roll No only for students */}
                            {formData.role === "student" && (
                                <div>
                                    <label className="block text-gray-700 mb-1">
                                        Roll Number
                                    </label>
                                    <input
                                        name="studentRollNo"
                                        value={formData.studentRollNo}
                                        onChange={handleChange}
                                        type="text"
                                        className="w-full px-4 py-2 border rounded-md"
                                        required
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-1">
                                    Password
                                </label>
                                <input
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    type="password"
                                    className="w-full px-4 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800"
                            >
                                Register
                            </button>

                            {/* Login options */}
                            <div className="text-center text-sm space-y-1">
                                <p>
                                    Student?{" "}
                                    <Link to="/login" className="text-blue-500">
                                        Login here
                                    </Link>
                                </p>
                                <p>
                                    Admin?{" "}
                                    <Link
                                        to="/admin/login"
                                        className="text-blue-500"
                                    >
                                        Admin Login
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right - Image */}
                <div className="hidden md:block">
                    <img
                        src={registerImage}
                        alt="Register"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
