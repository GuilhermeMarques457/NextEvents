import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import { EventModel } from "@/models/event";
import { GetStaticPaths, GetStaticProps } from "next";
import EventService from "@/lib/eventService";
import Comments from "@/components/input/comments";

type Props = {
  event: EventModel | null;
};

// This is to tell next which instances of this dynamic page should be generated
export const getStaticPaths: GetStaticPaths = async (props) => {
  const service = new EventService();
  const featuredEvents = await service.getFeaturedEvents();

  const pathWithParams = featuredEvents.map((event: EventModel) => ({
    params: {
      eventId: event.id,
    },
  }));

  return {
    paths: pathWithParams,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const eventId: any = params?.eventId;

  const service = new EventService();
  const event = await service.getEventById(eventId);

  return {
    props: {
      event: event || null,
    },
    revalidate: 30,
  };
};

export default function EventDetailPage(props: Props) {
  if (!props.event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={props.event.title} />
      <EventLogistics
        date={props.event.date}
        address={props.event.location}
        image={props.event.image}
        imageAlt={props.event.title}
      />
      <EventContent>
        <p>{props.event.description}</p>
      </EventContent>
      <Comments eventId={props.event.id} />
    </Fragment>
  );
}
