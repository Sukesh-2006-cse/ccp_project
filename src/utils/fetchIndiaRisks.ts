// Utility function to fetch news/outbreak/maintenance risk data from newsdata.io
export async function fetchIndiaRisks() {
  const apiKey = 'pub_9f317139e83b4424855bc2e212cbc476';
  // Accept city/state as argument
  return async () => {
    // Fetch news for all states (no city/state filter)
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=in&language=en&category=business,environment,health,science,technology`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      const risks = [];
      if (Array.isArray(data.results)) {
        for (const item of data.results) {
          const title = item.title?.toLowerCase() || '';
          if (
            title.includes('electricity') ||
            title.includes('power outage') ||
            title.includes('water supply') ||
            title.includes('maintenance') ||
            title.includes('weather alert') ||
            title.includes('disaster') ||
            title.includes('flood') ||
            title.includes('cyclone') ||
            title.includes('outbreak') ||
            title.includes('epidemic')
          ) {
            risks.push({
              title: item.title,
              description: item.description,
              link: item.link,
              pubDate: item.pubDate
            });
          }
        }
      }
      return risks;
    } catch (e) {
      return [];
    }
  }
}
