import { useRouter } from 'next/router';
import EventList from '../../components/events/EventList';
import { getFilteredEvents } from '../../dummy-data';

function FilteredEventsPage() {

    const router = useRouter();
    const filterData = router.query.slug;

    if (!filterData) {
        return <p className='center'>Loading...</p>
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;
    
    if (isNaN(numYear) || isNaN(numMonth)) {
        return <p className='center'>Invalid Filter Criteria. Please check...</p>
    }

    const filteredEvents = getFilteredEvents({
        year: numYear,
        month: numMonth
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return <p>No Events Found!!</p>
    }

    return(
        <div>
            <EventList items={filteredEvents} />
        </div>
    )
}

export default FilteredEventsPage;