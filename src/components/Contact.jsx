import React, { useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Contact = () => {
    const navigate = useNavigate();
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        user_name: "",
        user_email: "",
        message: "",
    });
    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const isValidEmail = (email) => {
        return /^\S+@\S+\.\S+$/.test(email);
    };
    const sendEmail = (e) => {
        e.preventDefault();

        // valid email
        if (!isValidEmail(formData.user_email)) {
            toast.error("Please provide a valid email address.");
            return;
        }
        setLoading(true);
        emailjs
            .sendForm("service_9nalt3s", "template_7ac1yko", form.current, {
                publicKey: "AXXI-Dh3STkbFTMbc",
            })
            .then(
                () => {
                    form.current.reset();
                    setFormData({ user_name: "", user_email: "", message: "" });
                    toast.success("Your message has been sent successfully!", {
                        position: "top-center",
                        autoClose: 3000,
                    });
                    setLoading(false);
                },
                (error) => {
                    toast.error("There was a problem sending the message. Please try again.", {
                        position: "top-center",
                        autoClose: 3000,
                    });
                    console.error("FAILED...", error.text);
                    setLoading(false);
                }
            );
    };
    return (
        <div className="py-12 ">
            {/* Title & Description */}
            <div className="text-center mb-10 max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                <p className="text-gray-700">
                    DevForum-এ যোগ দিন এবং নতুন পোস্ট, discussions এবং knowledge sharing-এর অংশ হন।
                    আপনার journey শুরু করুন আজই!
                </p>
            </div>

            {/* 2 Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8  items-center">

                {/* Left Column: Email Input */}
                <div>
                    <h1 className="text-3xl font-medium mb-6 text-gray-800">Email Me</h1>
                    <form ref={form} onSubmit={sendEmail} className="space-y-2" noValidate>
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                placeholder="your name"
                                name="user_name"
                                value={formData.user_name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder="youremail@gamil.com"
                                name="user_email"
                                value={formData.user_email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium text-gray-700">Massage</label>
                            <textarea
                                name="message"
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                } text-white font-semibold px-6 py-3 rounded transition flex items-center justify-center`}
                        >
                            {loading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                    Sending...
                                </>
                            ) : (
                                "Send Email"
                            )}
                        </button>
                    </form>
                </div>

                {/* Right Column: Login/Register + WhatsApp */}
                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-start">
                    <h3 className="font-semibold text-xl mb-3">Already have an account?</h3>
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4 hover:bg-green-600 transition"
                    >
                        Login
                    </button>
                    <p className="flex items-center gap-2 text-gray-700">
                        Chat with us on <FaWhatsapp className="text-green-500" /> WhatsApp
                    </p>
                </div>
                {/* Toast Notifications */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default Contact;