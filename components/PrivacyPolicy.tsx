import React from "react";
import { useTranslations } from "next-intl";

const PrivacyPolicy = () => {
  const t = useTranslations("PrivacyPolicy");
  return (
    <div className="mx-auto my-24 max-w-screen-xl bg-white px-4 py-8 text-gray-800 dark:bg-gray-900 dark:text-gray-200 lg:px-16">
      <h1 className="mb-6 text-2xl font-bold text-gray-800 md:text-4xl">
        {t("title")}
      </h1>
      <p className="mb-4 text-gray-600">
        {t("description1")}
        <a
          href="https://bestglobalai2.com/"
          className="text-blue-500 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://bestglobalai2.com/
        </a>
        {t("description2")}
      </p>

      <h2 className="mb-4 mt-8 text-xl font-semibold text-gray-800 md:text-2xl">
        {t("collectionTitle")}
      </h2>
      <p className="mb-4 text-gray-600">{t("collectionDescription")}</p>
      <ul className="mb-4 list-inside list-disc text-gray-600">
        <li>{t("collectionItem1")}</li>
        <li>{t("collectionItem2")}</li>
      </ul>
      <p className="mb-4 text-gray-600">{t("collectionDescription2")}</p>
      <p className="mb-4 text-gray-600">{t("collectionDescription3")}</p>

      <h2 className="mb-4 mt-8 text-xl font-semibold text-gray-800 md:text-2xl">
        {t("useTitle")}
      </h2>
      <p className="mb-4 text-gray-600">{t("useDescription")}</p>
      <ul className="mb-4 list-inside list-disc text-gray-600">
        <li>{t("useItem1")}</li>
        <li>{t("useItem2")}</li>
        <li>{t("useItem3")}</li>
        <li>{t("useItem4")}</li>
      </ul>

      <h2 className="mb-4 mt-8 text-xl font-semibold text-gray-800 md:text-2xl">
        {t("sharingTitle")}
      </h2>
      <p className="mb-4 text-gray-600">{t("sharingDescription")}</p>

      <h2 className="mb-4 mt-8 text-xl font-semibold text-gray-800 md:text-2xl">
        {t("securityTitle")}
      </h2>
      <p className="mb-4 text-gray-600">{t("securityDescription")}</p>
      <p className="mb-4 text-gray-600">{t("securityDescription2")}</p>

      <h2 className="mb-4 mt-8 text-xl font-semibold text-gray-800 md:text-2xl">
        {t("rightTitle")}
      </h2>
      <p className="mb-4 text-gray-600">{t("rightDescription")}</p>
      <ul className="mb-4 list-inside list-disc text-gray-600">
        <li>{t("rightItem1")}</li>
        <li>{t("rightItem2")}</li>
        <li>{t("rightItem3")}</li>
        <li>{t("rightItem4")}</li>
      </ul>

      <h2 className="mb-4 mt-8 text-xl font-semibold text-gray-800 md:text-2xl">
        {t("contactTitle")}
      </h2>
      <p className="mb-4 text-gray-600">{t("contactDescription")}</p>
      <p className="mb-2 text-gray-600">
        {t("email")}:jamesmusgrave2122@att.net
      </p>
      <p className="mb-2 text-gray-600">{t("phone")}:6197507360</p>
      <p className="text-gray-600">{t("effectiveDate")}:June 17, 2024</p>
    </div>
  );
};

export default PrivacyPolicy;
