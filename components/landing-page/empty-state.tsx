import { RocketIcon, TicketCheckIcon } from "lucide-react";

export default function EmptyState({ message }: { message: string }) {
    return (
        <div className="empty-state flex flex-col items-center justify-center">
            <TicketCheckIcon className="text-center text-2xl font-bold text-blue-500 dark:text-blue-400" /> <h1 className="text-center text-2xl font-bold text-blue-500 dark:text-blue-400">{message}</h1>
        </div>
    );
}