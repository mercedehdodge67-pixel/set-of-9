import React, { useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const [numSets, setNumSets] = useState(2);
  const [sets, setSets] = useState([]);
  const [result, setResult] = useState("");

  const handleNumSets = () => {
    const newSets = Array.from({ length: numSets }, () => "");
    setSets(newSets);
    setResult("");
  };

  const handleInputChange = (index, value) => {
    const updated = [...sets];
    updated[index] = value;
    setSets(updated);
  };

  const parseSets = () =>
    sets.map((s) =>
      new Set(s.split(",").map((x) => x.trim()).filter((x) => x !== ""))
    );

  const union = () => {
    const allSets = parseSets();
    const result = new Set();
    allSets.forEach((s) => s.forEach((x) => result.add(x)));
    setResult(`{ ${[...result].join(", ")} }`);
  };

  const intersection = () => {
    const allSets = parseSets();
    let res = new Set(allSets[0]);
    for (let i = 1; i < allSets.length; i++) {
      res = new Set([...res].filter((x) => allSets[i].has(x)));
    }
    setResult(`{ ${[...res].join(", ")} }`);
  };

  const difference = () => {
    const allSets = parseSets();
    let res = new Set(allSets[0]);
    for (let i = 1; i < allSets.length; i++) {
      res = new Set([...res].filter((x) => !allSets[i].has(x)));
    }
    setResult(`{ ${[...res].join(", ")} }`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-300 flex flex-col items-center p-6" dir="rtl">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-sky-800 mb-4"
      >
        ?? ÂÒãÇíÔÇå ÑíÇÖí Çíå äåã: ãÌãæÚååÇ
      </motion.h1>

      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-lg">
        <p className="text-gray-700 mb-2">ÊÚÏÇÏ ãÌãæÚååÇ ÑÇ æÇÑÏ ˜ä (? ÊÇ ?):</p>
        <div className="flex gap-2 justify-center mb-4">
          <input
            type="number"
            min="2"
            max="4"
            value={numSets}
            onChange={(e) => setNumSets(parseInt(e.target.value))}
            className="border border-gray-300 rounded-lg px-3 py-2 w-24 text-center"
          />
          <button
            onClick={handleNumSets}
            className="bg-sky-500 hover:bg-sky-600 text-white rounded-lg px-4 py-2"
          >
            ÊÃííÏ
          </button>
        </div>

        {sets.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3 mb-4"
          >
            {sets.map((set, index) => (
              <div key={index} className="flex items-center justify-center gap-2">
                <span className="text-lg text-gray-700">{`ãÌãæÚå ${index + 1}: {`}</span>
                <input
                  type="text"
                  value={set}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  placeholder="ãËáÇğ 1,2,3"
                  className="border rounded-lg px-3 py-1 text-center w-48"
                />
                <span className="text-lg text-gray-700">}</span>
              </div>
            ))}
          </motion.div>
        )}

        {sets.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={union}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl"
            >
              ÇÌÊãÇÚ
            </button>
            <button
              onClick={intersection}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl"
            >
              ÇÔÊÑÇ˜
            </button>
            <button
              onClick={difference}
              className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl"
            >
              ÊİÇÖá (ãÌãæÚå ? - ÈŞíå)
            </button>
          </motion.div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-lg font-semibold text-emerald-700"
          >
            äÊíÌå: {result}
          </motion.div>
        )}
      </div>
    </div>
  );
}
