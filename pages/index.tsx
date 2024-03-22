import EventList from "@/components/events/event-list";
import NewsletterRegistration from "@/components/input/newsletter-registration";
import EventService from "@/lib/eventService";
import { EventModel } from "@/models/event";
import { GetStaticProps } from "next";

type Props = {
  featuredEvents: EventModel[];
};

export const getStaticProps: GetStaticProps<Props> = async (props) => {
  const service = new EventService();
  const featuredEvents = await service.getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 600,
  };
};

export default function HomePage(props: Props) {
  return (
    <div>
      <NewsletterRegistration></NewsletterRegistration>
      <EventList items={props.featuredEvents} />
    </div>
  );
}
