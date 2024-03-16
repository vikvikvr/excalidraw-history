import { useEffect, useState } from 'react';
import * as actions from '../actions';

export const useDiagrams = () => {
  const [diagrams, setDiagrams] = useState<unknown[]>([]);

  const saveDiagram = async (name: string) => {
    const newDiagrams = await actions.saveDiagram(diagrams, name);
    setDiagrams(newDiagrams);
  };

  const loadDiagram = async (index: number) => {
    await actions.loadDiagram(index);
  };

  const deleteDiagram = async (index: number) => {
    const newDiagrams = await actions.deleteDiagram(index);
    setDiagrams(newDiagrams);
  };

  const _loadDiagrams = async () => {
    const [tab] = await chrome.tabs.query({ active: true });

    const result = await chrome.scripting.executeScript<[unknown[]], unknown[]>(
      {
        target: { tabId: tab.id ?? 0 },
        func: () => {
          const rawData = localStorage.getItem('excalidraw-history');
          const parsed = rawData ? JSON.parse(rawData) : { diagrams: [] };
          return parsed.diagrams;
        }
      }
    );

    setDiagrams(result[0].result ?? []);
  };

  useEffect(() => {
    _loadDiagrams();
  }, []);

  return {
    diagrams,
    saveDiagram,
    loadDiagram,
    deleteDiagram
  };
};
