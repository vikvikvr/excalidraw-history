export const saveDiagram = async (
  diagrams: unknown[],
  name: string
): Promise<unknown[]> => {
  const [tab] = await chrome.tabs.query({ active: true });

  const result = await chrome.scripting.executeScript<
    [unknown[], string],
    unknown[]
  >({
    target: { tabId: tab.id ?? 0 },
    args: [[...diagrams], name],
    func: (diagrams, name) => {
      const data = localStorage.getItem('excalidraw') ?? '';
      const elements = data ? JSON.parse(data) : [];
      console.log('elements:', elements);

      const diagramData = {
        type: 'excalidraw',
        version: 2,
        source: 'https://excalidraw.com',
        appState: {
          gridSize: null,
          viewBackgroundColor: '#ffffff'
        },
        files: {},
        elements
      };

      diagrams.push({ data: diagramData, name });

      localStorage.setItem('excalidraw-history', JSON.stringify({ diagrams }));
      console.log('saved');

      return diagrams;
    }
  });

  return result[0].result ?? [];
};
