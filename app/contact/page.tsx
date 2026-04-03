export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
            <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    Contact Us
                </h1>

                {/* Hospital Info */}
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Hospital Information
                        </h2>
                        <p className="text-gray-600 mb-2">
                            <span className="font-medium">Address:</span> 123 Health Street,
                            Colombo, Sri Lanka
                        </p>
                        <p className="text-gray-600 mb-2">
                            <span className="font-medium">Phone:</span> +94 11 234 5678
                        </p>
                        <p className="text-gray-600 mb-2">
                            <span className="font-medium">Email:</span>{" "}
                            contact@cityhospital.lk
                        </p>
                        <p className="text-red-600 font-semibold mt-4">
                            Emergency Hotline: 1990
                        </p>
                    </div>

                    {/* Visiting Hours */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Visiting Hours
                        </h2>
                        <p className="text-gray-600 mb-2">Monday - Friday: 8 AM - 8 PM</p>
                        <p className="text-gray-600 mb-2">Saturday: 9 AM - 5 PM</p>
                        <p className="text-gray-600 mb-2">Sunday: Closed</p>
                    </div>
                </div>

                {/* Contact Form */}
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Send Us a Message
                </h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Your name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">Message</label>
                        <textarea
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Write your message..."
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}