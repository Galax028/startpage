import React, { useState, useEffect } from "react";

const Clock = () => {
    const [hours, setHours] = useState("--");
    const [minutes, setMinutes] = useState("--");
    const [seconds, setSeconds] = useState("--");
    const [time, setTime] = useState("");

    useEffect(() => {
        setInterval(() => {
            const d = new Date();
            setHours(`${d.getHours() % 12 || 12}`.padStart(2, "0"));
            setMinutes(`${d.getMinutes()}`.padStart(2, "0"));
            setSeconds(`${d.getSeconds()}`.padStart(2, "0"));
            setTime(`${d.getHours() >= 12 ? "PM" : "AM"}`);
        }, 1000);
    }, [seconds, minutes, hours, time]);

    return (
        <h5>
            Good {time === "AM" ? "morning" : "afternoon"}. • {hours}:{minutes}:
            {seconds} {time}
        </h5>
    );
};

export default Clock;
