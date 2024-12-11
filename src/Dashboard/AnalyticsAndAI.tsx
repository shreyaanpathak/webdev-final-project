// AnalyticsAndAI.tsx
import { AdvancedAnalytics } from "./AdvancedAnalytics";
import { AIChatbot } from "./AIChatbot";

export const AnalyticsAndAI = () => {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <div className="xl:col-span-3">
                <AdvancedAnalytics />
            </div>
            <div className="xl:col-span-1">
                <AIChatbot />
            </div>
        </div>
    );
};