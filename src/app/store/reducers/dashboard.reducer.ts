import { createReducer, on } from '@ngrx/store';
import { initialDashboardState } from '../state/app.state';
import * as DashboardActions from '../actions/dashboard.actions';
import { toKebabCase } from '../../utils/string-utils';

export const dashboardReducer = createReducer(
  initialDashboardState,

  on(DashboardActions.loadDashboard, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(DashboardActions.loadDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    selectedDashboard: dashboard,
    originalData: JSON.parse(JSON.stringify(dashboard)), // Deep copy
    isLoading: false,
    error: null,
    hasUnsavedChanges: false,
  })),

  on(DashboardActions.loadDashboardFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(DashboardActions.saveDashboard, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(DashboardActions.saveDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    selectedDashboard: dashboard,
    originalData: JSON.parse(JSON.stringify(dashboard)), // Deep copy
    isLoading: false,
    error: null,
    hasUnsavedChanges: false,
  })),

  on(DashboardActions.saveDashboardFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(DashboardActions.enterEditMode, (state) => ({
    ...state,
    isEditMode: true,
    originalData: state.selectedDashboard
      ? JSON.parse(JSON.stringify(state.selectedDashboard))
      : null,
  })),

  on(DashboardActions.exitEditMode, (state) => ({
    ...state,
    isEditMode: false,
    hasUnsavedChanges: false,
  })),

  on(DashboardActions.discardChanges, (state) => ({
    ...state,
    selectedDashboard: state.originalData
      ? JSON.parse(JSON.stringify(state.originalData))
      : null,
    isEditMode: false,
    hasUnsavedChanges: false,
  })),

  on(DashboardActions.addTab, (state, { title }) => {
    if (!state.selectedDashboard) return state;

    const newTab = {
      id: toKebabCase(title),
      title,
      cards: [],
    };

    const updatedDashboard = {
      ...state.selectedDashboard,
      tabs: [...state.selectedDashboard.tabs, newTab],
    };

    return {
      ...state,
      selectedDashboard: updatedDashboard,
      hasUnsavedChanges: true,
    };
  }),

  on(DashboardActions.removeTab, (state, { tabId }) => {
    if (!state.selectedDashboard) return state;

    const updatedDashboard = {
      ...state.selectedDashboard,
      tabs: state.selectedDashboard.tabs.filter((tab) => tab.id !== tabId),
    };

    return {
      ...state,
      selectedDashboard: updatedDashboard,
      hasUnsavedChanges: true,
    };
  }),

  on(DashboardActions.reorderTab, (state, { tabId, direction }) => {
    if (!state.selectedDashboard) return state;

    const tabs = [...state.selectedDashboard.tabs];
    const currentIndex = tabs.findIndex((tab) => tab.id === tabId);

    if (currentIndex === -1) return state;

    let newIndex: number;
    if (direction === 'left' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else if (direction === 'right' && currentIndex < tabs.length - 1) {
      newIndex = currentIndex + 1;
    } else {
      return state;
    }

    [tabs[currentIndex], tabs[newIndex]] = [tabs[newIndex], tabs[currentIndex]];

    const updatedDashboard = {
      ...state.selectedDashboard,
      tabs,
    };

    return {
      ...state,
      selectedDashboard: updatedDashboard,
      hasUnsavedChanges: true,
    };
  }),

  on(DashboardActions.updateTabTitle, (state, { tabId, title }) => {
    if (!state.selectedDashboard) return state;

    const updatedDashboard = {
      ...state.selectedDashboard,
      tabs: state.selectedDashboard.tabs.map((tab) =>
        tab.id === tabId ? { ...tab, title } : tab
      ),
    };

    return {
      ...state,
      selectedDashboard: updatedDashboard,
      hasUnsavedChanges: true,
    };
  }),

  on(DashboardActions.addCard, (state, { tabId, layout }) => {
    if (!state.selectedDashboard) return state;

    const newCard = {
      id: `card_${Date.now()}`,
      title: '',
      layout,
      items: [],
    };

    const updatedDashboard = {
      ...state.selectedDashboard,
      tabs: state.selectedDashboard.tabs.map((tab) =>
        tab.id === tabId ? { ...tab, cards: [...tab.cards, newCard] } : tab
      ),
    };

    return {
      ...state,
      selectedDashboard: updatedDashboard,
      hasUnsavedChanges: true,
    };
  }),

  on(DashboardActions.removeCard, (state, { tabId, cardId }) => {
    if (!state.selectedDashboard) return state;

    const updatedDashboard = {
      ...state.selectedDashboard,
      tabs: state.selectedDashboard.tabs.map((tab) =>
        tab.id === tabId
          ? { ...tab, cards: tab.cards.filter((card) => card.id !== cardId) }
          : tab
      ),
    };

    return {
      ...state,
      selectedDashboard: updatedDashboard,
      hasUnsavedChanges: true,
    };
  }),

  on(DashboardActions.reorderCard, (state, { tabId, cardId, newIndex }) => {
    if (!state.selectedDashboard) return state;

    const updatedDashboard = {
      ...state.selectedDashboard,
      tabs: state.selectedDashboard.tabs.map((tab) => {
        if (tab.id !== tabId) return tab;

        const cards = [...tab.cards];
        const currentIndex = cards.findIndex((card) => card.id === cardId);

        if (currentIndex === -1 || newIndex < 0 || newIndex >= cards.length)
          return tab;

        const [card] = cards.splice(currentIndex, 1);
        cards.splice(newIndex, 0, card);

        return { ...tab, cards };
      }),
    };

    return {
      ...state,
      selectedDashboard: updatedDashboard,
      hasUnsavedChanges: true,
    };
  }),

  on(DashboardActions.updateCardTitle, (state, { tabId, cardId, title }) => {
    if (!state.selectedDashboard) return state;

    const updatedDashboard = {
      ...state.selectedDashboard,
      tabs: state.selectedDashboard.tabs.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              cards: tab.cards.map((card) =>
                card.id === cardId ? { ...card, title } : card
              ),
            }
          : tab
      ),
    };

    return {
      ...state,
      selectedDashboard: updatedDashboard,
      hasUnsavedChanges: true,
    };
  }),

  on(DashboardActions.addItemToCard, (state, { tabId, cardId, item }) => {
    if (!state.selectedDashboard) return state;

    const updatedDashboard = {
      ...state.selectedDashboard,
      tabs: state.selectedDashboard.tabs.map((tab) =>
        tab.id === tabId
          ? {
              ...tab,
              cards: tab.cards.map((card) =>
                card.id === cardId
                  ? { ...card, items: [...card.items, item] }
                  : card
              ),
            }
          : tab
      ),
    };

    return {
      ...state,
      selectedDashboard: updatedDashboard,
      hasUnsavedChanges: true,
    };
  }),

  on(
    DashboardActions.removeItemFromCard,
    (state, { tabId, cardId, itemId }) => {
      if (!state.selectedDashboard) return state;

      const updatedDashboard = {
        ...state.selectedDashboard,
        tabs: state.selectedDashboard.tabs.map((tab) =>
          tab.id === tabId
            ? {
                ...tab,
                cards: tab.cards.map((card) =>
                  card.id === cardId
                    ? {
                        ...card,
                        items: card.items.filter((item) => item.id !== itemId),
                      }
                    : card
                ),
              }
            : tab
        ),
      };

      return {
        ...state,
        selectedDashboard: updatedDashboard,
        hasUnsavedChanges: true,
      };
    }
  ),

  on(DashboardActions.createDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    selectedDashboard: dashboard,
    originalData: JSON.parse(JSON.stringify(dashboard)),
    isLoading: false,
    error: null,
    hasUnsavedChanges: false,
    isEditMode: false,
  })),

  on(DashboardActions.createDashboardFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(DashboardActions.deleteDashboardSuccess, () => ({
    ...initialDashboardState,
  })),

  on(DashboardActions.deleteDashboardFailure, (_state, { error }) => ({
    ...initialDashboardState,
    error,
  })),

  on(
    DashboardActions.syncDeviceStateInDashboard,
    (state, { deviceId, newState }) => {
      if (!state.selectedDashboard) return state;

      const updatedDashboard = {
        ...state.selectedDashboard,
        tabs: state.selectedDashboard.tabs.map((tab) => ({
          ...tab,
          cards: tab.cards.map((card) => ({
            ...card,
            items: card.items.map((item) =>
              item.type === 'device' && item.id === deviceId
                ? { ...item, state: newState }
                : item
            ),
          })),
        })),
      };

      return {
        ...state,
        selectedDashboard: updatedDashboard,
        hasUnsavedChanges: state.isEditMode,
      };
    }
  )
);
