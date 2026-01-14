import React, { useRef, useState, memo, useMemo } from "react";

const Banner = memo(function Banner({ title, style }) {
    const renders = useRef(0);
    renders.current++;
    return (
        <div style={{ padding: 12, border: "1px solid #ddd", ...style }}>
            <b>{title}</b>{" "}
            <small style={{ color: "#999" }}>(renders: {renders.current})</small>
        </div>
    );
})

export function FirstApp() {
    const [count, setCount] = useState(0);
    const [variant, setVariant] = useState("info");

    const title = useMemo(() => variant === "info" ? "Info banner" : "Warning banner", [variant]);

    const style = useMemo(() => ({
        background: variant === "info" ? "#f3f8ff" : "#fff6f2",
        borderColor: variant === "info" ? "#cfe2ff" : "#ffd2bf"
    }), [variant]);

    return (
        <div style={{ fontFamily: "sans-serif", maxWidth: 520, margin: "20px auto" }}>
            <h3>Banner</h3>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <button onClick={() => setCount((c) => c + 1)}>Unrelated counter: {count}</button>
                <button onClick={() => setVariant((v) => (v === "info" ? "warn" : "info"))}>
                    Toggle variant
                </button>
            </div>
            <Banner title={title} style={style} />
        </div>
    );
}
