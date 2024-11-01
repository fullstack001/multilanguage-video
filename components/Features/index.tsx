import SectionTitle from "../Common/SectionTitle";
import { useTranslations } from "next-intl";
import SingleFeature from "./SingleFeature";
import useFeaturesData from "./featuresData";

const Features = () => {
  const featureData = useFeaturesData();
  const t = useTranslations("Feature");
  return (
    <>
      <section id="features" className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <SectionTitle
            title={t("title")}
            paragraph={t("description")}
            center
          />

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featureData.map((feature) => (
              <SingleFeature key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
