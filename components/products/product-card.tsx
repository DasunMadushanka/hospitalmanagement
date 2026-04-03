// import Link from "next/link";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import { Card, CardHeader, CardFooter, CardDescription, CardContent, CardTitle } from "../ui/card";

// interface ProductCardProps {
//     id: number;
//     title: string;
//     description: string;
//     icon: React.ReactNode;
//     price: string;
//     isPopular: boolean;
//     whatWeOffer: string[];
// }

// export default function ProductCard({ product }: { product: ProductCardProps }) {
//     return (
//         <Link href={'/products/${product.id}'}>
//             <Card className="flex flex-col justify-center shadow-lg gap-4 m-3">
//                 <CardHeader>{product.title}</CardHeader>
//                 <CardTitle className="text-bold bg-gray-500/10 w-fit p-2 rounded-full flex flex-row items-center justify-start gap-2">
//                     {product.icon}{product.price}
//                 </CardTitle>
//                 <CardDescription>{product.description}</CardDescription>
//                 <CardContent>
//                     {product.whatWeOffer.map((offer) =>
//                         <Badge key={offer}> {offer}</Badge>
//                     )}
//                 </CardContent>
//                 <CardFooter>

//                     <Button variant="outline" size="lg" className="mt-1 cursor-pointer bg-blue-500 text-white">Get Our Services</Button>
//                 </CardFooter>
//                 {product.isPopular && <Badge variant="outline">Popular</Badge>}

//             </Card>
//         </Link>
//     );
// }


