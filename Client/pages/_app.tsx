import {NextPage} from "next"
import {AppProps} from "next/app"
import Head from "next/head"
import React, {ReactElement, ReactNode} from "react"
import {Provider} from "react-redux"
import Layout from "../app/layout/Layout"
import {store} from "../app/store/ReduxStore"
import "./../styles/style.scss"

export type NextPageWithLayout<T = { string: unknown }> = NextPage<T> & {
	getLayout?: (page: ReactElement) => React.ReactNode
}
type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

function MyApp({Component, pageProps}: AppPropsWithLayout) {
	let getLayout

	if (Component.getLayout) getLayout = Component.getLayout
	// eslint-disable-next-line react/display-name
	else getLayout = (page: ReactNode) => <Layout>{page}</Layout>

	// const getLayout =
	//     Component.getLayout !== null ||
	//     ((page: ReactNode) => <Layout>{page}</Layout>)

	return (
		<div className="MainWrapper">
			{getLayout(
				<Provider store={store}>
					<Head>
						<link rel="icon" href="/telegram-icon.svg"/>
						<title>Telegram Copy</title>
					</Head>
					<Component {...pageProps} />
				</Provider>
			)}
		</div>
	)
}

export default MyApp
