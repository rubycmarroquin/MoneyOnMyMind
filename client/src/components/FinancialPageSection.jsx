import YouTubeVideos from "./YouTubeVideos";

const FinancialPageSection = ({ title, subtitle, content, videoType }) => {
  return (
    <div className="FinancialPageSection">
      <h1>{title}</h1>
      <h2 className="FPSubTitles">{subtitle}</h2>
      <p>{content}</p>
      <YouTubeVideos videoType={videoType} />
    </div>
  );
};

export default FinancialPageSection;
