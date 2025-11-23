export const getStatsData = (stats) => [
    {
        type: "cards",
        cards: [
            {
                card: [
                    {
                        type: "text",
                        content: stats.totalProductos.toString(),
                        className: "stat-number"
                    },
                    {
                        type: "text",
                        content: "Total Productos", 
                        className: "stat-text"
                    }
                ],
                className: "stat-card"
            },
            {
                card: [
                    {
                        type: "text", 
                        content: stats.totalUsuarios.toString(),
                        className: "stat-number"
                    },
                    {
                        type: "text",
                        content: "Total Usuarios",
                        className: "stat-text"
                    }
                ],
                className: "stat-card"
            }
        ],
        className: "stats-cards"
    }
];

export default getStatsData;