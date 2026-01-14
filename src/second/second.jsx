import React, {useRef, useState, memo, useCallback } from "react";

const UserRow = memo(function UserRow({ user, onSelect, isSelected }) {
    const renders = useRef(0);
    renders.current++;

    return (
        <div
            style={{
                padding: 6,
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                cursor: "pointer",
                background: isSelected ? "#f3f8ff" : "transparent"
            }}
            onClick={() => onSelect(user.id)}
        >
            <span>
                {user.name} <small style={{ color: "#999" }}>(renders: {renders.current})</small>
            </span>
            <span style={{ color: "#666" }}>{user.role}</span>
        </div>
    );
})

const roles = ["viewer", "editor", "admin"];
const users = Array.from({ length: 1000 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    role: roles[i % roles.length]
}));



export function SecondApp() {
    const [selectedId, setSelectedId] = useState(10);
    const onSelect = useCallback((id) => setSelectedId(id), []);

    return (
        <div style={{ fontFamily: "sans-serif", maxWidth: 520, margin: "20px auto" }}>
            <h3>User picker</h3>
            <div style={{ border: "1px solid #ddd" }}>
                {users.map((u) => (
                    <UserRow
                        key={u.id}
                        user={u}
                        onSelect={onSelect}
                        isSelected={u.id === selectedId}
                    />
                ))}
            </div>
        </div>
    );
}
