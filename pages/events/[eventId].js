import Head from 'next/head';

import EventItem from '../../components/events/EventItem';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';

function EventDetailPage(props) {
    const event = props.selectedEvent

    if (!event) {
        return <p>No Event Found</p>
    }

    return (
        <div>
            <Head>
                <title>{event.title}</title>
                <meta name="description" content={event.description} />
            </Head>
            <EventItem
                id={event.id}
                title={event.title}
                location={event.location}
                date={event.date}
                image={event.image} />
        </div>

    )
}

export async function getStaticProps(context) {
    const eventId = context.params.eventId;

    const event = await getEventById(eventId);

    return {
        props: {
            selectedEvent: event
        },
        revalidate: 30
    }

}

export async function getStaticPaths() {

    const events = await getFeaturedEvents();
    const paths = events.map(event => ({ params: { eventId: event.id } }));

    return {
        paths: paths,
        fallback: true
    };
}

export default EventDetailPage;