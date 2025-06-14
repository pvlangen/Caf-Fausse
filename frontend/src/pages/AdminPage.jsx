import ReservationList from "../ReservationList";
import SubscribersList from "../SubscribersList";
import MenuEditor from "../MenuEditor";

export default function AdminPage() {
  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <section style={{ marginBottom: "40px" }}>
        <ReservationList />
      </section>

      <section>
        <SubscribersList />
      </section>

      <section>
        <MenuEditor />
      </section>
    </div>
  );
}