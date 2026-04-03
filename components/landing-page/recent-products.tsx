// import { Package, RocketIcon } from "lucide-react";
// import SectionHeader from "../common/section-header";
// // import ProductCard from "../products/product-card";
// import EmptyState from "./empty-state";

// export default function RecentProducts() {


//     const products = [
//         {
//             id: 1,
//             title: "Product 1",
//             description: "Description 1",
//             icon: <RocketIcon />,
//             price: "$10",
//             isPopular: true,
//             whatWeOffer: ["Offer 1", "Offer 2", "Offer 3"],
//         },
//         {
//             id: 2,
//             title: "Product 2",
//             description: "Description 2",
//             icon: <RocketIcon />,
//             price: "$20",
//             isPopular: false,
//             whatWeOffer: ["Offer 1", "Offer 2", "Offer 3"],
//         },
//         {
//             id: 3,
//             title: "Product 3",
//             description: "Description 3",
//             icon: <RocketIcon />,
//             price: "$30",
//             isPopular: true,
//             whatWeOffer: ["Offer 1", "Offer 2", "Offer 3"],
//         },
//     ];
//     return (
//         <div className="space-y-10 bg-gray-500/10">
//             <SectionHeader title="Recent Products" description="Check out our latest products" icon={<Package />} />
//             <div className="grid-wrapper">
//                 {products.length > 0 ? (
//                     products.map((product) => (
//                         <ProductCard key={product.id} product={product} />
//                     ))
//                 ) : (
//                     <EmptyState message="No products Offers find!" />
//                 )}
//             </div>
//         </div>
//     );
// }