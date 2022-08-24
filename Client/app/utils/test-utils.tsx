import { render, RenderOptions } from "@testing-library/react"
import { PreloadedState } from "redux"
import { AppStore, RootState, setupStore } from "../store/ReduxStore"
import { PropsWithChildren } from "react"
import { Provider } from "react-redux"

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: PreloadedState<RootState>
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = setupStore(preloadedState),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({
        children,
    }: ///Record<string, unknown> means empty {} type
    PropsWithChildren<Record<string, unknown>>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
