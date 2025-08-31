import { createReducer, on } from '@ngrx/store';
import { initialState } from '../dashboard.state';

export type { DashboardState } from '../dashboard.state';
import * as DashboardActions from '../actions/dashboard.actions';
import * as DeviceActions from '../actions/device.actions';
import { Tab, Card } from '../../models/dashboard.models';

export const dashboardReducer = createReducer(
  initialState,

  on(DashboardActions.enterEditMode, (state) => ({
    ...state,
    isEditMode: true,
    dashboardSnapshot: state.selectedDashboard
      ? JSON.parse(JSON.stringify(state.selectedDashboard))
      : null,
  })),

  on(DashboardActions.exitEditMode, (state) => ({
    ...state,
    isEditMode: false,
    dashboardSnapshot: null,
  })),

  on(DashboardActions.loadDashboard, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(DashboardActions.loadDashboardSuccess, (state, { dashboard }) => ({
    ...state,
    selectedDashboard: dashboard,
    loading: false,
    error: null,
  })),

  on(DashboardActions.loadDashboardFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(DashboardActions.addTab, (state, { title }) => {
    if (!state.selectedDashboard) return state;

    const newTab: Tab = {
      id: title.toLowerCase().replace(/\s+/g, '-'),
      title,
      cards: [],
    };

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: [...state.selectedDashboard.tabs, newTab],
      },
    };
  }),

  on(DashboardActions.removeTab, (state, { tabId }) => {
    if (!state.selectedDashboard) return state;

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: state.selectedDashboard.tabs.filter((tab) => tab.id !== tabId),
      },
    };
  }),

  on(DashboardActions.reorderTab, (state, { tabId, direction }) => {
    if (!state.selectedDashboard) return state;

    const tabs = [...state.selectedDashboard.tabs];
    const currentIndex = tabs.findIndex((tab) => tab.id === tabId);

    if (currentIndex === -1) return state;

    if (direction === 'left' && currentIndex > 0) {
      [tabs[currentIndex], tabs[currentIndex - 1]] = [
        tabs[currentIndex - 1],
        tabs[currentIndex],
      ];
    } else if (direction === 'right' && currentIndex < tabs.length - 1) {
      [tabs[currentIndex], tabs[currentIndex + 1]] = [
        tabs[currentIndex + 1],
        tabs[currentIndex],
      ];
    }

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs,
      },
    };
  }),

  on(DashboardActions.updateTabTitle, (state, { tabId, title }) => {
    if (!state.selectedDashboard) return state;

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: state.selectedDashboard.tabs.map((tab) =>
          tab.id === tabId ? { ...tab, title } : tab
        ),
      },
    };
  }),

  on(DashboardActions.addCard, (state, { tabId, layout }) => {
    if (!state.selectedDashboard) return state;

    const newCard: Card = {
      id: `card-${Date.now()}`,
      title: '',
      layout: layout as 'singleDevice' | 'horizontalLayout' | 'verticalLayout',
      items: [],
    };

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: state.selectedDashboard.tabs.map((tab) =>
          tab.id === tabId ? { ...tab, cards: [...tab.cards, newCard] } : tab
        ),
      },
    };
  }),

  on(DashboardActions.removeCard, (state, { tabId, cardId }) => {
    if (!state.selectedDashboard) return state;

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: state.selectedDashboard.tabs.map((tab) =>
          tab.id === tabId
            ? { ...tab, cards: tab.cards.filter((card) => card.id !== cardId) }
            : tab
        ),
      },
    };
  }),

  on(DashboardActions.reorderCard, (state, { tabId, cardId, newIndex }) => {
    if (!state.selectedDashboard) return state;

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: state.selectedDashboard.tabs.map((tab) => {
          if (tab.id !== tabId) return tab;

          const cards = [...tab.cards];
          const currentIndex = cards.findIndex((card) => card.id === cardId);

          if (currentIndex === -1) return tab;

          const [movedCard] = cards.splice(currentIndex, 1);
          cards.splice(newIndex, 0, movedCard);

          return { ...tab, cards };
        }),
      },
    };
  }),

  on(DashboardActions.updateCardTitle, (state, { tabId, cardId, title }) => {
    if (!state.selectedDashboard) return state;

    return {
      ...state,
      selectedDashboard: {
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
      },
    };
  }),

  on(DashboardActions.addItemToCard, (state, { tabId, cardId, item }) => {
    if (!state.selectedDashboard) return state;

    return {
      ...state,
      selectedDashboard: {
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
      },
    };
  }),

  on(
    DashboardActions.removeItemFromCard,
    (state, { tabId, cardId, itemId }) => {
      if (!state.selectedDashboard) return state;

      return {
        ...state,
        selectedDashboard: {
          ...state.selectedDashboard,
          tabs: state.selectedDashboard.tabs.map((tab) =>
            tab.id === tabId
              ? {
                  ...tab,
                  cards: tab.cards.map((card) =>
                    card.id === cardId
                      ? {
                          ...card,
                          items: card.items.filter(
                            (item) => item.id !== itemId
                          ),
                        }
                      : card
                  ),
                }
              : tab
          ),
        },
      };
    }
  ),

  on(DashboardActions.saveDashboardSuccess, (state) => ({
    ...state,
    isEditMode: false,
    dashboardSnapshot: null,
  })),

  on(DashboardActions.discardChanges, (state) => ({
    ...state,
    selectedDashboard: state.dashboardSnapshot,
    isEditMode: false,
    dashboardSnapshot: null,
  })),

  on(DeviceActions.toggleDeviceStateSuccess, (state, { device }) => {
    if (!state.selectedDashboard) return state;

    return {
      ...state,
      selectedDashboard: {
        ...state.selectedDashboard,
        tabs: state.selectedDashboard.tabs.map((tab) => ({
          ...tab,
          cards: tab.cards.map((card) => ({
            ...card,
            items: card.items.map((item) =>
              item.id === device.id && item.type === 'device'
                ? { ...item, state: device.state }
                : item
            ),
          })),
        })),
      },
    };
  })
);
