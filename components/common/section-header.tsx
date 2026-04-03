export default function SectionHeader({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
    return (
        <div>

            <div className="flex flex-col items-center justify-center mb-8 mt-8 w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 py-4 rounded-full">

                <h1 className="text-2xl font-bold flex flex-row items-center justify-center gap-2 mb-2 text-primary bg-primary/10 p-2 rounded-full">{icon} {title}</h1>
                <p className="text-gray-600 text-center text-md font-medium ">{description}</p>
            </div>

        </div>
    );
}