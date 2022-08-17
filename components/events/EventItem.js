import Link from 'next/link';
import Button from '../ui/Button';

import classes from './event-item.module.css';

function EventItem(props) {

    const { title, image, date, location, id } = props;

    const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const formattedAddress = location.replace(', ', '\n')

    const exploreLink = `/events/${id}`

    return (
        <li className={classes.item}>
            <img src={'/' + image} alt={title} />
            <div className={classes.content}>
                <div className={classes.summary}>
                    <h2>{title}</h2>
                    <div className={classes.date}>
                        <time>{humanReadableDate}</time>
                    </div>
                </div>
                <div className={classes.address}>
                    <address>{formattedAddress}</address>
                </div>
            </div>
            <div className={classes.actions}>
                <Button link={exploreLink}>Explore Event</Button>
            </div>
        </li>
    )
}

export default EventItem;