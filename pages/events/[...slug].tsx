import { Fragment } from "react";
import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { GetServerSideProps } from "next/types";
import { EventModel } from "@/models/event";
import EventService from "@/lib/eventService";

type Props = {
  filteredEvents: EventModel[] | undefined;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const slug = context.params?.slug;

  const service = new EventService();
  const filteredEvents: EventModel[] | undefined =
    await service.getFilteredEvents(slug);

  return {
    props: {
      filteredEvents: filteredEvents,
    },
  };
};

export default function FilteredEventsPage(props: Props) {
  const router = useRouter();

  const filterData = router.query.slug;
  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (!props.filteredEvents || props.filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={props.filteredEvents} />
    </Fragment>
  );
}
