export const loadDiagram = async (index: number) => {
  const [tab] = await chrome.tabs.query({ active: true });

  chrome.scripting.executeScript<[number], void>({
    target: { tabId: tab.id ?? 0 },
    args: [index],
    func: (index: number) => {
      const rawData = localStorage.getItem('excalidraw-history');
      const storageData = rawData ? JSON.parse(rawData) : { diagrams: [] };
      console.log('storageData:', storageData);
      const lastDiagram = storageData.diagrams[index].data;
      console.log('lastDiagram:', lastDiagram);

      const event = new DragEvent('drop', {
        dataTransfer: new DataTransfer(),
        bubbles: true,
        cancelable: false
      });

      const droppedFile = new File(
        [JSON.stringify(lastDiagram)],
        'example.json',
        { type: 'application/json' }
      );

      event.dataTransfer?.items.add(droppedFile);

      const canvas = document.querySelectorAll('canvas')[1];
      console.log('canvas:', canvas);

      if (canvas) {
        canvas.dispatchEvent(event);
        console.log('dispatched');
      } else {
        console.log('NOT dispatched');
      }
    }
  });
};
