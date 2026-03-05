export default function SkeletonLoader() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
            {/* Hero section skeleton */}
            <div
                className="rounded-2xl p-6 sm:p-8 mb-6"
                style={{
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    boxShadow: "var(--shadow-card)",
                }}
            >
                <div className="flex flex-col sm:flex-row gap-6">
                    {/* Poster skeleton */}
                    <div
                        className="shimmer rounded-xl flex-shrink-0 mx-auto sm:mx-0"
                        style={{ width: "140px", height: "210px" }}
                    />

                    {/* Details skeleton */}
                    <div className="flex-1 space-y-4">
                        {/* Title */}
                        <div className="shimmer rounded-lg h-7" style={{ width: "60%" }} />
                        {/* Meta row */}
                        <div className="flex gap-3">
                            <div className="shimmer rounded-md h-4" style={{ width: "60px" }} />
                            <div className="shimmer rounded-md h-4" style={{ width: "100px" }} />
                            <div className="shimmer rounded-md h-4" style={{ width: "50px" }} />
                        </div>
                        {/* Rating */}
                        <div className="shimmer rounded-md h-6" style={{ width: "80px" }} />
                        <div
                            className="shimmer rounded-full"
                            style={{ height: "1px", width: "100%", marginTop: "16px" }}
                        />
                        {/* Cast chips */}
                        <div className="flex gap-2 flex-wrap">
                            {[100, 130, 110, 120].map((w, i) => (
                                <div key={i} className="shimmer rounded-full h-7" style={{ width: `${w}px` }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Plot skeleton */}
            <div
                className="rounded-2xl p-6 sm:p-8 mb-6"
                style={{
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    boxShadow: "var(--shadow-card)",
                }}
            >
                <div className="shimmer rounded-md h-5 mb-4" style={{ width: "80px" }} />
                <div className="space-y-2">
                    <div className="shimmer rounded-md h-4 w-full" />
                    <div className="shimmer rounded-md h-4 w-full" />
                    <div className="shimmer rounded-md h-4" style={{ width: "75%" }} />
                </div>
            </div>

            {/* Sentiment skeleton */}
            <div
                className="rounded-2xl p-6 sm:p-8"
                style={{
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border-subtle)",
                    boxShadow: "var(--shadow-card)",
                }}
            >
                <div className="flex justify-between items-center mb-4">
                    <div className="shimmer rounded-md h-5" style={{ width: "160px" }} />
                    <div className="shimmer rounded-full h-7" style={{ width: "90px" }} />
                </div>
                <div className="space-y-2">
                    <div className="shimmer rounded-md h-4 w-full" />
                    <div className="shimmer rounded-md h-4 w-full" />
                    <div className="shimmer rounded-md h-4" style={{ width: "70%" }} />
                </div>
            </div>
        </div>
    );
}
