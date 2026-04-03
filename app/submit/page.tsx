import SectionHeader from "@/components/common/section-header";
import { Activity } from "lucide-react";
import ChannelSubmitForm from "@/components/products/channel-submit-form";

export default function SubmitPage() {
    return (
        <section className="py-20">
            <div className="wrapper">
                <SectionHeader title="Submit Channel" description="Submit channel" icon={<Activity />} />

            </div><div>
                <ChannelSubmitForm />
            </div>

        </section>
    );
}