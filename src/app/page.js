
import BannerSection from "@/components/homepage/banner";
import BrowseByCategorites from "@/components/homepage/browseByCategorites";
import FeaturedStudios from "@/components/homepage/featured-studios";
import HostGuarantee from "@/components/homepage/hostGuarantee";
import WorkFlow from "@/components/homepage/workFlow";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <BannerSection></BannerSection>
      <FeaturedStudios></FeaturedStudios>
      <BrowseByCategorites></BrowseByCategorites>
      <WorkFlow></WorkFlow>
      <HostGuarantee></HostGuarantee>
    </div>
  );
}
