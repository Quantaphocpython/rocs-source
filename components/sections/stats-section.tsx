"use client";

import { motion } from "framer-motion";

export function StatsSection() {
    const stats = [
        { value: "40+", label: "Unique Cards" },
        { value: "5", label: "Elemental Types" },
        { value: "6+", label: "Boss Monsters" },
        { value: "13", label: "Cards Per Deck" },
    ];

    return (
        <section id="stats" className="py-20 bg-gradient-to-b from-background to-accent/10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center"
                        >
                            <h3 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                                {stat.value}
                            </h3>
                            <p className="text-white/70">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}