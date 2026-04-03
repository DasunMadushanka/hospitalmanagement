import * as Clerk from "@clerk/nextjs";
console.log(Object.keys(Clerk).filter(k => k.toLowerCase().includes("sign")));
