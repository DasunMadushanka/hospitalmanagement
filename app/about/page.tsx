export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-6">
            <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
                    About Us
                </h1>

                {/* Mission Section */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Our Mission
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        At City Hospital, our mission is to provide compassionate,
                        world-class healthcare to our community. We are committed to
                        excellence in patient care, medical education, and innovative
                        research, ensuring that every patient receives the highest standard
                        of treatment.
                    </p>
                </section>

                {/* History Section */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Our History
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        Established in 1985, City Hospital has grown from a small community
                        clinic into one of Sri Lanka’s leading healthcare institutions. With
                        decades of service, we have built a reputation for trust, care, and
                        innovation, serving thousands of patients every year.
                    </p>
                </section>

                {/* Services Section */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Our Services
                    </h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                        <li>24/7 Emergency Care</li>
                        <li>General Medicine & Surgery</li>
                        <li>Cardiology & Heart Care</li>
                        <li>Pediatrics & Neonatal Care</li>
                        <li>Diagnostic Imaging & Laboratory Services</li>
                        <li>Specialized Clinics & Outpatient Services</li>
                    </ul>
                </section>

                {/* Values Section */}
                <section>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Our Values
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        We believe in integrity, compassion, and innovation. Our team of
                        dedicated doctors, nurses, and staff work tirelessly to ensure that
                        every patient feels cared for, respected, and supported throughout
                        their healthcare journey.
                    </p>
                </section>
            </div>
        </div>
    );
}