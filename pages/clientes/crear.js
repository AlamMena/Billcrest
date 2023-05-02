import { useTranslation } from "react-i18next";
import ContactForm from "../../components/contacts/contactForm";
import PageHeader from "../../components/globals/pageHeader";
import { ContactPageOutlined } from "@mui/icons-material";

export default function CreateContact() {
  const { t } = useTranslation();
  const locationRoutes = [
    {
      text: t("nav.home"),
      link: "/",
    },
    {
      text: t("nav.clients"),
      link: "/clientes",
    },
    {
      text: t("create"),
      link: "/clientes/crear",
    },
  ];

  return (
    <>
      <div className="col-span-12 flex w-full justify-between items-center pr-8">
        <div>
          <PageHeader
            header={t("createClient")}
            locationRoutes={locationRoutes}
            Icon={<ContactPageOutlined />}
          />
        </div>
      </div>
      <ContactForm />
    </>
  );
}
