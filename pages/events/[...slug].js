import { useRouter } from 'next/router';
import EventList from '../../components/events/EventList';
import { getFilteredEvents } from '../../helpers/api-util';

function FilteredEventsPage(props) {

    const router = useRouter();
    // const filterData = router.query.slug;

    // if (!filterData) {
    //     return <p className='center'>Loading...</p>
    // }

    // const filteredYear = filterData[0];
    // const filteredMonth = filterData[1];

    // const numYear = +filteredYear;
    // const numMonth = +filteredMonth;
    
    if (props.hasError) {
        return <p className='center'>Invalid Filter Criteria. Please check...</p>
    }

    const filteredEvents = props.events;

    if (!filteredEvents || filteredEvents.length === 0) {
        return <p>No Events Found!!</p>
    }

    return(
        <div>
            <EventList items={filteredEvents} />
        </div>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;

    const filterData = params.slug;

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;
    
    if (isNaN(numYear) || isNaN(numMonth)) {
        return {
            props: { hasError: true }
        }
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth
    });


    return {
        props: {
            events: filteredEvents
        }
    }
}

export default FilteredEventsPage;