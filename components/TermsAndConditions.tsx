import { useTranslations } from "next-intl";

const TermsAndConditions = () => {
  const t = useTranslations("TermsAndConditions");

  return (
    <div className="mx-auto my-24 max-w-screen-xl bg-white px-4 py-8 text-gray-800 dark:bg-gray-900 dark:text-gray-200 lg:px-16">
      <h1 className="mb-4 text-3xl font-bold">{t("agreementTitle")}</h1>
      <p className="mb-4">{t("agreementDescription")}</p>

      <section>
        <h2 className="mt-6 text-xl font-semibold">{t("siteDescription")}</h2>
        <p className="mb-4">{t("sitePurpose")}</p>
      </section>

      <section>
        <h2 className="mt-6 text-xl font-semibold">
          {t("electronicCommunicationsTitle")}
        </h2>
        <p className="mb-4">{t("electronicCommunicationsDescription")}</p>
      </section>

      <section>
        <h2 className="mt-6 text-xl font-semibold">{t("accountTitle")}</h2>
        <p className="mb-4">{t("accountDescription")}</p>
      </section>

      <section>
        <h2 className="mt-6 text-xl font-semibold">{t("childrenTitle")}</h2>
        <p className="mb-4">{t("childrenDescription")}</p>
      </section>

      <section>
        <h2 className="mt-6 text-xl font-semibold">
          {t("cancellationPolicyTitle")}
        </h2>
        <p className="mb-4">{t("cancellationPolicyDescription")}</p>
      </section>

      <section>
        <h2 className="mt-6 text-xl font-semibold">{t("thirdPartyTitle")}</h2>
        <p className="mb-4">{t("thirdPartyDescription")}</p>
      </section>

      <section>
        <h2 className="mt-6 text-xl font-semibold">
          {t("liabilityDisclaimerTitle")}
        </h2>
        <p className="mb-4">{t("liabilityDisclaimerDescription")}</p>
      </section>

      <section>
        <h2 className="mt-6 text-xl font-semibold">{t("contactTitle")}</h2>
        <p className="mb-4">{t("contactDescription")}</p>
        <ul className="list-inside list-disc">
          <li>{t("address")}</li>
          <li>{t("email")}</li>
          <li>{t("phone")}</li>
        </ul>
        <p className="mt-2">{t("effectiveDate")}</p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
