import Head from 'next/head';

import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/EventList';

function HomePage(props) {
    return (
        <div>
            <Head>
                <title>Event Management App</title>
                <meta name="description" content="One place to find events" />
            </Head>
            <EventList items={props.events} />
        </div>)
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();
    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800
    }
}

export default HomePage;