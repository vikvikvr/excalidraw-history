export const deleteDiagram = async (index: number): Promise<unknown[]> => {
  const [tab] = await chrome.tabs.query({ active: true });

  const results = await chrome.scripting.executeScript<[number], unknown[]>({
    target: { tabId: tab.id ?? 0 },
    args: [index],
    func: (index: number) => {
      const rawData = localStorage.getItem('excalidraw-history');
      const storageData = rawData ? JSON.parse(rawData) : { diagrams: [] };
      console.log('storageData:', storageData);

      storageData.diagrams.splice(index, 1);

      localStorage.setItem('excalidraw-history', JSON.stringify(storageData));
      return storageData.diagrams;
    }
  });

  return results[0].result ?? [];
};
