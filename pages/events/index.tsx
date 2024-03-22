import { Fragment } from "react";
import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { GetStaticProps } from "next";
import path from "path";
import { EventModel } from "@/models/event";
import EventService from "@/lib/eventService";

type Props = {
  events: EventModel[];
};

export const getStaticProps: GetStaticProps<Props> = async (props) => {
  const service = new EventService();
  const allEvents = await service.getAllEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
};

export default function AllEventsPage(props: Props) {
  const router = useRouter();

  function findEventsHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={props.events} />
    </Fragment>
  );
}
