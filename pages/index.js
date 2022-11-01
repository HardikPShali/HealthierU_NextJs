import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Common/Footer/Footer'
import Header from '../components/Common/Header/Header'
import LandingPage from '../components/Common/Landing/LandingPage'
import styles from '../styles/Home.module.css'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>HealthierU</title>
            </Head>
            <Header />

            <LandingPage />

            <Footer />

        </div>
    )
}
