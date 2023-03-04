import ContactForm from "../../components/contacts/contactForm";
import PageHeader from "../../components/globals/pageHeader";

export default function CreateContact() {
  const locationRoutes = [
    {
      text: "Inicio",
      link: "/",
    },
    {
      text: "Clientes",
      link: "/clientes",
    },
    {
      text: "Crear",
      link: "/clientes/crear",
    },
  ];

  return (
    <>
      <div className="col-span-12 flex w-full justify-between items-center pr-8">
        <div>
          <PageHeader header="Crear cliente" locationRoutes={locationRoutes} />
        </div>
      </div>
      <ContactForm />
    </>
  );
}
