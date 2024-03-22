import { EventModel } from "@/models/event";

export default class EventService {
  public async getAllEvents() {
    const response = await fetch(
      `https://next-js-marques-default-rtdb.firebaseio.com/events.json`
    );

    const data = await response.json();
    const allEvents: EventModel[] = [];

    for (const key in data) {
      allEvents.push({
        id: key,
        ...data[key],
      });
    }

    return allEvents;
  }

  public async getEventById(id: string) {
    const allEvents = await this.getAllEvents();

    const event: EventModel | undefined = allEvents.find((x) => x.id === id);

    return event;
  }

  public async getFilteredEvents(slugs: string[] | undefined | string) {
    if (!slugs) return;

    const filteredYear = slugs[0];
    const filteredMonth = slugs[1];

    const year = +filteredYear;
    const month = +filteredMonth;

    const allEvents = await this.getAllEvents();

    let filteredEvents = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
      );
    });

    return filteredEvents;
  }

  public async getFeaturedEvents() {
    const allEvents = await this.getAllEvents();
    return allEvents.filter((event) => event.isFeatured);
  }
}
