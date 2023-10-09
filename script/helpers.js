export const getText = async function (mode, type) {
    try {
        if (mode === "quote") {
            const response = await fetch("/words/quotes/english.json");

            const data = await response.json();

            const filtered = (type !== "all"
                ? data.quotes.filter((q) => q.length === type)
                : data.quotes);

            const quote = filtered[Math.floor(Math.random() * filtered.length)];

            return quote.text.split(" ");
        } else if (mode === "words") {
            const response = await fetch("/words/english.json");

            const data = await response.json();

            const words = [...data.words]
                .sort(() => 0.5 - Math.random())
                .slice(0, type);

            return words;
        } else {
            const response = await fetch("/words/english.json");

            const data = await response.json();

            const words = [...data.words]
                .sort(() => 0.5 - Math.random())
                .slice(0, 100);

            return words;
        }
    } catch (error) {}
};