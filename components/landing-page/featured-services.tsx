import SectionHeader from "../common/section-header";
import { Star, UserStar } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
// import ProductCard from "../products/product-card";

export default function FeaturedServices() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center">
                <SectionHeader
                    title="Featured Services"
                    icon={<Star className="w-6 h-6 text-yellow-500" />}
                    description="Check out our featured services"
                />
            </div>
            <div className="grid-wrapper gap-4 mt-4 mb-4 text-center">
                {featuredServices.map((service) => (
                    <div key={service.id} className="flex flex-col items-center justify-center bg-blue-100/30 rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
                        <h1 className="text-2xl font-bold mb-2 text-color-primary bg-blue-100/50 rounded-full p-2 animate-shake-once">{service.title}</h1>
                        <p className="text-gray-600 mb-2">{service.description}</p>
                        <p className="text-gray-600 mb-2 text-center font-bold text-color-grey">Start from {service.price}</p>
                        <p className="text-gray-600 mb-2 text-center">{service.whatWeOffer.join(", ")}</p>
                        {service.isPopular && <Badge variant="outline">Popular</Badge>}
                        {service.icon}
                        <Button variant="outline" size="lg" className="mt-1 cursor-pointer bg-blue-500 text-white">Get Our Services</Button>
                    </div>
                ))}
            </div>

            {/*connected to the product card*/}
            {/* {featuredServices.map((service) => (
                <ProductCard key={service.id} product={service} />
            ))} */}
        </div>
    );
}


const featuredServices = [
    {
        id: 1,
        title: "Featured Services 1",
        description: "Check out our featured services",
        icon: <UserStar className="w-6 h-6 text-yellow-500" />,
        price: "$100",
        isPopular: false,
        whatWeOffer: [
            "Check out our featured services",
            "Check out our featured services",
            "Check out our featured services",
        ],
    },
    {
        id: 2,
        title: "Featured Services 2",
        description: "Check out our featured services",
        icon: <UserStar className="w-6 h-6 text-yellow-500" />,
        price: "$200",
        isPopular: true,
        whatWeOffer: [
            "Check out our featured services",
            "Check out our featured services",
            "Check out our featured services",
        ],
    },
    {
        id: 3,
        title: "Featured Services 3",
        description: "Check out our featured services",
        icon: <UserStar className="w-6 h-6 text-yellow-500" />,
        price: "$300",
        isPopular: false,
        whatWeOffer: [
            "Check out our featured services",
            "Check out our featured services",
            "Check out our featured services",
        ],
    },
];