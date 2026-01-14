import React, { useCallback, useMemo, useRef, useState, memo } from "react";

function calcRevenue(orders) {
    let total = 0;
    for (const o of orders) {
        for (let i = 0; i < 2500; i++) total += (o.amount * i) % 13;
        total += o.amount;
    }
    return total;
}

const OrdersHeader = memo(function OrdersHeader({ totalRevenue, onToggleSort, sortDir }) {
    const renders = useRef(0);
    renders.current++;
    return (
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div>
                <b>Total revenue:</b> {totalRevenue}{" "}
                <small style={{ color: "red" }}>(renders: {renders.current})</small>
            </div>
            <button onClick={onToggleSort}>Sort: {sortDir}</button>
        </div>
    );
})

const OrdersList = memo(function OrdersList({ users }) {
    const renders = useRef(0);
    renders.current++;
    return (
        <>
            <small style={{ color: "red" }}>
                List Render Counts {renders.current}
            </small>
            {users.slice(0, 50).map((o) => (
                <div key={o.id} style={{ padding: 6, borderBottom: "1px solid #eee" }}>
                    {o.customer} — ${o.amount}
                </div>
            ))}
        </>
    )
})

export function ThirdApp() {
    const [query, setQuery] = useState("");
    const [sortDir, setSortDir] = useState("asc");

    const [personalDataChecked, setPersonalDataChecked] = useState(false)
    const onToggleSort = useCallback(() => setSortDir((d) => (d === "asc" ? "desc" : "asc")), []);

    const orders = useMemo(
        () =>
            Array.from({ length: 800 }, (_, i) => ({
                id: i + 1,
                customer: `Customer ${i + 1}`,
                amount: (i * 7) % 97
            })),
        []
    );

    const visible = useMemo(() =>
            orders
            .filter((o) => o.customer.toLowerCase().includes(query.toLowerCase()))
            .sort((a, b) => (sortDir === "asc" ? a.amount - b.amount : b.amount - a.amount))
        , [query, sortDir]);

    const totalRevenue = useMemo(() => calcRevenue(visible), [visible]);


    return (
        <div style={{ fontFamily: "sans-serif", maxWidth: 520, margin: "20px auto" }}>
            <h3>Orders</h3>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search customers…"
                style={{ width: "100%", padding: 8, marginBottom: 10 }}
            />
            <OrdersHeader totalRevenue={totalRevenue} onToggleSort={onToggleSort} sortDir={sortDir} />
            <label style={{ marginBottom: '12px' }}>
                I agree to the processing of personal data
                <input type="checkbox" value={personalDataChecked} onChange={e => setPersonalDataChecked(e.target.checked)} />
            </label>
            <div style={{ border: "1px solid #ddd", maxHeight: 320, overflow: "auto" }}>
                 <OrdersList users={visible}></OrdersList>
            </div>
 
        </div>
    );
}