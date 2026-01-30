import { useState } from "react";

export default function TestPage() {

    const [count, setCount] = useState(0);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-[500px] h-[500px] p-6 bg-amber-200 rounded-lg shadow-lg flex items-center justify-center">
                <button onClick={
                    () => setCount(count - 1)}
                    className="w-25 h-12 bg-cyan-400 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300">
                    -
                </button>
                <span className="mx-10 text-2xl font-semibold text-gray-800">{count}</span>
                <button onClick={
                    () => setCount(count + 1)}
                    className="w-25 h-12 bg-cyan-400 text-white font-semibold rounded-md hover:bg-green-600 transition duration-300">
                    +
                </button>
            </div>
        </div>
    );
}