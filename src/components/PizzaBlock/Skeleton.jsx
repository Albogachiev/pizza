import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton = (props) => (
  <ContentLoader 
  className="pizza-block"
    speed={2}
    width={270}
    height={460}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="138" cy="138" r="137" /> 
    <rect x="248" y="328" rx="0" ry="0" width="1" height="3" /> 
    <rect x="1" y="304" rx="14" ry="14" width="280" height="20" /> 
    <rect x="1" y="346" rx="12" ry="12" width="280" height="66" /> 
    <rect x="8" y="423" rx="12" ry="12" width="127" height="32" /> 
    <rect x="175" y="430" rx="13" ry="13" width="99" height="25" />
  </ContentLoader>
)